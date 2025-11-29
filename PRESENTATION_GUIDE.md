# Presentation Checklist & Demo Script

Complete guide for demonstrating the Next.js + MySQL CRUD application to your instructor.

---

## Pre-Presentation Checklist (Do This Before Class)

### 1 Hour Before Presentation

- [ ] Start XAMPP (Apache + MySQL running)
- [ ] Start Next.js dev server: `npm run dev`
- [ ] Open http://localhost:3000 and verify it loads
- [ ] Open http://localhost/phpmyadmin and verify database exists
- [ ] Test adding one user via the UI
- [ ] Test editing that user
- [ ] Test deleting that user
- [ ] Verify in phpMyAdmin changes appear
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Close unnecessary applications (free up RAM)
- [ ] Test internet connection if presenting online

### 5 Minutes Before Presentation

- [ ] All applications still running
- [ ] Next.js dev server in terminal (ready)
- [ ] Browser showing http://localhost:3000
- [ ] phpMyAdmin tab ready (http://localhost/phpmyadmin)
- [ ] Have this checklist open
- [ ] Have all source code files ready to show
- [ ] Disable notifications (Windows notifications off)
- [ ] Set screen resolution comfortable for audience

---

## Presentation Outline (10-15 minutes)

### Introduction (1-2 minutes)

**Script:**
> "Hello, I'm presenting the Next.js + MySQL CRUD Application. This project demonstrates full-stack web development with:
> - Frontend: Next.js with React
> - Backend: Next.js API Routes (REST API)
> - Database: MySQL (running on XAMPP)
> - HTTP Client: Axios for API requests
>
> The application allows users to Create, Read, Update, and Delete user records in a MySQL database through a web interface."

**Action:**
- Point to screen
- Show application at http://localhost:3000

---

## Part 1: Database & Architecture (2 minutes)

### Show Database Structure

**Script:**
> "First, let me show you the database structure. I'm using MySQL with XAMPP. The database name is 'nextjs_mysql' and it contains one table called 'users'."

**Actions:**
1. Open phpMyAdmin: http://localhost/phpmyadmin
2. In left sidebar, click **nextjs_mysql** database
3. Click **users** table
4. Click **Structure** tab
5. **Point out:**
   - `id` column (INT, Primary Key, Auto Increment)
   - `name` column (VARCHAR 255)
   - `email` column (VARCHAR 255)
   - `created_at` and `updated_at` timestamps

**Screenshot to take:**
- Screenshot of table structure in phpMyAdmin

### Show Architecture Diagram

**Script:**
> "The architecture has three layers:
> 1. Frontend Layer: Next.js React component with form and user list
> 2. Backend Layer: Next.js API routes that handle HTTP requests
> 3. Data Layer: MySQL database that stores user information"

**Actions:**
1. Open project in VS Code
2. Show folder structure:
   ```
   components/
     └── RestApiCrud.js    (Frontend)
   app/
     └── api/users/        (Backend API)
     └── lib/db.js         (Database connection)
   ```

---

## Part 2: Show Source Code (2-3 minutes)

### Backend: API Routes

**Script:**
> "Here's the backend API. I have two route files:
> 1. /api/users/route.js - handles GET (read) and POST (create)
> 2. /api/users/[id]/route.js - handles PUT (update) and DELETE"

**Actions:**
1. Open `app/api/users/route.js`
2. **Highlight:**
   ```javascript
   export async function GET() {
     // SELECT * FROM users
   }
   
   export async function POST(req) {
     // INSERT INTO users
   }
   ```
3. Open `app/api/users/[id]/route.js`
4. **Highlight:**
   ```javascript
   export async function PUT(req, { params }) {
     // UPDATE users
   }
   
   export async function DELETE(req, { params }) {
     // DELETE from users
   }
   ```

**Key Points to Mention:**
- Error handling (try/catch blocks)
- Validation (checking for missing fields)
- SQL injection protection (using parameterized queries with ?)

### Database Connection

**Script:**
> "Here's how the backend connects to MySQL."

**Actions:**
1. Open `app/lib/db.js`
2. **Show:**
   ```javascript
   export async function getDB() {
     db = await mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
       database: "nextjs_mysql",
     });
   }
   ```
3. Explain: "Uses mysql2 library, XAMPP defaults (no password), connects to our database"

### Frontend: React Component

**Script:**
> "The frontend is a React component using useState and useEffect hooks, plus Axios for HTTP requests."

**Actions:**
1. Open `components/RestApiCrud.js`
2. **Show state management:**
   ```javascript
   const [users, setUsers] = useState([]);
   const [form, setForm] = useState({ name: "", email: "" });
   const [editingId, setEditingId] = useState(null);
   ```
3. **Show API calls:**
   ```javascript
   axios.get("/api/users")      // Read
   axios.post("/api/users", form) // Create
   axios.put(`/api/users/${id}`, form) // Update
   axios.delete(`/api/users/${id}`)    // Delete
   ```

---

## Part 3: Live Demo - CRUD Operations (5-7 minutes)

### Demo Setup

**Before starting:**
- Make sure http://localhost:3000 is open and fresh
- Empty any existing users (optional)
- Have phpMyAdmin ready in another tab
- Have terminal with `npm run dev` visible

### Demo 1: CREATE - Add a User

**Script:**
> "Let me demonstrate adding a new user. I'll type a name and email, then click Add."

**Actions:**
1. Click **Name** input field
2. Type: `Alice Johnson`
3. Click **Email** input field
4. Type: `alice@example.com`
5. Click **Add** button
6. **Observe:**
   - Form clears
   - User appears in list below
   - Server console shows request log

**What Instructor Sees:**
```
Alice Johnson — alice@example.com  [Edit] [Delete]
```

**Verify in Database:**
1. Switch to phpMyAdmin tab
2. Refresh browser (F5)
3. Click **Browse** on users table
4. Show that Alice Johnson is in the table

### Demo 2: READ - Display All Users

**Script:**
> "The list automatically shows all users from the database. When the page loads, the component fetches all users via the GET API."

**Actions:**
1. Reload page (F5)
2. **Show:** Users immediately appear without manual refresh
3. Open browser DevTools (F12)
4. Go to **Network** tab
5. Reload page again
6. **Show:** Request to `/api/users` with status 200
7. Click on request, show JSON response:
   ```json
   [
     {
       "id": 1,
       "name": "Alice Johnson",
       "email": "alice@example.com"
     }
   ]
   ```

### Demo 3: UPDATE - Edit a User

**Script:**
> "Now I'll edit Alice's information. I click the Edit button, which populates the form with current data. Then I change the email and click Update."

**Actions:**
1. Click **Edit** button next to Alice Johnson
2. **Observe:** Form populates with:
   - Name: `Alice Johnson`
   - Email: `alice@example.com`
   - Button text changes to **Update**
3. Clear email field (select all + delete)
4. Type: `alice.johnson@gmail.com`
5. Click **Update** button
6. **Observe:**
   - Form clears
   - Button changes back to **Add**
   - User in list shows: `Alice Johnson — alice.johnson@gmail.com`
   - List automatically updates

**Verify in Database:**
1. Switch to phpMyAdmin
2. Refresh (F5)
3. Show users table
4. **Point out:** Email has been updated

### Demo 4: DELETE - Remove a User

**Script:**
> "Finally, I'll delete the user by clicking the red Delete button."

**Actions:**
1. Click **Delete** button (red) next to Alice Johnson
2. **Observe:**
   - User immediately disappears from list
   - List becomes empty (if only one user)

**Verify Deletion:**
1. Switch to phpMyAdmin
2. Refresh (F5)
3. **Show:** Users table is now empty

### Demo 5: Add Multiple Users (Show Full List)

**Script:**
> "Let me add a few more users to demonstrate the list functionality."

**Actions:**
1. Add User 1:
   - Name: `Bob Smith`
   - Email: `bob@example.com`
   - Click Add
2. Add User 2:
   - Name: `Charlie Brown`
   - Email: `charlie@example.com`
   - Click Add
3. Add User 3:
   - Name: `Diana Prince`
   - Email: `diana@example.com`
   - Click Add

**Result:** List shows:
```
Bob Smith — bob@example.com [Edit] [Delete]
Charlie Brown — charlie@example.com [Edit] [Delete]
Diana Prince — diana@example.com [Edit] [Delete]
```

**Show in phpMyAdmin:**
1. Switch to phpMyAdmin
2. Refresh
3. **Point out:** All 3 users in table with auto-generated IDs

---

## Part 4: Technical Details (1-2 minutes)

### Show API Requests in Browser

**Script:**
> "Let me show the actual HTTP requests being made behind the scenes."

**Actions:**
1. Open Browser DevTools (F12)
2. Go to **Network** tab
3. Click **XHR** filter
4. Add a new user (name: `Eve Wilson`, email: `eve@example.com`)
5. **Show the POST request:**
   - Click on request
   - **Request** tab shows: `{ name: "Eve Wilson", email: "eve@example.com" }`
   - **Response** tab shows: `{ message: "User created" }`
6. Refresh page
7. **Show the GET request:**
   - Click on users request
   - **Response** tab shows JSON array of all users

### Explain Data Flow

**Script:**
> "Here's how the data flows:
> 1. User fills form → State updates
> 2. User clicks Add → axios.post() sends HTTP request
> 3. Next.js API receives request
> 4. API connects to MySQL
> 5. SQL INSERT executes
> 6. Database stores user
> 7. API responds with success
> 8. Frontend calls loadUsers()
> 9. axios.get() fetches all users
> 10. API returns JSON
> 11. React state updates
> 12. Component re-renders, showing new user"

---

## Part 5: Error Handling (30 seconds - Optional)

### Show Validation

**Script:**
> "The application also has validation. If I try to submit without entering both fields, it shows an alert."

**Actions:**
1. Leave Name field empty
2. Enter email: `test@example.com`
3. Click **Add**
4. **Show:** Alert appears: "Please fill all fields"

---

## Closing Statement (30 seconds)

**Script:**
> "In summary, this application demonstrates:
> ✅ Full-stack web development (Frontend + Backend + Database)
> ✅ REST API design with proper HTTP methods
> ✅ MySQL database with CRUD operations
> ✅ React hooks (useState, useEffect)
> ✅ Async/await and error handling
> ✅ Data persistence and real-time UI updates
>
> All the code is modular, well-documented, and follows web development best practices. Thank you!"

---

## Backup Demonstrations

If something doesn't work live:

### Option 1: Show Pre-recorded Video
- Record video of CRUD operations beforehand
- Have it ready as backup

### Option 2: Show Source Code
- Open all relevant files in VS Code
- Show code + explain logic
- Mention "Unfortunately the demo isn't connecting now, but as you can see in the code..."

### Option 3: Show Database Directly
- Use phpMyAdmin to demonstrate data persistence
- Explain API would work the same way

---

## Things That Might Go Wrong (And How to Fix)

### Issue: "Cannot GET /api/users" error

**Quick Fix:**
1. Press Ctrl+C in terminal running `npm run dev`
2. Type: `npm run dev`
3. Wait 10 seconds
4. Refresh browser (F5)

**What to Say:** "Let me restart the development server..."

### Issue: MySQL not running

**Quick Fix:**
1. Open XAMPP Control Panel
2. Click Start for MySQL
3. Wait 10 seconds
4. Say: "I needed to start the database service..."

### Issue: Page shows blank/error

**Quick Fix:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Read error message
4. Say: "I see the issue - [explain error]"
5. Fix it quickly or move to backup plan

### Issue: Form doesn't respond

**Quick Fix:**
1. Reload page (F5)
2. Try again
3. Say: "Let me refresh the page to clear any cache..."

### Issue: Database doesn't show update

**Quick Fix:**
1. In phpMyAdmin, click Refresh button
2. Or click "Check privileges" on left
3. Say: "The database needed a refresh..."

---

## Timing Breakdown

| Section | Time | Notes |
|---------|------|-------|
| Introduction | 1-2 min | Overview of project |
| Database Setup | 2 min | Show phpMyAdmin structure |
| Source Code | 2-3 min | Show key files |
| Live Demo | 5-7 min | **Most important part** |
| Technical Details | 1-2 min | Network requests |
| Error Handling | 30 sec | Optional |
| Closing | 30 sec | Summary |
| **TOTAL** | **12-17 min** | Leaves time for questions |

---

## Questions You Might Get Asked

### Q: "Why use Next.js instead of separate frontend/backend?"

**A:** "Next.js allows you to build full-stack applications in one project. The API routes run on the server, so you have a unified codebase for both frontend and backend."

### Q: "What's the purpose of Axios?"

**A:** "Axios is an HTTP client that makes it easy to send requests from the browser to the backend API. It simplifies handling requests/responses compared to the fetch API."

### Q: "Why use React hooks?"

**A:** "React hooks like useState and useEffect make it easy to manage component state and side effects. They're simpler than class components and are the modern standard."

### Q: "How does the database connection work?"

**A:** "The backend connects to MySQL using the mysql2 library. When a request comes in, it queries the database and returns JSON. The connection is reused (singleton pattern) for efficiency."

### Q: "Is the data secure?"

**A:** "I used parameterized queries (the ? placeholders) to prevent SQL injection. In production, I'd also add authentication, input validation, and HTTPS."

### Q: "Can this scale to thousands of users?"

**A:** "For thousands of users, you'd want to add database indexing, caching (Redis), pagination, and possibly a more robust database like PostgreSQL. But for this project, MySQL works fine."

### Q: "What happens if the database goes down?"

**A:** "The API has error handling (try/catch) that returns a 500 status code with an error message. In production, I'd add database connection pooling and retry logic."

---

## Presentation Tips

### Do:
- ✅ Speak clearly and confidently
- ✅ Point to screen elements as you discuss them
- ✅ Make eye contact with audience/camera
- ✅ Go slow (let audience absorb information)
- ✅ Ask "Does anyone have questions?" at the end
- ✅ Have code comments available to read
- ✅ Show what user sees (the UI)
- ✅ Mention what happens behind scenes (the code)

### Don't:
- ❌ Rush through the demo
- ❌ Read code directly from screen verbatim
- ❌ Make typos in the demo (test beforehand)
- ❌ Leave long silences (have backup explanations)
- ❌ Minimize the window (keep everything visible)
- ❌ Forget to show database changes
- ❌ Mix technical jargon without explanation
- ❌ Assume audience knows web development

---

## Presentation Delivery Checklist

### Opening:
- [ ] Greet instructor/class
- [ ] State project name
- [ ] Mention technology stack
- [ ] Outline what you'll demonstrate

### Content:
- [ ] Show database structure clearly
- [ ] Explain architecture
- [ ] Show source code (briefly)
- [ ] Perform all 4 CRUD operations
- [ ] Verify changes in database
- [ ] Show error messages properly

### Closing:
- [ ] Summarize what was demonstrated
- [ ] Thank audience
- [ ] Ask for questions
- [ ] Be ready for follow-up questions

---

## Recording a Video Demo (Alternative)

If presenting to camera instead of live:

1. **Setup Recording:**
   - Use OBS Studio (free) or Windows built-in recorder
   - Record at 1080p 30fps
   - Speak clearly, no background noise

2. **Content:**
   - Start with static slide: project title, technologies
   - Show database structure (5 seconds)
   - Show code (10 seconds each file)
   - Live demo CRUD operations (3 minutes)
   - Show phpMyAdmin updates (1 minute)
   - Closing remarks (30 seconds)

3. **Duration:** 5-8 minutes total

4. **Delivery:**
   - Upload to YouTube (unlisted)
   - Or provide MP4 file
   - Include timestamps in description

---

## Final Reminders

✅ **Start with 5 minutes to spare** - don't be rushed  
✅ **Test everything beforehand** - no surprises  
✅ **Have backup plans** - prerecorded video or code walkthrough  
✅ **Speak confidently** - you built this, you know it!  
✅ **Show enthusiasm** - you're proud of this project  
✅ **Answer honestly** - if you don't know, say "great question, I'll research that"  

---

**Good Luck! 🎉**

You've built a real, working full-stack application. That's impressive!

---

**Date:** November 29, 2025  
**Project:** Next.js + MySQL CRUD Application
