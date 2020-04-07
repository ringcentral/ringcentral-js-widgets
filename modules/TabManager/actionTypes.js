"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moduleActionTypes = require("../../enums/moduleActionTypes");

var _Enum = require("../../lib/Enum");

var _default = (0, _Enum.createEnum)(['mainTabIdChanged', 'event'], 'tabManager', _moduleActionTypes.moduleActionTypes);

exports["default"] = _default;
//# sourceMappingURL=actionTypes.js.map
