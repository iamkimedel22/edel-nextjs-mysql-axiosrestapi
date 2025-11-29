# Architecture & Data Flow Diagrams

Visual explanations of how the Next.js + MySQL CRUD application works.

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER'S WEB BROWSER                              │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │            React Component: RestApiCrud.js                       │  │
│  │                                                                  │  │
│  │  ┌─────────────────┐        ┌──────────────────────────────┐  │  │
│  │  │  INPUT FORM     │        │   USER LIST DISPLAY          │  │  │
│  │  │                 │        │                              │  │  │
│  │  │ [Name field]    │        │ - Alice (alice@email.com)    │  │  │
│  │  │ [Email field]   │        │   [Edit] [Delete]            │  │  │
│  │  │ [Add/Update]    │        │                              │  │  │
│  │  │                 │        │ - Bob (bob@email.com)        │  │  │
│  │  └─────────────────┘        │   [Edit] [Delete]            │  │  │
│  │          ▲ │                │                              │  │  │
│  │          │ └────────────────────────────────────────────────┘  │  │
│  │          │                                                      │  │
│  │          │ State: [users, form, editingId]                    │  │
│  │          │ Hooks: useState, useEffect                         │  │
│  │          │                                                      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│           ▲  │                                                          │
│           │  ▼                                                          │
│    ┌──────────────────┐                                                │
│    │  Axios HTTP      │                                                │
│    │  Client          │                                                │
│    └──────────────────┘                                                │
│           │                                                             │
└───────────┼──────────────────────────────────────────────────────────────┘
            │ HTTP Requests/Responses (JSON)
            │
            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Backend)                             │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  API Route: /api/users/route.js                               │   │
│  │  - GET()   → Select all users from MySQL                      │   │
│  │  - POST()  → Insert new user into MySQL                       │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  API Route: /api/users/[id]/route.js                          │   │
│  │  - PUT()    → Update existing user in MySQL                   │   │
│  │  - DELETE() → Remove user from MySQL                          │   │
│  └────────────────────────────────────────────────────────────────┘   │
│           │                                                             │
│           ▼                                                             │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  Database Module: /app/lib/db.js                              │   │
│  │  - getDB() returns MySQL connection                           │   │
│  │  - Singleton pattern (reuses connection)                      │   │
│  └────────────────────────────────────────────────────────────────┘   │
│           │                                                             │
└───────────┼──────────────────────────────────────────────────────────────┘
            │ SQL Queries
            │
            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    MYSQL DATABASE (XAMPP)                               │
│                                                                         │
│  Database: nextjs_mysql                                               │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Table: users                                                │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  id  │ name         │ email                │ created_at      │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │  1   │ Alice        │ alice@example.com    │ 2025-01-15 ...  │    │
│  │  2   │ Bob          │ bob@example.com      │ 2025-01-15 ...  │    │
│  │  3   │ Charlie      │ charlie@example.com  │ 2025-01-15 ...  │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Request/Response Flow - CREATE Operation

```
┌─────────────────────────────────────┐
│  User Types in Form                 │
│  Name: "Alice"                      │
│  Email: "alice@example.com"         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  User Clicks "Add" Button           │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  handleChange() Updates Form State  │
│  form = {name: "Alice", ...}        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  addUser() Function Called          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Validation: Check Empty Fields     │
│  ✓ name exists                      │
│  ✓ email exists                     │
└──────────────┬──────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  AXIOS POST REQUEST SENT            │
│  URL: /api/users                    │
│  Body: {name: "Alice", email: ...}  │
└──────────────┬───────────────────────┘
               │
               ▼
        [HTTP NETWORK]
               │
               ▼
┌──────────────────────────────────────┐
│  NEXT.JS API ROUTE /api/users        │
│  POST() Function Triggered          │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Extract Data from Request          │
│  const { name, email } = req.json() │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Get Database Connection            │
│  const db = await getDB()           │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Execute SQL INSERT Query           │
│  INSERT INTO users (name, email)    │
│  VALUES (?, ?)                      │
└──────────────┬───────────────────────┘
               │
               ▼
        [DATABASE WRITE]
               │
               ▼
┌──────────────────────────────────────┐
│  MYSQL Creates New Record           │
│  Generates Auto-Increment ID (4)    │
│  Row: {id: 4, name: "Alice", ...}  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  API Returns Success Response       │
│  Response.json({                    │
│    message: "User created"          │
│  })                                 │
└──────────────┬───────────────────────┘
               │
               ▼
        [HTTP RESPONSE]
               │
               ▼
┌──────────────────────────────────────┐
│  Frontend Receives Response         │
│  Status: 200 OK                     │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Clear Form State                   │
│  setForm({name: "", email: ""})     │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Call loadUsers() Function          │
│  Fetch Fresh User List from API     │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  AXIOS GET REQUEST SENT             │
│  URL: /api/users                    │
└──────────────┬───────────────────────┘
               │
               ▼
        [HTTP NETWORK]
               │
               ▼
┌──────────────────────────────────────┐
│  NEXT.JS API ROUTE /api/users        │
│  GET() Function Triggered          │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Get Database Connection            │
│  Execute SQL SELECT Query           │
│  SELECT id, name, email FROM users  │
└──────────────┬───────────────────────┘
               │
               ▼
        [DATABASE READ]
               │
               ▼
┌──────────────────────────────────────┐
│  MYSQL Returns All User Records     │
│  [{id: 1, name: "Bob"...},          │
│   {id: 2, name: "Charlie"...},      │
│   {id: 4, name: "Alice"...}]        │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  API Returns JSON Response          │
│  Response.json(users)               │
└──────────────┬───────────────────────┘
               │
               ▼
        [HTTP RESPONSE]
               │
               ▼
┌──────────────────────────────────────┐
│  Frontend Receives User Array       │
│  [alice, bob, charlie]              │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Update React State                 │
│  setUsers([...])                    │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  Component Re-renders              │
│  UI Automatically Updates           │
│  Shows: Alice in the list!          │
└──────────────────────────────────────┘
```

