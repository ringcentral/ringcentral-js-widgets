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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TMP_HA_ERROR_CODE = exports.HA_ERROR_STATUS = exports.HA_ERROR_CODE = void 0;
exports.extractUrl = extractUrl;
exports.generateRandomNumber = generateRandomNumber;
exports.isHAEnabledAPI = isHAEnabledAPI;
exports.isHAError = isHAError;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
var _ramda = require("ramda");
var _availabilityStatus = require("./availabilityStatus");
var _highAvailabilityAPI = require("./highAvailabilityAPI");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var TMP_HA_ERROR_CODE = exports.TMP_HA_ERROR_CODE = 'MaintenanceMode';
var HA_ERROR_CODE = exports.HA_ERROR_CODE = 'CMN-211';
var HA_ERROR_STATUS = exports.HA_ERROR_STATUS = 503;
function extractUrl(_ref) {
  var _url$match;
  var url = _ref.url;
  if (url === '') {
    return '';
  }
  var filteredUrl = url.match(/\/restapi(.*)/gi) && ((_url$match = url.match(/\/restapi(.*)/gi)) === null || _url$match === void 0 ? void 0 : _url$match[0]) || '';
  var splitUrl = filteredUrl.split('?')[0] || '';
  return splitUrl;
}

/** Check if this damn error is HA error. */
function isHAError(error) {
  var status = (0, _ramda.pathOr)(-1, ['response', 'status'], error);
  var errors = (0, _ramda.pathOr)([], ['response', '_json', 'errors'], error);
  var errorCodeIn = false;
  var _iterator = _createForOfIteratorHelper(errors),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var e = _step.value;
      if ((0, _ramda.pathOr)('', ['errorCode'], e) === HA_ERROR_CODE) {
        errorCodeIn = true;
        break;
      }
    }

    // Result from `status` and `errorCode`.
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var validHAError = status === HA_ERROR_STATUS && errorCodeIn;
  if (!validHAError) {
    // Result from temp error code, expecially for `presence`.
    var resErrorCode = (0, _ramda.pathOr)(null, ['response', '_json', 'errorCode'], error);
    validHAError = resErrorCode === TMP_HA_ERROR_CODE;
  }
  return validHAError;
}

/**
 * Generate 1 ~ 120 seconds
 */
function generateRandomNumber() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 120;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Math.random() * (max - min) + min;
}

/**
 * Get availability level by path of url
 * TODO: Use lru cache to improve performance?
 */
function getAvailabilityLevel(path, method) {
  var _iterator2 = _createForOfIteratorHelper(_highAvailabilityAPI.highAvailabilityAPI),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var api = _step2.value;
      if (path.match(api.reg) && method in api) {
        return api[method];
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

/**
 * Check if an api is *High* or *Limited*
 *
 */
function isHAEnabledAPI(_ref2) {
  var url = _ref2.url,
    method = _ref2.method;
  var filteredUrl = extractUrl({
    url: url
  });
  if (!filteredUrl) {
    return false;
  }
  var condition = getAvailabilityLevel(filteredUrl, method);
  if (!condition) {
    console.error("url: ".concat(url, " method: ").concat(method, " is not set in high or limited available API"));
    // If a core API is not in the list, the request should be launched.
    return true;
  }
  return condition === _availabilityStatus.availability.HIGH;
}
//# sourceMappingURL=availabilityMonitorHelper.js.map
