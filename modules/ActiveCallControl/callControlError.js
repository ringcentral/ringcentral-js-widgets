"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Enum = require("../../lib/Enum");

var _default = (0, _Enum.createEnum)(['holdConflictError', 'unHoldConflictError', 'muteConflictError', 'unMuteConflictError', 'generalError'], 'callControl');

exports["default"] = _default;
//# sourceMappingURL=callControlError.js.map
