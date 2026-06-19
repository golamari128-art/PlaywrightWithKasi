const puppeteer = require("puppeteer");

(async () => {
    try{
        const browser=await puppeteer.launch({
            headless: false,
            defaultViewport:{ width: 980, height: 600},
            devtools: true,
            slowMo: 800,
            env:'dev' 
        },
    );
        const page = await browser.newPage();
        await page.goto('https://dev.vapusdata.com', {
            waitUntil: 'networkidle2'
        });
        await page.screenshot({path:'vapus.png'});
        await browser.close();
    }
    catch(err){
        console.log(err);
    }
    
})();