import puppeteer from 'puppeteer';

const puppeteerSetting = {
  ignoreHTTPSErrors: true,
  args: [
    '--use-fake-ui-for-media-stream',
    // '--load-extension=/path/to/extension/'
  ]
};

export default {
  program: puppeteer,
  setting: puppeteerSetting,
};

class API {
  constructor(context) {
    this._context = context;
  }

  async $(selector) {
    const element = await this._context.$(selector);
    return element;
  }

  async $$(selector) {
    const elements = await this._context.$$(selector);
    return elements;
  }

  async click(selector) {
    const handle = await this._context.click(selector);
    return handle;
  }

  async type(selector, value) {
    const handle = await this._context.type(selector, value);
    return handle;
  }

  setContext(context) {
    this._context = context;
    return this;
  }
}

const api = new API();

export const $ = context => api.setContext(context);
