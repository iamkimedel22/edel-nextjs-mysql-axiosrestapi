"use client";
import React, { useState } from "react";

const EventHooks = () => {
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [hover, setHover] = useState(false);
  const [keyPressed, setKeyPressed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with input: "${inputValue}"`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Event Hooks Demonstration</h2>

      {/* onClick */}
      <div>
        <button onClick={() => setClickCount(clickCount + 1)}>
          Click me ({clickCount})
        </button>
      </div>

      <hr />

      {/* onChange */}
      <div>
        <label>
          Type something:
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginLeft: "8px" }}
          />
        </label>
      </div>

      <hr />

      {/* onSubmit */}
      <div>
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit Form</button>
        </form>
      </div>

      <hr />

      {/* onMouseEnter & onMouseLeave */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "200px",
          height: "50px",
          lineHeight: "50px",
          backgroundColor: hover ? "#add8e6" : "#eee",
          textAlign: "center",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        Hover over me
      </div>

      <hr />

      {/* onKeyDown & onKeyUp */}
      <div>
        <input
          placeholder="Press any key"
          onKeyDown={(e) => setKeyPressed(`Key Down: ${e.key}`)}
          onKeyUp={(e) => setKeyPressed(`Key Up: ${e.key}`)}
          style={{ padding: "8px" }}
        />
        <p>{keyPressed}</p>
      </div>
    </div>
  );
};

export default EventHooks;
