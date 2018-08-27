// import { mount } from 'enzyme';

// export default {
//   program: mount,
// };

// class API {
//   constructor(context) {
//     this._context = context;
//   }

//   async $(selector) {
//     const element = this._context.find(selector).fisrt();
//     return element;
//   }

//   async $$(selector) {
//     const elements = this._context.find(selector);
//     return elements;
//   }

//   async click(selector) {
//     const handle = this._context.find(selector).simulate('click');
//     return handle;
//   }

//   async type(selector, value) {
//     this._context.find(selector).instance().value = value;
//     const handle = this._context.find(selector).simulate('change');
//     return handle;
//   }

//   setContext(context) {
//     this._context = context;
//     return this;
//   }
// }

// const api = new API();

// export const $ = context => api.setContext(context);
