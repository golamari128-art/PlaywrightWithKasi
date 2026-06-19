const puppeteer= require("puppeteer");

async function run(){
    const browser = await puppeteer.launch({headers:false});
    const page= await browser.newPage();
    await page.goto("https://dev.vapusdata.com");

    //Exact images
    const images=await page.$$eval("img", (elements)=>
        elements.map((elements)=>({
         src:elements.src,
         alt:elements.alt,
        })

        ));

    //Extract Links
    const Links=await page.$$eval("a",(elements)=>

    elements.map((elements)=>({
        href:elements.href,
        text: elements.textContent,
    })));

    const imgCount=images.length;
    const LinkCount=Links.length;

    //output 
    const output=JSON.stringify({images,Links, imgCount,LinkCount});
    console.log(output);

    browser.close();
}
run();