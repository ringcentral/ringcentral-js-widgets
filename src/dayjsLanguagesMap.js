"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDayjsLocale = exports.dayjsLanguagesMap = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// ringcentral-js-widgets/locale-settings/index.js

var dayjsLanguagesMap = exports.dayjsLanguagesMap = {
  'en-US': 'en',
  'de-DE': 'de',
  'en-AU': 'en-au',
  'en-GB': 'en-gb',
  'es-419': 'es-do',
  'es-ES': 'es',
  'fr-CA': 'fr-ca',
  'fr-FR': 'fr',
  'it-IT': 'it',
  'ja-JP': 'ja',
  'pt-BR': 'pt-br',
  'pt-PT': 'pt',
  'zh-CN': 'zh-cn',
  'zh-HK': 'zh-hk',
  'zh-TW': 'zh-tw',
  'nl-NL': 'nl',
  'ko-KR': 'ko',
  'fi-FI': 'fi'
};
var setDayjsLocale = exports.setDayjsLocale = function setDayjsLocale(locale) {
  var dayjsLocale = dayjsLanguagesMap[locale];
  _dayjs["default"].locale(dayjsLocale || locale);
};
//# sourceMappingURL=dayjsLanguagesMap.js.map
