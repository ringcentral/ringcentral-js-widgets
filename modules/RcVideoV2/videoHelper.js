"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.filter");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideoTypes = exports.RCV_PREFERENCES_KEYS = exports.RCV_PREFERENCES_IDS = exports.RCV_E2EE_RELATED_KEYS = exports.RCV_E2EE_DEFAULT_SECURITY_OPTIONS = void 0;
exports.assignObject = assignObject;
exports.comparePreferences = comparePreferences;
exports.formatMainPhoneNumber = formatMainPhoneNumber;
exports.formatPremiumNumbers = formatPremiumNumbers;
exports.formatRcvInvitationRequestData = void 0;
exports.generateRandomPassword = generateRandomPassword;
exports.getDefaultChars = getDefaultChars;
exports.getDefaultVideoSettings = getDefaultVideoSettings;
exports.getLockedPreferences = getLockedPreferences;
exports.getTopic = getTopic;
exports.getVideoSettings = getVideoSettings;
exports.meetingProviderTypes = void 0;
exports.patchWaitingRoomRelated = patchWaitingRoomRelated;
exports.pruneMeetingObject = pruneMeetingObject;
exports.prunePreferencesObject = prunePreferencesObject;
exports.reversePreferences = reversePreferences;
exports.transformPreferences = transformPreferences;
exports.transformSettingLocks = transformSettingLocks;
exports.validatePasswordSettings = validatePasswordSettings;
exports.validateRandomPassword = validateRandomPassword;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

var _formatMessage = _interopRequireDefault(require("format-message"));

var _ramda = require("ramda");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
var RCV_CREATE_API_KEYS = ['name', 'type', 'startTime', 'expiresIn', 'duration', 'accountId', 'extensionId', 'allowJoinBeforeHost', 'muteAudio', 'muteVideo', 'isMeetingSecret', 'meetingPassword', 'isOnlyAuthUserJoin', 'isOnlyCoworkersJoin', 'allowScreenSharing', _constants.RCV_WAITING_ROOM_API_KEYS, _constants.RCV_E2EE_API_KEYS];
var RCV_PREFERENCES_IDS = ['e2ee', 'join_before_host', // 'join_video_off',
// 'join_audio_mute',
'password_scheduled', 'password_instant', 'guest_join', 'join_authenticated_from_account_only', 'screen_sharing_host_only', 'waiting_room_guests_only', 'waiting_room'];
exports.RCV_PREFERENCES_IDS = RCV_PREFERENCES_IDS;
var RCV_PREFERENCES_KEYS = ['allowJoinBeforeHost', // 'muteVideo',
// 'muteAudio',
'isMeetingSecret', 'isOnlyAuthUserJoin', 'isOnlyCoworkersJoin', 'allowScreenSharing', _constants.RCV_WAITING_ROOM_API_KEYS, _constants.RCV_E2EE_API_KEYS];
exports.RCV_PREFERENCES_KEYS = RCV_PREFERENCES_KEYS;
var RCV_E2EE_RELATED_KEYS = ['allowJoinBeforeHost', 'isMeetingSecret', 'isOnlyAuthUserJoin', 'isOnlyCoworkersJoin', _constants.RCV_WAITING_ROOM_API_KEYS];
exports.RCV_E2EE_RELATED_KEYS = RCV_E2EE_RELATED_KEYS;
var RCV_E2EE_DEFAULT_SECURITY_OPTIONS = {
  allowJoinBeforeHost: false,
  isMeetingSecret: true,
  isOnlyAuthUserJoin: true,
  isOnlyCoworkersJoin: false,
  waitingRoomMode: _constants.RCV_WAITING_ROOM_MODE.notcoworker
};
/* RCINT-14566
 * Exclude characters that are hard to visually differentiate ["0", "o", "O", "I", "l"]
 */

