import { Router } from "express";
const mailRouter = Router();
import { sendMail } from "../util/mailEngine.js";

mailRouter.post("/api/contact", async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;
    console.log(email + " " + name + " " + message);
    
    await sendMail(email, name, message);
    res.send(req.body);
});

export default mailRouter;