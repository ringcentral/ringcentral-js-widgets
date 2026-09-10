interface ImportLocaleParams {
    sourceFolder?: string;
    localizationFolder?: string;
    sourceLocale?: string;
    supportedLocales?: readonly string[];
    translationLocales?: readonly string[];
    interactive?: boolean;
    silent?: boolean;
    json?: boolean;
    disableEslint?: boolean;
    rawData?: any;
}
export default function importLocale({ sourceFolder, localizationFolder, sourceLocale, supportedLocales, translationLocales, interactive, silent, json, disableEslint, rawData, }?: ImportLocaleParams): Promise<void>;
export {};
