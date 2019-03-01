"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("ringcentral-integration/modules/Call/callErrors"));

var _callErrors$noToNumbe;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$noToNumbe = {}, _defineProperty(_callErrors$noToNumbe, _callErrors.default.noToNumber, "Please enter a valid phone number."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.noAreaCode, "Please set {areaCodeLink} to use 7-digit local phone numbers."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.specialNumber, "Dialing emergency or special service numbers is not supported."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.connectFailed, "Connection failed. Please try again later."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.internalError, "Cannot connect due to internal errors. Please try again later."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.notAnExtension, "The extension number does not exist."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.networkError, "Cannot connect due to network issues. Please try again later."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.noInternational, "You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."), _defineProperty(_callErrors$noToNumbe, _callErrors.default.noRingoutEnable, "Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."), _defineProperty(_callErrors$noToNumbe, "areaCode", "area code"), _defineProperty(_callErrors$noToNumbe, "telus911", "Emergency dialing is not supported."), _callErrors$noToNumbe); // @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.specialNumber]"@#@ @source: @#@"Dialing emergency or special service numbers is not supported."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports.default = _default;
//# sourceMappingURL=en-CA.js.map
