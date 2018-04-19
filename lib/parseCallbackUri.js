'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = parseCallbackUri;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param {String} callbackUri
 * @return {Object}
 */
function parseCallbackUri(callbackUri) {
  var _url$parse = _url2.default.parse(callbackUri, true),
      query = _url$parse.query,
      hash = _url$parse.hash;

  var hashObject = hash ? _qs2.default.parse(hash.replace(/^#/, '')) : {};
  if (query.error || hashObject.error) {
    var error = new Error(query.error || hashObject.error);
    for (var key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        error[key] = query[key];
      }
      if (Object.prototype.hasOwnProperty.call(hashObject, key)) {
        error[key] = query[key];
      }
    }
    throw error;
  }

  return (0, _extends3.default)({}, query, hashObject);
}
//# sourceMappingURL=parseCallbackUri.js.map
