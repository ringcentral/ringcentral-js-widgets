"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dndStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var dndStatus = _ObjectMap.ObjectMap.fromObject({
  takeAllCalls: 'TakeAllCalls',
  doNotAcceptAnyCalls: 'DoNotAcceptAnyCalls',
  doNotAcceptDepartmentCalls: 'DoNotAcceptDepartmentCalls',
  takeDepartmentCallsOnly: 'TakeDepartmentCallsOnly'
});

exports.dndStatus = dndStatus;
var _default = dndStatus;
exports["default"] = _default;
//# sourceMappingURL=dndStatus.js.map
