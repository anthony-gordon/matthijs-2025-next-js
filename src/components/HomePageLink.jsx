'use client';

import Link from 'next/link';
import { useMyContext } from '../contexts/MyContext'
import { useState, useEffect } from 'react';


function HomePageLink({slug, imageSrc, altText, totalItems, index}) {

const { loading, setLoading } = useMyContext();
const { navigatingTo, setNavigatingTo } = useMyContext();
const { homePageItemsLoaded, setHomePageItemsLoaded } = useMyContext();


const handleClick = () => {
    setLoading(true);
    setNavigatingTo('itemPage');
  };

  useEffect(() => {
    if(index + 1 === totalItems) {
        setTimeout(() => {
            setLoading(false);
            setNavigatingTo('');
        }, 1000); 
    }
  }, []);

  return (
    <Link className="homepage__tile-link" href={slug} key={slug} onClick={handleClick}>
    <div className="homepage__tile-image-container">
        <div className="homepage__tile-image-inner-container">
            <img
            className="homepage__tile-image"
            src={imageSrc} 
            alt={altText}
            />
            </div>
        </div>
    </Link>
  )
  
}

export default HomePageLink;
