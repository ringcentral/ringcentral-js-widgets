interface ReadJsonDataParams {
    localizationFolder: string;
    translationLocales: readonly string[];
    sourceLocale: string;
    rawData?: Record<string, Record<string, Record<string, any>>>;
}
interface TranslationData {
    source: any;
    value: any;
}
interface FileData {
    [key: string]: TranslationData;
}
interface LocaleData {
    [filePath: string]: FileData;
}
interface ResultData {
    [locale: string]: LocaleData;
}
export declare function readJsonData({ localizationFolder, translationLocales, sourceLocale, rawData, }: ReadJsonDataParams): ResultData;
export {};
