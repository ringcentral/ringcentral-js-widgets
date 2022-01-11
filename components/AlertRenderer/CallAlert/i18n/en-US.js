"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _callErrors$emergency;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _callErrors["default"].emergencyNumber, 'Emergency calling is not available. Please use another phone to contact emergency services'), _defineProperty(_callErrors$emergency, _callErrors["default"].noToNumber, 'Please enter a valid phone number.'), _defineProperty(_callErrors$emergency, _callErrors["default"].noAreaCode, 'Please set {areaCodeLink} to use 7-digit local phone numbers.'), _defineProperty(_callErrors$emergency, _callErrors["default"].connectFailed, 'Connection failed. Please try again later.'), _defineProperty(_callErrors$emergency, _callErrors["default"].internalError, 'Cannot connect due to internal errors. Please try again later.'), _defineProperty(_callErrors$emergency, _callErrors["default"].notAnExtension, 'The extension number does not exist.'), _defineProperty(_callErrors$emergency, _callErrors["default"].networkError, 'Cannot connect due to network issues. Please try again later.'), _defineProperty(_callErrors$emergency, _callErrors["default"].noInternational, "You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."), _defineProperty(_callErrors$emergency, _callErrors["default"].noRingoutEnable, 'Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade.'), _defineProperty(_callErrors$emergency, "areaCode", 'area code'), _defineProperty(_callErrors$emergency, "telus911", 'Emergency dialing is not supported.'), _callErrors$emergency);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
