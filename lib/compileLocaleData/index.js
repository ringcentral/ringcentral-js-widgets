"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLocaleFiles = findLocaleFiles;
exports.compileData = compileData;
exports.default = compileLocaleData;
const tslib_1 = require("tslib");
const formatLocale_1 = tslib_1.__importDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const ramda_1 = require("ramda");
const findLoaderFiles_1 = tslib_1.__importDefault(require("../findLoaderFiles"));
const isLocaleFile_1 = tslib_1.__importDefault(require("../isLocaleFile"));
const parseLocaleFile_1 = tslib_1.__importDefault(require("../parseLocaleFile"));
function findLocaleFiles(folderPath) {
    return (0, ramda_1.filter)(isLocaleFile_1.default, fs_extra_1.default.readdirSync(folderPath));
}
function compileData({ folderPath, sourceLocale, translationLocales, }) {
    return (0, ramda_1.reduce)((data, file) => {
        const locale = (0, formatLocale_1.default)(file.replace(/\.(js|ts|json)$/i, ''));
        if (locale === sourceLocale || translationLocales.indexOf(locale) > -1) {
            const rawContent = fs_extra_1.default.readFileSync(path_1.default.resolve(folderPath, file), 'utf8');
            data.files[locale] = Object.assign({ file,
                locale,
                rawContent }, (0, parseLocaleFile_1.default)(rawContent));
        }
        return data;
    }, {
        path: folderPath,
        files: {},
    }, findLocaleFiles(folderPath));
}
function compileLocaleData({ sourceFolder, sourceLocale, translationLocales, }) {
    return (0, ramda_1.reduce)((data, file) => {
        const folderPath = path_1.default.resolve(path_1.default.dirname(file));
        data[folderPath] = compileData({
            folderPath,
            sourceLocale,
            translationLocales,
        });
        return data;
    }, {}, (0, findLoaderFiles_1.default)(sourceFolder));
}
//# sourceMappingURL=index.js.map