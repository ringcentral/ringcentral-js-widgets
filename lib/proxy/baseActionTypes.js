"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Enum = _interopRequireDefault(require("../Enum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _Enum.default(['action', 'execute', 'sync', 'initSync', 'syncSuccess', 'initModule'], 'proxy');

exports.default = _default;
//# sourceMappingURL=baseActionTypes.js.map
