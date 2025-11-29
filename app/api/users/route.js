// export async function GET() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await res.json();

//   return Response.json(users); @/app/lib/db
// }

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
