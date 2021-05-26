"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractUrl = extractUrl;
exports.isHAError = isHAError;
exports.generateRandomNumber = generateRandomNumber;
exports.isHAEnabledAPI = isHAEnabledAPI;
exports.HA_ERROR_STATUS = exports.HA_ERROR_CODE = exports.TMP_HA_ERROR_CODE = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.match");

var _ramda = require("ramda");

var _highAvailabilityAPI = _interopRequireDefault(require("./highAvailabilityAPI"));

var _availabilityStatus = _interopRequireDefault(require("./availabilityStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TMP_HA_ERROR_CODE = 'MaintenanceMode';
exports.TMP_HA_ERROR_CODE = TMP_HA_ERROR_CODE;
var HA_ERROR_CODE = 'CMN-211';
exports.HA_ERROR_CODE = HA_ERROR_CODE;
var HA_ERROR_STATUS = 503;
exports.HA_ERROR_STATUS = HA_ERROR_STATUS;

function extractUrl(_ref) {
  var url = _ref.url;

  if (url === '') {
    return '';
  }

  var filteredUrl = url.match(/\/restapi(.*)/gi) && url.match(/\/restapi(.*)/gi)[0] || '';
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
    } // Result from `status` and `errorCode`.

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
 *
 * @export
 * @returns 1 ~ 120 seconds
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
  var _iterator2 = _createForOfIteratorHelper(_highAvailabilityAPI["default"]),
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
 * @export
 * @param {*} { url, method }
 * @returns boolean
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
    console.error("url: ".concat(url, " method: ").concat(method, " is not set in high or limited available API")); // If a core API is not in the list, the request should be launched.

    return true;
  }

  return condition === _availabilityStatus["default"].HIGH;
}
//# sourceMappingURL=availabilityMonitorHelper.js.map
