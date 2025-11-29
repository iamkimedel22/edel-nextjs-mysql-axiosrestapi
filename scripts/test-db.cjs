const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'nextjs_mysql',
      port: Number(process.env.MYSQL_PORT || 3306),
    });

    const [rows] = await conn.query('SELECT 1 AS ok');
    console.log('DB connection successful:', rows);
    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err.message || err);
    process.exit(1);
  }
})();
