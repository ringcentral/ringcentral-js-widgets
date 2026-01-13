import defaultConfig from '../defaultConfig';
import importLocale from '../importLocale';

interface ConsolidateLocaleParams {
  sourceFolder?: string;
  sourceLocale?: string;
  supportedLocales?: string[];
  interactive?: boolean;
  silent?: boolean;
}

export default async function consolidateLocale({
  sourceFolder = defaultConfig.sourceFolder,
  sourceLocale = defaultConfig.sourceLocale,
  supportedLocales,
  interactive = defaultConfig.interactive,
  silent = defaultConfig.silent,
}: ConsolidateLocaleParams = {}) {
  return importLocale({
    sourceFolder,
    sourceLocale,
    supportedLocales,
    interactive,
    silent,
  });
}
