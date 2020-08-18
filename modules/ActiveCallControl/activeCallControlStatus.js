"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.activeCallControlStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var activeCallControlStatus = _ObjectMap.ObjectMap.fromObject({
  hold: 'Hold',
  setUp: 'Setup',
  proceeding: 'Proceeding'
});

exports.activeCallControlStatus = activeCallControlStatus;
var _default = activeCallControlStatus;
exports["default"] = _default;
//# sourceMappingURL=activeCallControlStatus.js.map
