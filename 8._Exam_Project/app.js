import express from "express";
const app = express();
app.use(express.urlencoded());

import session from "express-session";
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //kun true hvis der bruges https
  }))

import userRouter from "./routers/userRouter.js";
app.use(userRouter);
import pdfRouter from "./routers/pdfRouter.js";
app.use(pdfRouter);
import { renderPage, injectDivData } from "./util/templateEngine.js";
const loginPage = renderPage("/loginPage/loginPage.html");
const signupPage = renderPage("/loginPage/signupPage.html");
const frontPage = renderPage("/frontPage/frontPage.html");
const downloadPage = renderPage("/downloadPage/downloadPage.html");

app.get("/login", (req, res) => {
    res.send(loginPage);
});

app.get("/front", (req, res) => {
    res.send(frontPage);
})

app.get("/signup", (req, res) => {
    res.send(signupPage);
});

app.get("/download", (req, res) => {
    res.send(downloadPage);
})
const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log("Server is running on port", PORT));