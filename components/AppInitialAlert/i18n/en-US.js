"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _errorMessages = _interopRequireDefault(require("ringcentral-integration/modules/AvailabilityMonitor/errorMessages"));

var _errorMessages$appIni;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_errorMessages$appIni = {}, _defineProperty(_errorMessages$appIni, _errorMessages["default"].appInitialError, 'Server error, connecting...'), _defineProperty(_errorMessages$appIni, _errorMessages["default"].serviceLimited, 'Something goes wrong in server make your App limited. App will recover automatically when available.'), _errorMessages$appIni);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
