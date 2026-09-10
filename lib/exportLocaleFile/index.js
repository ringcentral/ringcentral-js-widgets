"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exportLocaleFile;
const tslib_1 = require("tslib");
const formatLocale_1 = tslib_1.__importDefault(require("@ringcentral-integration/i18n/lib/formatLocale"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const defaultConfig_1 = tslib_1.__importDefault(require("../defaultConfig"));
const isLocaleFile_1 = tslib_1.__importStar(require("../isLocaleFile"));
const parseLocaleFile_1 = tslib_1.__importDefault(require("../parseLocaleFile"));
function exportLocaleFile({ sourceRelativePath, sourceFolder = defaultConfig_1.default.sourceFolder, sourceLocale, }) {
    if (!sourceRelativePath) {
        throw new Error('options.sourceRelativePath is missing');
    }
    const fileLocale = (0, isLocaleFile_1.getLocaleFromFilePath)(sourceRelativePath) || defaultConfig_1.default.sourceLocale;
    const expectedLocale = (0, formatLocale_1.default)(sourceLocale || fileLocale);
    if (!(0, isLocaleFile_1.default)(sourceRelativePath, expectedLocale)) {
        throw new Error(`options.sourceRelativePath must be a valid '${expectedLocale}' locale file`);
    }
    const sourcePath = path_1.default.resolve(sourceFolder, sourceRelativePath);
    const { data } = (0, parseLocaleFile_1.default)(fs_extra_1.default.readFileSync(sourcePath, 'utf8'));
    const result = {};
    data.forEach(({ key, value }) => {
        result[key] = value;
    });
    return result;
}
//# sourceMappingURL=index.js.map