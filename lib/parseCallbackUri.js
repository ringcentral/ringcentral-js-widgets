"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseCallbackUri;
var _url = _interopRequireDefault(require("url"));
var _qs = _interopRequireDefault(require("qs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @function
 * @param {String} callbackUri
 * @return {Object}
 */
function parseCallbackUri(callbackUri) {
  var _url$parse = _url["default"].parse(callbackUri, true),
    query = _url$parse.query,
    hash = _url$parse.hash;
  var hashObject = hash ? _qs["default"].parse(hash.replace(/^#/, '')) : {};
  if (query.error || hashObject.error) {
    // @ts-expect-error TS(2345): Argument of type 'string | ParsedQs | string[] | P... Remove this comment to see the full error message
    var error = new Error(query.error || hashObject.error);
    // eslint-disable-next-line guard-for-in
    for (var key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[key] = query[key];
      }
      if (Object.prototype.hasOwnProperty.call(hashObject, key)) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        error[key] = query[key];
      }
    }
    throw error;
  }
  return _objectSpread(_objectSpread({}, query), hashObject);
}
//# sourceMappingURL=parseCallbackUri.js.map
