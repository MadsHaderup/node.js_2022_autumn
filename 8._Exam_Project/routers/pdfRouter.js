import { Router } from "express";
import fs from "fs";
const router = Router();
import { GeneratePdfFromWebsite } from "../util/pdfEngine.js";
import { sendMail } from "../util/mailEngine.js";

router.post("/pdf-form", async (req, res) => {
    req.session.websiteUrl = req.body.websiteUrl;
    req.session.fileName = req.body.nameOfFile;
    
    res.redirect("/download");
});

router.post("/download-form", async (req, res) => {
    const websiteUrl = req.session.websiteUrl; 
    const fileName = req.session.fileName;
    const pdf = await GeneratePdfFromWebsite(websiteUrl, fileName);
    await sendMail("mads@haderup.net", pdf, fileName);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`);
    res.setHeader('Content-Description', 'File Transfer');
    res.send(pdf);
});

router.post("/goback-form", async (req, res) => {
    res.redirect('/front');
})

export default router;