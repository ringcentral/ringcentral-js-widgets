"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = importLocale;
const tslib_1 = require("tslib");
/* eslint-disable no-inner-declarations */
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
const parser_1 = require("@babel/parser");
const formatLocale_1 = tslib_1.__importDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const path_1 = tslib_1.__importDefault(require("path"));
// @ts-ignore
const prettier_1 = tslib_1.__importDefault(require("prettier"));
const ramda_1 = require("ramda");
const asyncForEach_1 = tslib_1.__importDefault(require("../asyncForEach"));
const asyncReduce_1 = tslib_1.__importDefault(require("../asyncReduce"));
const compileLocaleData_1 = tslib_1.__importDefault(require("../compileLocaleData"));
const defaultConfig_1 = tslib_1.__importDefault(require("../defaultConfig"));
const readJsonData_1 = require("../readJsonData");
const readXlfData_1 = tslib_1.__importDefault(require("../readXlfData"));
const prompt = inquirer_1.default.createPromptModule();
const getAnnotations = (source) => {
    const annotations = (0, ramda_1.reduce)((result, [key, value]) => {
        result.push(`// @key: @#@${JSON.stringify(key)}@#@ @source: @#@${JSON.stringify(value)}@#@`);
        return result;
    }, [], source).join('\n');
    return annotations;
};
function writeFiles({ localeData, sourceFolder, sourceLocale, disableEslint = true, }) {
    const eslint = disableEslint ? '/* eslint-disable */\n' : '';
    (0, ramda_1.forEach)((folderPath) => {
        (0, ramda_1.forEach)((locale) => {
            if (locale !== sourceLocale) {
                // write file
                const targetData = localeData[folderPath].files[locale];
                const { code } = (0, generator_1.default)(targetData.ast);
                const annotations = getAnnotations(Array.from(targetData.annotations.entries()));
                const output = prettier_1.default.format(`${eslint}${code}\n\n${annotations}\n`, {
                    parser: 'typescript',
                    // this copy from integration basic prettier config
                    // TODO: read prettier config by user's project
                    bracketSpacing: true,
                    singleQuote: true,
                    trailingComma: 'all',
                    arrowParens: 'always',
                    bracketSameLine: false,
                    endOfLine: 'auto',
                });
                fs_extra_1.default.writeFileSync(path_1.default.resolve(sourceFolder, folderPath, targetData.file), output);
            }
        }, Object.keys(localeData[folderPath].files));
    }, Object.keys(localeData));
}
function formatReason({ reason, key, fileName, type, }) {
    return `[locale] ${chalk_1.default.red(`{${type}}`)} Key: '${key}', File: '${fileName}', Reason: ${reason}.`;
}
function mergeTranslationData(_a) {
    return tslib_1.__awaiter(this, arguments, void 0, function* ({ localeData, translations = {}, sourceFolder, sourceLocale, interactive = true, silent = false, }) {
        // clean up original Data
        yield (0, asyncForEach_1.default)((folderPath) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield (0, asyncForEach_1.default)((locale) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (locale !== sourceLocale) {
                    const targetData = localeData[folderPath].files[locale];
                    const sourceData = localeData[folderPath].files[sourceLocale];
                    const relativePath = path_1.default.relative(sourceFolder, path_1.default.resolve(folderPath, targetData.file));
                    targetData.data = yield (0, asyncReduce_1.default)((newData_1, _a) => tslib_1.__awaiter(this, [newData_1, _a], void 0, function* (newData, [key, value]) {
                        const type = 'Delete';
                        let shouldDelete = false;
                        let message;
                        if (sourceData.data.has(key)) {
                            if (sourceData.data.get(key).value !== value.source) {
                                message = formatReason({
                                    type,
                                    reason: 'Source value changed',
                                    key,
                                    fileName: relativePath,
                                });
                                if (interactive) {
                                    shouldDelete = (yield prompt({
                                        name: 'result',
                                        type: 'confirm',
                                        message,
                                    })).result;
                                }
                                else {
                                    shouldDelete = true;
                                }
                            }
                        }
                        else {
                            message = formatReason({
                                type,
                                reason: 'Source no longer exists',
                                key,
                                fileName: relativePath,
                            });
                            if (interactive) {
                                shouldDelete = (yield prompt({
                                    name: 'result',
                                    type: 'confirm',
                                    message,
                                })).result;
                            }
                            else {
                                shouldDelete = true;
                            }
                        }
                        if (shouldDelete) {
                            if (!interactive && !silent) {
                                console.log(message);
                            }
                        }
                        else {
                            newData.set(key, value);
                        }
                        return newData;
                    }), new Map(), targetData.data);
                }
            }), Object.keys(localeData[folderPath].files));
        }), Object.keys(localeData));
        // merge in translations
        yield (0, asyncForEach_1.default)((locale) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield (0, asyncForEach_1.default)((fileName) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const filePath = path_1.default.resolve(sourceFolder, fileName);
                const folderPath = path_1.default.dirname(filePath);
                const sourceLocaleFile = localeData[folderPath] && localeData[folderPath].files[sourceLocale];
                if (sourceLocaleFile) {
                    const sourceData = sourceLocaleFile.data;
                    const ext = path_1.default.extname(sourceLocaleFile.file) || '.ts';
                    if (!localeData[folderPath].files[locale]) {
                        localeData[folderPath].files[locale] = {
                            file: `${(0, formatLocale_1.default)(locale)}${ext}`,
                        };
                    }
                    if (!localeData[folderPath].files[locale].data) {
                        localeData[folderPath].files[locale].data = new Map();
                    }
                    const originalData = localeData[folderPath].files[locale].data;
                    const translatedData = translations[locale][fileName];
                    yield (0, asyncForEach_1.default)((key) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const type = 'Skip';
                        let shouldSkip = false;
                        let message;
                        if (!sourceData.has(key)) {
                            message = formatReason({
                                type,
                                reason: 'Source no longer exists',
                                key,
                                fileName,
                            });
                            if (interactive) {
                                shouldSkip = (yield prompt({
                                    name: 'result',
                                    type: 'confirm',
                                    message,
                                })).result;
                            }
                            else {
                                shouldSkip = true;
                            }
                        }
                        else if (sourceData.get(key).value !== translatedData[key].source) {
                            message = formatReason({
                                type,
                                reason: 'Source value changed',
                                key,
                                fileName,
                            });
                            if (interactive) {
                                shouldSkip = (yield prompt({
                                    name: 'result',
                                    type: 'confirm',
                                    message,
                                })).result;
                            }
                            else {
                                shouldSkip = true;
                            }
                        }
                        if (shouldSkip) {
                            if (!interactive && !silent) {
                                console.log(message);
                            }
                        }
                        else {
                            originalData.set(key, Object.assign(Object.assign({}, translatedData[key]), { key }));
                        }
                    }), Object.keys(translatedData));
                }
            }), Object.keys(translations[locale]));
        }), Object.keys(translations));
        // Update ast and generate code
        (0, ramda_1.forEach)((folderPath) => {
            (0, ramda_1.forEach)((locale) => {
                if (locale !== sourceLocale) {
                    const targetData = localeData[folderPath].files[locale];
                    const sourceData = localeData[folderPath].files[sourceLocale];
                    targetData.ast = (0, parser_1.parse)(sourceData.content, {
                        sourceType: 'module',
                        plugins: ['typescript'],
                    });
                    targetData.annotations = new Map();
                    function getData(source) {
                        const properties = source.properties.filter((prop) => {
                            const wrapInBracket = prop.key.type === 'MemberExpression' ||
                                prop.key.type === 'TemplateLiteral';
                            const key = wrapInBracket
                                ? `[${(0, generator_1.default)(prop.key).code}]`
                                : (0, generator_1.default)(prop.key).code;
                            const entry = targetData.data.get(key);
                            if (entry && entry.value) {
                                prop.value = {
                                    type: 'StringLiteral',
                                    value: entry.value,
                                    extra: {
                                        // generate desired raw to by pass babel jsesc use
                                        raw: JSON.stringify(entry.value),
                                        rawValue: entry.value,
                                    },
                                };
                                targetData.annotations.set(key, sourceData.data.get(key).value);
                                return true;
                            }
                            return false;
                        });
                        source.properties = properties;
                    }
                    const defaultExport = targetData.ast.program.body.find((item) => item.type === 'ExportDefaultDeclaration');
                    if (defaultExport) {
                        if (defaultExport.declaration.type === 'ObjectExpression') {
                            getData(defaultExport.declaration);
                        }
                        else if (defaultExport.declaration.type === 'TSAsExpression') {
                            const nest = defaultExport.declaration.expression;
                            if (nest.type === 'ObjectExpression') {
                                getData(nest);
                            }
                        }
                    }
                }
            }, Object.keys(localeData[folderPath].files));
        }, Object.keys(localeData));
        return localeData;
    });
}
function importLocale() {
    return tslib_1.__awaiter(this, arguments, void 0, function* ({ sourceFolder = defaultConfig_1.default.sourceFolder, localizationFolder = defaultConfig_1.default.localizationFolder, sourceLocale = defaultConfig_1.default.sourceLocale, supportedLocales, translationLocales = supportedLocales, interactive = defaultConfig_1.default.interactive, silent = defaultConfig_1.default.silent, json = false, disableEslint = true, rawData = undefined, } = {}) {
        if (!supportedLocales || !translationLocales) {
            throw new Error('options.supportedLocales is missing');
        }
        const localeData = (0, compileLocaleData_1.default)({
            sourceFolder,
            sourceLocale,
            translationLocales,
        });
        const translations = json
            ? (0, readJsonData_1.readJsonData)({
                localizationFolder,
                translationLocales,
                sourceLocale,
                rawData,
            })
            : (0, readXlfData_1.default)({
                localizationFolder,
                translationLocales,
            });
        const mergedData = yield mergeTranslationData({
            localeData,
            translations,
            sourceFolder,
            sourceLocale,
            interactive,
            silent,
        });
        writeFiles({
            localeData: mergedData,
            sourceFolder,
            sourceLocale,
            disableEslint,
        });
    });
}
//# sourceMappingURL=index.js.map