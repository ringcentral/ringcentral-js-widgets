import dedent from 'dedent';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';

function getBaseName(f) {
  return f.replace(/\.(js|json|ts)$/i, '');
}
/**
 * @typedef GLCOptions
 * @property {String[]} files
 * @property {Boolean} [chunk]
 *
 */
/**
 * @function
 * @description Generate js code for localeLoader according the files listed.
 * @param {GLCOptions} options
 */
export default function generateLoaderContent(
  /** @type {GLCOptions} */ { files, chunk = true, supportedLocales = [] },
) {
  // create sort function
  const sortIdx = {};
  supportedLocales.forEach((locale, idx) => {
    sortIdx[formatLocale(locale)] = idx;
  });
  const byLocale = (a, b) => {
    const ta = formatLocale(getBaseName(a));
    const tb = formatLocale(getBaseName(b));
    const aIdx = sortIdx[ta] ?? -1;
    const bIdx = sortIdx[tb] ?? -1;
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
  const cases = files.sort(byLocale).map((f) => {
    const basename = getBaseName(f);
    const locale = formatLocale(basename);
    const lang = locale.split('-')[0];
    const padding = chunk ? '  ' : '';
    let code = `
            ${padding}const data = require('./${basename}');
            ${padding}resolve(data.__esModule === true ? data.default : data);`;
    if (chunk) {
      code = `
            if (typeof require.ensure === 'function') {
              require.ensure(['./${basename}'], (require) => {${code}
              }, '${locale}');
            } else {${code}
            }`;
    }
    let langDefaultCase = '';
    if (!usedLang[lang]) {
      usedLang[lang] = true;
      langDefaultCase = `
        case '${lang}':
      `;
    }
    return `${langDefaultCase}
          case '${locale}': {${code}
            break;
          }`;
  });
  return dedent`export default function loadLocale(locale) {
      return new Promise((resolve) => {
        switch (locale) {${cases.join('')}
          default:
            resolve({});
            break;
        }
      });
    }\n`;
}
