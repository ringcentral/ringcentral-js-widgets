'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findLoaderFiles;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _ramda = require('ramda');

var _isLoaderFile = require('../isLoaderFile');

var _isLoaderFile2 = _interopRequireDefault(_isLoaderFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @description Return all the loader file paths in the specified folder.
 * @param {String} folder
 * @returns {Promise<String[]>}
 */
function findLoaderFiles(folder) {
  return (0, _ramda.filter)(function (file) {
    return _fsExtra2.default.statSync(file).isFile() && (0, _isLoaderFile2.default)(_fsExtra2.default.readFileSync(file, 'utf8'));
  }, _glob2.default.sync(folder + '/**'));
}
//# sourceMappingURL=index.js.map
