# Next.js to MySQL CRUD Application (XAMPP Version)

**Author:** kimberly mel edel  
**Date:** 2025  
**Project Name:** ReactHooks - Next.js + MySQL REST API

---

## 1. Project Overview

This is a full-stack CRUD (Create, Read, Update, Delete) application that demonstrates how to connect a Next.js frontend to a MySQL database using REST API endpoints and Axios for HTTP requests.

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16.0.1 (React 19.2.0) |
| **Backend** | Next.js API Routes (REST API) |
| **Database** | MySQL (via XAMPP) |
| **HTTP Client** | Axios 1.13.2 |
| **Database Driver** | mysql2 3.15.3 |
| **Styling** | Tailwind CSS 4 |

### Features

✅ Display all users  
✅ Add a new user  
✅ Edit an existing user  
✅ Delete a user  
✅ Real-time UI updates via React state  
✅ Error handling and validation  

---

## 2. Requirements

Before starting, ensure you have:

- **XAMPP** installed ([Download here](https://www.apachefriends.org/))
  - Includes MySQL, Apache, and phpMyAdmin
- **Node.js** v18+ and npm ([Download here](https://nodejs.org/))
- **Next.js** v16.0.1 (included in project)
- **Code Editor** (VS Code recommended)

### Required Packages (Already Installed)

```json
{
  "axios": "^1.13.2",
  "mysql2": "^3.15.3",
  "next": "16.0.1",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "tailwindcss": "^4"
}
```

To verify or install packages:
```bash
npm install
```

---

## 3. Database Setup (XAMPP MySQL)

### Step 3.1: Start XAMPP

1. Open **XAMPP Control Panel**
2. Click **Start** next to:
   - ✅ **Apache** (web server)
   - ✅ **MySQL** (database server)
3. Both should show **"Running"** in green

### Step 3.2: Create Database in phpMyAdmin

1. Click **MySQL Admin** in XAMPP Control Panel (opens phpMyAdmin)
2. You should see the phpMyAdmin dashboard at `http://localhost/phpmyadmin`
3. Click the **SQL** tab
4. Run the following SQL commands:

```sql
CREATE DATABASE nextjs_mysql;
USE nextjs_mysql;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
```

### Step 3.3: Verify Table Creation

1. In phpMyAdmin, click on **Database: nextjs_mysql** in the left sidebar
2. You should see the **users** table listed
3. Click on the **users** table to view structure:
   - `id` (INT, Primary Key, Auto Increment)
   - `name` (VARCHAR 255)
   - `email` (VARCHAR 255)

---

## 4. Project Structure

```
my-nextjs-app/ReactHooks/
│
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.js           # GET & POST endpoints
│   │       └── [id]/
│   │           └── route.js       # PUT & DELETE endpoints
│   │
│   ├── lib/
│   │   └── db.js                  # MySQL connection (singleton)
│   │
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Main page (mounts RestApiCrud)
│   └── globals.css                # Tailwind CSS imports
│
├── components/
│   └── RestApiCrud.js             # Frontend CRUD UI (main component)
│
├── package.json                   # Dependencies
├── next.config.mjs                # Next.js config (enables React Compiler)
├── jsconfig.json                  # Path aliases (@/ = root)
├── postcss.config.mjs             # Tailwind CSS config
├── eslint.config.mjs              # ESLint configuration
└── README.md
```

---

## 5. Database Connection (lib/db.js)

**File:** `app/lib/db.js`

```javascript
import mysql from "mysql2/promise";

let db;

export async function getDB() {
  if (!db) {
    db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "nextjs_mysql",
    });
  }
  return db;
}
```

### Configuration Details

| Parameter | Value | Explanation |
|-----------|-------|-------------|
| `host` | `localhost` | XAMPP MySQL runs locally |
| `user` | `root` | XAMPP default MySQL user |
| `password` | `` (empty) | XAMPP default has no password |
| `database` | `nextjs_mysql` | Database name we created |

### How It Works

- **Singleton Pattern**: The connection is created once and reused
- **Promise-based**: Uses `mysql2/promise` for async/await syntax
- **Lazy Connection**: Database connects on first request, not at startup

---

## 6. API Routes

### 6.1 GET & POST Routes

**File:** `app/api/users/route.js`

```javascript
import { getDB } from "@/app/lib/db";

// GET all users
export async function GET() {
  try {
    const db = await getDB();
    const [users] = await db.query("SELECT id, name, email FROM users");
    return Response.json(users);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

// POST create new user
export async function POST(req) {
  try {
    const { name, email } = await req.json();
    const db = await getDB();
    await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [
      name,
      email,
    ]);
    return Response.json({ message: "User created" });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }
}
```

### 6.2 PUT & DELETE Routes

**File:** `app/api/users/[id]/route.js`

```javascript
import { getDB } from "@/app/lib/db";

// PUT update user
export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    if (!id) {
      return new Response(JSON.stringify({ error: "ID missing" }), {
        status: 400,
      });
    }

    const userId = Number(id);
    if (isNaN(userId)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
      });
    }

    const { name, email } = await req.json();
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email required" }),
        { status: 400 }
      );
    }

    const db = await getDB();
    const [result] = await db.query(
      "UPDATE users SET name=?, email=? WHERE id=?",
      [name, email, userId]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return Response.json({ message: "User updated" });
  } catch (err) {
    console.error("PUT error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// DELETE remove user
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    if (!id) {
      return new Response(JSON.stringify({ error: "ID missing" }), {
        status: 400,
      });
    }

    const userId = Number(id);
    if (isNaN(userId)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
      });
    }

    const db = await getDB();
    const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return Response.json({ message: "User deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
```

### API Endpoints Summary

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| **GET** | `/api/users` | Fetch all users | None |
| **POST** | `/api/users` | Create a new user | `{ name, email }` |
| **PUT** | `/api/users/[id]` | Update a user | `{ name, email }` |
| **DELETE** | `/api/users/[id]` | Delete a user | None |

---

## 7. Frontend Component (RestApiCrud.js)

**File:** `components/RestApiCrud.js`

This is a **"use client"** component that handles all CRUD operations with a clean UI.

```javascript
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RestApiCrud = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  // Load all users
  const loadUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new user
  const addUser = async () => {
    if (!form.name || !form.email) return alert("Please fill all fields");
    try {
      await axios.post("/api/users", form);
      setForm({ name: "", email: "" });
      loadUsers();
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Update existing user
  const updateUser = async () => {
    if (!form.name || !form.email) return alert("Please fill all fields");
    try {
      await axios.put(`/api/users/${editingId}`, form);
      setForm({ name: "", email: "" });
      setEditingId(null);
      loadUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Populate form for editing
  const editUser = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>REST API CRUD Users</h1>

      {/* Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        {editingId ? (
          <button onClick={updateUser}>Update</button>
        ) : (
          <button onClick={addUser}>Add</button>
        )}
      </div>

      {/* Users List */}
      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ marginBottom: "8px" }}>
            {u.name} — {u.email}
            <button onClick={() => editUser(u)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button
              onClick={() => deleteUser(u.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestApiCrud;
```

### Component Workflow

1. **useEffect Hook**: Fetches users when component mounts
2. **handleChange**: Updates form state as user types
3. **addUser**: POSTs new user, clears form, reloads list
4. **updateUser**: PUTs updated user, clears form, reloads list
5. **deleteUser**: DELETEs user, reloads list
6. **editUser**: Populates form with user data for editing
7. **loadUsers**: Fetches fresh user list from API

---

## 8. How the System Works

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   USER BROWSER                              │
│  (RestApiCrud.js - React Component)                         │
│  - Display users                                            │
│  - Form inputs (name, email)                                │
│  - Edit/Delete buttons                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │ Axios HTTP Requests
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS API ROUTES (Backend)                   │
│  /api/users & /api/users/[id]                               │
│  - GET: Select all users from DB                            │
│  - POST: Insert new user                                    │
│  - PUT: Update user by ID                                   │
│  - DELETE: Remove user by ID                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ SQL Queries
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              MYSQL DATABASE (XAMPP)                         │
│  Database: nextjs_mysql                                     │
│  Table: users (id, name, email)                             │
└─────────────────────────────────────────────────────────────┘
```

### Request-Response Cycle Example

**Adding a User:**

1. User enters name & email in form
2. Clicks "Add" button
3. `addUser()` function calls `axios.post("/api/users", form)`
4. Request sent to backend: `POST /api/users` with body: `{ name: "John", email: "john@example.com" }`
5. API route receives request, extracts data
6. Executes SQL: `INSERT INTO users (name, email) VALUES (?, ?)`
7. Database creates new record with auto-increment ID
8. API responds with success message
9. Frontend calls `loadUsers()` to refresh list
10. `axios.get("/api/users")` fetches all users
11. API returns all users from database
12. React state updates with new user list
13. Component re-renders, showing the new user

---

## 9. Testing the API

### Option A: Browser (Simple GET requests)

Open in browser:
```
http://localhost:3000/api/users
```

You'll see JSON response of all users.

### Option B: Postman / Thunder Client

#### GET Request
```
Method: GET
URL: http://localhost:3000/api/users
```

#### POST Request
```
Method: POST
URL: http://localhost:3000/api/users
Headers: Content-Type: application/json
Body:
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### PUT Request
```
Method: PUT
URL: http://localhost:3000/api/users/1
Headers: Content-Type: application/json
Body:
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

#### DELETE Request
```
Method: DELETE
URL: http://localhost:3000/api/users/1
```

---

## 10. Running the Application

### Step 1: Start XAMPP Services

1. Open XAMPP Control Panel
2. Start **Apache** ✅
3. Start **MySQL** ✅

### Step 2: Start Next.js Development Server

In the project directory:

```bash
npm run dev
```

Expected output:
```
▲ Next.js 16.0.1
  - Local:        http://localhost:3000
```

### Step 3: Open Application

Visit in your browser:
```
http://localhost:3000
```

You should see the **REST API CRUD Users** interface with:
- ✅ Input fields for Name and Email
- ✅ "Add" button (when not editing)
- ✅ List of users (if any exist in database)
- ✅ Edit and Delete buttons for each user

---

## 11. Troubleshooting

### Issue: "Connection Refused" or "ECONNREFUSED"

**Solution:**
- Verify MySQL is running in XAMPP (green status)
- Check database name is `nextjs_mysql`
- Verify users table exists in phpMyAdmin

### Issue: "Database nextjs_mysql does not exist"

**Solution:**
- Open phpMyAdmin: `http://localhost/phpmyadmin`
- Create database by running SQL commands from Section 3.2

### Issue: "Users table does not exist"

**Solution:**
- Run the CREATE TABLE SQL command in phpMyAdmin
- Verify table appears in database list

### Issue: "Cannot GET /api/users"

**Solution:**
- Verify Next.js server is running (`npm run dev`)
- Check API route file exists: `app/api/users/route.js`
- Clear `.next` folder and restart: `rm -r .next && npm run dev`

### Issue: Form doesn't submit or buttons don't work

**Solution:**
- Open browser DevTools (F12) → Console tab
- Check for JavaScript errors
- Verify Axios is installed: `npm list axios`
- Check network tab to see API requests

---

## 12. Deliverables for Presentation

Your instructor will expect to see:

### ✅ Database Evidence
- [ ] phpMyAdmin showing `nextjs_mysql` database
- [ ] phpMyAdmin showing `users` table with columns (id, name, email)
- [ ] At least one user record in table

### ✅ API Functionality
- [ ] GET request working (browser or Postman)
- [ ] API returning users in JSON format
- [ ] Network tab showing successful requests (200 status)

### ✅ Frontend Application
- [ ] Next.js app running at http://localhost:3000
- [ ] RestApiCrud component displaying
- [ ] UI is responsive and styled

### ✅ CRUD Operations
- [ ] **CREATE**: Add a new user via form, verify in database
- [ ] **READ**: Display all users in list
- [ ] **UPDATE**: Edit user, change name/email, verify changes
- [ ] **DELETE**: Delete user, verify removed from list

### ✅ Code Quality
- [ ] All API routes properly documented
- [ ] Error handling in place (try/catch blocks)
- [ ] Form validation (empty field checks)
- [ ] Proper HTTP status codes (200, 400, 404, 500)

---

## 13. Quick Start Checklist

- [ ] XAMPP installed and running (Apache & MySQL)
- [ ] Database `nextjs_mysql` created
- [ ] Table `users` created with correct schema
- [ ] `npm install` completed
- [ ] Database config in `app/lib/db.js` correct
- [ ] All API routes working (`/api/users`, `/api/users/[id]`)
- [ ] `RestApiCrud.js` mounted in `app/page.js`
- [ ] `npm run dev` running successfully
- [ ] Can view http://localhost:3000
- [ ] Can add/edit/delete users
- [ ] Users persist in MySQL database

---

## 14. Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MySQL/mysql2 Documentation](https://github.com/sidorares/node-mysql2)
- [Axios Documentation](https://axios-http.com/)
- [React Hooks Guide](https://react.dev/reference/react)
- [RESTful API Best Practices](https://restfulapi.net/)

---

**End of Documentation**

For questions or issues, refer to the Troubleshooting section (11) above.
