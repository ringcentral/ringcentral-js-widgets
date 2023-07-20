"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseCallbackUri;
var _url = _interopRequireDefault(require("url"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @function
 * @param {String} callbackUri
 * @return {String} code
 */
function parseCallbackUri(callbackUri) {
  var _url$parse = _url["default"].parse(callbackUri, true),
    query = _url$parse.query;
  if (query.error) {
    var error = new Error(query.error);
    for (var key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        error[key] = query[key];
      }
    }
    throw error;
  }
  return query.code;
}
//# sourceMappingURL=parseCallbackUri.js.map
