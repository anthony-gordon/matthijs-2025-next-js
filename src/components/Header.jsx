'use client'

import React from 'react';
import './../style/Header.css'; // Import the CSS file for styling
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock";
import { useMyContext } from '../contexts/MyContext'

const Header = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const menuRef = useRef(null);

  const { loading, setLoading } = useMyContext();
  const { navigatingTo, setNavigatingTo } = useMyContext();

  const handleClick = () => {
      setLoading(true);
      setNavigatingTo('homePage');
    };


  const handleMenuOpenClose = function(){
    setMenuOpen(menuOpen == true ? false : true)
  }

  useEffect(() => {
    const target = menuRef.current;
    if (menuOpen && target) {
      disableBodyScroll(target);
    } else {
      enableBodyScroll(target);
    }

    // Clean up on unmount
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <div className="header-title">
          <Link href="/" onClick={handleClick} className="site-title">Matthijs Holland</Link>
        </div>
        <div className="menu-icon">
          <button className="menu-button" data-open={menuOpen} onClick={handleMenuOpenClose}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
          </button>
        </div>
      </header>
      <nav ref={menuRef} data-open={menuOpen} className="header__slide-out-nav">
        <div className="header__slide-out-nav-inner page-container">
          <Link onClick={() => setMenuOpen(false)} href="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} href="/contact" >Contact</Link>
          <Link onClick={() => setMenuOpen(false)} href="/personal-statement">Personal Statement</Link>
          </div>
      </nav>
    </>
  );
};

export default Header;
