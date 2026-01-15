"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = localeLoader;
const tslib_1 = require("tslib");
const toPseudoString_1 = require("@ringcentral-integration/i18n/lib/toPseudoString");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
// @ts-ignore
const loader_utils_1 = tslib_1.__importDefault(require("loader-utils"));
const path_1 = tslib_1.__importDefault(require("path"));
const generateLoaderContent_1 = tslib_1.__importDefault(require("../generateLoaderContent"));
const isLoaderFile_1 = tslib_1.__importStar(require("../isLoaderFile"));
const isLocaleFile_1 = tslib_1.__importStar(require("../isLocaleFile"));
const parseLocaleFile_1 = tslib_1.__importDefault(require("../parseLocaleFile"));
/**
 *
 * locale loader can work with options like below
 * ```
 * {
 *   loader: '@ringcentral-integration/locale-loader',
 *   options: {
 *     supportedLocales,
 *     chunk,
 *   },
 * }
 * ```
 *
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
function localeLoader(content) {
    var _a;
    const callback = this.async();
    const options = loader_utils_1.default.getOptions(this) || {};
    const supportedLocales = options.supportedLocales || [];
    const chunk = !(0, isLoaderFile_1.noChunks)(content) && ((_a = options.chunk) !== null && _a !== void 0 ? _a : true);
    const pseudo = options.pseudo || false;
    if ((0, isLoaderFile_1.default)(content)) {
        (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (pseudo) {
                const pseudoPath = path_1.default.resolve(this.context, 'rc-XX.ts');
                if (!(yield fs_extra_1.default.pathExists(pseudoPath))) {
                    yield fs_extra_1.default.writeFile(pseudoPath, '/* pseudo */\r\n');
                }
            }
            const files = (yield fs_extra_1.default.readdir(this.context))
                .filter((f) => (0, isLocaleFile_1.default)(f))
                .filter((0, isLocaleFile_1.localeFilter)(supportedLocales));
            callback(null, (0, generateLoaderContent_1.default)({
                files,
                chunk,
                supportedLocales,
                pseudo,
            }));
        }))();
    }
    else if (pseudo && (0, isLoaderFile_1.isPseudoFile)(content)) {
        (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const enPath = path_1.default.resolve(this.context, 'en-US.ts');
            if (!(yield fs_extra_1.default.pathExists(enPath))) {
                throw new Error('en-US.ts file not found');
            }
            const rawContent = yield fs_extra_1.default.readFile(enPath, 'utf8');
            const parsedResult = (0, parseLocaleFile_1.default)(rawContent);
            const transformed = {};
            const rootPath = path_1.default.resolve(__dirname, '../../../../');
            /**
             * the sourcePath is the path to the source file,
             *
             * result like '/apps/micro-core/src/app/views/HeaderNavView/i18n/en-US.ts'
             *
             * should have completed path for ensure the hash is unique
             */
            const sourcePath = enPath.replace(rootPath, '');
            const sourceData = parsedResult.data;
            sourceData.forEach((value, key) => {
                const keyPath = key;
                const val = (0, toPseudoString_1.toHashPseudoString)(sourcePath, keyPath, value.value);
                transformed[key] = `[${val}]`;
            });
            callback(null, `export default ${JSON.stringify(transformed)}`);
        }))();
    }
    else {
        callback(null, content);
    }
}
//# sourceMappingURL=index.js.map