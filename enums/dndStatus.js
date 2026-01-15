"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dndStatus = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var dndStatus = exports.dndStatus = _ObjectMap.ObjectMap.fromObject({
  takeAllCalls: 'TakeAllCalls',
  doNotAcceptAnyCalls: 'DoNotAcceptAnyCalls',
  doNotAcceptDepartmentCalls: 'DoNotAcceptDepartmentCalls',
  takeDepartmentCallsOnly: 'TakeDepartmentCallsOnly'
});
//# sourceMappingURL=dndStatus.js.map
