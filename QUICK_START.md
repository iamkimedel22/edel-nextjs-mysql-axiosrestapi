# Quick Start Setup Guide

## Prerequisites

Before you begin, make sure you have:
- ✅ XAMPP installed ([Download](https://www.apachefriends.org/))
- ✅ Node.js v18+ installed ([Download](https://nodejs.org/))
- ✅ Code editor (VS Code recommended)

---

## Step 1: Start XAMPP Services

### Windows:
1. Search for **XAMPP Control Panel** in Start Menu
2. Open it
3. Click **Start** next to:
   - `Apache` (should turn green)
   - `MySQL` (should turn green)

Both should show "Running" status.

---

## Step 2: Create Database

### Option A: Using phpMyAdmin (Recommended)

1. Click **MySQL Admin** button in XAMPP Control Panel
2. This opens http://localhost/phpmyadmin
3. You should see phpMyAdmin dashboard
4. On the left sidebar, click **New** to create new database
5. Database name: **`nextjs_mysql`**
6. Click **Create**
7. Now click on the **nextjs_mysql** database (left sidebar)
8. Click the **SQL** tab
9. Paste the following SQL code:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

10. Click **Go** to execute

**Or use the provided file:**
- Open `DATABASE_SETUP.sql` in phpMyAdmin SQL tab and execute

### Option B: Using Command Line

1. Open Command Prompt or PowerShell
2. Navigate to XAMPP MySQL folder:
```powershell
cd "C:\xampp\mysql\bin"
```

3. Login to MySQL:
```powershell
mysql -u root
```

4. Run the database creation commands:
```sql
CREATE DATABASE nextjs_mysql;
USE nextjs_mysql;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
```

---

## Step 3: Verify Database Setup

1. Go to http://localhost/phpmyadmin
2. In left sidebar, expand **nextjs_mysql** database
3. You should see **users** table
4. Click on **users** table
5. Click **Structure** tab
6. Verify columns exist:
   - `id` (INT, Primary Key, Auto Increment)
   - `name` (VARCHAR 255)
   - `email` (VARCHAR 255)

✅ If you see these columns, database is ready!

---

## Step 4: Install Node Dependencies

1. Open PowerShell or Command Prompt
2. Navigate to project folder:
```powershell
cd C:\Users\Administrator\Downloads\edel\my-nextjs-app\ReactHooks
```

3. Install dependencies:
```powershell
npm install
```

Wait for installation to complete (may take 1-2 minutes).

---

## Step 5: Start Development Server

1. In the same terminal, run:
```powershell
npm run dev
```

2. You should see:
```
▲ Next.js 16.0.1
  - Local:        http://localhost:3000
```

3. Keep this terminal open and running

---

## Step 6: Open Application

1. Open your web browser
2. Visit: **http://localhost:3000**
3. You should see:
   - **"REST API CRUD Users"** heading
   - Two input fields (Name, Email)
   - **"Add"** button
   - Empty user list (if no data added yet)

---

## Step 7: Test CRUD Operations

### Test 1: Create (Add User)

1. In the Name field, enter: **`John Doe`**
2. In the Email field, enter: **`john@example.com`**
3. Click **Add** button
4. You should see the user appear in the list below

### Test 2: Read (View Users)

1. The list shows all users in the database
2. You should see "John Doe — john@example.com" in the list

### Test 3: Update (Edit User)

1. Click **Edit** button next to John Doe
2. The form should populate with current values
3. Button text should change to **"Update"**
4. Change name to: **`John Smith`**
5. Click **Update** button
6. User in list should update to "John Smith"

### Test 4: Delete (Remove User)

1. Click **Delete** button (red) next to John Smith
2. User should immediately disappear from list
3. Verify in phpMyAdmin that user is gone from database

---

## Step 8: Verify in Database

1. Open http://localhost/phpmyadmin
2. Click on **nextjs_mysql** database
3. Click on **users** table
4. Click **Browse** tab
5. You should see the user records you created:
   - `id` (auto-generated)
   - `name` (what you entered)
   - `email` (what you entered)

---

## Troubleshooting

### Problem: "Connection Refused" when starting app

**Solution:**
1. Verify MySQL is running in XAMPP (green status)
2. Check database name: must be exactly **`nextjs_mysql`**
3. Stop the dev server (Ctrl+C in terminal)
4. Start it again: `npm run dev`

### Problem: "Cannot GET /api/users"

**Solution:**
1. Make sure `npm run dev` is running
2. Wait 5-10 seconds for Next.js to compile
3. Refresh browser (Ctrl+R or F5)
4. Check terminal for errors

### Problem: Form doesn't work or buttons unresponsive

**Solution:**
1. Open DevTools: Press **F12** in browser
2. Go to **Console** tab
3. Look for red error messages
4. Take screenshot of error and troubleshoot

### Problem: Database table doesn't exist

**Solution:**
1. Go to phpMyAdmin: http://localhost/phpmyadmin
2. Click **nextjs_mysql** on left sidebar
3. Copy all SQL from `DATABASE_SETUP.sql`
4. Click **SQL** tab
5. Paste the SQL code
6. Click **Go** to execute

### Problem: Axios errors in console

**Solution:**
1. Verify API is working: visit http://localhost:3000/api/users in browser
2. Should see JSON array (empty or with users)
3. If error, check XAMPP MySQL is running
4. Check `app/lib/db.js` has correct database name

---

## Files Modified/Created

### Updated Files:
- ✅ `app/lib/db.js` - Updated database name to `nextjs_mysql`

### New Files:
- ✅ `PROJECT_DOCUMENTATION.md` - Comprehensive documentation
- ✅ `DATABASE_SETUP.sql` - SQL setup script
- ✅ `QUICK_START.md` - This file

### Existing Files (No changes needed):
- ✅ `app/api/users/route.js` - GET & POST routes
- ✅ `app/api/users/[id]/route.js` - PUT & DELETE routes
- ✅ `components/RestApiCrud.js` - Frontend component
- ✅ `app/page.js` - Mounts RestApiCrud component

---

## Important Notes

1. **Keep XAMPP Running**: Don't close XAMPP while developing. The MySQL database must be running.

2. **Database Name**: The database MUST be named `nextjs_mysql` (case-sensitive on some systems).

3. **Port Conflicts**: 
   - If port 3000 is in use, Next.js will use 3001
   - If port 3306 (MySQL) is in use, change it in XAMPP

4. **Data Persistence**: All data is stored in MySQL database, so it persists even after closing the app.

5. **Next.js Cache**: If you get weird errors, try:
   - Stop dev server (Ctrl+C)
   - Delete `.next` folder
   - Run `npm run dev` again

---

## Expected Output Screenshots

### When Everything Works:

**Browser Console:**
```
GET /api/users 200
```

**phpMyAdmin Users Table:**
```
| id | name      | email            |
|----|-----------+-----------------|
| 1  | John Doe  | john@example.com |
```

**Terminal Output:**
```
▲ Next.js 16.0.1
  - Local:        http://localhost:3000
```

---

## Next Steps

1. ✅ Database setup complete
2. ✅ API routes tested
3. ✅ CRUD operations working

### For Presentation:
- Record a video showing all CRUD operations
- Show phpMyAdmin database
- Show API responses
- Include error handling demo
- Show form validation

---

## Contact Information

If you encounter issues not listed in Troubleshooting:
1. Check browser Console (F12)
2. Check server terminal for errors
3. Verify all prerequisites are installed
4. Restart XAMPP and dev server
5. Check phpMyAdmin for database/table structure

---

**Date:** November 29, 2025  
**Project:** Next.js + MySQL CRUD (XAMPP)  
**Author:** kimberly mel edel
