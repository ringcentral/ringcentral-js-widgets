"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.baseMessageTypes = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var baseMessageTypes = exports.baseMessageTypes = _ObjectMap.ObjectMap.fromKeys(['syncClosed', 'syncMinimized', 'syncSize', 'syncPosition', 'pushPresence', 'pushAdapterState', 'pushLocale', 'presenceClicked', 'presenceItemClicked', 'clickToDial', 'clickToSms', 'pushRingState', 'pushCalls', 'pushOnCurrentCallPath', 'pushOnAllCallsPath', 'navigateToCurrentCall', 'navigateToViewCalls', 'popOut']);
var _default = exports["default"] = baseMessageTypes;
//# sourceMappingURL=baseMessageTypes.js.map
