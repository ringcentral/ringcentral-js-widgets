"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = readXlfData;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const ramda_1 = require("ramda");
const xml_js_1 = tslib_1.__importDefault(require("xml-js"));
function extractKey(str) {
    return str.substring(1, str.length - 1);
}
function extractXlfData({ locale, content, }) {
    const data = xml_js_1.default.xml2js(content, { compact: true });
    if (data.xliff && data.xliff.file) {
        const files = Array.isArray(data.xliff.file)
            ? data.xliff.file
            : [data.xliff.file];
        return (0, ramda_1.reduce)((output, fileData) => {
            if (fileData._attributes &&
                fileData._attributes['target-language'] === locale &&
                fileData.body &&
                fileData.body['trans-unit']) {
                const fileName = fileData._attributes.original;
                const units = Array.isArray(fileData.body['trans-unit'])
                    ? fileData.body['trans-unit']
                    : [fileData.body['trans-unit']];
                output[fileName] = (0, ramda_1.reduce)((fileOutput, unit) => {
                    if (unit._attributes &&
                        unit._attributes.id &&
                        unit.target &&
                        unit.target._text) {
                        fileOutput[extractKey(unit._attributes.id)] = {
                            value: unit.target._text,
                            source: unit.source._text,
                        };
                    }
                    return fileOutput;
                }, {}, units);
            }
            return output;
        }, {}, files);
    }
    return {};
}
function readXlfData({ localizationFolder, translationLocales, }) {
    return (0, ramda_1.reduce)((data, locale) => {
        const fileName = `${locale}.xlf`;
        const filePath = path_1.default.resolve(localizationFolder, fileName);
        if (fs_extra_1.default.existsSync(filePath) && fs_extra_1.default.statSync(filePath).isFile()) {
            const content = fs_extra_1.default.readFileSync(filePath, 'utf8');
            data[locale] = extractXlfData({ locale, content });
        }
        return data;
    }, {}, translationLocales);
}
//# sourceMappingURL=index.js.map