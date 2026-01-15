"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateLoaderContent;
const tslib_1 = require("tslib");
const formatLocale_1 = tslib_1.__importDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
// @ts-ignore
const dedent_1 = tslib_1.__importDefault(require("dedent"));
function getBaseName(f) {
    return f.replace(/\.(js|json|ts)$/i, '');
}
function returnLoadLocaleCode(chunk, locale, basename) {
    if (chunk) {
        return `import(/* webpackChunkName: "${locale}" */'./${basename}')`;
    }
    return `require('./${basename}')`;
}
/**
 * @function
 * @description Generate js code for localeLoader according the files listed.
 * @param {GLCOptions} options
 */
function generateLoaderContent({ files, chunk = true, supportedLocales = [], pseudo = false, }) {
    // create sort function
    const sortIdx = {};
    supportedLocales.forEach((locale, idx) => {
        sortIdx[(0, formatLocale_1.default)(locale)] = idx;
    });
    const byLocale = (a, b) => {
        var _a, _b;
        const ta = (0, formatLocale_1.default)(getBaseName(a));
        const tb = (0, formatLocale_1.default)(getBaseName(b));
        const aIdx = (_a = sortIdx[ta]) !== null && _a !== void 0 ? _a : -1;
        const bIdx = (_b = sortIdx[tb]) !== null && _b !== void 0 ? _b : -1;
        if (aIdx === bIdx) {
            // -1 or ta === tb
            if (ta === tb) {
                return 0;
            }
            return ta > tb ? 1 : -1;
        }
        // smaller index has priority
        return aIdx > bIdx ? 1 : -1;
    };
    const usedLang = {};
    const cases = (pseudo ? ['rc-XX.ts', ...files] : files)
        .sort(byLocale)
        .map((f) => {
        const basename = getBaseName(f);
        const locale = (0, formatLocale_1.default)(basename);
        const lang = locale.split('-')[0];
        const isChunk = typeof chunk === 'function' ? chunk(locale) : chunk;
        const returnCode = returnLoadLocaleCode(isChunk, locale, basename);
        let langDefaultCase = '';
        if (!usedLang[lang]) {
            usedLang[lang] = true;
            langDefaultCase = `locale==='${lang}'||`;
        }
        return `${langDefaultCase}
    locale==='${locale}'? ${returnCode}:`;
    });
    const value = (0, dedent_1.default) `export default function loadLocale(locale) {
          return ${cases.join('')}null;
    }\n`;
    return value;
}
//# sourceMappingURL=index.js.map