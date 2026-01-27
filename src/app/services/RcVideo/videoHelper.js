"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideoTypes = exports.RCV_PREFERENCES_KEYS = exports.RCV_PREFERENCES_IDS = exports.RCV_E2EE_RELATED_KEYS = exports.RCV_E2EE_DEFAULT_SECURITY_OPTIONS = void 0;
exports.assignObject = assignObject;
exports.comparePreferences = comparePreferences;
exports.formatJoinUriWithPMN = void 0;
exports.formatMainPhoneNumber = formatMainPhoneNumber;
exports.formatPremiumNumbers = formatPremiumNumbers;
exports.formatRcvInvitationRequestDataV2 = exports.formatRcvInvitationRequestData = void 0;
exports.generateRandomPassword = generateRandomPassword;
exports.getDefaultChars = getDefaultChars;
exports.getDefaultVideoSettings = getDefaultVideoSettings;
exports.getDirtyPreferences = getDirtyPreferences;
exports.getLockedPreferences = getLockedPreferences;
exports.getTopic = getTopic;
exports.getVideoSettings = getVideoSettings;
exports.meetingProviderTypes = void 0;
exports.patchWaitingRoomRelated = patchWaitingRoomRelated;
exports.pruneMeetingObject = pruneMeetingObject;
exports.prunePreferencesObject = prunePreferencesObject;
exports.reversePreferences = reversePreferences;
exports.sortDialInNumbers = void 0;
exports.transformPreferences = transformPreferences;
exports.transformSettingLocks = transformSettingLocks;
exports.transformV2ResponseToV1 = exports.transformV1MeetingToV2 = void 0;
exports.updateLocalPreferences = updateLocalPreferences;
exports.validatePasswordSettings = validatePasswordSettings;
exports.validateRandomPassword = validateRandomPassword;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.from-entries.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _constants = require("./constants");
var _i18n = require("./i18n");
var _excluded = ["name", "isMeetingSecret", "meetingPassword"];
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/* TODO: this meetingProviderTypes is only used for calender-addon
 * if you want to use meetingProviderTypes
 * please turn to use MeetingProvider/interface
 */
var meetingProviderTypes = exports.meetingProviderTypes = {
  meeting: 'RCMeetings',
  video: 'RCVideo'
};
var RcVideoTypes = exports.RcVideoTypes = {
  meeting: 0,
  // schedule
  call: 1 // instant meeting
};
var RCV_CREATE_API_KEYS = ['name', 'type', 'startTime', 'expiresIn', 'duration', 'accountId', 'extensionId', 'allowJoinBeforeHost', 'muteAudio', 'muteVideo', 'isMeetingSecret', 'meetingPassword', 'isOnlyAuthUserJoin', 'isOnlyCoworkersJoin', 'allowScreenSharing', _constants.RCV_WAITING_ROOM_API_KEYS, _constants.RCV_E2EE_API_KEYS, 'allowAnyoneRecord', 'allowAnyoneTranscribe'];
var RCV_PREFERENCES_IDS = exports.RCV_PREFERENCES_IDS = ['e2ee', 'join_before_host',
// 'join_video_off',
// 'join_audio_mute',
'password_scheduled', 'password_instant', 'guest_join', 'join_authenticated_from_account_only', 'screen_sharing_host_only', 'waiting_room_guests_only', 'waiting_room', 'allow_anyone_record_meetings', 'allow_anyone_transcribe_meetings'];
var RCV_PREFERENCES_KEYS = exports.RCV_PREFERENCES_KEYS = ['allowJoinBeforeHost',
// 'muteVideo',
// 'muteAudio',
'isMeetingSecret', 'isOnlyAuthUserJoin', 'isOnlyCoworkersJoin', 'allowScreenSharing', _constants.RCV_WAITING_ROOM_API_KEYS, _constants.RCV_E2EE_API_KEYS];
var RCV_E2EE_RELATED_KEYS = exports.RCV_E2EE_RELATED_KEYS = ['allowJoinBeforeHost', 'isMeetingSecret', 'isOnlyAuthUserJoin', 'isOnlyCoworkersJoin', _constants.RCV_WAITING_ROOM_API_KEYS];
var RCV_E2EE_DEFAULT_SECURITY_OPTIONS = exports.RCV_E2EE_DEFAULT_SECURITY_OPTIONS = {
  allowJoinBeforeHost: false,
  isMeetingSecret: true,
  isOnlyAuthUserJoin: true,
  isOnlyCoworkersJoin: false,
  waitingRoomMode: _constants.RCV_WAITING_ROOM_MODE.notcoworker
};

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
  if (meetingPassword && _constants.RCV_PASSWORD_REGEX.test(meetingPassword)) {
    return true;
  }
  return false;
}

