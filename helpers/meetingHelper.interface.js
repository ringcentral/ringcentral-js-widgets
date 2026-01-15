"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingType = void 0;
var MeetingType = exports.MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  SCHEDULED_RECURRING: 'ScheduledRecurring',
  INSTANT: 'Instant',
  PMI: 'PMI'
};

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
//# sourceMappingURL=meetingHelper.interface.js.map
