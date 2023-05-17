import bcrypt from "bcryptjs";
import { Router } from "express";
import db from "../database/mysql_connection.js";
import rateLimit from "express-rate-limit";

const router = Router();

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 6,
});

router.get("/user", async (req, res) => {
    if(req.session.adminLoggedIn){
        const [users, _] = await db.query("SELECT * FROM usertabel;");
        res.send({ data: users});
    } else {
        res.redirect("/admin");
    }
    
});


router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("hej");
});

router.post("/signup", async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    const saltRounds = 12;
    const passwordEncrypted = await bcrypt.hash(password, saltRounds);
    const [result, _] = await db.execute("INSERT INTO usertabel (email, password) VALUES (?, ?);", [email, passwordEncrypted]);
    return res.status(200).send({
        message: "success"
    });
});

router.post("/login", async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    const dbQuery = await db.query("SELECT password FROM usertabel WHERE email = ?;", [username]);
    const dbPassword = dbQuery[0][0].password;
    console.log(dbPassword);
    const check = await bcrypt.hash(password, 12);
    console.log(check);
    const passwordComparison = await bcrypt.compare(password, dbPassword);
    if (passwordComparison) {
        //req.session.loggedIn = true;
        //req.session.email = username;
        console.log(passwordComparison);
        return res.status(200).send({
            message: "success"
        });
    } else {
        return res.status(401).send({
            message: "no succes"
        });
    }
    
});


export default router;