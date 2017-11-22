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
      case 'es-419':
        {
          require.ensure(['./es-419'], function (require) {
            var data = require('./es-419');
            resolve(data.__esModule === true ? data.default : data);
          }, 'es-419');
          break;
        }
      case 'es-ES':
        {
          require.ensure(['./es-ES'], function (require) {
            var data = require('./es-ES');
            resolve(data.__esModule === true ? data.default : data);
          }, 'es-ES');
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
      case 'it-IT':
        {
          require.ensure(['./it-IT'], function (require) {
            var data = require('./it-IT');
            resolve(data.__esModule === true ? data.default : data);
          }, 'it-IT');
          break;
        }
      case 'ja-JP':
        {
          require.ensure(['./ja-JP'], function (require) {
            var data = require('./ja-JP');
            resolve(data.__esModule === true ? data.default : data);
          }, 'ja-JP');
          break;
        }
      case 'pt-BR':
        {
          require.ensure(['./pt-BR'], function (require) {
            var data = require('./pt-BR');
            resolve(data.__esModule === true ? data.default : data);
          }, 'pt-BR');
          break;
        }
      default:
        resolve({});
        break;
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
