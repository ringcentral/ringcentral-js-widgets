"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadLocale;
function loadLocale(locale) {
  return new Promise(function (resolve) {
    switch (locale) {
      case 'en':
      case 'en-US':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./en-US', function (require) {
              var data = require('./en-US');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'en-US');
          } else {
            var data = require('./en-US');
            return resolve(data.__esModule === true ? data["default"] : data);
          }
        }
      case 'en-GB':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./en-GB', function (require) {
              var data = require('./en-GB');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'en-GB');
          } else {
            var _data = require('./en-GB');
            return resolve(_data.__esModule === true ? _data["default"] : _data);
          }
        }
      case 'en-AU':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./en-AU', function (require) {
              var data = require('./en-AU');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'en-AU');
          } else {
            var _data2 = require('./en-AU');
            return resolve(_data2.__esModule === true ? _data2["default"] : _data2);
          }
        }
      case 'fr':
      case 'fr-FR':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./fr-FR', function (require) {
              var data = require('./fr-FR');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'fr-FR');
          } else {
            var _data3 = require('./fr-FR');
            return resolve(_data3.__esModule === true ? _data3["default"] : _data3);
          }
        }
      case 'fr-CA':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./fr-CA', function (require) {
              var data = require('./fr-CA');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'fr-CA');
          } else {
            var _data4 = require('./fr-CA');
            return resolve(_data4.__esModule === true ? _data4["default"] : _data4);
          }
        }
      case 'de':
      case 'de-DE':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./de-DE', function (require) {
              var data = require('./de-DE');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'de-DE');
          } else {
            var _data5 = require('./de-DE');
            return resolve(_data5.__esModule === true ? _data5["default"] : _data5);
          }
        }
      case 'it':
      case 'it-IT':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./it-IT', function (require) {
              var data = require('./it-IT');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'it-IT');
          } else {
            var _data6 = require('./it-IT');
            return resolve(_data6.__esModule === true ? _data6["default"] : _data6);
          }
        }
      case 'es':
      case 'es-419':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./es-419', function (require) {
              var data = require('./es-419');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'es-419');
          } else {
            var _data7 = require('./es-419');
            return resolve(_data7.__esModule === true ? _data7["default"] : _data7);
          }
        }
      case 'es-ES':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./es-ES', function (require) {
              var data = require('./es-ES');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'es-ES');
          } else {
            var _data8 = require('./es-ES');
            return resolve(_data8.__esModule === true ? _data8["default"] : _data8);
          }
        }
      case 'ja':
      case 'ja-JP':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./ja-JP', function (require) {
              var data = require('./ja-JP');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'ja-JP');
          } else {
            var _data9 = require('./ja-JP');
            return resolve(_data9.__esModule === true ? _data9["default"] : _data9);
          }
        }
      case 'pt':
      case 'pt-BR':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./pt-BR', function (require) {
              var data = require('./pt-BR');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'pt-BR');
          } else {
            var _data10 = require('./pt-BR');
            return resolve(_data10.__esModule === true ? _data10["default"] : _data10);
          }
        }
      case 'zh':
      case 'zh-CN':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./zh-CN', function (require) {
              var data = require('./zh-CN');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'zh-CN');
          } else {
            var _data11 = require('./zh-CN');
            return resolve(_data11.__esModule === true ? _data11["default"] : _data11);
          }
        }
      case 'zh-TW':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./zh-TW', function (require) {
              var data = require('./zh-TW');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'zh-TW');
          } else {
            var _data12 = require('./zh-TW');
            return resolve(_data12.__esModule === true ? _data12["default"] : _data12);
          }
        }
      case 'zh-HK':
        {
          if (typeof require.ensure === 'function') {
            return require.ensure('./zh-HK', function (require) {
              var data = require('./zh-HK');
              return resolve(data.__esModule === true ? data["default"] : data);
            }, 'zh-HK');
          } else {
            var _data13 = require('./zh-HK');
            return resolve(_data13.__esModule === true ? _data13["default"] : _data13);
          }
        }
      default:
        return resolve(null);
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
