"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var callStatus = _ObjectMap.ObjectMap.prefixKeys(['loading', 'loaded'], 'recentCallStatus');

exports.callStatus = callStatus;
//# sourceMappingURL=callStatus.js.map