// gsuite
function getVideoSettings(data) {
  var _data$name = data.name,
    name = _data$name === void 0 ? 'Scheduled meeting' : _data$name,
    isMeetingSecret = data.isMeetingSecret,
    meetingPassword = data.meetingPassword,
    params = _objectWithoutProperties(data, _excluded);
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
    // TODO: fix type
    // @ts-ignore
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
    rcvMeetingTopic = _ref2.rcvMeetingTopic,
    rcvProductName = _ref2.rcvProductName;
  return (0, _utils.format)(rcvMeetingTopic, {
    extensionName: extensionName,
    shortName: shortName,
    brandName: brandName,
    rcvProductName: rcvProductName
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

/**
 * Helper function to filter out undefined values from an object
 */
function filterUndefinedValues(obj) {
  return Object.fromEntries(Object.entries(obj).filter(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      value = _ref5[1];
    return value !== undefined;
  }));
}
function transformPreferences(preferences) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var transformations = {
    allowJoinBeforeHost: preferences.join_before_host,
    // muteVideo: preferences.join_video_off,
    // muteAudio: preferences.join_audio_mute,
    e2ee: preferences.e2ee,
    isMeetingSecret: isInstantMeeting ? preferences.password_instant : preferences.password_scheduled,
    isOnlyAuthUserJoin: preferences.guest_join,
    isOnlyCoworkersJoin: preferences.guest_join ? preferences.join_authenticated_from_account_only === 'only_co_workers' : false,
    allowScreenSharing: preferences.screen_sharing_host_only === 'all',
    allowAnyoneRecord: !!preferences.allow_anyone_record_meetings,
    allowAnyoneTranscribe: !!preferences.allow_anyone_transcribe_meetings,
    waitingRoomMode: preferences.waiting_room && preferences.waiting_room_guests_only ? _constants.RCV_WAITING_ROOM_MODE[preferences.waiting_room_guests_only] : _constants.RCV_WAITING_ROOM_MODE.off
  };
  return filterUndefinedValues(transformations);
}
function transformSettingLocks(settingLocks) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    allowJoinBeforeHost: settingLocks.join_before_host,
    e2ee: settingLocks.e2ee,
    isMeetingSecret: isInstantMeeting ? settingLocks.password_instant : settingLocks.password_scheduled,
    isOnlyAuthUserJoin: settingLocks.guest_join,
    isOnlyCoworkersJoin: settingLocks.join_authenticated_from_account_only,
    allowScreenSharing: settingLocks.screen_sharing_host_only,
    waitingRoomMode: settingLocks.waiting_room,
    allowAnyoneRecord: settingLocks.allow_anyone_record_meetings,
    allowAnyoneTranscribe: settingLocks.allow_anyone_transcribe_meetings
  };
}
function reversePreferences(meeting) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var result = {
    join_before_host: meeting.allowJoinBeforeHost,
    // join_video_off: meeting.muteVideo,
    // join_audio_mute: meeting.muteAudio,
    guest_join: meeting.isOnlyAuthUserJoin,
    join_authenticated_from_account_only: meeting.isOnlyCoworkersJoin ? 'only_co_workers' : 'anyone_signed_into_rc',
    screen_sharing_host_only: meeting.allowScreenSharing ? 'all' : 'host',
    waiting_room: !!meeting.waitingRoomMode,
    waiting_room_guests_only: _constants.RCV_WAITING_ROOM_MODE_REVERSE[meeting.waitingRoomMode],
    e2ee: meeting.e2ee
  };
  if (isInstantMeeting) {
    result.password_instant = meeting.isMeetingSecret;
  } else {
    result.password_scheduled = meeting.isMeetingSecret;
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

/**
 * Get preferences that need to be saved (changed and unlocked)
 */
function getDirtyPreferences(preferencesPayload, currentPreferences, settingLocks) {
  return Object.entries(preferencesPayload).filter(function (kvPairs) {
    var _ref6 = kvPairs,
      _ref7 = _slicedToArray(_ref6, 2),
      preferenceId = _ref7[0],
      newValue = _ref7[1];
    var oldValue = currentPreferences[preferenceId];
    var isLocked = settingLocks[preferenceId];
    return !isLocked && newValue !== undefined && newValue !== oldValue;
  });
}

/**
 * Update local preferences state using dirty preferences
 * This ensures server and local preferences stay in sync
 */
function updateLocalPreferences(dirtyPreferences, currentPreferences) {
  // Start with current preferences and update only the changed ones
  var savedPreferences = _objectSpread({}, currentPreferences);
  dirtyPreferences.forEach(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      preferenceId = _ref9[0],
      newValue = _ref9[1];
    savedPreferences[preferenceId] = newValue;
  });
  return savedPreferences;
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
function patchWaitingRoomRelated(settings) {
  var _ref0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    waitingRoomMode = _ref0.waitingRoomMode;
  var isUpdatingMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var processedSettings = {};
  if (settings.isOnlyAuthUserJoin) {
    // for pmi setting, waitingRoom, joinAfterMe option maybe not avaliable
    if (!getAvaliableWaitingRoomOpions(settings.isOnlyCoworkersJoin).includes(settings.waitingRoomMode)) {
      processedSettings.waitingRoomMode = isUpdatingMode ? _constants.RCV_WAITING_ROOM_MODE.all : waitingRoomMode;
    }
  }
  // when waitingRoom is 'everyone', joinAfterMe should be always checked
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
var formatRcvRequestData = function formatRcvRequestData(params, numbers) {
  var _params$joinUri;
  var joinUriInfo = ((_params$joinUri = params.joinUri) === null || _params$joinUri === void 0 ? void 0 : _params$joinUri.split("/join/")) || [];
  // format request data
  var parameters = {
    numbers: numbers,
    meetingName: "---",
    hostName: params.hostName,
    personalMeetingName: params.personalMeetingName,
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
    parameters: (0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)(function (_ref1) {
      var _ref10 = _slicedToArray(_ref1, 2),
        parameterName = _ref10[0],
        parameterValue = _ref10[1];
      return {
        parameterName: parameterName,
        parameterValue: parameterValue
      };
    }), (0, _ramda.filter)(function (item) {
      return item.parameterValue !== undefined;
    }))(parameters)
  };
};
var formatRcvInvitationRequestData = exports.formatRcvInvitationRequestData = function formatRcvInvitationRequestData(params) {
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
  return formatRcvRequestData(params, numbers);
};
var sortDialInNumbers = exports.sortDialInNumbers = function sortDialInNumbers(numbers, currentLocale) {
  var defaultPhoneNumbers = numbers.filter(function (item) {
    return !item.premium;
  }).map(function (item) {
    return {
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      location: item.location
    };
  });
  var premiumNumbers = numbers.filter(function (item) {
    return item.premium && !!item.location;
  }).map(function (item) {
    return {
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      location: item.location
    };
  });
  var tollFreeNumbers = numbers.filter(function (item) {
    return item.premium && !item.location;
  }).map(function (item) {
    return {
      number: item.phoneNumber,
      unformattedNumber: item.phoneNumber,
      country: item.country.name,
      location: "".concat((0, _i18n.t)('tollFree'))
    };
  });
  return [].concat(_toConsumableArray(defaultPhoneNumbers), _toConsumableArray(premiumNumbers), _toConsumableArray(tollFreeNumbers));
};
var formatRcvInvitationRequestDataV2 = exports.formatRcvInvitationRequestDataV2 = function formatRcvInvitationRequestDataV2(params) {
  // format number
  var numbers = sortDialInNumbers(params.phoneNumbers, params.currentLocale);
  return formatRcvRequestData(params, numbers);
};

/**
 * Helper function to format join URI for PMI in V2 API
 */
var formatJoinUriWithPMN = exports.formatJoinUriWithPMN = function formatJoinUriWithPMN(settings) {
  var _settings$discovery, _settings$pins, _settings$pins$aliase;
  var joinUri = (_settings$discovery = settings.discovery) === null || _settings$discovery === void 0 ? void 0 : _settings$discovery.web;
  var alias = (_settings$pins = settings.pins) === null || _settings$pins === void 0 ? void 0 : (_settings$pins$aliase = _settings$pins.aliases) === null || _settings$pins$aliase === void 0 ? void 0 : _settings$pins$aliase[0];
  if (settings.type === 'PMI' && alias) {
    var _settings$pins2;
    var pmiId = (_settings$pins2 = settings.pins) === null || _settings$pins2 === void 0 ? void 0 : _settings$pins2.pstn.participant;
    return joinUri.replace(pmiId, alias);
  }
  return joinUri;
};

/**
 * Convert the data structure of RcVideoV2 to RcVideoV1
 */
var transformV2ResponseToV1 = exports.transformV2ResponseToV1 = function transformV2ResponseToV1(settings) {
  var _settings$pins3, _settings$host, _settings$host2, _settings$pins4, _settings$pins4$alias, _settings$security$pa, _settings$security$pa2, _settings$security$pa3, _settings$preferences, _settings$preferences2, _settings$preferences3, _settings$preferences4, _settings$preferences5, _settings$preferences6;
  return {
    id: settings.id,
    name: settings.name,
    shortId: (_settings$pins3 = settings.pins) === null || _settings$pins3 === void 0 ? void 0 : _settings$pins3.pstn.participant,
    extensionId: (_settings$host = settings.host) === null || _settings$host === void 0 ? void 0 : _settings$host.extensionId,
    accountId: (_settings$host2 = settings.host) === null || _settings$host2 === void 0 ? void 0 : _settings$host2.accountId,
    type: 0,
    personalMeetingName: (_settings$pins4 = settings.pins) === null || _settings$pins4 === void 0 ? void 0 : (_settings$pins4$alias = _settings$pins4.aliases) === null || _settings$pins4$alias === void 0 ? void 0 : _settings$pins4$alias[0],
    allowJoinBeforeHost: settings.preferences.joinBeforeHost,
    allowScreenSharing: settings.preferences.screenSharing,
    isMeetingSecret: settings.security.passwordProtected,
    meetingPassword: (_settings$security$pa = settings.security.password) === null || _settings$security$pa === void 0 ? void 0 : _settings$security$pa.plainText,
    meetingPasswordMasked: (_settings$security$pa2 = settings.security.password) === null || _settings$security$pa2 === void 0 ? void 0 : _settings$security$pa2.joinQuery,
    meetingPasswordPSTN: (_settings$security$pa3 = settings.security.password) === null || _settings$security$pa3 === void 0 ? void 0 : _settings$security$pa3.pstn,
    isOnlyAuthUserJoin: settings.security.noGuests,
    isOnlyCoworkersJoin: settings.security.sameAccount,
    e2ee: settings.security.e2ee,
    joinUri: formatJoinUriWithPMN(settings),
    muteAudio: (_settings$preferences = settings.preferences.join) === null || _settings$preferences === void 0 ? void 0 : _settings$preferences.audioMuted,
    muteVideo: (_settings$preferences2 = settings.preferences.join) === null || _settings$preferences2 === void 0 ? void 0 : _settings$preferences2.videoMuted,
    waitingRoomMode: _constants.RCV_WAITING_ROOM_MODE_V2[(_settings$preferences3 = settings.preferences.join) === null || _settings$preferences3 === void 0 ? void 0 : _settings$preferences3.waitingRoomRequired],
    allowAnyoneRecord: (_settings$preferences4 = (_settings$preferences5 = settings.preferences.recordings) === null || _settings$preferences5 === void 0 ? void 0 : _settings$preferences5.everyoneCanControl.enabled) !== null && _settings$preferences4 !== void 0 ? _settings$preferences4 : false,
    allowAnyoneTranscribe: (_settings$preferences6 = settings.preferences.allowEveryoneTranscribeMeetings) !== null && _settings$preferences6 !== void 0 ? _settings$preferences6 : false
  };
};

/**
 * Transform V1 meeting data to V2 format for API calls
 */
var transformV1MeetingToV2 = exports.transformV1MeetingToV2 = function transformV1MeetingToV2(settings, usePersonalMeetingId, options) {
  var result = {
    name: settings.name,
    type: usePersonalMeetingId ? 'PMI' : 'Scheduled',
    security: {
      passwordProtected: settings.isMeetingSecret,
      password: settings.isMeetingSecret ? settings.meetingPassword : '',
      // If true, only authenticated users can join to a meeting.
      noGuests: settings.isOnlyAuthUserJoin,
      // If true, only users have the same account can join to a meeting.
      sameAccount: settings.isOnlyCoworkersJoin
    },
    preferences: {
      join: {
        audioMuted: settings.muteAudio,
        videoMuted: settings.muteVideo
      },
      joinBeforeHost: settings.allowJoinBeforeHost,
      screenSharing: settings.allowScreenSharing,
      allowEveryoneTranscribeMeetings: !!settings.allowAnyoneTranscribe,
      recordings: {
        everyoneCanControl: {
          enabled: !!settings.allowAnyoneRecord
        }
      }
    }
  };
  if (options.enableWaitingRoom) {
    result.preferences.join.waitingRoomRequired = _constants.RCV_WAITING_ROOM_MODE_V2_REVERSE[settings.waitingRoomMode];
  }
  if (options.enableE2EE) {
    result.security.e2ee = settings.e2ee;
  }
  if (usePersonalMeetingId) {
    result.id = settings.id;
  }
  return result;
};

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
//# sourceMappingURL=videoHelper.js.map
