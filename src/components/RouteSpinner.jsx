// components/RouteSpinner.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import './../style/RouteSpinner.css';
import MoonCanvas from './MoonCanvas';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock";





export default function RouteSpinner() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const spinnerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const target = spinnerRef.current;
    disableBodyScroll(target);
    document.querySelector('body').setAttribute('data-loading', 'true');
    
    const timeout = setTimeout(() => {
      setLoading(false);
      clearAllBodyScrollLocks();
      document.querySelector('body').setAttribute('data-loading', 'false');
    },
      1050); 
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return (
    <div ref={spinnerRef} className="RouteSpinner" data-empty="true"></div>
  );

  return (
    <div ref={spinnerRef} className="RouteSpinner">
        <div className="RouteSpinner__inner">
            <div className="RouteSpinner__inner-overlay"></div>
            <div className="RouteSpinner__inner-spinner">
            <canvas id="Moon" width="100" height="100"></canvas>
            <MoonCanvas />
            {/* <div className="RouteSpinner__inner-spinner-sky">
            <div className="RouteSpinner__inner-spinner-moon">
            </div>
            </div> */}
            </div>
        </div>
    </div>
  );
}
