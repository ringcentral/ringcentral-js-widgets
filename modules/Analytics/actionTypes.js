"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyticsAcionTypes = void 0;

var _Enum = require("../../lib/Enum");

var _moduleActionTypes = require("../../enums/moduleActionTypes");

var analyticsAcionTypes = (0, _Enum.createEnum)(['clear'], 'analyticsAcionTypes', _moduleActionTypes.moduleActionTypes);
exports.analyticsAcionTypes = analyticsAcionTypes;
//# sourceMappingURL=actionTypes.js.map
