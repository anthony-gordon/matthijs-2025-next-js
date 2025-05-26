// components/RouteSpinner.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './../style/RouteSpinner.css';
import MoonCanvas from './MoonCanvas';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock";
import { useMyContext } from '../contexts/MyContext'




export default function RouteSpinner() {
  const pathname = usePathname();
  const { loading } = useMyContext()
  const spinnerRef = useRef(null);

  useEffect(() => {
    if(loading) {
    console.log('RouteSpinner: loading is true');
    const target = spinnerRef.current;
    disableBodyScroll(target);
    document.querySelector('body').setAttribute('data-loading', 'true');
    } else {
      console.log('RouteSpinner: loading is false');
      clearAllBodyScrollLocks();
      document.querySelector('body').setAttribute('data-loading', 'false');
    }
  }, [loading]);

  if (!loading) return (
    <div ref={spinnerRef} className="RouteSpinner" data-empty="true"></div>
  );

  return (
    <div ref={spinnerRef} className="RouteSpinner">
        <div className="RouteSpinner__inner">
            <div className="RouteSpinner__inner-overlay"></div>
            <div className="RouteSpinner__inner-spinner">
            <MoonCanvas />
            <span className="RouteSpinner__inner-spinner-text">loading</span>

            {/* <div className="RouteSpinner__inner-spinner-sky">
            <div className="RouteSpinner__inner-spinner-moon">
            </div>
            </div> */}
            </div>
        </div>
    </div>
  );
}
