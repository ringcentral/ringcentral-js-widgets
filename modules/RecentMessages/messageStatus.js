"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageStatus = exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messageStatus = _ObjectMap.ObjectMap.prefixKeys(['loading', 'loaded'], 'recentMessageStatus');

exports.messageStatus = messageStatus;
var _default = messageStatus;
exports["default"] = _default;
//# sourceMappingURL=messageStatus.js.map
