"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractUrl = extractUrl;
exports.isHAError = isHAError;
exports.generateRandomNumber = generateRandomNumber;
exports.isHAEnabledAPI = isHAEnabledAPI;
exports.HA_ERROR_STATUS = exports.HA_ERROR_CODE = exports.TMP_HA_ERROR_CODE = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.match");

var _ramda = require("ramda");

var _highAvailabilityAPI = _interopRequireDefault(require("./highAvailabilityAPI"));

var _availabilityStatus = _interopRequireDefault(require("./availabilityStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by Sophie, edited by Bruce
 */
var TMP_HA_ERROR_CODE = 'MaintenanceMode';
exports.TMP_HA_ERROR_CODE = TMP_HA_ERROR_CODE;
var HA_ERROR_CODE = 'CMN-211';
exports.HA_ERROR_CODE = HA_ERROR_CODE;
var HA_ERROR_STATUS = 503;
exports.HA_ERROR_STATUS = HA_ERROR_STATUS;

function extractUrl(_ref) {
  var url = _ref.url;
  var filteredUrl = url.match(/\/restapi(.*)/gi) && url.match(/\/restapi(.*)/gi)[0] || '';
  var splitUrl = filteredUrl.split('?')[0] || '';
  return splitUrl;
}
/** Check if this damn error is HA error. */


function isHAError(error) {
  var status = (0, _ramda.pathOr)(-1, ['apiResponse', '_response', 'status'], error);
  var errors = (0, _ramda.pathOr)([], ['apiResponse', '_json', 'errors'], error);
  var errorCodeIn = false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = errors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var e = _step.value;

      if ((0, _ramda.pathOr)('', ['errorCode'], e) === HA_ERROR_CODE) {
        errorCodeIn = true;
        break;
      }
    } // Result from `status` and `errorCode`.

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var validHAError = status === HA_ERROR_STATUS && errorCodeIn;

  if (!validHAError) {
    // Result from temp error code, expecially for `presence`.
    var resErrorCode = (0, _ramda.pathOr)(null, ['apiResponse', '_json', 'errorCode'], error);
    validHAError = resErrorCode === TMP_HA_ERROR_CODE;
  }

  return validHAError;
}
/**
 * Generate 0 ~ 3000 seconds
 *
 * @export
 * @returns 0 ~ 3000 seconds
 */


function generateRandomNumber() {
  return Math.floor(Math.random() * 3000);
}
/**
 * Get availability level by path of url
 * TODO: Use lru cache to improve performance?
 */


function getAvailabilityLevel(path, method) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _highAvailabilityAPI["default"][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var api = _step2.value;

      if (path.match(api.reg) && method in api) {
        return api[method];
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
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
    console.error("url: ".concat(url, " method: ").concat(method, " is not set in high or limited available API"));
    return false;
  }

  return condition === _availabilityStatus["default"].HIGH;
}
//# sourceMappingURL=availabilityMonitorHelper.js.map
