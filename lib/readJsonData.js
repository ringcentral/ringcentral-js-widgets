"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonData = readJsonData;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const ramda_1 = require("ramda");
function readJsonData({ localizationFolder, translationLocales, sourceLocale, rawData, }) {
    if (!rawData) {
        rawData = (0, ramda_1.reduce)((acc, locale) => {
            const fileName = `${locale}.json`;
            const filePath = path_1.default.resolve(localizationFolder, fileName);
            if (fs_extra_1.default.existsSync(filePath) && fs_extra_1.default.statSync(filePath).isFile()) {
                const content = fs_extra_1.default.readFileSync(filePath, 'utf8');
                acc[locale] = JSON.parse(content);
            }
            return acc;
        }, {}, translationLocales);
    }
    return (0, ramda_1.reduce)((result, locale) => {
        if (locale !== sourceLocale) {
            result[locale] = (0, ramda_1.reduce)((fileData, filePath) => {
                const folderPath = path_1.default.dirname(filePath);
                const targetFile = `${locale}${path_1.default.extname(filePath)}`;
                const targetFilePath = path_1.default.join(folderPath, targetFile);
                fileData[targetFilePath] = (0, ramda_1.reduce)((acc, key) => {
                    const value = rawData[locale][filePath][key];
                    const source = rawData[sourceLocale][filePath][key];
                    if (source && value) {
                        acc[key] = {
                            source,
                            value,
                        };
                    }
                    return acc;
                }, {}, Object.keys(rawData[locale][filePath]));
                return fileData;
            }, {}, Object.keys(rawData[locale]));
        }
        return result;
    }, {}, translationLocales);
}
//# sourceMappingURL=readJsonData.js.map