"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findLoaderFiles;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _glob = _interopRequireDefault(require("glob"));

var _ramda = require("ramda");

var _isLoaderFile = _interopRequireDefault(require("../isLoaderFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @description Return all the loader file paths in the specified folder.
 * @param {String} folder
 * @returns {Promise<String[]>}
 */
function findLoaderFiles(folder) {
  return (0, _ramda.filter)(function (file) {
    return _fsExtra.default.statSync(file).isFile() && (0, _isLoaderFile.default)(_fsExtra.default.readFileSync(file, 'utf8'));
  }, _glob.default.sync("".concat(folder, "/**")));
}
//# sourceMappingURL=index.js.map
