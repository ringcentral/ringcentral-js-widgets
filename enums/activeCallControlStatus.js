"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.activeCallControlStatus = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var activeCallControlStatus = exports.activeCallControlStatus = _ObjectMap.ObjectMap.fromObject({
  hold: 'Hold',
  setUp: 'Setup',
  proceeding: 'Proceeding'
});
var _default = exports["default"] = activeCallControlStatus;
//# sourceMappingURL=activeCallControlStatus.js.map
