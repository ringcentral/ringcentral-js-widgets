interface CompileDataParams {
    folderPath: string;
    sourceLocale: string;
    translationLocales: readonly string[];
}
interface LocaleFileData {
    file: string;
    locale: string;
    rawContent: string;
    data: Map<string, any>;
    [key: string]: any;
}
interface CompiledData {
    path: string;
    files: Record<string, LocaleFileData>;
}
interface CompileLocaleDataParams {
    sourceFolder: string;
    sourceLocale: string;
    translationLocales: readonly string[];
}
export declare function findLocaleFiles(folderPath: string): string[];
export declare function compileData({ folderPath, sourceLocale, translationLocales, }: CompileDataParams): CompiledData;
export default function compileLocaleData({ sourceFolder, sourceLocale, translationLocales, }: CompileLocaleDataParams): Record<string, CompiledData>;
export {};