exports.RCV_E2EE_DEFAULT_SECURITY_OPTIONS = RCV_E2EE_DEFAULT_SECURITY_OPTIONS;

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

  if (meetingPassword && _constants.RCV_PASSWORD_REGEX.test(meetingPassword)) {
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
      accountId = _ref.accountId,
      extensionId = _ref.extensionId;
  return {
    // api fields
    accountId: accountId,
    extensionId: extensionId,
    name: topic,
    type: RcVideoTypes.meeting,
    expiresIn: 31536000,
    e2ee: false,
    allowJoinBeforeHost: false,
    muteAudio: false,
    muteVideo: false,
    isMeetingSecret: true,
    meetingPassword: '',
    isOnlyAuthUserJoin: false,
    isOnlyCoworkersJoin: false,
    allowScreenSharing: true,
    waitingRoomMode: _constants.RCV_WAITING_ROOM_MODE.off,
    settingLock: {
      allowJoinBeforeHost: false,
      // muteVideo: false,
      // muteAudio: false,
      isMeetingSecret: false,
      isOnlyAuthUserJoin: false,
      isOnlyCoworkersJoin: false,
      allowScreenSharing: false,
      waitingRoomMode: false,
      e2ee: false
    },
    // ui fields
    startTime: new Date(),
    duration: 60,
    saveAsDefault: false,
    isMeetingPasswordValid: false,
    usePersonalMeetingId: false
  };
}

function getTopic(_ref2) {
  var extensionName = _ref2.extensionName,
      brandName = _ref2.brandName,
      shortName = _ref2.shortName,
      rcvMeetingTopic = _ref2.rcvMeetingTopic;
  return (0, _formatMessage["default"])(rcvMeetingTopic, {
    extensionName: extensionName,
    shortName: shortName,
    brandName: brandName
  });
}
/**
 * Remove client side properties before sending to RCV API
 */


function pruneMeetingObject(meeting, omitArr) {
  var meetingDetail = (0, _ramda.pick)(RCV_CREATE_API_KEYS, meeting);
  omitArr.forEach(function (_ref3) {
    var condition = _ref3.condition,
        key = _ref3.key;

    if (!condition) {
      meetingDetail = (0, _ramda.omit)([key], meetingDetail);
    }
  });
  return meetingDetail;
}

function transformPreferences(preferences) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    allowJoinBeforeHost: preferences.join_before_host,
    // muteVideo: preferences.join_video_off,
    // muteAudio: preferences.join_audio_mute,
    e2ee: preferences.e2ee,
    isMeetingSecret: isInstantMeeting ? preferences.password_instant : preferences.password_scheduled,
    isOnlyAuthUserJoin: preferences.guest_join,
    isOnlyCoworkersJoin: preferences.guest_join ? preferences.join_authenticated_from_account_only === 'only_co_workers' : false,
    allowScreenSharing: preferences.screen_sharing_host_only === 'all',
    waitingRoomMode: preferences.waiting_room ? _constants.RCV_WAITING_ROOM_MODE[preferences.waiting_room_guests_only] : _constants.RCV_WAITING_ROOM_MODE.off
  };
}

function transformSettingLocks(settingLocks) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    allowJoinBeforeHost: settingLocks.join_before_host,
    // muteVideo: settingLocks.join_video_off,
    // muteAudio: settingLocks.join_audio_mute,
    e2ee: settingLocks.e2ee,
    isMeetingSecret: isInstantMeeting ? settingLocks.password_instant : settingLocks.password_scheduled,
    isOnlyAuthUserJoin: settingLocks.guest_join,
    isOnlyCoworkersJoin: settingLocks.join_authenticated_from_account_only,
    allowScreenSharing: settingLocks.screen_sharing_host_only,
    waitingRoomMode: settingLocks.waiting_room
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
    screen_sharing_host_only: preferences.allowScreenSharing ? 'all' : 'host',
    waiting_room: !!preferences.waitingRoomMode,
    waiting_room_guests_only: _constants.RCV_WAITING_ROOM_MODE_REVERSE[preferences.waitingRoomMode],
    e2ee: preferences.e2ee
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
    for (var _i = 0, _Object$keys = Object.keys(preferences); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var settingKey = key;

      if (preferences[settingKey] !== meeting[settingKey]) {
        preferencesChanged = true;
        break;
      }
    }
  }

  return preferencesChanged;
}

function assignValue(a, b, key) {
  a[key] = b[key];
}

function assignObject(a, b, key) {
  a[key] = b;
}

function getLockedPreferences(settingLocks, preferences) {
  var lockedPreferences = {};

  for (var _i2 = 0, _Object$entries = Object.entries(settingLocks); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        key = _Object$entries$_i[0],
        locked = _Object$entries$_i[1];

    if (locked) {
      var settingKey = key;
      assignValue(lockedPreferences, preferences, settingKey);
    }
  }

  return lockedPreferences;
}

