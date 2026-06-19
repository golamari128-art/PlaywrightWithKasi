const puppeteer = require("puppeteer");

(async () => {
    try{
        const browser=await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://dev.vapusdata.com', {
            waitUntil: 'networkidle2'
        });
        await page.screenshot({path:'vapus.png'});
     //   await browser.close();
    }
    catch(err){
        console.log(err);
    }
})();