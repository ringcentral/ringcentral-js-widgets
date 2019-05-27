"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseCallbackUri;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.regexp.replace");

var _url = _interopRequireDefault(require("url"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  return _objectSpread({}, query, hashObject);
}
//# sourceMappingURL=parseCallbackUri.js.map
