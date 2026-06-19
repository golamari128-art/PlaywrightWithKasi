const puppeteer=require("puppeteer");

const fs=require("fs");
const { text } = require("stream/consumers");
const { image } = require("framer-motion/client");


async function run() {
       const browser = await puppeteer.launch({headers:false});
        const page= await browser.newPage();
        await page.goto("https://yahoo.com");
       
        const title=await page.title();
        const metsDesc=await page.$eval('meta[name="desciption"]',(element) => element.textContent);
        const metaKeywords=await page.$eval('meta[name="keywords"]',(element)=> element.textContent);

        //Extract Links
        const links=await page.$$eval("a",(elements)=>
            element.map((element) => ({
                src:element.href,
                text: element.textContent
            }))
        )
        //Extract img

        const img=await page.$$eval("img",(elements) =>
            elements.map((element)=>({
            src:element.src,
            alt:elemen.alt
            }))
        );
      
        const imgCount=img.length;
        const linkCount=links.length;
      
        //prepare output file format

    const outputData={
        title,
        metsDesc,
        metaKeywords,
        links,
        img,
        imgCount,
        linkCount
    };
    //cnvert JSON to String
    const outputJSON=JSON.stringify(outputData);

    //write to file
    fs.writeFileSync("output.json", outputJSON);

    await browser.close();
}