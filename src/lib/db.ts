import "server-only";

import mysql from "mysql2/promise";

export async function query({
  sql,
  values = [],
}: {
  sql: string;
  values?: any[];
}) {
  try {
    const conn = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    const [result] = await conn.query(sql, values);
    const actualResult = result as any;
    conn.end();
    return actualResult;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// export async function getConnection() {
//   try {
//     return await pool.getConnection();
//   } catch (err) {
//     console.error("Error connecting to database:", err);
//     throw err;
//   }
// }
