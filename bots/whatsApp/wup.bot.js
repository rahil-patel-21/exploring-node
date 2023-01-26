//#region Imports
const EventEmitter = require("events");
// @ts-ignore
const puppeteer = require("puppeteer");
const { ExposeStore, LoadUtils } = require("./store");
// @ts-ignore
const moduleRaid = require("@pedroslopez/moduleraid/moduleraid");
const handleEvents = require("./handler");
//#endregion Imports

class WupBot extends EventEmitter {
  async wakeUp(options) {
    try {
      // Params validation
      const browserWSEndpoint = options.remoteURL;
      // @ts-ignore
      if (!browserWSEndpoint)
        throw Error(`required parameter remoteURL is missing`);

      // Go to target route
      const browser = await puppeteer.connect({
        headless: false,
        browserWSEndpoint,
      });
      const page = (await browser.pages())[0];
      await page.goto("https://web.whatsapp.com/", {
        waitUntil: "networkidle2",
      });

      await this.initialize(page);
    } catch (error) {}
  }

  async initialize(page) {
    try {
      await this.loadStuff(page);

      await handleEvents(page);
    } catch (error) {}
  }

  async loadStuff(page) {
    try {
      await page.evaluate(ExposeStore, moduleRaid.toString());

      await page.waitForFunction("window.Store?.isInitialized");

      await page.evaluate(LoadUtils);
    } catch (error) {}
  }
}

module.exports = WupBot;
