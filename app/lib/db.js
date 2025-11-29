import mysql from "mysql2/promise";

let db;

export async function getDB() {
  if (!db) {
    const host = process.env.MYSQL_HOST || "localhost";
    const user = process.env.MYSQL_USER || "root";
    const password = process.env.MYSQL_PASSWORD || "";
    const database = process.env.MYSQL_DATABASE || "nextjs_mysql";
    const port = process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306;

    db = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
    });
  }
  return db;
}
