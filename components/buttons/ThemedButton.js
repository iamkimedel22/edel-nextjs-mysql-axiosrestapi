"use client";
import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === "light" ? "#eee" : "#333",
        color: theme === "light" ? "#333" : "#eee",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Current theme: {theme} (click to toggle)
    </button>
  );
};

export default ThemedButton;
