import formatLocale from '@ringcentral-integration/i18n/lib/formatLocale';
// @ts-ignore
import dedent from 'dedent';

interface GLCOptions {
  files: string[];
  chunk?: boolean | ((locale: string) => boolean);
  supportedLocales?: string[];
  pseudo?: boolean;
}

function getBaseName(f: string): string {
  return f.replace(/\.(js|json|ts)$/i, '');
}

function returnLoadLocaleCode(
  chunk: boolean,
  locale: string,
  basename: string,
): string {
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
export default function generateLoaderContent({
  files,
  chunk = true,
  supportedLocales = [],
  pseudo = false,
}: GLCOptions): string {
  // create sort function
  const sortIdx: Record<string, number> = {};
  supportedLocales.forEach((locale, idx) => {
    sortIdx[formatLocale(locale)] = idx;
  });
  const byLocale = (a: string, b: string): number => {
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

  const usedLang: Record<string, boolean> = {};
  const cases = (pseudo ? ['rc-XX.ts', ...files] : files)
    .sort(byLocale)
    .map((f) => {
      const basename = getBaseName(f);
      const locale = formatLocale(basename);
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

  const value = dedent`export default function loadLocale(locale) {
          return ${cases.join('')}null;
    }\n`;
  return value;
}
