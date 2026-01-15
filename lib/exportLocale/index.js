"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = writeData;
exports.default = exportLocale;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const ramda_1 = require("ramda");
const compileLocaleData_1 = tslib_1.__importDefault(require("../compileLocaleData"));
const defaultConfig_1 = tslib_1.__importDefault(require("../defaultConfig"));
const generateData_1 = require("../generateData");
function writeData({ localizationFolder, data, ext, }) {
    fs_extra_1.default.ensureDirSync(localizationFolder);
    (0, ramda_1.forEach)((locale) => {
        const fileName = path_1.default.resolve(localizationFolder, `${locale}.${ext}`);
        fs_extra_1.default.writeFileSync(fileName, ext === 'json' ? JSON.stringify(data[locale], null, 2) : data[locale]);
    }, Object.keys(data));
}
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
function exportLocale({ sourceFolder = defaultConfig_1.default.sourceFolder, localizationFolder = defaultConfig_1.default.localizationFolder, sourceLocale = defaultConfig_1.default.sourceLocale, projectRoot, supportedLocales, translationLocales = supportedLocales, exportType = 'diff', fillEmptyWithSource = true, json = process.argv.includes('--json'), writeFile = true, pseudo = process.argv.includes('--pseudo') || false, } = {}) {
    if (!supportedLocales || !translationLocales) {
        throw new Error('options.supportedLocales is missing');
    }
    const localeData = (0, compileLocaleData_1.default)({
        sourceFolder,
        sourceLocale,
        translationLocales,
    });
    const data = json
        ? (0, generateData_1.generateJsonData)({
            localeData,
            projectRoot,
            sourceFolder,
            sourceLocale,
            translationLocales: pseudo
                ? [...translationLocales, 'rc-XX']
                : translationLocales,
        })
        : (0, generateData_1.generateXlfData)({
            localeData,
            sourceFolder,
            sourceLocale,
            translationLocales,
            exportType,
            fillEmptyWithSource,
        });
    if (writeFile) {
        return writeData({
            data,
            localizationFolder,
            ext: json ? 'json' : 'xlf',
        });
    }
    return data;
}
//# sourceMappingURL=index.js.map