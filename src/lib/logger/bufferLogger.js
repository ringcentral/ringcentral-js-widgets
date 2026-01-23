"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBufferLogger = exports.overrideBufferLogger = exports.getBufferLogItems = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
var _logger = require("./logger");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable @typescript-eslint/no-explicit-any */
var toBeLogged = [];
var getBufferLogItems = exports.getBufferLogItems = function getBufferLogItems() {
  return toBeLogged;
};

/**
 * when you want to use buffer logger, call this function at entry file to accumulate logs from all modules
 */
var useBufferLogger = exports.useBufferLogger = function useBufferLogger() {
  _logger.loggerInstance.fn = function (key) {
    return function () {
      var _ref;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      toBeLogged.push([key, args]);
      (_ref = console)[key].apply(_ref, args);
    };
  };
};

/**
 * when you want to use external logger, call this function to override default logger
 * @param external external logger
 * @param showDefaultConsole is show default console log when override by external logger
 *
 * ### !!!IMPORTANT!!! should work with `useBufferLogger` at entry file, if you want to catch all logs from all modules and send to external logger
 */

var overrideBufferLogger = exports.overrideBufferLogger = function overrideBufferLogger(externalLogger, showDefaultConsole) {
  var clearBuffer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // exec all log methods after get external logger
  toBeLogged.forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      args = _ref3[1];
    return externalLogger[key].apply(externalLogger, _toConsumableArray(args));
  });
  if (clearBuffer) {
    toBeLogged.length = 0;
  }
  var isShowDefaultConsole = showDefaultConsole === null || showDefaultConsole === void 0 ? void 0 : showDefaultConsole();
  _logger.loggerInstance.fn = function (key) {
    return function () {
      var _externalLogger$key;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (isShowDefaultConsole) {
        var _key3, _ref4;
        (_key3 = (_ref4 = console)[key]) === null || _key3 === void 0 ? void 0 : _key3.call.apply(_key3, [_ref4].concat(args));
      }
      (_externalLogger$key = externalLogger[key]) === null || _externalLogger$key === void 0 ? void 0 : _externalLogger$key.call.apply(_externalLogger$key, [externalLogger].concat(args));
    };
  };
};
//# sourceMappingURL=bufferLogger.js.map
