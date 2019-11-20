"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callLogMessages = _interopRequireDefault(require("ringcentral-integration/enums/callLogMessages"));

var _callLogMessages$logC;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callLogMessages$logC = {}, _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logCallLogFailed, 'Failed to load call log form due to unexpected error. Please refresh the page and try again.'), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logFailed, "Sorry, we've failed to log your call. Please try again later."), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].fieldRequired, 'Mandatory fields are required.'), _callLogMessages$logC);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
