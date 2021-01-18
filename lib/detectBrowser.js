"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = void 0;

var isSafari = function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

exports.isSafari = isSafari;
//# sourceMappingURL=detectBrowser.js.map
