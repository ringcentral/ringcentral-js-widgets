"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Enum = _interopRequireDefault(require("ringcentral-integration/lib/Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _Enum.default(['syncClosed', 'syncMinimized', 'syncSize', 'syncPosition', 'pushPresence', 'pushAdapterState', 'pushLocale', 'presenceClicked', 'presenceItemClicked', 'clickToDial', 'clickToSms', 'pushRingState', 'pushCalls', 'pushOnCurrentCallPath', 'pushOnAllCallsPath', 'navigateToCurrentCall', 'navigateToViewCalls']);

exports.default = _default;
//# sourceMappingURL=baseMessageTypes.js.map
