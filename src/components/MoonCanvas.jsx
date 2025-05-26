'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MoonCanvas = () => {
  const overlayRef = useRef(null);

  // const canvasRef = useRef(null);
  // const phaseRef = useRef(1.01);
  // const directionRef = useRef(-1); // Start going backwards

  useEffect(() => {
    const svg = document.querySelector('.loadingIndicatorMoon');
    const svgText = document.querySelector('.RouteSpinner__inner-spinner-text');

    const minViewport = Math.min(window.innerWidth, window.innerHeight);
    const scale = (minViewport * 0.5) / 200; // 200 is the base width/height

    svg.style.transform = `scale(${scale})`;
    svg.style.transformOrigin = 'center center'; // or 'center' if preferred
    svgText.style.fontSize = `${minViewport / 4}px`

    gsap.to(overlayRef.current, {
      duration: 6,
      attr: { cx: "300" },
      ease: "slow(0.1, 0.9, false)",
      repeat: -1,
      repeatDelay: 1.5,
    });
  }, []);

  return (
    <>
    <svg width="200" height="200" className="loadingIndicatorMoon">
      <clipPath id="clip1">
        <circle cx="100" cy="100" r="90" fill="#f0f4ec" />
      </clipPath>  
      <circle cx="100" cy="100" r="90" fill="#f0f4ec" />
      <circle clipPath="url('#clip1')" cx="85" cy="83" r="95" fill="#f0f4ec" />
      <circle ref={overlayRef} cx="100" cy="100" r="90" strokeWidth="2" stroke="black" fill="none" />
      <circle ref={overlayRef} id="overlay" clipPath="url('#clip1')" cx="-100" cy="100" r="90" fill="black" strokeWidth="2" stroke="#313131" />
    </svg>
    </>
  );
};

export default MoonCanvas;
