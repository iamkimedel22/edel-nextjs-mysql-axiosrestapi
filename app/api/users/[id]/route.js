import { getDB } from "@/app/lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  console.log("This is params", id);
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

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
      });
    }

    const { name, email } = body || {};
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

export async function DELETE(req, { params }) {
  const { id } = await params;
  console.log("This is params", id);
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
