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
            return require.ensure(['./en-US'], function (require) {
              var data = require('./en-US');

              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'en-US');
          } else {
            var data = require('./en-US');

            return resolve(data.__esModule === true ? data["default"] : data);
          }
        }

      default:
        return resolve(null);
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
