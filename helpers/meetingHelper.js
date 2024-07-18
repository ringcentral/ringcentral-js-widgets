"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MeetingType", {
  enumerable: true,
  get: function get() {
    return _meetingHelper.MeetingType;
  }
});
exports.UTC_TIMEZONE_ID = void 0;
exports.comparePreferences = comparePreferences;
exports.generateRandomPassword = generateRandomPassword;
exports.getDefaultMeetingSettings = getDefaultMeetingSettings;
exports.getDefaultTopic = getDefaultTopic;
exports.getInitializedStartTime = getInitializedStartTime;
exports.getMobileDialingNumberTpl = getMobileDialingNumberTpl;
exports.getPhoneDialingNumberTpl = getPhoneDialingNumberTpl;
exports.isRecurringMeeting = isRecurringMeeting;
exports.prunePreferencesObject = prunePreferencesObject;
exports.updateFullTime = updateFullTime;
exports.updateFullYear = updateFullYear;
var _format = _interopRequireWildcard(require("@ringcentral-integration/phone-number/lib/format"));
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _i18n = _interopRequireDefault(require("../modules/Meeting/i18n"));
var _meetingHelper = require("./meetingHelper.interface");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function getMobileDialingNumberTpl(dialInNumbers, meetingId) {
  return dialInNumbers.map(function (_ref) {
    var phoneNumber = _ref.phoneNumber,
      _ref$location = _ref.location,
      location = _ref$location === void 0 ? '' : _ref$location;
    return location ? "".concat(phoneNumber, ",,").concat(meetingId, "# (").concat(location, ")") : "".concat(phoneNumber, ",,").concat(meetingId, "#");
  }).join('\n    ');
}
function getPhoneDialingNumberTpl(dialInNumbers) {
  return dialInNumbers.map(function (_ref2) {
    var phoneNumber = _ref2.phoneNumber,
      _ref2$location = _ref2.location,
      location = _ref2$location === void 0 ? '' : _ref2$location,
      country = _ref2.country;
    var filterFormattedNumber = (0, _format["default"])({
      phoneNumber: phoneNumber,
      countryCode: country === null || country === void 0 ? void 0 : country.isoCode,
      type: _format.formatTypes.international
    });
    return location ? "".concat(filterFormattedNumber, " (").concat(location, ")") : "".concat(filterFormattedNumber);
  }).join('\n    ');
}
var UTC_TIMEZONE_ID = '1';
exports.UTC_TIMEZONE_ID = UTC_TIMEZONE_ID;
function isRecurringMeeting(meetingType) {
  return meetingType === _meetingHelper.MeetingType.RECURRING || meetingType === _meetingHelper.MeetingType.SCHEDULED_RECURRING;
}
function getDefaultTopic(extensionName) {
  var currentLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  return (0, _utils.format)(_i18n["default"].getString('meetingTitle', currentLocale), {
    extensionName: extensionName
  });
}

// Basic default meeting type information
function getDefaultMeetingSettings(extensionName) {
  var currentLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  var startTime = arguments.length > 2 ? arguments[2] : undefined;
  var hostId = arguments.length > 3 ? arguments[3] : undefined;
  return {
    topic: getDefaultTopic(extensionName, currentLocale),
    meetingType: _meetingHelper.MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime: startTime,
      durationInMinutes: 60,
      timeZone: {
        id: UTC_TIMEZONE_ID
      }
    },
    host: {
      id: hostId !== null && hostId !== void 0 ? hostId : null
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
    usePersonalMeetingId: false,
    _requireMeetingPassword: false,
    _showDate: false,
    _showTime: false,
    _saved: false
  };
}
function getInitializedStartTime() {
  var now = new Date();
  var startTime = now.setHours(now.getHours() + 1, 0, 0, 0);
  return startTime;
}
var preferencesMembers = ['allowJoinBeforeHost', 'startHostVideo', 'startParticipantsVideo', '_requireMeetingPassword'];
function prunePreferencesObject(meeting) {
  var preferences = (0, _ramda.pick)(preferencesMembers, meeting);
  return preferences;
}
function comparePreferences(preferences, meeting) {
  var preferencesChanged = false;
  if (preferences && meeting) {
    for (var key in preferences) {
      if (preferences[key] !== meeting[key]) {
        preferencesChanged = true;
        break;
      }
    }
  }
  return preferencesChanged;
}
function generateRandomPassword() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var charset = '0123456789';
  var charLen = charset.length;
  var retVal = '';
  for (var i = 0; i < length; i++) {
    retVal += charset.charAt(Math.floor(Math.random() * charLen));
  }
  return retVal;
}

// only update the date part (container year, month, day)
function updateFullYear(preTime, currTime) {
  var y = currTime.getFullYear();
  var m = currTime.getMonth();
  var d = currTime.getDate();
  return preTime.setFullYear(y, m, d);
}

// only update the time part (container hour, minute, second)
function updateFullTime(preTime, currTime) {
  var newTime = new Date(currTime);
  preTime.setHours(newTime.getHours());
  preTime.setMinutes(newTime.getMinutes());
  preTime.setSeconds(newTime.getSeconds());
  return preTime;
}

// TODO: will remove this when google app script could support export separately
// export together because google app script not fully support export
//# sourceMappingURL=meetingHelper.js.map
