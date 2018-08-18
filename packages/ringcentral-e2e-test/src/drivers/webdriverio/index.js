// import webdriverio from 'webdriverio';

// export default {
//   program: webdriverio,
// };

// class API {
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
