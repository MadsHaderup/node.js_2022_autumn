import bcrypt from "bcryptjs";
import { Router } from "express";
import db from "../database/mysql_connection.js";
import { renderPage } from "../util/templateEngine.js";
import rateLimit from "express-rate-limit";

const router = Router();

const loginPage = renderPage("/loginPage/loginPage.html");
const signupPage = renderPage("/loginPage/signupPage.html");

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 6,
});

router.get("/user", async (req, res) => {
    const [users, _] = await db.query("SELECT * FROM usertabel;");
    res.send({ data: users});
});

router.get("/login", loginLimiter, (req, res) => {
    res.send(loginPage);
});

router.get("/signup", (req, res) => {
    res.send(signupPage);
});
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

router.post("/signup-form", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const saltRounds = 12;
    const passwordEncrypted = await bcrypt.hash(password, saltRounds);
    const [result, _] = await db.execute("INSERT INTO usertabel (email, password) VALUES (?, ?);", [email, passwordEncrypted]);
    res.redirect("/login");
});

router.post("/login-form", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const dbQuery = await db.query("SELECT password FROM usertabel WHERE email = ?;", [username]);
    const dbPassword = dbQuery[0][0].password;
    const passwordComparison = await bcrypt.compare(password, dbPassword);
    if (passwordComparison) {
        req.session.loggedIn = true;
        req.session.email = username;
        
        res.redirect("/front");
    } else {
        res.redirect("/login");
    }
    
});


export default router;