---

## 3. Request/Response Flow - READ Operation

```
     User Loads Page
           │
           ▼
    useEffect Hook Runs
           │
           ▼
    loadUsers() Called
           │
           ▼
    axios.get("/api/users")
           │
           ▼
    [HTTP GET REQUEST]
           │
           ▼
    API Route Receives GET
           │
           ▼
    getDB() Returns Connection
           │
           ▼
    Execute: SELECT * FROM users
           │
           ▼
    [DATABASE QUERY]
           │
           ▼
    MySQL Returns User Array
           │
           ▼
    Response.json(users)
           │
           ▼
    [HTTP RESPONSE - 200 OK]
           │
           ▼
    Frontend Gets JSON Array
           │
           ▼
    setUsers(res.data)
           │
           ▼
    Component Re-renders
           │
           ▼
    UI Displays User List
```

---

## 4. Request/Response Flow - UPDATE Operation

```
     User Clicks Edit Button
           │
           ▼
    editUser(user) Called
           │
           ▼
    Form Populated with Data
    Button Changes to "Update"
           │
           ▼
    User Modifies Email Field
           │
           ▼
    User Clicks "Update" Button
           │
           ▼
    updateUser() Called
           │
           ▼
    axios.put(`/api/users/${editingId}`, form)
           │
           ▼
    [HTTP PUT REQUEST]
    /api/users/3
    Body: {name: "Alice", email: "new@example.com"}
           │
           ▼
    API Route [id]/route.js
    PUT() Function Triggered
           │
           ▼
    Extract ID and Data
           │
           ▼
    Validate: name and email present
           │
           ▼
    Execute: UPDATE users SET name=?, email=? WHERE id=?
           │
           ▼
    [DATABASE UPDATE]
           │
           ▼
    MySQL Updates Row 3
           │
           ▼
    Response.json({message: "User updated"})
           │
           ▼
    [HTTP RESPONSE - 200 OK]
           │
           ▼
    Frontend Gets Success Message
           │
           ▼
    Clear Form & EditingID
           │
           ▼
    Call loadUsers()
           │
           ▼
    Fetch Fresh User List
           │
           ▼
    setUsers() Updates State
           │
           ▼
    UI Shows Updated User Email
```

---

## 5. Request/Response Flow - DELETE Operation

```
     User Clicks Delete Button
           │
           ▼
    deleteUser(id) Called
           │
           ▼
    axios.delete(`/api/users/${id}`)
           │
           ▼
    [HTTP DELETE REQUEST]
    /api/users/3
           │
           ▼
    API Route [id]/route.js
    DELETE() Function Triggered
           │
           ▼
    Extract ID from URL
           │
           ▼
    Validate: ID is a number
           │
           ▼
    Execute: DELETE FROM users WHERE id=?
           │
           ▼
    [DATABASE DELETE]
           │
           ▼
    MySQL Removes Row 3
           │
           ▼
    Check affectedRows > 0
           │
           ▼
    Response.json({message: "User deleted"})
           │
           ▼
    [HTTP RESPONSE - 200 OK]
           │
           ▼
    Frontend Gets Success Message
           │
           ▼
    Call loadUsers()
           │
           ▼
    Fetch Fresh User List (without deleted user)
           │
           ▼
    setUsers() Updates State
           │
           ▼
    UI User Disappears from List
```

---

## 6. State Management Flow

