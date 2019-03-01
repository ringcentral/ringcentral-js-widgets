"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HashMap = _interopRequireDefault(require("../../lib/HashMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _HashMap.default({
  takeAllCalls: 'TakeAllCalls',
  doNotAcceptAnyCalls: 'DoNotAcceptAnyCalls',
  doNotAcceptDepartmentCalls: 'DoNotAcceptDepartmentCalls',
  takeDepartmentCallsOnly: 'TakeDepartmentCallsOnly'
});

exports.default = _default;
//# sourceMappingURL=dndStatus.js.map
