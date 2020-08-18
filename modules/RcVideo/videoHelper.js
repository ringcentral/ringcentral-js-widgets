"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultChars = getDefaultChars;
exports.validateRandomPassword = validateRandomPassword;
exports.generateRandomPassword = generateRandomPassword;
exports.validatePasswordSettings = validatePasswordSettings;
exports.getVideoSettings = getVideoSettings;
exports.getDefaultVideoSettings = getDefaultVideoSettings;
exports.getTopic = getTopic;
exports.pruneMeetingObject = pruneMeetingObject;
exports.transformPreferences = transformPreferences;
exports.reversePreferences = reversePreferences;
exports.prunePreferencesObject = prunePreferencesObject;
exports.comparePreferences = comparePreferences;
exports.transformMeetingSettingLock = transformMeetingSettingLock;
exports.meetingProviderTypes = exports.RcVideoTypes = exports.RCV_PREFERENCES_API_KEYS = exports.RCV_PASSWORD_REGEX = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

var _ramda = require("ramda");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* TODO: this meetingProviderTypes is only used for calender-addon
 * if you want to use meetingProviderTypes
 * please turn to use MeetingProvider/interface
 */
var meetingProviderTypes = {
  meeting: 'RCMeetings',
  video: 'RCVideo'
};
exports.meetingProviderTypes = meetingProviderTypes;
var RcVideoTypes = {
  meeting: 0,
  // schedule
  call: 1 // instant meeting

};
exports.RcVideoTypes = RcVideoTypes;
var RCV_PASSWORD_REGEX = /^[A-Za-z0-9]{1,10}$/;
exports.RCV_PASSWORD_REGEX = RCV_PASSWORD_REGEX;
var RCV_CREATE_API_KEYS = ['name', 'type', 'allowJoinBeforeHost', 'muteAudio', 'muteVideo', 'isMeetingSecret', 'meetingPassword', 'expiresIn', 'isOnlyAuthUserJoin', 'isOnlyCoworkersJoin', 'allowScreenSharing'];
var RCV_PREFERENCES_API_KEYS = ['join_before_host', // 'join_video_off',
// 'join_audio_mute',
'password_scheduled', 'password_instant', 'guest_join', 'join_authenticated_from_account_only', 'screen_sharing_host_only'];
exports.RCV_PREFERENCES_API_KEYS = RCV_PREFERENCES_API_KEYS;
var RCV_PREFERENCES_KEYS = ['isMeetingSecret', 'allowJoinBeforeHost' // 'muteVideo',
// 'muteAudio'
];
/* RCINT-14566
 * Exclude characters that are hard to visually differentiate ["0", "o", "O", "I", "l"]
 */

function getDefaultChars() {
  var DEFAULT_PASSWORD_CHARSET = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  return DEFAULT_PASSWORD_CHARSET;
}

function validateRandomPassword(pwd) {
  return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]*$/.test(pwd);
}

function generateRandomPassword() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var charset = getDefaultChars();
  var charLen = charset.length;
  var retVal = '';

  for (var i = 0; i < length; i++) {
    retVal += charset.charAt(Math.floor(Math.random() * charLen));
  }

  if (!validateRandomPassword(retVal)) {
    return generateRandomPassword(length);
  }

  return retVal;
}

function validatePasswordSettings(meetingPassword, isMeetingSecret) {
  if (!isMeetingSecret) {
    return true;
  }

  if (meetingPassword && RCV_PASSWORD_REGEX.test(meetingPassword)) {
    return true;
  }

  return false;
} // gsuite


function getVideoSettings(data) {
  var _data$name = data.name,
      name = _data$name === void 0 ? 'Scheduled meeting' : _data$name,
      isMeetingSecret = data.isMeetingSecret,
      meetingPassword = data.meetingPassword,
      params = _objectWithoutProperties(data, ["name", "isMeetingSecret", "meetingPassword"]);

  var settings = _objectSpread(_objectSpread({}, params), {}, {
    name: name,
    type: RcVideoTypes.meeting,
    expiresIn: 31536000
  });

  if (isMeetingSecret) {
    settings.isMeetingSecret = true;
    settings.meetingPassword = meetingPassword;
  } else {
    settings.isMeetingSecret = false;
    settings.meetingPassword = '';
  }

  return settings;
}

function getDefaultVideoSettings(_ref) {
  var topic = _ref.topic,
      startTime = _ref.startTime;
  return {
    // api fields
    name: topic,
    type: RcVideoTypes.meeting,
    expiresIn: 31536000,
    allowJoinBeforeHost: false,
    muteAudio: false,
    muteVideo: false,
    isMeetingSecret: true,
    meetingPassword: '',
    isOnlyAuthUserJoin: false,
    isOnlyCoworkersJoin: false,
    allowScreenSharing: true,
    settingLock: {
      allowJoinBeforeHost: false,
      isMeetingSecret: false,
      isOnlyAuthUserJoin: false,
      allowScreenSharing: false
    },
    // ui fields
    startTime: startTime,
    duration: 60,
    saveAsDefault: false,
    isMeetingPasswordValid: false,
    usePersonalMeetingId: false
  };
}

function getTopic(extensionName, brandName) {
  if (brandName === 'RingCentral') {
    return "".concat(extensionName, "'s ").concat(brandName, " Video Meeting");
  }

  return "".concat(extensionName, "'s ").concat(brandName, " Meeting");
}
/**
 * Remove client side properties before sending to RCV API
 */


function pruneMeetingObject(meeting) {
  return (0, _ramda.pick)(RCV_CREATE_API_KEYS, meeting);
}

function transformPreferences(preferences) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    isMeetingSecret: isInstantMeeting ? preferences.password_instant : preferences.password_scheduled,
    allowJoinBeforeHost: preferences.join_before_host,
    // muteVideo: preferences.join_video_off,
    // muteAudio: preferences.join_audio_mute,
    isOnlyAuthUserJoin: preferences.guest_join,
    isOnlyCoworkersJoin: preferences.join_authenticated_from_account_only === 'only_co_workers',
    allowScreenSharing: preferences.screen_sharing_host_only === 'all'
  };
}

function transformMeetingSettingLock(meetingSettingLock) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    isMeetingSecret: isInstantMeeting ? meetingSettingLock.password_instant : meetingSettingLock.password_scheduled,
    allowJoinBeforeHost: meetingSettingLock.join_before_host,
    isOnlyAuthUserJoin: meetingSettingLock.guest_join,
    allowScreenSharing: meetingSettingLock.screen_sharing_host_only
  };
}

function reversePreferences(preferences) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var result = {
    join_before_host: preferences.allowJoinBeforeHost,
    // join_video_off: preferences.muteVideo,
    // join_audio_mute: preferences.muteAudio,
    guest_join: preferences.isOnlyAuthUserJoin,
    join_authenticated_from_account_only: preferences.isOnlyCoworkersJoin ? 'only_co_workers' : 'anyone_signed_into_rc',
    screen_sharing_host_only: preferences.allowScreenSharing ? 'all' : 'host'
  };

  if (isInstantMeeting) {
    result.password_instant = preferences.isMeetingSecret;
  } else {
    result.password_scheduled = preferences.isMeetingSecret;
  }

  return result;
}
/**
 * Reserve only preferences fields
 */


function prunePreferencesObject(meeting) {
  return (0, _ramda.pick)(RCV_PREFERENCES_KEYS, meeting);
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
} // TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
//# sourceMappingURL=videoHelper.js.map
