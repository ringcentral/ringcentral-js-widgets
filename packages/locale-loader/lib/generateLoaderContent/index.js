import dedent from 'dedent';
import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';

function getBaseName(f) {
  return f.replace(/\.(js|json|ts)$/i, '');
}

function returnLoadLocaleCode(chunk, locale, basename) {
  const padding = chunk ? '    ' : '  ';
  let code = `
          ${padding}const data = require('./${basename}');
          ${padding}return resolve(data.__esModule === true ? data.default : data);`;
  if (chunk) {
    code = `
          if (typeof require.ensure === 'function') {
            return require.ensure(['./${basename}'], (require) => {${code}
            }, '${locale}');
          } else {${code}
          }`;
  }
  return code;
}

export function handleSpecialLocale(chunk, files) {
  const codeMaps = new Map([
    [
      files.find((file) => /^es-419/.test(file)),
      {
        condition: `locale.indexOf('es') === 0 && locale !== 'es-ES'`,
        loadFileBasename: 'es-419',
      },
    ],
  ]);

  let code = '';
  for (const [
    needHandleLocale,
    { condition, loadFileBasename: basename },
  ] of codeMaps.entries()) {
    const locale = basename;
    if (needHandleLocale) {
      code += `
       if (${condition}) {
         ${returnLoadLocaleCode(chunk, locale, basename)}
       }
      `;
    }
  }
  return code;
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
    const returnCode = returnLoadLocaleCode(chunk, locale, basename);
    let langDefaultCase = '';
    if (!usedLang[lang]) {
      usedLang[lang] = true;
      langDefaultCase = `
        case '${lang}':
      `;
    }
    return `${langDefaultCase}
          case '${locale}': {${returnCode}
          }`;
  });

  return dedent`export default function loadLocale(locale) {
      return new Promise((resolve) => {
        ${handleSpecialLocale(chunk, files)}
        switch (locale) {${cases.join('')}
          default:
            return resolve({});
        }
      });
    }\n`;
}
