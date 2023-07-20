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
    // @ts-expect-error TS(2345): Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
    var error = new Error(query.error);
    for (var key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[key] = query[key];
      }
    }
    throw error;
  }
  return query.code;
}
//# sourceMappingURL=index.js.map
