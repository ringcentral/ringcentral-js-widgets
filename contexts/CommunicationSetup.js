"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCommunicationSetupContext = exports.CommunicationSetupContext = void 0;
var _react = require("react");
var CommunicationSetupContext = /*#__PURE__*/(0, _react.createContext)({});
exports.CommunicationSetupContext = CommunicationSetupContext;
var useCommunicationSetupContext = function useCommunicationSetupContext() {
  return (0, _react.useContext)(CommunicationSetupContext);
};
exports.useCommunicationSetupContext = useCommunicationSetupContext;
//# sourceMappingURL=CommunicationSetup.js.map
