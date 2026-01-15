"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = (_scheduleFor$schedule = {
  scheduleFor: 'Schedule on behalf of',
  scheduleForAssistedUser: 'Update meetings settings on behalf of {userName}.',
  scheduleForGuidance: "Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n",
  scheduleForGuidanceMore: 'Learn details',
  meetingSettings: 'Meeting settings',
  meetingSettingsDescription: 'Updates will apply to this meeting only.'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Myself'), "waitingRoomTitle", 'Use waiting room'), "waitingRoomDescription", 'Participants wait until you admit them. Great for interviews or outside attendees.'), "waitingRoomNotCoworker", 'For anyone outside my company'), "waitingRoomGuest", 'For anyone not signed in'), "waitingRoomAll", 'For all participants'), "enterPassword", 'Enter Password'), "onlyJoinAfterMe", 'Start meeting after you join'), "allowJoinBeforeHostDescription", 'The meeting will start after you join to prevent early conversations.'), "requirePassword", 'Require password'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, "requirePasswordDescription", "Keep your meeting secure. Anyone using the link won't be prompted for a password."), "password", 'Password:'), "passwordEmptyError", 'Meeting password required'), "passwordInvalidError", 'Your password must be 1-10 letters and numbers long but cannot contain symbols'), "passwordHintText", 'Your password should be 1-10 letters and numbers long, but can not contain symbols.'), "usePersonalMeetingIdInstead", 'Use personal meeting link'), "allowMeetingAccess", 'Manage who can join'), "anyoneWithLink", 'Anyone with link'), "signedInUsers", 'Only {shortName} accounts'), "signedInCoWorkers", 'Only my coworkers'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, "passwordLabel", 'Password'), "edit", 'Edit'), "editSettings", 'Edit settings'), "lockTooltip", 'This setting is managed by your company admin'), "cancel", 'Cancel'), "update", 'Update'), "pmiSettingsTitle", 'Personal meeting settings'), "pmiSettingsDescription", 'Set who can join and how for your personal meeting link.'));
//# sourceMappingURL=en-US.js.map
