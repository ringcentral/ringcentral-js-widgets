"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _connectivityMonitorMessages = _interopRequireDefault(require("ringcentral-integration/modules/ConnectivityMonitor/connectivityMonitorMessages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _defineProperty({}, _connectivityMonitorMessages.default.disconnected, 'Network connection is lost.');

exports.default = _default;
//# sourceMappingURL=en-US.js.map
