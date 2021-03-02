"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElectron = void 0;

require("core-js/modules/es6.array.index-of");

var isElectron = function isElectron() {
  return navigator.userAgent.toLowerCase().indexOf(' electron/') > -1;
};

exports.isElectron = isElectron;
//# sourceMappingURL=isElectron.js.map
