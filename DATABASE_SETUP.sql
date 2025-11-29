-- Next.js + MySQL CRUD Application
-- Database Setup Script
-- Author: kimberly mel edel
-- Date: 2025

-- Create database
CREATE DATABASE IF NOT EXISTS nextjs_mysql;

-- Use the database
USE nextjs_mysql;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional - for testing)
INSERT INTO users (name, email) VALUES
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Smith', 'bob@example.com'),
  ('Charlie Brown', 'charlie@example.com');

-- Display the created table
SELECT * FROM users;
