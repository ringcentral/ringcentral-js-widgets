'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchResult = exports.parseCacheKey = exports.getCacheKey = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCacheKey = exports.getCacheKey = function getCacheKey(sourceName, query) {
  return (0, _stringify2.default)([sourceName, query]);
};
var parseCacheKey = exports.parseCacheKey = function parseCacheKey(cacheKey) {
  return JSON.parse(cacheKey);
};

var matchResult = exports.matchResult = {
  notFound: 'n',
  found: 'y'
};
//# sourceMappingURL=helpers.js.map
