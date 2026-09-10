interface WriteDataParams {
    localizationFolder: string;
    data: Record<string, any>;
    ext: string;
}
interface ExportLocaleParams {
    sourceFolder?: string;
    localizationFolder?: string;
    sourceLocale?: string;
    projectRoot?: string;
    supportedLocales?: string[];
    translationLocales?: string[];
    exportType?: string;
    fillEmptyWithSource?: boolean;
    json?: boolean;
    writeFile?: boolean;
    pseudo?: boolean;
}
export declare function writeData({ localizationFolder, data, ext, }: WriteDataParams): void;
/**
 * Exports the locale data based on the provided options.
 *
 * by default, it will export the data in `xlf` format.
 *
 * if the --json flag is provided, it will export the data in `json` format.
 *
 * @param {Object} options - The options for exporting the locale data.
 * @param {string} [options.sourceFolder] - The source folder path.
 * @param {string} [options.localizationFolder] - The localization folder path.
 * @param {string} [options.sourceLocale] - The source locale.
 * @param {string} [options.projectRoot] - The project root path use for get the relative path of current project in json pseudo mode.
 * @param {*} options.supportedLocales - The supported locales.
 * @param {*} [options.translationLocales] - The translation locales.
 * @param {string} [options.exportType='diff'] - The export type.
 * @param {boolean} [options.fillEmptyWithSource=true] - Whether to fill empty translations with the source text.
 * @param {boolean} [options.json] - Whether to export the data in JSON format.
 * @param {boolean} [options.writeFile=true] - Whether to write the data to a file.
 * @param {boolean} [options.pseudo=false] - Whether to include the pseudo locale results.
 * @returns {Promise<string|Object>} - The exported data or a promise that resolves with the exported data.
 * @throws {Error} - If options.supportedLocales is missing.
 */
export default function exportLocale({ sourceFolder, localizationFolder, sourceLocale, projectRoot, supportedLocales, translationLocales, exportType, fillEmptyWithSource, json, writeFile, pseudo, }?: ExportLocaleParams): any;
export {};
