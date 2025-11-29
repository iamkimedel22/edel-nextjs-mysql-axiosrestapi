"use client";
import React, { useState, useEffect } from "react";

export default function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [visibleCount, setVisibleCount] = useState(false); // default for desktop

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        console.log("desktop view");
        setVisibleCount(false);
      } else {
        setVisibleCount(true);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    // <div>
    //   {isLoggedIn ? (
    //     <h1>Welcome back, user!</h1>
    //   ) : (
    //     <button onClick={() => setIsLoggedIn(true)}>Log In</button>
    //   )}
    // </div>
    <>
      {visibleCount ? (
        <div className="bg-red-500 w-full h-screen"></div>
      ) : (
        <div className="bg-green-500 w-full h-screen"></div>
      )}
    </>
  );
}
