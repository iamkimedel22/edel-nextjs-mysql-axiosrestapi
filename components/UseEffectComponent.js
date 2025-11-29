"use client";
import React, { useState, useEffect } from "react";

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple",
  "Grape",
  "Strawberry",
  "Watermelon",
  "Peach",
  "Cherry",
];

const UseEffectComponent = () => {
  const [visibleCount, setVisibleCount] = useState(4); // default for desktop

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        console.log("desktop view");
        setVisibleCount(4);
      } else if (width >= 768) {
        console.log("tablet view");
        setVisibleCount(10);
      } else {
        console.log("mobile view");
        setVisibleCount(6);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <div className="bg-amber-200">
      <h3>Fruits List</h3>
      <ul>
        {fruits.slice(0, visibleCount).map((fruit, i) => (
          <li key={i}>{fruit}</li>
        ))}
      </ul>
      <p>Showing {visibleCount} fruits based on window size.</p>
    </div>
  );
};

export default UseEffectComponent;
