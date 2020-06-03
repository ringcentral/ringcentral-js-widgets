"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Enum = require("../../lib/Enum");

var _default = (0, _Enum.createEnum)(['softphone', // desktop
'myphone', // ringout branding rc..
'otherphone', // ringout
'customphone', // ringout
'browser' // webphone
], 'callingOptions');

exports["default"] = _default;
//# sourceMappingURL=callingOptions.js.map
