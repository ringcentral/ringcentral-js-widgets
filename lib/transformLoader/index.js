"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = transformLoader;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const through2_1 = tslib_1.__importDefault(require("through2"));
const generateLoaderContent_1 = tslib_1.__importDefault(require("../generateLoaderContent"));
const isLoaderFile_1 = tslib_1.__importStar(require("../isLoaderFile"));
const isLocaleFile_1 = tslib_1.__importDefault(require("../isLocaleFile"));
/**
 * - `supportedLocales` to support locales
 * * `chunk`
 *   * be `boolean` will toggle that chunk mode.
 *   * be `function` can be method with `(locale: string) => boolean`, provide you a way to specify which language be chunked.
 *
 * @example
 * ```ts
 * chunk: (local: string) => {
 *   return local !== 'en-US'; // en-US will not be chunked, that will be package into main script directly
 * }
 * ```
 */
function transformLoader(options = {}) {
    return through2_1.default.obj(function transform(file, enc, done) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            if (file.isNull()) {
                done();
                return;
            }
            const content = file.contents.toString(enc);
            const supportedLocales = options.supportedLocales || [];
            const chunk = !(0, isLoaderFile_1.noChunks)(content) && ((_a = options.chunk) !== null && _a !== void 0 ? _a : true);
            if ((0, isLoaderFile_1.default)(content)) {
                const folderPath = path_1.default.dirname(file.path);
                const files = (yield fs_extra_1.default.readdir(folderPath)).filter(isLocaleFile_1.default);
                const loader = (0, generateLoaderContent_1.default)({
                    files,
                    chunk,
                    supportedLocales,
                });
                file.contents = Buffer.from(loader, 'utf8');
            }
            this.push(file);
            done();
        });
    });
}
//# sourceMappingURL=index.js.map