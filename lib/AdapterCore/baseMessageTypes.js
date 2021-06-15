"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.baseMessageTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var baseMessageTypes = _ObjectMap.ObjectMap.fromKeys(['syncClosed', 'syncMinimized', 'syncSize', 'syncPosition', 'pushPresence', 'pushAdapterState', 'pushLocale', 'presenceClicked', 'presenceItemClicked', 'clickToDial', 'clickToSms', 'pushRingState', 'pushCalls', 'pushOnCurrentCallPath', 'pushOnAllCallsPath', 'navigateToCurrentCall', 'navigateToViewCalls', 'popOut']);

exports.baseMessageTypes = baseMessageTypes;
var _default = baseMessageTypes;
exports["default"] = _default;
//# sourceMappingURL=baseMessageTypes.js.map
