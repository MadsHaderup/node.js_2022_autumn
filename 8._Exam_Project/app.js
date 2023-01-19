import express from "express";
import http from "http";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";
import dotenv from 'dotenv'

dotenv.config();
const app = express();
app.use(express.urlencoded());
app.use(express.static('public'));


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

import session from "express-session";
const sessionMiddleware = session({
    name: "pdfify",
    secret: 'hej1234abc',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 600000
    } 
});
app.use(sessionMiddleware);

io.on("connection", function(socket){
    socket.on("header", (data) => {
        socket.emit("show hidden text box", data);
    });
 });



const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});


app.use(rateLimiter);
import userRouter from "./routers/userRouter.js";
app.use(userRouter);
import pdfRouter from "./routers/pdfRouter.js";
app.use(pdfRouter);
import adminRouter from "./routers/adminRouter.js";
app.use(adminRouter);

const PORT = 8080 || process.env.PORT;
server.listen(PORT, () => console.log("Server is running on port", PORT));