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

      case 'en-GB':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./en-GB'], function (require) {
              var data = require('./en-GB');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'en-GB');
          } else {
            var _data = require('./en-GB');

            resolve(_data.__esModule === true ? _data["default"] : _data);
          }

          break;
        }

      case 'fr':
      case 'fr-FR':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./fr-FR'], function (require) {
              var data = require('./fr-FR');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'fr-FR');
          } else {
            var _data2 = require('./fr-FR');

            resolve(_data2.__esModule === true ? _data2["default"] : _data2);
          }

          break;
        }

      case 'fr-CA':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./fr-CA'], function (require) {
              var data = require('./fr-CA');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'fr-CA');
          } else {
            var _data3 = require('./fr-CA');

            resolve(_data3.__esModule === true ? _data3["default"] : _data3);
          }

          break;
        }

      case 'de':
      case 'de-DE':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./de-DE'], function (require) {
              var data = require('./de-DE');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'de-DE');
          } else {
            var _data4 = require('./de-DE');

            resolve(_data4.__esModule === true ? _data4["default"] : _data4);
          }

          break;
        }

      case 'it':
      case 'it-IT':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./it-IT'], function (require) {
              var data = require('./it-IT');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'it-IT');
          } else {
            var _data5 = require('./it-IT');

            resolve(_data5.__esModule === true ? _data5["default"] : _data5);
          }

          break;
        }

      case 'es':
      case 'es-ES':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./es-ES'], function (require) {
              var data = require('./es-ES');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'es-ES');
          } else {
            var _data6 = require('./es-ES');

            resolve(_data6.__esModule === true ? _data6["default"] : _data6);
          }

          break;
        }

      case 'es-419':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./es-419'], function (require) {
              var data = require('./es-419');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'es-419');
          } else {
            var _data7 = require('./es-419');

            resolve(_data7.__esModule === true ? _data7["default"] : _data7);
          }

          break;
        }

      case 'ja':
      case 'ja-JP':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./ja-JP'], function (require) {
              var data = require('./ja-JP');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'ja-JP');
          } else {
            var _data8 = require('./ja-JP');

            resolve(_data8.__esModule === true ? _data8["default"] : _data8);
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
            var _data9 = require('./pt-PT');

            resolve(_data9.__esModule === true ? _data9["default"] : _data9);
          }

          break;
        }

      case 'pt-BR':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./pt-BR'], function (require) {
              var data = require('./pt-BR');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'pt-BR');
          } else {
            var _data10 = require('./pt-BR');

            resolve(_data10.__esModule === true ? _data10["default"] : _data10);
          }

          break;
        }

      case 'zh':
      case 'zh-CN':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./zh-CN'], function (require) {
              var data = require('./zh-CN');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'zh-CN');
          } else {
            var _data11 = require('./zh-CN');

            resolve(_data11.__esModule === true ? _data11["default"] : _data11);
          }

          break;
        }

      case 'zh-TW':
        {
          if (typeof require.ensure === 'function') {
            require.ensure(['./zh-TW'], function (require) {
              var data = require('./zh-TW');

              resolve(data.__esModule === true ? data["default"] : data);
            }, 'zh-TW');
          } else {
            var _data12 = require('./zh-TW');

            resolve(_data12.__esModule === true ? _data12["default"] : _data12);
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
            var _data13 = require('./nl-NL');

            resolve(_data13.__esModule === true ? _data13["default"] : _data13);
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
            var _data14 = require('./ko-KR');

            resolve(_data14.__esModule === true ? _data14["default"] : _data14);
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