function getAvaliableWaitingRoomOpions(isOnlyCoworkersJoin) {
  return isOnlyCoworkersJoin ? [_constants.RCV_WAITING_ROOM_MODE.off, _constants.RCV_WAITING_ROOM_MODE.all] : [_constants.RCV_WAITING_ROOM_MODE.off, _constants.RCV_WAITING_ROOM_MODE.all, _constants.RCV_WAITING_ROOM_MODE.notcoworker];
}

function patchWaitingRoomRelated(settings, _ref4) {
  var waitingRoomMode = _ref4.waitingRoomMode;
  var isUpdatingMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var processedSettings = {};

  if (settings.isOnlyAuthUserJoin) {
    // for pmi setting, waitingRoom, joinAfterMe option maybe not avaliable
    if (!getAvaliableWaitingRoomOpions(settings.isOnlyCoworkersJoin).includes(settings.waitingRoomMode)) {
      processedSettings.waitingRoomMode = isUpdatingMode ? _constants.RCV_WAITING_ROOM_MODE.all : waitingRoomMode;
    }
  } // when waitingRoom is 'everyone', joinAfterMe should be always checked


  if ((processedSettings.waitingRoomMode === _constants.RCV_WAITING_ROOM_MODE.all || settings.waitingRoomMode === _constants.RCV_WAITING_ROOM_MODE.all) && settings.allowJoinBeforeHost) {
    processedSettings.allowJoinBeforeHost = false;
  }

  return processedSettings;
}

function formatMainPhoneNumber(dialInNumber) {
  if (typeof dialInNumber === 'string') {
    return dialInNumber;
  }

  if (!dialInNumber || dialInNumber.length === 0) {
    return undefined;
  }

  return dialInNumber[0].phoneNumber;
}

function formatPremiumNumbers(dialInNumber) {
  if (typeof dialInNumber === 'string') {
    return [dialInNumber];
  }

  if (!dialInNumber || dialInNumber.length === 0) {
    return [];
  }

  return (0, _ramda.map)(function (obj) {
    var _obj$country, _obj$country2;

    var locationField = (obj === null || obj === void 0 ? void 0 : (_obj$country = obj.country) === null || _obj$country === void 0 ? void 0 : _obj$country.name) && obj.location ? "".concat(obj.country.name, " (").concat(obj.location, ")") : (obj === null || obj === void 0 ? void 0 : (_obj$country2 = obj.country) === null || _obj$country2 === void 0 ? void 0 : _obj$country2.name) || '';
    return "".concat(obj.phoneNumber, " ").concat(locationField);
  }, dialInNumber);
}

var formatRcvInvitationRequestData = function formatRcvInvitationRequestData(params) {
  var _params$joinUri;

  // format number
  var numbers = params.dialInNumbers.map(function (item) {
    return {
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      "default": item["default"],
      location: item.location
    };
  });
  var joinUriInfo = ((_params$joinUri = params.joinUri) === null || _params$joinUri === void 0 ? void 0 : _params$joinUri.split("/join/")) || []; // format request data

  var parameters = {
    numbers: numbers,
    meetingName: "---",
    hostName: params.hostName,
    meetingId: params.shortId,
    isSIPAvailable: params.isSIPAvailable,
    participantCode: params.shortId,
    brandName: params.brandName,
    entryPoint: joinUriInfo[0],
    $Brand_Id: params.brandId,
    $Extension_FormattingLocaleCode: params.currentLocale,
    $Extension_LanguageLocaleCode: params.currentLocale,
    isE2eeEnabled: !!params.e2ee,
    password: params.isMeetingSecret ? params.meetingPassword : undefined,
    dialInPassword: params.isMeetingSecret ? params.meetingPasswordPSTN : undefined,
    maskedPassword: params.isMeetingSecret ? params.meetingPasswordMasked : undefined
  };
  return {
    notificationId: 'meetingInvite',
    plainTextPreferred: true,
    isolatedMode: true,
    parameters: (0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          parameterName = _ref6[0],
          parameterValue = _ref6[1];

      return {
        parameterName: parameterName,
        parameterValue: parameterValue
      };
    }), (0, _ramda.filter)(function (item) {
      return item.parameterValue !== undefined;
    }))(parameters)
  };
}; // TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export


exports.formatRcvInvitationRequestData = formatRcvInvitationRequestData;
//# sourceMappingURL=videoHelper.js.map
