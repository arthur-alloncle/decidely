import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "db",
    user: "root",
    password: "root",
    database: "app"
});