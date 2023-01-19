import bcrypt from "bcryptjs";
import { Router } from "express";
import db from "../database/mysql_connection.js";
import { renderPage } from "../util/templateEngine.js";
import rateLimit from "express-rate-limit";

const router = Router();

const loginPage = renderPage("/adminLoginPage/adminLoginPage.html");
const homePage = renderPage("/adminHomePage/adminHomePage.html");

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 6,
});

router.get("/admin", loginLimiter, (req, res) => {
    res.send(loginPage);
});

router.get("/adminHomePage", (req, res) => {
    if(req.session.adminLoggedIn){
        res.send(homePage);
    } else {
        res.redirect("/admin");
    }
    
})

router.post("/admin-login-form", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const dbQuery = await db.query("SELECT password FROM admin WHERE email = ?;", [username]);
    const dbPassword = dbQuery[0][0].password;

    const passwordComparison = await bcrypt.compare(password, dbPassword);
    if (passwordComparison) {
        req.session.adminLoggedIn = true;
        res.redirect("/adminHomePage");
    } else {
        res.redirect("/admin");
    }
    
});

export default router;