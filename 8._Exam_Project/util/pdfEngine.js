import puppeteer from "puppeteer";
import fs from "fs";
import { injectSpanData } from "../util/templateEngine.js";

export async function GeneratePdfFromWebsite(url, fileName, header, footer, customText) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const templateFooter = fs.readFileSync(footer, 'utf-8');
    var templateHeader;
    
    if(header.includes("headerCustom.html")){
      templateHeader = fs.readFileSync(header, 'utf-8');
      templateHeader = injectSpanData(templateHeader, customText);
    } else {
      templateHeader = fs.readFileSync(header, 'utf-8');
    }
    
    await page.goto(url, { waitUntil: 'networkidle0'});
    await page.emulateMediaType('screen');
    var pdf;
    if(header === "none" && footer === "none"){
        pdf = await page.pdf({
          filename: `${fileName}.pdf`,
          margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
          printBackground: true,
          displayHeaderFooter: false,
          format: 'A4',
        });
    } else if(header === "none" && footer !== "none"){
        pdf = await page.pdf({
          filename: `${fileName}.pdf`,
          margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: templateHeader,
          footerTemplate: templateFooter,
          format: 'A4',
        });
    } else if(header !== "none" && footer === "none"){
        pdf = await page.pdf({
          filename: `${fileName}.pdf`,
          margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: templateHeader,
          footerTemplate: templateFooter,
          format: 'A4',
        });
    } else if(header !== "none" && footer !== "none"){
        pdf = await page.pdf({
          filename: `${fileName}.pdf`,
          margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: templateHeader,
          footerTemplate: templateFooter,
          format: 'A4',
        });
    }
    
    
    
    await browser.close();
    return pdf;
};
