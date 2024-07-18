import defaultConfig from '../defaultConfig';
import importLocale from '../importLocale';

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
