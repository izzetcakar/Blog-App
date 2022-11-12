import mysql from "mysql";

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your password',
  database: 'your database name',
});