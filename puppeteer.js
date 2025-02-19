const puppeteer = require("puppeteer");
const { delays } = require("./utils");

async function ScrapeWithPuppeteer(debugPort) {
  try {
    // use debugPort to work on moreLogin Browser
    const browserURL = `http://127.0.0.1:${debugPort}`;
    const browser = await puppeteer.connect({
      browserURL: browserURL,
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto("https://www.w3schools.com/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector("form.example input.ga-fp");
    let inputfield = await page.$("form.example input.ga-fp");
    await inputfield.type("Javascript", { delay: 150 });
    await page.keyboard.press("Enter");

    await delays(3000);
    await page.close()
    return true;
  } catch (error) {
    console.log("Something went wrong!");
    return null;
  }
}

module.exports = ScrapeWithPuppeteer;
