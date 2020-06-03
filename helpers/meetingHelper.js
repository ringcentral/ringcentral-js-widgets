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
exports.MeetingType = exports.UTC_TIMEZONE_ID = void 0;

require("core-js/modules/es6.array.map");

var _format = _interopRequireWildcard(require("@ringcentral-integration/phone-number/lib/format"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getMobileDialingNumberTpl(dialInNumbers, meetingId) {
  return dialInNumbers.map(function (_ref) {
    var phoneNumber = _ref.phoneNumber,
        _ref$location = _ref.location,
        location = _ref$location === void 0 ? '' : _ref$location;
    return "".concat(phoneNumber, ",,").concat(meetingId, "# (").concat(location, ")");
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
    return "".concat(filterFormattedNumber, " (").concat(location, ")");
  }).join('\n    ');
}

var UTC_TIMEZONE_ID = '1';
exports.UTC_TIMEZONE_ID = UTC_TIMEZONE_ID;
var MeetingType = {
  SCHEDULED: 'Scheduled',
  RECURRING: 'Recurring',
  SCHEDULED_RECURRING: 'ScheduledRecurring',
  INSTANT: 'Instant'
};
exports.MeetingType = MeetingType;

function getMeetingSettings(_ref3) {
  var extensionName = _ref3.extensionName,
      startTime = _ref3.startTime,
      _ref3$durationInMinut = _ref3.durationInMinutes,
      durationInMinutes = _ref3$durationInMinut === void 0 ? 60 : _ref3$durationInMinut,
      _ref3$topic = _ref3.topic,
      topic = _ref3$topic === void 0 ? '' : _ref3$topic;
  return {
    topic: topic || "".concat(extensionName, "'s Meeting"),
    meetingType: MeetingType.SCHEDULED,
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
} // Basic default meeting type information


function getDefaultMeetingSettings(extensionName, startTime) {
  return {
    topic: "".concat(extensionName, "'s Meeting"),
    meetingType: MeetingType.SCHEDULED,
    password: '',
    schedule: {
      startTime: startTime,
      durationInMinutes: 60,
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
    audioOptions: ['Phone', 'ComputerAudio'],
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
//# sourceMappingURL=meetingHelper.js.map
