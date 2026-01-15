"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCommunicationSetupContext = exports.CommunicationSetupContext = void 0;
var _react = require("react");
var CommunicationSetupContext = exports.CommunicationSetupContext = /*#__PURE__*/(0, _react.createContext)({});
var useCommunicationSetupContext = exports.useCommunicationSetupContext = function useCommunicationSetupContext() {
  return (0, _react.useContext)(CommunicationSetupContext);
};
//# sourceMappingURL=CommunicationSetup.js.map
