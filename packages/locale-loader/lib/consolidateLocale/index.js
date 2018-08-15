import importLocale from '../importLocale';
import defaultConfig from '../defaultConfig';

export default async function consolidateLocale({
  sourceFolder = defaultConfig.sourceFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales = defaultConfig.supportedLocales,
  interactive = defaultConfig.interactive,
  silent = defaultConfig.silent,
}) {
  return importLocale({
    sourceFolder,
    sourceLocale,
    supportedLocales,
    interactive,
    silent,
  });
}
