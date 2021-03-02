"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.syncTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var syncTypes = _ObjectMap.ObjectMap.fromObject({
  fSync: 'FSync',
  iSync: 'ISync'
});

exports.syncTypes = syncTypes;
var _default = syncTypes;
exports["default"] = _default;
//# sourceMappingURL=syncTypes.js.map