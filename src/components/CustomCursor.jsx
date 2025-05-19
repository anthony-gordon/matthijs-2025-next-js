"use client";          // if you’re on Next 13/14 app router

import { useEffect, useRef } from "react";
import './../style/CustomCursor.css'; 

export default function FollowCursor() {
  const cursorRef = useRef(null);
  const tipRef = useRef(null);
  const timeoutRef = useRef(null);


  useEffect(() => {
    const handleMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = `${e.pageY}px`;
        cursorRef.current.style.left = `${e.pageX}px`;
      }

      if (tipRef.current) tipRef.current.style.display = "none";

      // Clear previous timeout
      clearTimeout(timeoutRef.current);

      // Wait for 100ms of no movement to consider it "settled"
      timeoutRef.current = setTimeout(() => {
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        let isOverLink = elementUnderCursor?.closest("a") || elementUnderCursor?.closest(".menu-icon");
        

        if (cursorRef.current) {
          cursorRef.current.style.transform = isOverLink ? "scale(2) translate(-10px, -10px)" : "scale(1) translate(-25px, -25px)";
        }
      }, 25);
    };

    document.addEventListener("mousemove", handleMove);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* the “cursor” element */}
      <div
        ref={cursorRef}
        className="cursor"
      />
      {/* the “tip” element (shows until the first mouse-move hides it) */}
      <div
        ref={tipRef}
        className="tip"
      >
        Move the mouse!
      </div>
    </>
  );
}
