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
      case 'de':

      case 'de-DE':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./de-DE'], function (require) {
              var data = require('./de-DE');
              resolve(data.__esModule === true ? data.default : data);
            }, 'de-DE');
          } else {
            var data = require('./de-DE');
            resolve(data.__esModule === true ? data.default : data);
          }
          break;
        }
      case 'en':

      case 'en-AU':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./en-AU'], function (require) {
              var data = require('./en-AU');
              resolve(data.__esModule === true ? data.default : data);
            }, 'en-AU');
          } else {
            var _data = require('./en-AU');
            resolve(_data.__esModule === true ? _data.default : _data);
          }
          break;
        }
      case 'en-CA':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./en-CA'], function (require) {
              var data = require('./en-CA');
              resolve(data.__esModule === true ? data.default : data);
            }, 'en-CA');
          } else {
            var _data2 = require('./en-CA');
            resolve(_data2.__esModule === true ? _data2.default : _data2);
          }
          break;
        }
      case 'en-GB':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./en-GB'], function (require) {
              var data = require('./en-GB');
              resolve(data.__esModule === true ? data.default : data);
            }, 'en-GB');
          } else {
            var _data3 = require('./en-GB');
            resolve(_data3.__esModule === true ? _data3.default : _data3);
          }
          break;
        }
      case 'en-US':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./en-US'], function (require) {
              var data = require('./en-US');
              resolve(data.__esModule === true ? data.default : data);
            }, 'en-US');
          } else {
            var _data4 = require('./en-US');
            resolve(_data4.__esModule === true ? _data4.default : _data4);
          }
          break;
        }
      case 'es':

      case 'es-419':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./es-419'], function (require) {
              var data = require('./es-419');
              resolve(data.__esModule === true ? data.default : data);
            }, 'es-419');
          } else {
            var _data5 = require('./es-419');
            resolve(_data5.__esModule === true ? _data5.default : _data5);
          }
          break;
        }
      case 'es-ES':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./es-ES'], function (require) {
              var data = require('./es-ES');
              resolve(data.__esModule === true ? data.default : data);
            }, 'es-ES');
          } else {
            var _data6 = require('./es-ES');
            resolve(_data6.__esModule === true ? _data6.default : _data6);
          }
          break;
        }
      case 'fr':

      case 'fr-CA':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./fr-CA'], function (require) {
              var data = require('./fr-CA');
              resolve(data.__esModule === true ? data.default : data);
            }, 'fr-CA');
          } else {
            var _data7 = require('./fr-CA');
            resolve(_data7.__esModule === true ? _data7.default : _data7);
          }
          break;
        }
      case 'fr-FR':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./fr-FR'], function (require) {
              var data = require('./fr-FR');
              resolve(data.__esModule === true ? data.default : data);
            }, 'fr-FR');
          } else {
            var _data8 = require('./fr-FR');
            resolve(_data8.__esModule === true ? _data8.default : _data8);
          }
          break;
        }
      case 'it':

      case 'it-IT':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./it-IT'], function (require) {
              var data = require('./it-IT');
              resolve(data.__esModule === true ? data.default : data);
            }, 'it-IT');
          } else {
            var _data9 = require('./it-IT');
            resolve(_data9.__esModule === true ? _data9.default : _data9);
          }
          break;
        }
      case 'ja':

      case 'ja-JP':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./ja-JP'], function (require) {
              var data = require('./ja-JP');
              resolve(data.__esModule === true ? data.default : data);
            }, 'ja-JP');
          } else {
            var _data10 = require('./ja-JP');
            resolve(_data10.__esModule === true ? _data10.default : _data10);
          }
          break;
        }
      case 'pt':

      case 'pt-BR':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./pt-BR'], function (require) {
              var data = require('./pt-BR');
              resolve(data.__esModule === true ? data.default : data);
            }, 'pt-BR');
          } else {
            var _data11 = require('./pt-BR');
            resolve(_data11.__esModule === true ? _data11.default : _data11);
          }
          break;
        }
      case 'zh':

      case 'zh-CN':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./zh-CN'], function (require) {
              var data = require('./zh-CN');
              resolve(data.__esModule === true ? data.default : data);
            }, 'zh-CN');
          } else {
            var _data12 = require('./zh-CN');
            resolve(_data12.__esModule === true ? _data12.default : _data12);
          }
          break;
        }
      case 'zh-TW':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./zh-TW'], function (require) {
              var data = require('./zh-TW');
              resolve(data.__esModule === true ? data.default : data);
            }, 'zh-TW');
          } else {
            var _data13 = require('./zh-TW');
            resolve(_data13.__esModule === true ? _data13.default : _data13);
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
