import puppeteer from "puppeteer";
import fs from "fs";

export async function GeneratePdfFromWebsite(url, fileName) {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    //const templateFooter= fs.readFileSync('template-footer.html', 'utf-8');

    await page.goto(url, { waitUntil: 'networkidle0'});
    await page.emulateMediaType('screen');
    const fileString = fileName + ".pdf";

    const pdf = await page.pdf({
      filename: `${fileName}.pdf`,
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      displayHeaderFooter: false,
      //footerTemplate: templateFooter,
      format: 'A4',
    });
    
    
    await browser.close();
    return pdf;
};
