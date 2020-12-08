"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericMeetingStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var genericMeetingStatus = _ObjectMap.ObjectMap.prefixKeys(['updating', 'updated', 'idle'], 'genericMeetingStatus');

exports.genericMeetingStatus = genericMeetingStatus;
//# sourceMappingURL=genericMeetingStatus.js.map
