import importLocale from '../importLocale';
import defaultConfig from '../defaultConfig';

export default function consolidateLocale({
  sourceFolder = defaultConfig.sourceFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales = defaultConfig.supportedLocales,
}) {
  return importLocale({
    sourceFolder,
    sourceLocale,
    supportedLocales,
  });
}
