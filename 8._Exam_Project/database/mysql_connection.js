import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users",
});

export default connection;