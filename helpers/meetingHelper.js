"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMobileDialingNumberTpl = getMobileDialingNumberTpl;
exports.getPhoneDialingNumberTpl = getPhoneDialingNumberTpl;
exports.getMeetingSettings = getMeetingSettings;
exports.getDefaultMeetingSettings = getDefaultMeetingSettings;
exports.getInitializedStartTime = getInitializedStartTime;
exports.prunePreferencesObject = prunePreferencesObject;
exports.comparePreferences = comparePreferences;
exports.isRecurringMeeting = isRecurringMeeting;
exports.generateRandomPassword = generateRandomPassword;
exports.updateFullYear = updateFullYear;
exports.updateFullTime = updateFullTime;
exports.getDefaultTopic = getDefaultTopic;
Object.defineProperty(exports, "MeetingType", {
  enumerable: true,
  get: function get() {
    return _meetingHelper.MeetingType;
  }
});
exports.UTC_TIMEZONE_ID = void 0;

require("core-js/modules/es6.array.map");

var _format = _interopRequireWildcard(require("@ringcentral-integration/phone-number/lib/format"));

var _ramda = require("ramda");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _meetingHelper = require("./meetingHelper.interface");

var _i18n = _interopRequireDefault(require("../modules/MeetingV2/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
      countryCode: country.isoCode,
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

function getMeetingSettings(_ref3) {
  var extensionName = _ref3.extensionName,
      startTime = _ref3.startTime,
      _ref3$durationInMinut = _ref3.durationInMinutes,
      durationInMinutes = _ref3$durationInMinut === void 0 ? 60 : _ref3$durationInMinut,
      _ref3$topic = _ref3.topic,
      topic = _ref3$topic === void 0 ? '' : _ref3$topic,
      _ref3$currentLocale = _ref3.currentLocale,
      currentLocale = _ref3$currentLocale === void 0 ? 'en-US' : _ref3$currentLocale;
  return {
    topic: topic || (0, _formatMessage["default"])(_i18n["default"].getString('meetingTitle', currentLocale), {
      extensionName: extensionName
    }),
    meetingType: _meetingHelper.MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime: startTime,
      durationInMinutes: durationInMinutes,
      timeZone: {
        id: UTC_TIMEZONE_ID
      }
    },
    host: {
      id: null
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio']
  };
}

function getDefaultTopic(extensionName) {
  var currentLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  return (0, _formatMessage["default"])(_i18n["default"].getString('meetingTitle', currentLocale), {
    extensionName: extensionName
  });
} // Basic default meeting type information


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
} // only update the date part (container year, month, day)


function updateFullYear(preTime, currTime) {
  var y = currTime.getFullYear();
  var m = currTime.getMonth();
  var d = currTime.getDate();
  return preTime.setFullYear(y, m, d);
} // only update the time part (container hour, minute, second)


function updateFullTime(preTime, currTime) {
  var newTime = new Date(currTime);
  preTime.setHours(newTime.getHours());
  preTime.setMinutes(newTime.getMinutes());
  preTime.setSeconds(newTime.getSeconds());
  return preTime;
} // TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
//# sourceMappingURL=meetingHelper.js.map
