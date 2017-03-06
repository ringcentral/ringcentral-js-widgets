'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = loadLocale;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadLocale(locale) {
  return new _promise2.default(function (resolve) {
    switch (locale) {
      case 'en-US':
        {
          require.ensure(['./en-US'], function (require) {
            var data = require('./en-US');
            resolve(data.__esModule === true ? data.default : data);
          }, 'en-US');
          break;
        }
      default:
        resolve({});
        break;
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
