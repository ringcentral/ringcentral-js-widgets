"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJsonData = generateJsonData;
exports.generateXlfData = generateXlfData;
const tslib_1 = require("tslib");
const toPseudoString_1 = require("@ringcentral-integration/i18n/lib/toPseudoString");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const ramda_1 = require("ramda");
const xml_js_1 = tslib_1.__importDefault(require("xml-js"));
/**
 * Find the project root by traversing up the directory tree looking for a package.json
 * with the specified project name. Search is limited to a maximum of 10 levels up.
 * @param startPath - The starting directory path
 * @param projectName - The name field to look for in package.json (default: 'integration-apps')
 * @returns The project root path or null if not found within 10 levels
 */
function findProjectRoot(startPath, projectName = 'integration-apps') {
    let currentPath = path_1.default.resolve(startPath);
    const root = path_1.default.parse(currentPath).root;
    let depth = 0;
    const maxDepth = 10;
    while (currentPath !== root && depth < maxDepth) {
        const packageJsonPath = path_1.default.join(currentPath, 'package.json');
        try {
            if (fs_1.default.existsSync(packageJsonPath)) {
                const packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
                if (packageJson.name === projectName) {
                    return currentPath;
                }
            }
        }
        catch (error) {
            // Continue searching if package.json is malformed or unreadable
        }
        currentPath = path_1.default.dirname(currentPath);
        depth++;
    }
    return null;
}
function generateBaseData(allLocales) {
    return (0, ramda_1.reduce)((data, locale) => {
        data[locale] = {
            _declaration: {
                _attributes: {
                    version: '1.0',
                },
            },
            xliff: {
                _attributes: {
                    version: '1.2',
                    xmlns: 'urn:oasis:names:tc:xliff:document:1.2',
                },
            },
        };
        return data;
    }, {}, allLocales);
}
/**
 * Transform en-US data to rc-XX format with hashes
 * @param sourceFolder - The source folder path
 * @param source - The source locale data
 * @param projectRoot - The project root path that use to get the relative path of current project
 * @returns Transformed data with hash values
 */
