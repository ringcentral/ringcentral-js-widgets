"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meetingStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var meetingStatus = _ObjectMap.ObjectMap.prefixKeys(['invalidMeetingInfo', 'emptyTopic', 'noPassword', 'durationIncorrect', 'insufficientPermissions', 'scheduledSuccess', 'updatedSuccess', 'internalError', 'meetingIsDeleted'], 'meetingStatus');

exports.meetingStatus = meetingStatus;
//# sourceMappingURL=meetingStatus.js.map
