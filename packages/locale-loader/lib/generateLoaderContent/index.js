import dedent from 'dedent';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';

function byLocale(a, b) {
  const ta = formatLocale(a);
  const tb = formatLocale(b);
  if (ta === tb) return 0;
  return ta > tb ?
    1 :
    -1;
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
export default function generateLoaderContent(/** @type {GLCOptions} */ {
  files,
  chunk = true,
}) {
  const usedLang = {};
  const cases = files.sort(byLocale).map((f) => {
    const basename = f.replace(/\.(js|json)$/i, '');
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
