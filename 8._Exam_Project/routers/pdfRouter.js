import { Router } from "express";
import { GeneratePdfFromWebsite } from "../util/pdfEngine.js";
import { sendMail } from "../util/mailEngine.js";
import { renderPage } from "../util/templateEngine.js";

const router = Router();
const frontPage = renderPage("/frontPage/frontPage.html");
const downloadPage = renderPage("/downloadPage/downloadPage.html");

router.get("/front", (req, res) => {
    if(req.session.loggedIn){
        res.send(frontPage);
    } else {
        res.redirect("/login");
    }
    
});

router.get("/download", (req, res) => {
    if(req.session.loggedIn){
        res.send(downloadPage);
    } else {
        res.redirect("/login");
    }
    
});

router.post("/pdf-form", async (req, res) => {
    if(req.session.loggedIn){
        req.session.websiteUrl = req.body.websiteUrl;
        req.session.fileName = req.body.nameOfFile;
        req.session.header = req.body.header;
        req.session.footer = req.body.footer;
        req.session.customtext = req.body.customtext;
        res.redirect("/download");
    } else {
        res.redirect("/login")
    }
    
});

router.post("/download-form", async (req, res) => {
    const websiteUrl = req.session.websiteUrl; 
    const fileName = req.session.fileName;
    const header = req.session.header;
    const footer = req.session.footer;
    const customtext = req.session.customtext;
    const footerTemplate = footerFunction(footer);
    const headerTemplate = headerFunction(header);
    
    const pdf = await GeneratePdfFromWebsite(websiteUrl, fileName, headerTemplate, footerTemplate, customtext);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`);
    res.setHeader('Content-Description', 'File Transfer');
    res.send(pdf);
});

router.post("/email-form", async (req, res) => {
    const websiteUrl = req.session.websiteUrl; 
    const fileName = req.session.fileName;
    const header = req.session.header;
    const footer = req.session.footer;
    const email = req.session.email;
    
    const customtext = req.session.customtext;
    const footerTemplate = footerFunction(footer);
    const headerTemplate = headerFunction(header);
    const pdf = await GeneratePdfFromWebsite(websiteUrl, fileName, headerTemplate, footerTemplate, customtext);
    await sendMail(email, pdf, fileName);
})

router.post("/goback-form", async (req, res) => {
    res.redirect('/front');
})

function headerFunction(header){
    var headerTemplate;
    
    switch(header) {
        case 'pageNum':
            headerTemplate = "headerPageNumbers.html";
            break;
        case 'date':
            headerTemplate = "headerDate.html";
            break;
        case 'none':
            headerTemplate = "headerNone.html";
            break;
        case 'customText':
            headerTemplate = "headerCustom.html";
        default:
            break;
    }
    headerTemplate = "./util/templates/" + headerTemplate;
    return headerTemplate;
}

function footerFunction(footer){
    var footerTemplate;
    switch(footer) {
        case 'pageNum':
            footerTemplate = "footerPageNumbers.html";
            break;
        case 'date':
            footerTemplate = "footerDate.html";
            break;
        case 'pic':
            footerTemplate = "footerPic.html";
            break;
        case 'none':
            footerTemplate = "footerNone.html";
            break;
        default:
            break;
    }
    footerTemplate = "./util/templates/" + footerTemplate;
    return footerTemplate;
}

export default router;