"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadLocale;
function loadLocale(locale) {
  return locale === 'en' || locale === 'en-US' ? require('./en-US') : locale === 'en-GB' ? require('./en-GB') : locale === 'en-AU' ? require('./en-AU') : locale === 'fr' || locale === 'fr-FR' ? require('./fr-FR') : locale === 'fr-CA' ? require('./fr-CA') : locale === 'de' || locale === 'de-DE' ? require('./de-DE') : locale === 'it' || locale === 'it-IT' ? require('./it-IT') : locale === 'es' || locale === 'es-419' ? require('./es-419') : locale === 'es-ES' ? require('./es-ES') : locale === 'ja' || locale === 'ja-JP' ? require('./ja-JP') : locale === 'pt' || locale === 'pt-PT' ? require('./pt-PT') : locale === 'pt-BR' ? require('./pt-BR') : locale === 'zh' || locale === 'zh-CN' ? require('./zh-CN') : locale === 'zh-TW' ? require('./zh-TW') : locale === 'zh-HK' ? require('./zh-HK') : locale === 'nl' || locale === 'nl-NL' ? require('./nl-NL') : locale === 'ko' || locale === 'ko-KR' ? require('./ko-KR') : locale === 'fi' || locale === 'fi-FI' ? require('./fi-FI') : null;
}
//# sourceMappingURL=loadLocale.js.map
