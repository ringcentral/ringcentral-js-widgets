"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDayjsLocale = exports.dayjsLanguagesMap = void 0;
const tslib_1 = require("tslib");
// ringcentral-js-widgets/locale-settings/index.js
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
exports.dayjsLanguagesMap = {
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
    'fi-FI': 'fi',
};
const setDayjsLocale = (locale) => {
    const dayjsLocale = exports.dayjsLanguagesMap[locale];
    dayjs_1.default.locale(dayjsLocale || locale);
};
exports.setDayjsLocale = setDayjsLocale;
//# sourceMappingURL=dayjsLanguagesMap.js.map