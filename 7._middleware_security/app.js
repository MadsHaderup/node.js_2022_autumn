import express from "express";
const app = express();

import helmet from "helmet";
app.use(helmet());

import session from "express-session";
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //kun true hvis der bruges https
  }))

function ipLogger(req, res, next) {
    console.log(req.ip);
    next();
}

//app.use(ipLogger);

import rateLimit from 'express-rate-limit'

const frontdoorLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	max: 80, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(frontdoorLimiter);

function guidingButler(req, res, next){
    console.log("This way, sir.");
    next();
}
function guardMiddleware(req, res, next){
    if(req.query.name !== "Anders"){
        console.log("Ingen andgang");
        res.send({ message: "You are not welcome"})
    } 
    
    next();
}

import popcornRouter from "./routers/popcornRouter.js"
app.use(popcornRouter);

app.get("/frontdoor", guardMiddleware, (req, res) => {
    res.send("enter the frontdoor");
});

app.get("/room", (req, res, next) => {
    console.log("1");
    next();
    //res.send({message: "You are in room 1"});
});

app.get("/room", (req, res) => {
    console.log("2");
    res.send({message: "You are in room 2"});
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running on port ", 8080);
});