function transformToRcXX(sourceFolder, projectRoot, source) {
    const transformed = {};
    const rootPath = projectRoot ||
        findProjectRoot(sourceFolder) ||
        path_1.default.resolve(sourceFolder, '../../');
    (0, ramda_1.forEach)((filePath) => {
        const fileData = source[filePath];
        if (fileData) {
            transformed[filePath] = {};
            /**
             * the sourcePath is the path to the source file,
             *
             * result like '/apps/micro-core/src/app/views/HeaderNavView/i18n/en-US.ts'
             *
             * should have completed path for ensure the hash is unique
             */
            const sourcePath = path_1.default
                .join(sourceFolder, filePath)
                .replace(rootPath, '');
            (0, ramda_1.forEach)((key) => {
                const value = fileData[key];
                const keyPath = key;
                const result = (0, toPseudoString_1.toHashPseudoString)(sourcePath, keyPath, value);
                transformed[filePath][key] = result;
            }, Object.keys(fileData));
        }
    }, Object.keys(source));
    return transformed;
}
// the new json export-import flow will only require exporting en-US files
function generateJsonData({ projectRoot, localeData, sourceFolder, sourceLocale, translationLocales, }) {
    const result = (0, ramda_1.reduce)((result, folderPath) => {
        const folderData = localeData[folderPath];
        // console.log(folderData, folderPath);
        const sourceFile = folderData.files[sourceLocale];
        if (sourceFile) {
            (0, ramda_1.forEach)((locale) => {
                const targetFile = folderData.files[locale];
                if (targetFile) {
                    const relativePath = path_1.default.relative(sourceFolder, path_1.default.join(folderData.path, sourceFile.file));
                    result[locale][relativePath] = (0, ramda_1.reduce)((acc, [, { key, value }]) => {
                        var _a, _b;
                        if (locale === sourceLocale) {
                            acc[key] = value;
                        }
                        else if (((_b = (_a = targetFile === null || targetFile === void 0 ? void 0 : targetFile.data) === null || _a === void 0 ? void 0 : _a.get(key)) === null || _b === void 0 ? void 0 : _b.source) === value) {
                            acc[key] = targetFile.data.get(key).value;
                        }
                        return acc;
                    }, {}, sourceFile.data);
                }
            }, translationLocales);
        }
        return result;
    }, (0, ramda_1.reduce)((acc, locale) => {
        acc[locale] = {};
        return acc;
    }, {}, translationLocales), Object.keys(localeData));
    if (result['rc-XX']) {
        // Transform en-US data to rc-XX format with hashes
        result['rc-XX'] = transformToRcXX(sourceFolder, projectRoot, result['en-US']);
    }
    return result;
}
function generateXlfData({ localeData, sourceLocale, translationLocales, sourceFolder, exportType, fillEmptyWithSource, }) {
    const isFull = exportType.toLowerCase() === 'full';
    const onlyTranslated = exportType.toLowerCase() === 'translated';
    const allLocales = translationLocales.filter((locale) => locale !== sourceLocale);
    const jsonData = (0, ramda_1.reduce)((result, folderPath) => {
        const folderData = localeData[folderPath];
        const sourceFile = folderData.files[sourceLocale];
        if (sourceFile) {
            (0, ramda_1.forEach)((locale) => {
                if (locale !== sourceLocale) {
                    const targetFile = folderData.files[locale];
                    const fileName = (targetFile && targetFile.file) ||
                        `${locale}${path_1.default.extname(sourceFile.file)}`;
                    const original = path_1.default.relative(sourceFolder, path_1.default.join(folderData.path, fileName));
                    const transUnits = (0, ramda_1.reduce)((transUnits, [key]) => {
                        if (onlyTranslated) {
                            if (targetFile &&
                                targetFile.data.get(key) &&
                                (!targetFile.data.get(key).source ||
                                    targetFile.data.get(key).source ===
                                        sourceFile.data.get(key).value)) {
                                const unit = {
                                    _attributes: {
                                        id: `[${key}]`,
                                    },
                                    source: {
                                        _text: sourceFile.data.get(key).value,
                                    },
                                    target: {
                                        _text: targetFile.data.get(key).value,
                                    },
                                };
                                transUnits.push(unit);
                            }
                        }
                        else {
                            const diff = !targetFile ||
                                !targetFile.data.get(key) ||
                                (targetFile.data.get(key).source &&
                                    targetFile.data.get(key).source !==
                                        sourceFile.data.get(key).value);
                            if ((!onlyTranslated && diff) || isFull) {
                                const unit = {
                                    _attributes: {
                                        id: `[${key}]`,
                                    },
                                    source: {
                                        _text: sourceFile.data.get(key).value,
                                    },
                                };
                                if (diff) {
                                    if (fillEmptyWithSource) {
                                        unit.target = {
                                            _text: sourceFile.data.get(key).value,
                                        };
                                    }
                                    else {
                                        unit.target = {
                                            _text: '',
                                        };
                                    }
                                }
                                else {
                                    unit.target = {
                                        _text: targetFile.data.get(key).value,
                                    };
                                }
                                transUnits.push(unit);
                            }
                        }
                        return transUnits;
                    }, [], sourceFile.data);
                    if (transUnits.length) {
                        const unit = {
                            _attributes: {
                                original,
                                'source-language': sourceLocale,
                                'target-language': locale,
                                datatype: 'plaintext',
                            },
                            body: {
                                'trans-unit': transUnits,
                            },
                        };
                        if (!result[locale].xliff.file) {
                            result[locale].xliff.file = [];
                        }
                        result[locale].xliff.file.push(unit);
                    }
                }
            }, translationLocales);
        }
        return result;
    }, generateBaseData(allLocales), Object.keys(localeData));
    return (0, ramda_1.reduce)((xlfData, locale) => {
        xlfData[locale] = xml_js_1.default.json2xml(jsonData[locale], {
            compact: true,
            spaces: 4,
        });
        return xlfData;
    }, {}, allLocales);
}
//# sourceMappingURL=index.js.map