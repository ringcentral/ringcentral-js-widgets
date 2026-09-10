"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = importLocaleFile;
const tslib_1 = require("tslib");
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
const parser_1 = require("@babel/parser");
const formatLocale_1 = tslib_1.__importDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
// @ts-ignore
const prettier_1 = tslib_1.__importDefault(require("prettier"));
const defaultConfig_1 = tslib_1.__importDefault(require("../defaultConfig"));
const isLocaleFile_1 = tslib_1.__importStar(require("../isLocaleFile"));
const parseLocaleFile_1 = tslib_1.__importDefault(require("../parseLocaleFile"));
function getAnnotations(source) {
    return source
        .map(([key, value]) => `// @key: @#@${JSON.stringify(key)}@#@ @source: @#@${JSON.stringify(value)}@#@`)
        .join('\n');
}
function normalizeRawData(rawData = {}) {
    const output = new Map();
    Object.keys(rawData).forEach((key) => {
        const entry = rawData[key];
        if (entry === undefined) {
            return;
        }
        if (typeof entry === 'object' &&
            !Array.isArray(entry) &&
            ('value' in entry || 'source' in entry)) {
            if (entry.value !== undefined) {
                output.set(key, {
                    hasSource: 'source' in entry,
                    key,
                    source: entry.source,
                    value: entry.value,
                });
            }
            return;
        }
        output.set(key, {
            hasSource: false,
            key,
            value: entry,
        });
    });
    return output;
}
function resolveLocalePaths({ sourceFolder, targetRelativePath, targetLocale, sourceLocale, }) {
    const absoluteInputPath = path_1.default.resolve(sourceFolder, targetRelativePath);
    const fileLocale = (0, isLocaleFile_1.getLocaleFromFilePath)(targetRelativePath);
    if (!fileLocale) {
        throw new Error(`options.targetRelativePath must be a valid locale file: '${targetRelativePath}'`);
    }
    const formattedTargetLocale = (0, formatLocale_1.default)(targetLocale);
    const formattedSourceLocale = (0, formatLocale_1.default)(sourceLocale ||
        (fileLocale === formattedTargetLocale
            ? defaultConfig_1.default.sourceLocale
            : fileLocale));
    return {
        sourceLocale: formattedSourceLocale,
        sourcePath: fileLocale === formattedSourceLocale
            ? absoluteInputPath
            : (0, isLocaleFile_1.replaceLocaleInFilePath)(absoluteInputPath, formattedSourceLocale),
        targetPath: fileLocale === formattedTargetLocale
            ? absoluteInputPath
            : (0, isLocaleFile_1.replaceLocaleInFilePath)(absoluteInputPath, formattedTargetLocale),
    };
}
function importLocaleFile(_a) {
    return tslib_1.__awaiter(this, arguments, void 0, function* ({ targetLocale, targetRelativePath, sourceFolder = defaultConfig_1.default.sourceFolder, sourceLocale, disableEslint = true, rawData = {}, }) {
        if (!targetRelativePath) {
            throw new Error('options.targetRelativePath is missing');
        }
        const { sourceLocale: resolvedSourceLocale, sourcePath, targetPath } = resolveLocalePaths({
            sourceFolder,
            sourceLocale,
            targetRelativePath,
            targetLocale,
        });
        if (!(0, isLocaleFile_1.default)(sourcePath, resolvedSourceLocale)) {
            throw new Error(`'${sourcePath}' is not a valid '${resolvedSourceLocale}' locale file`);
        }
        if (!(yield fs_extra_1.default.pathExists(sourcePath))) {
            throw new Error(`Source locale file not found: '${sourcePath}'`);
        }
        const sourceData = (0, parseLocaleFile_1.default)(yield fs_extra_1.default.readFile(sourcePath, 'utf8'));
        const targetData = (yield fs_extra_1.default.pathExists(targetPath)) && (0, isLocaleFile_1.default)(targetPath, targetLocale)
            ? (0, parseLocaleFile_1.default)(yield fs_extra_1.default.readFile(targetPath, 'utf8'))
            : {
                data: new Map(),
            };
        const cleanedData = new Map();
        targetData.data.forEach((value, key) => {
            if (sourceData.data.has(key) &&
                sourceData.data.get(key).value === value.source) {
                cleanedData.set(key, value);
            }
        });
        const importedData = normalizeRawData(rawData);
        importedData.forEach((value, key) => {
            const sourceEntry = sourceData.data.get(key);
            if (!sourceEntry) {
                return;
            }
            if (value.hasSource && value.source !== sourceEntry.value) {
                return;
            }
            cleanedData.set(key, {
                hasSource: true,
                key,
                source: sourceEntry.value,
                value: value.value,
            });
        });
        const ast = (0, parser_1.parse)(sourceData.content, {
            sourceType: 'module',
            plugins: ['typescript'],
        });
        const annotations = new Map();
        function updateObjectExpression(node) {
            const properties = node.properties.filter((prop) => {
                const wrapInBracket = prop.key.type === 'MemberExpression' ||
                    prop.key.type === 'TemplateLiteral';
                const key = wrapInBracket
                    ? `[${(0, generator_1.default)(prop.key).code}]`
                    : (0, generator_1.default)(prop.key).code;
                const entry = cleanedData.get(key);
                if (entry && entry.value !== undefined) {
                    prop.value = {
                        type: 'StringLiteral',
                        value: entry.value,
                        extra: {
                            raw: JSON.stringify(entry.value),
                            rawValue: entry.value,
                        },
                    };
                    annotations.set(key, sourceData.data.get(key).value);
                    return true;
                }
                return false;
            });
            node.properties = properties;
        }
        const defaultExport = ast.program.body.find((item) => item.type === 'ExportDefaultDeclaration');
        if (defaultExport) {
            if (defaultExport.declaration.type === 'ObjectExpression') {
                updateObjectExpression(defaultExport.declaration);
            }
            else if (defaultExport.declaration.type === 'TSAsExpression') {
                const nested = defaultExport.declaration.expression;
                if (nested.type === 'ObjectExpression') {
                    updateObjectExpression(nested);
                }
            }
        }
        const eslint = disableEslint ? '/* eslint-disable */\n' : '';
        const { code } = (0, generator_1.default)(ast);
        const output = prettier_1.default.format(`${eslint}${code}\n\n${getAnnotations(Array.from(annotations.entries()))}\n`, {
            parser: 'typescript',
            bracketSpacing: true,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
            bracketSameLine: false,
            endOfLine: 'auto',
        });
        yield fs_extra_1.default.ensureDir(path_1.default.dirname(targetPath));
        yield fs_extra_1.default.writeFile(targetPath, output);
    });
}
//# sourceMappingURL=index.js.map