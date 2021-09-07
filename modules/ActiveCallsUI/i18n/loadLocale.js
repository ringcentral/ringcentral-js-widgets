"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadLocale;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function loadLocale(locale) {
  return new Promise(function (resolve) {
    switch (locale) {
      default:
        return resolve({});
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
