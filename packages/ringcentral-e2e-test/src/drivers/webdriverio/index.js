// import webdriverio from 'webdriverio';

// export default {
//   Driver: webdriverio,
// };

// class API {
//   constructor(options = {}, program = webdriverio) {
//     this._options = options;
//     this._program = program;
//   }

//   get program() {
//     return this._program;
//   }

//   async launch() {
//     this.browser = await this._program.launch({
//       ...this._options.global.driverSetting,
//       ...this._options.driver.setting,
//     });
//     this.page = await this.browser.newPage();
//     await this.page.goto(this._options.driver.config.location);
//     return this;
//   }

//   async close() {
//     await this.browser.close();
//   }
//   constructor(context) {
//     this._context = context;
//   }

//   async $(selector) {
//     const element = await this._context.$(selector);
//     return element;
//   }

//   async $$(selector) {
//     const elements = await this._context.$$(selector);
//     return elements;
//   }

//   async click(selector) {
//     const handle = await this._context.click(selector);
//     return handle;
//   }

//   async type(selector, value) {
//     const handle = await this._context.setValue(selector, value);
//     return handle;
//   }

//   setContext(context) {
//     this._context = context;
//     return this;
//   }
// }

// const api = new API();

// export const $ = context => api.setContext(context);
