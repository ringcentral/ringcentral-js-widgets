import enzyme from './enzyme';
import puppeteer from './puppeteer';
import webdriverio from './webdriverio';

export class Driver {
  constructor(options = {}, program) {
    this._options = options;
    this._program = program;
  }

  get program() {
    return this._program;
  }

  async launch() {
    this.browser = await this._program.launch({
      ...this._options.global.driverSetting,
      ...this._options.driver.setting,
    });
    this.page = await this.browser.newPage();
    await this.page.goto(this._options.driver.config.location);
    return this;
  }

  async close() {
    await this.browser.close();
  }
}

export default {
  enzyme,
  puppeteer,
  webdriverio,
};
