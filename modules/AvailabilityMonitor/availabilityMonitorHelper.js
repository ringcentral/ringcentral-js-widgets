"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractUrl = extractUrl;
exports.isHAError = isHAError;
exports.generateRandomNumber = generateRandomNumber;
exports.isHAEnabledAPI = isHAEnabledAPI;
exports.PRESENCE_REG_EXP = exports.HA_ERROR_STATUS = exports.HA_ERROR_CODE = void 0;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.match");

var _ramda = require("ramda");

var _highAvailabilityAPI = _interopRequireDefault(require("./highAvailabilityAPI"));

var _availabilityStatus = _interopRequireDefault(require("./availabilityStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Sophie, edited by Bruce
 */
var HA_ERROR_CODE = 'CMN-211';
exports.HA_ERROR_CODE = HA_ERROR_CODE;
var HA_ERROR_STATUS = 503;
exports.HA_ERROR_STATUS = HA_ERROR_STATUS;
var PRESENCE_REG_EXP = /\/restapi\/v1.0\/account\/~\/extension\/\d*\/presence/gi;
exports.PRESENCE_REG_EXP = PRESENCE_REG_EXP;

function extractUrl(_ref) {
  var url = _ref.url;
  var filteredUrl = url.match(/\/restapi(.*)/gi) && url.match(/\/restapi(.*)/gi)[0] || '';
  var splitUrl = filteredUrl.split('?')[0] || '';
  return splitUrl;
} // Check if this damn error is HA error.


function isHAError(error) {
  var status = (0, _ramda.pathOr)(-1, ['apiResponse', '_response', 'status'], error);
  var errorCode = (0, _ramda.pathOr)('N/A', ['apiResponse', '_json', 'errorCode'], error);
  var isHAErrorIn = (0, _ramda.indexOf)(HA_ERROR_CODE, (0, _ramda.pathOr)([], ['apiResponse', '_json', 'errors'], error)) > -1;
  return status === HA_ERROR_STATUS && (errorCode === HA_ERROR_CODE || isHAErrorIn);
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
  var condition = (0, _ramda.pathOr)('N/A', [filteredUrl, method], _highAvailabilityAPI.default);

  if (PRESENCE_REG_EXP.test(filteredUrl) || condition === _availabilityStatus.default.HIGH) {
    return true;
  } else if (condition === _availabilityStatus.default.LIMITED) {
    return false;
  }

  console.error("url: ".concat(url, " method: ").concat(method, " is not set in high or limited available API"));
  return false;
}
//# sourceMappingURL=availabilityMonitorHelper.js.map
