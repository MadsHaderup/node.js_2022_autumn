import bcrypt from "bcryptjs";
import { Router } from "express";
const router = Router();
import db from "../database/mysql_connection.js";



router.post("/signup-form", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const saltRounds = 12;
    const passwordEncrypted = await bcrypt.hash(password, saltRounds);
    const [result, _] = await db.execute("INSERT INTO usertabel (username, password) VALUES (?, ?);", [username, passwordEncrypted]);
    res.send({ affectedRows: result.affectedRows});
});

router.post("/login-form", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const dbQuery = await db.query("SELECT password FROM usertabel WHERE username = ?;", [username]);
    const dbPassword = dbQuery[0][0].password;

    const passwordComparison = await bcrypt.compare(password, dbPassword);
    if (passwordComparison) {
        //req.session.profile
        res.redirect("/front");
    } else {
        res.render('login ')
    }
    console.log(passwordComparison);
});
//const [rows, fields] = await db.query("SELECT * FROM usertabel;");

export default router;