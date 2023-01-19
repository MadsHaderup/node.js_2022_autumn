import express from "express";
import http from "http";
import { Server } from "socket.io";
import rateLimit from "express-rate-limit";
import dotenv from 'dotenv'
import session from "express-session";
import userRouter from "./routers/userRouter.js";
import pdfRouter from "./routers/pdfRouter.js";
import adminRouter from "./routers/adminRouter.js";

dotenv.config();
const app = express();
app.use(express.urlencoded());
app.use(express.static('public'));


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

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
app.use(userRouter);
app.use(pdfRouter);
app.use(adminRouter);

const PORT = 8080 || process.env.PORT;
server.listen(PORT, () => console.log("Server is running on port", PORT));