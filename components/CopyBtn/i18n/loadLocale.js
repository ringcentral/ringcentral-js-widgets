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

      case 'ko':
      case 'ko-KR':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./ko-KR'], function (require) {
              var data = require('./ko-KR');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'ko-KR');
          } else {
            var _data = require('./ko-KR');

            resolve(_data.__esModule === true ? _data["default"] : _data);
          }

          break;
        }

      case 'nl':
      case 'nl-NL':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./nl-NL'], function (require) {
              var data = require('./nl-NL');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'nl-NL');
          } else {
            var _data2 = require('./nl-NL');

            resolve(_data2.__esModule === true ? _data2["default"] : _data2);
          }

          break;
        }

      case 'pt':
      case 'pt-PT':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./pt-PT'], function (require) {
              var data = require('./pt-PT');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'pt-PT');
          } else {
            var _data3 = require('./pt-PT');

            resolve(_data3.__esModule === true ? _data3["default"] : _data3);
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
