interface GenerateJsonDataParams {
    projectRoot?: string;
    localeData: any;
    sourceFolder: string;
    sourceLocale: string;
    translationLocales: string[];
}
interface GenerateXlfDataParams {
    localeData: any;
    sourceLocale: string;
    translationLocales: string[];
    sourceFolder: string;
    exportType: string;
    fillEmptyWithSource: boolean;
}
export declare function generateJsonData({ projectRoot, localeData, sourceFolder, sourceLocale, translationLocales, }: GenerateJsonDataParams): Record<string, any>;
export declare function generateXlfData({ localeData, sourceLocale, translationLocales, sourceFolder, exportType, fillEmptyWithSource, }: GenerateXlfDataParams): Record<string, string>;
export {};
