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
var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");
var _date$time$hours$minu;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = exports["default"] = (_date$time$hours$minu = {
  date: 'Date',
  time: 'Time',
  hours: '{howMany} hr',
  minutes: '{howMany} min',
  today: 'Today',
  duration: 'Duration',
  topic: 'Meeting title',
  voIPOnly: 'Internet audio only',
  telephonyOnly: 'Telephone only',
  both: 'Telephone and Internet audio',
  thirdParty: '3rd party audio',
  meetingId: 'Meeting ID',
  password: 'Password',
  video: 'Video',
  audio: 'Audio',
  scheduleFor: 'Schedule on behalf of'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, 'Myself'), "meetingOptions", 'Meeting options'), "meetingSettings", 'Meeting settings'), "rcMeetingSettings", 'Video Meeting settings'), "audioOptions", 'Audio options'), "recurringMeeting", 'Recurring meeting'), "recurringNote", 'Note: Enable this one when choosing "Recurrence"'), "joinBeforeHost", 'Allow participants to join before host'), "turnOffCamera", 'Turn off camera for participants'), "turnOffHostCamera", 'Turn off camera for host when joining meeting'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_date$time$hours$minu, "requirePassword", 'Require password'), "enterPassword", 'Enter Password'), "setPassword", 'Set password *'), "passwordEmptyError", 'Meeting password required'), "rcmPasswordInvalidError", 'Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -'), "rcmPasswordHintText", 'Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -'), "usePersonalMeetingId", 'Use Personal Meeting ID'), "pmiChangeConfirm", 'If you want to make changes for your Personal Meeting, '), "changePmiSettings", 'change PMI settings'), "pmiSettingChangeAlert", 'If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings.'), _defineProperty(_defineProperty(_defineProperty(_date$time$hours$minu, "lockedTooltip", 'This setting is managed by your company admin'), "when", 'When'), "recurringDescribe", 'Please remember to check recurrence or repeat in your calendar invitation to your attendees.'));
//# sourceMappingURL=en-US.js.map
