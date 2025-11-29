# API Testing Guide

This guide explains how to test the REST API endpoints for the CRUD application.

---

## API Base URL

```
http://localhost:3000/api/users
```

The API must be running (`npm run dev`).

---

## Endpoints Overview

| Method | Endpoint | Purpose | Request Body |
|--------|----------|---------|--------------|
| **GET** | `/api/users` | Fetch all users | None |
| **POST** | `/api/users` | Create new user | `{ name, email }` |
| **PUT** | `/api/users/[id]` | Update specific user | `{ name, email }` |
| **DELETE** | `/api/users/[id]` | Delete specific user | None |

---

## Method 1: Browser Testing (Simple)

### GET - Fetch All Users

1. Open new browser tab
2. Visit: **http://localhost:3000/api/users**
3. You should see JSON array of users:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```

**Result:** ✅ GET works

---

## Method 2: Thunder Client (VS Code Extension)

### Installation

1. Open VS Code
2. Click Extensions icon (or press `Ctrl+Shift+X`)
3. Search: **Thunder Client**
4. Click **Install** (by RangeLeon)

### Test GET

1. Open Thunder Client (icon appears in left sidebar)
2. Create new request: **+** button
3. Set values:
   - Method: **GET**
   - URL: `http://localhost:3000/api/users`
4. Click **Send**
5. See response in right panel

### Test POST (Create User)

1. Create new request
2. Set values:
   - Method: **POST**
   - URL: `http://localhost:3000/api/users`
   - Click **Body** tab
   - Select **JSON**
   - Paste:
   ```json
   {
     "name": "Alice Johnson",
     "email": "alice@example.com"
   }
   ```
3. Click **Send**
4. Expected response:
   ```json
   { "message": "User created" }
   ```

### Test PUT (Update User)

1. Create new request
2. Set values:
   - Method: **PUT**
   - URL: `http://localhost:3000/api/users/1` (replace 1 with actual user ID)
   - Click **Body** tab
   - Select **JSON**
   - Paste:
   ```json
   {
     "name": "Alice Updated",
     "email": "alice.new@example.com"
   }
   ```
3. Click **Send**
4. Expected response:
   ```json
   { "message": "User updated" }
   ```

### Test DELETE (Remove User)

1. Create new request
2. Set values:
   - Method: **DELETE**
   - URL: `http://localhost:3000/api/users/1` (replace 1 with actual user ID)
3. Click **Send**
4. Expected response:
   ```json
   { "message": "User deleted" }
   ```

---

## Method 3: Postman (Standalone App)

### Download & Install

1. Visit https://www.postman.com/downloads/
2. Download for Windows
3. Install and open Postman

### Create Collection

1. Click **Collections** on left
2. Click **+** to create new collection
3. Name it: **NextJS CRUD API**

### Test GET

1. Click **+** to create new request
2. Paste into top bar:
   - URL: `http://localhost:3000/api/users`
   - Method dropdown: **GET**
3. Click **Send**
4. See JSON response below

### Test POST

1. Create new request
2. Set values:
   - URL: `http://localhost:3000/api/users`
   - Method: **POST**
3. Click **Body** tab → **raw** → **JSON**
4. Paste:
   ```json
   {
     "name": "Bob Wilson",
     "email": "bob@example.com"
   }
   ```
5. Click **Send**

### Test PUT

1. Create new request
2. Set values:
   - URL: `http://localhost:3000/api/users/2`
   - Method: **PUT**
3. Click **Body** tab → **raw** → **JSON**
4. Paste:
   ```json
   {
     "name": "Bob Updated",
     "email": "bob.updated@example.com"
   }
   ```
5. Click **Send**

### Test DELETE

1. Create new request
2. Set values:
   - URL: `http://localhost:3000/api/users/2`
   - Method: **DELETE**
3. Click **Send**

---

## Method 4: curl (Command Line)

### Prerequisites

- Windows PowerShell or Command Prompt
- Next.js app running (`npm run dev`)

### GET - Fetch All Users

```powershell
curl -X GET http://localhost:3000/api/users
```

**Expected Output:**
```json
[{"id":1,"name":"John","email":"john@example.com"}]
```

### POST - Create User

```powershell
$body = @{
    name = "Charlie Brown"
    email = "charlie@example.com"
} | ConvertTo-Json

curl -X POST http://localhost:3000/api/users `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Expected Output:**
```json
{"message":"User created"}
```

### PUT - Update User

```powershell
$body = @{
    name = "Charlie Updated"
    email = "charlie.updated@example.com"
} | ConvertTo-Json

curl -X PUT http://localhost:3000/api/users/3 `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

