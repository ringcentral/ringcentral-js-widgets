"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Enum = require("../../lib/Enum");

var _moduleActionTypes = require("../../enums/moduleActionTypes");

var _default = (0, _Enum.createEnum)(['alert', 'dismiss', 'dismissAll', 'update'], 'alert', _moduleActionTypes.moduleActionTypes);

exports["default"] = _default;
//# sourceMappingURL=actionTypes.js.map
