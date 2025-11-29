"use client";
import React, { useState, useCallback } from "react";

const UseCallbackComponent = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  return (
    <div className="bg-green-300">
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default UseCallbackComponent;