```
Component Initialization
    │
    ├─► useState([]) - users = []
    │
    ├─► useState({name: "", email: ""}) - form
    │
    └─► useState(null) - editingId
        │
        ▼
    useEffect Runs (on mount)
        │
        ├─► Fetch users from API
        │
        └─► setUsers([alice, bob, charlie])
            │
            ▼
        Component Renders
            │
            ├─► Display form inputs
            │   - value={form.name}
            │   - value={form.email}
            │
            ├─► Display user list
            │   - users.map(u => <li>{u.name}</li>)
            │
            └─► Show Add/Update button
                - {editingId ? "Update" : "Add"}

User Interaction
    │
    ├─► Types in form
    │   └─► onChange → setForm({...form, [name]: value})
    │
    ├─► Clicks Edit
    │   ├─► setForm({name: user.name, email: user.email})
    │   └─► setEditingId(user.id)
    │       └─► Button text changes to "Update"
    │
    ├─► Clicks Add
    │   ├─► axios.post() → API
    │   ├─► setForm({name: "", email: ""})
    │   └─► loadUsers() → setUsers([...])
    │       └─► Component re-renders
    │
    ├─► Clicks Update
    │   ├─► axios.put() → API
    │   ├─► setForm({name: "", email: ""})
    │   ├─► setEditingId(null)
    │   └─► loadUsers() → setUsers([...])
    │       └─► Component re-renders
    │
    └─► Clicks Delete
        ├─► axios.delete() → API
        └─► loadUsers() → setUsers([...])
            └─► Component re-renders (user removed)
```

---

## 7. Component Lifecycle

```
Component Mount
    │
    ├─► useEffect Dependency: []
    │   ├─► Runs once on mount
    │   ├─► Calls loadUsers()
    │   └─► API GET request fetches users
    │
    └─► Component Renders with Initial State
        ├─► users = []
        ├─► form = {name: "", email: ""}
        └─► editingId = null

User Interactions During Component Life
    │
    ├─► Form onChange
    │   └─► setForm() → State updates → Re-render
    │
    ├─► Button Click
    │   ├─► State updates (setForm, setEditingId)
    │   ├─► API call (POST/PUT/DELETE)
    │   └─► loadUsers() triggers GET request
    │       └─► setUsers() → State updates → Re-render
    │
    └─► Every render includes:
        ├─► Form with current values
        ├─► User list from state
        └─► Correct button text (Add vs Update)

Component Unmount
    │
    └─► Cleanup (if any effect cleanup needed)
```

---

## 8. Database Schema

```
┌─────────────────────────────────────────────┐
│       MySQL Database: nextjs_mysql          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────────┐
    │      Table: users              │
    ├────────────────────────────────┤
    │ Column       │ Type      │ Key │
    ├──────────────┼───────────┼─────┤
    │ id           │ INT       │ PK* │
    │ name         │ VARCHAR   │     │
    │ email        │ VARCHAR   │     │
    │ created_at   │ TIMESTAMP │     │
    │ updated_at   │ TIMESTAMP │     │
    └────────────────────────────────┘

* PK = Primary Key
  AUTO_INCREMENT = Automatically generate ID
  DEFAULT CURRENT_TIMESTAMP = Auto-set on create

Row Examples:
┌────┬─────────────┬────────────────────┐
│ id │ name        │ email              │
├────┼─────────────┼────────────────────┤
│ 1  │ Alice       │ alice@example.com  │
│ 2  │ Bob         │ bob@example.com    │
│ 3  │ Charlie     │ charlie@example.com│
└────┴─────────────┴────────────────────┘
```

---

## 9. HTTP Status Codes Used

```
200 OK ✅
├─► GET /api/users → Returns user array
├─► POST /api/users → User created successfully
├─► PUT /api/users/1 → User updated successfully
└─► DELETE /api/users/1 → User deleted successfully

400 Bad Request ❌
├─► POST without email → "Name and email required"
├─► PUT with invalid ID → "Invalid ID"
└─► DELETE with missing ID → "ID missing"

404 Not Found ❌
├─► PUT /api/users/999 → User doesn't exist
└─► DELETE /api/users/999 → User doesn't exist

500 Internal Server Error ❌
├─► Database connection failed
├─► SQL query error
└─► Unexpected server error
```

---

## 10. Error Flow

```
User Action
    │
    ▼
Frontend Function
    │
    ├─► Try Block
    │   ├─► Validation Check
    │   │   ├─► If invalid → alert("Please fill all fields")
    │   │   └─► If valid → Continue
    │   │
    │   ├─► axios.method() → API Call
    │   │   ├─► If success (200) → Success handling
    │   │   └─► If error → Catch block
    │   │
    │   └─► Re-render UI
    │
    └─► Catch Block
        ├─► console.error(err)
        └─► UI shows error (optional)

API Route
    │
    ├─► Try Block
    │   ├─► Validate input
    │   │   ├─► If invalid → Return 400 error
    │   │   └─► If valid → Continue
    │   │
    │   ├─► Database operation
    │   │   ├─► If success → Return 200 response
    │   │   └─► If failure → Goes to catch
    │   │
    │   └─► Return success response
    │
    └─► Catch Block
        └─► console.error(err)
        └─► Return 500 response
```

---

## Key Takeaway

The entire flow follows this pattern:

```
USER ACTION
    ↓
FRONTEND STATE UPDATE
    ↓
AXIOS HTTP REQUEST
    ↓
NEXT.JS API ROUTE
    ↓
MYSQL QUERY
    ↓
API RESPONSE
    ↓
FRONTEND STATE UPDATE
    ↓
COMPONENT RE-RENDER
    ↓
USER SEES UPDATE
```

Every CRUD operation follows this exact same flow!

---

**Date:** November 29, 2025
