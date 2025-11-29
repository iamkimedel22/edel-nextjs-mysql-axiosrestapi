"use client";
import React, { useState } from "react";

export default function SimpleForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
    } else if (!validateEmail(email)) {
      setError("Invalid email format");
    } else {
      setError("");
      alert("Form submitted with email: " + email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit">Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
