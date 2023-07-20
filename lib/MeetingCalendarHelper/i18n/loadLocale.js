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
          var data = require('./en-US');
          return resolve(data.__esModule === true ? data["default"] : data);
        }
      case 'en-GB':
        {
          var _data = require('./en-GB');
          return resolve(_data.__esModule === true ? _data["default"] : _data);
        }
      case 'en-AU':
        {
          var _data2 = require('./en-AU');
          return resolve(_data2.__esModule === true ? _data2["default"] : _data2);
        }
      case 'fr':
      case 'fr-FR':
        {
          var _data3 = require('./fr-FR');
          return resolve(_data3.__esModule === true ? _data3["default"] : _data3);
        }
      case 'fr-CA':
        {
          var _data4 = require('./fr-CA');
          return resolve(_data4.__esModule === true ? _data4["default"] : _data4);
        }
      case 'de':
      case 'de-DE':
        {
          var _data5 = require('./de-DE');
          return resolve(_data5.__esModule === true ? _data5["default"] : _data5);
        }
      case 'it':
      case 'it-IT':
        {
          var _data6 = require('./it-IT');
          return resolve(_data6.__esModule === true ? _data6["default"] : _data6);
        }
      case 'es':
      case 'es-419':
        {
          var _data7 = require('./es-419');
          return resolve(_data7.__esModule === true ? _data7["default"] : _data7);
        }
      case 'es-ES':
        {
          var _data8 = require('./es-ES');
          return resolve(_data8.__esModule === true ? _data8["default"] : _data8);
        }
      case 'ja':
      case 'ja-JP':
        {
          var _data9 = require('./ja-JP');
          return resolve(_data9.__esModule === true ? _data9["default"] : _data9);
        }
      case 'pt':
      case 'pt-PT':
        {
          var _data10 = require('./pt-PT');
          return resolve(_data10.__esModule === true ? _data10["default"] : _data10);
        }
      case 'pt-BR':
        {
          var _data11 = require('./pt-BR');
          return resolve(_data11.__esModule === true ? _data11["default"] : _data11);
        }
      case 'zh':
      case 'zh-CN':
        {
          var _data12 = require('./zh-CN');
          return resolve(_data12.__esModule === true ? _data12["default"] : _data12);
        }
      case 'zh-TW':
        {
          var _data13 = require('./zh-TW');
          return resolve(_data13.__esModule === true ? _data13["default"] : _data13);
        }
      case 'zh-HK':
        {
          var _data14 = require('./zh-HK');
          return resolve(_data14.__esModule === true ? _data14["default"] : _data14);
        }
      case 'nl':
      case 'nl-NL':
        {
          var _data15 = require('./nl-NL');
          return resolve(_data15.__esModule === true ? _data15["default"] : _data15);
        }
      case 'ko':
      case 'ko-KR':
        {
          var _data16 = require('./ko-KR');
          return resolve(_data16.__esModule === true ? _data16["default"] : _data16);
        }
      case 'fi':
      case 'fi-FI':
        {
          var _data17 = require('./fi-FI');
          return resolve(_data17.__esModule === true ? _data17["default"] : _data17);
        }
      default:
        return resolve(null);
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
