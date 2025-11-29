"use client";
import React, { useState, useMemo, useEffect } from "react";

const UseMemoComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("UseMemoComponent mounted");
    return () => console.log("UseMemoComponent unmounted");
  }, []);

  console.log("UseMemoComponent render");

  const total = useMemo(() => {
    console.log("Calculating total...");
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
      sum += i;
    }
    return sum;
  }, []);

  return (
    <div>
      <p>Total: {total}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increase ({count})</button>
    </div>
  );
};

export default UseMemoComponent;