### DELETE - Remove User

```powershell
curl -X DELETE http://localhost:3000/api/users/3
```

---

## Expected Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| **200** | Success | User created, updated, deleted |
| **400** | Bad Request | Missing name/email, invalid ID |
| **404** | Not Found | User ID doesn't exist |
| **500** | Server Error | Database connection failed |

### Example Error Responses

**Missing Email:**
```json
{ "error": "Name and email required" }
```

**Invalid ID:**
```json
{ "error": "Invalid ID" }
```

**User Not Found (PUT/DELETE):**
```json
{ "error": "User not found" }
```

---

## Common Test Scenarios

### Scenario 1: Full CRUD Cycle

1. **GET** → See empty list or existing users
2. **POST** → Add "Test User" (test@example.com)
3. **GET** → Verify user appears in list
4. **PUT** → Update to "Test User Updated"
5. **GET** → Verify update
6. **DELETE** → Remove user
7. **GET** → Verify user is gone

### Scenario 2: Error Handling

1. **POST** without email → Should return 400 error
2. **PUT** with invalid ID (e.g., 999) → Should return 404 error
3. **DELETE** non-existent user → Should return 404 error

### Scenario 3: Verify Database Persistence

1. Add user via API
2. Go to phpMyAdmin
3. View `nextjs_mysql.users` table
4. Verify user data in table
5. Delete via API
6. Refresh phpMyAdmin
7. Verify user deleted from table

---

## Debugging

### Check API Status

Visit: **http://localhost:3000/api/users**

- ✅ See JSON = API working
- ❌ Error page = Check console
- ❌ "Can't reach server" = `npm run dev` not running

### View Request Details

**In Browser DevTools:**
1. Press **F12**
2. Go to **Network** tab
3. Perform API action
4. Click on request (e.g., "users")
5. See:
   - **Status** (200, 400, 500, etc.)
   - **Method** (GET, POST, PUT, DELETE)
   - **Request Headers**
   - **Request Body**
   - **Response Body**

### Check Server Console

Look at terminal running `npm run dev`:
- Log messages from API routes
- Error stack traces
- Database connection info

### View Database

**phpMyAdmin:**
1. Go to http://localhost/phpmyadmin
2. Click `nextjs_mysql` → `users`
3. Click **Browse**
4. See all user records
5. Verify data matches API responses

---

## Test Summary Checklist

- [ ] GET /api/users returns all users (200 OK)
- [ ] POST /api/users creates new user (200 OK)
- [ ] PUT /api/users/[id] updates user (200 OK)
- [ ] DELETE /api/users/[id] removes user (200 OK)
- [ ] POST without email returns error (400)
- [ ] PUT non-existent ID returns error (404)
- [ ] DELETE non-existent ID returns error (404)
- [ ] Database changes reflect in phpMyAdmin
- [ ] UI shows real-time updates
- [ ] Browser console has no errors

---

## Common Issues

### Issue: GET returns empty array but UI shows users

**Solution:** UI uses local state, not synced with database. Refresh page.

### Issue: POST succeeds but user doesn't appear

**Solution:**
1. Check phpMyAdmin for user in table
2. Click refresh button in UI (if available)
3. Reload page (F5)

### Issue: "Cannot read properties of undefined"

**Solution:**
1. Verify request body is valid JSON
2. Check all required fields present (name, email)
3. Look at network tab for actual response

### Issue: CORS errors

**Solution:**
- This app doesn't have CORS issues (same origin)
- If testing from different domain, enable CORS in API

---

## Recording a Video Demo

For presentation, record:

1. **GET Request:**
   - Show Thunder Client with GET request
   - Click Send
   - Show JSON response
   - Show users in phpMyAdmin

2. **POST Request:**
   - Show Thunder Client POST request
   - Enter name and email
   - Click Send
   - Show success message
   - Show phpMyAdmin updated

3. **PUT Request:**
   - Show update request with changed data
   - Click Send
   - Show success
   - Show phpMyAdmin with updated values

4. **DELETE Request:**
   - Show delete request
   - Click Send
   - Show success
   - Show phpMyAdmin with user removed

5. **UI Demo:**
   - Show http://localhost:3000
   - Add user via form
   - Edit user
   - Delete user
   - Show changes in phpMyAdmin

---

## Additional Notes

- All times are in UTC (see `created_at` and `updated_at` fields)
- IDs are auto-incremented, never reuse deleted IDs
- Email field can have duplicates (no unique constraint)
- All endpoints require MySQL to be running
- API responses are JSON format (Content-Type: application/json)

---

**Last Updated:** November 29, 2025
