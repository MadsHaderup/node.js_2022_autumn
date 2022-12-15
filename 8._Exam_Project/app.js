const puppeteer = require("puppeteer");
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    const templateFooter= fs.readFileSync('template-footer.html', 'utf-8');

    const website_url = "https://google.com"

    await page.goto(website_url, { waitUntil: 'networkidle0'});
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
      path: "resultfile2.pdf",
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      displayHeaderFooter: true,
      footerTemplate: templateFooter,
      format: 'A4',
    });
    

    await browser.close();
})();

