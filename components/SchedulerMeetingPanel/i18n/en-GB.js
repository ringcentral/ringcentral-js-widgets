"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_scheduleFor$schedule = {
  scheduleFor: 'Schedule on behalf of',
  scheduleForAssistedUser: 'Update meeting settings on behalf of {userName}.',
  scheduleForGuidance: 'Scheduling for someone else?\n1. Make sure you’re on their Outlook calendar.\n2. From the dropdown, select the person you’re scheduling for.\n',
  scheduleForGuidanceMore: 'Learn details',
  meetingSettings: 'Meeting settings',
  meetingSettingsDescription: 'Updates will apply to this meeting only.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Myself'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", 'Use waiting room'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'Participants wait until you admit them. Great for interviews or outside attendees.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'For anyone outside my company'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", 'For anyone not signed in'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'For all participants'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Enter Password'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Start meeting after you join'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'The meeting will start after you join to prevent early conversations.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Require password'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Keep your meeting secure. Anyone using the link won’t be prompted for a password.'), _defineProperty(_scheduleFor$schedule, "password", 'Password:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'Meeting password required'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'Your password must be 1–10 letters and numbers long but cannot contain symbols'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'Your password should be 1–10 letters and numbers long, but cannot contain symbols.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Use personal meeting link'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Manage who can join'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Anyone with link'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Only {shortName} accounts'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", 'Only my coworkers'), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Password'), _defineProperty(_scheduleFor$schedule, "edit", 'Edit'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Edit settings'), _defineProperty(_scheduleFor$schedule, "lockTooltip", 'This setting is managed by your company admin'), _defineProperty(_scheduleFor$schedule, "cancel", 'Cancel'), _defineProperty(_scheduleFor$schedule, "update", 'Update'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Personal meeting settings'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Set who can join and how for your personal meeting link.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"scheduleForAssistedUser"@#@ @source: @#@"Update meetings settings on behalf of {userName}."@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Updates will apply to this meeting only."@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"For all participants"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won't be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"allowMeetingAccess"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"pmiSettingsTitle"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"pmiSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
exports["default"] = _default;
//# sourceMappingURL=en-GB.js.map
