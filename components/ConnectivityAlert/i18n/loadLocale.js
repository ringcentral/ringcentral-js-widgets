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
      case 'de-DE':
        {
          require.ensure(['./de-DE'], function (require) {
            var data = require('./de-DE');
            resolve(data.__esModule === true ? data.default : data);
          }, 'de-DE');
          break;
        }
      case 'en-CA':
        {
          require.ensure(['./en-CA'], function (require) {
            var data = require('./en-CA');
            resolve(data.__esModule === true ? data.default : data);
          }, 'en-CA');
          break;
        }
      case 'en-GB':
        {
          require.ensure(['./en-GB'], function (require) {
            var data = require('./en-GB');
            resolve(data.__esModule === true ? data.default : data);
          }, 'en-GB');
          break;
        }
      case 'en-US':
        {
          require.ensure(['./en-US'], function (require) {
            var data = require('./en-US');
            resolve(data.__esModule === true ? data.default : data);
          }, 'en-US');
          break;
        }
      case 'fr-CA':
        {
          require.ensure(['./fr-CA'], function (require) {
            var data = require('./fr-CA');
            resolve(data.__esModule === true ? data.default : data);
          }, 'fr-CA');
          break;
        }
      case 'fr-FR':
        {
          require.ensure(['./fr-FR'], function (require) {
            var data = require('./fr-FR');
            resolve(data.__esModule === true ? data.default : data);
          }, 'fr-FR');
          break;
        }
      default:
        resolve({});
        break;
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
