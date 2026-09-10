"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = findLoaderFiles;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const glob_1 = tslib_1.__importDefault(require("glob"));
const ramda_1 = require("ramda");
const isLoaderFile_1 = tslib_1.__importDefault(require("../isLoaderFile"));
/**
 * @function
 * @description Return all the loader file paths in the specified folder.
 * @param {String} folder
 * @returns {Promise<String[]>}
 */
function findLoaderFiles(folder) {
    return (0, ramda_1.filter)((file) => fs_extra_1.default.statSync(file).isFile() && (0, isLoaderFile_1.default)(fs_extra_1.default.readFileSync(file, 'utf8')), glob_1.default.sync(`${folder}/**`));
}
//# sourceMappingURL=index.js.map