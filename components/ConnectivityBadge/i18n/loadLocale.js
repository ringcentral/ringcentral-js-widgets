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
      case 'en':
      case 'en-US':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./en-US'], function (require) {
              var data = require('./en-US');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'en-US');
          } else {
            var data = require('./en-US');

            resolve(data.__esModule === true ? data["default"] : data);
          }

          break;
        }

      default:
        resolve({});
        break;
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
