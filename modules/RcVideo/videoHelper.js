"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.entries");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.includes");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideoTypes = exports.RCV_PREFERENCES_KEYS = exports.RCV_PREFERENCES_IDS = exports.RCV_E2EE_RELATED_KEYS = exports.RCV_E2EE_DEFAULT_SECURITY_OPTIONS = void 0;
exports.assignObject = assignObject;
exports.comparePreferences = comparePreferences;
exports.formatMainPhoneNumber = formatMainPhoneNumber;
exports.formatPremiumNumbers = formatPremiumNumbers;
exports.formatRcvInvitationRequestDataV2 = exports.formatRcvInvitationRequestData = void 0;
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
exports.sortDialInNumbers = void 0;
exports.transformPreferences = transformPreferences;
exports.transformSettingLocks = transformSettingLocks;
exports.validatePasswordSettings = validatePasswordSettings;
exports.validateRandomPassword = validateRandomPassword;
var _utils = require("@ringcentral-integration/utils");
var _ramda = require("ramda");
var _constants = require("./constants");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
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
var RCV_PREFERENCES_IDS = ['e2ee', 'join_before_host',
// 'join_video_off',
// 'join_audio_mute',
'password_scheduled', 'password_instant', 'guest_join', 'join_authenticated_from_account_only', 'screen_sharing_host_only', 'waiting_room_guests_only', 'waiting_room'];
exports.RCV_PREFERENCES_IDS = RCV_PREFERENCES_IDS;
var RCV_PREFERENCES_KEYS = ['allowJoinBeforeHost',
// 'muteVideo',
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
}

// gsuite
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
    // @ts-expect-error TS(2322): Type '{ allowJoinBeforeHost: false; isMeetingSecre... Remove this comment to see the full error message
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
function transformPreferences(preferences) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowJoinBeforeHost: preferences.join_before_host,
    // muteVideo: preferences.join_video_off,
    // muteAudio: preferences.join_audio_mute,
    e2ee: preferences.e2ee,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isMeetingSecret: isInstantMeeting ? preferences.password_instant : preferences.password_scheduled,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isOnlyAuthUserJoin: preferences.guest_join,
    isOnlyCoworkersJoin: preferences.guest_join ? preferences.join_authenticated_from_account_only === 'only_co_workers' : false,
    allowScreenSharing: preferences.screen_sharing_host_only === 'all',
    waitingRoomMode: preferences.waiting_room ?
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    _constants.RCV_WAITING_ROOM_MODE[preferences.waiting_room_guests_only] : _constants.RCV_WAITING_ROOM_MODE.off
  };
}
function transformSettingLocks(settingLocks) {
  var isInstantMeeting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowJoinBeforeHost: settingLocks.join_before_host,
    // muteVideo: settingLocks.join_video_off,
    // muteAudio: settingLocks.join_audio_mute,
    e2ee: settingLocks.e2ee,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isMeetingSecret: isInstantMeeting ? settingLocks.password_instant : settingLocks.password_scheduled,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isOnlyAuthUserJoin: settingLocks.guest_join,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    isOnlyCoworkersJoin: settingLocks.join_authenticated_from_account_only,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    allowScreenSharing: settingLocks.screen_sharing_host_only,
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
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
    waiting_room_guests_only:
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    _constants.RCV_WAITING_ROOM_MODE_REVERSE[preferences.waitingRoomMode],
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
    if (!getAvaliableWaitingRoomOpions(settings.isOnlyCoworkersJoin).includes(
    // @ts-expect-error TS(2345): Argument of type 'number | undefined' is not assig... Remove this comment to see the full error message
    settings.waitingRoomMode)) {
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
    // @ts-expect-error TS(2322): Type 'undefined' is not assignable to type 'string... Remove this comment to see the full error message
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
};
var formatRcvInvitationRequestData = function formatRcvInvitationRequestData(params) {
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
exports.formatRcvInvitationRequestData = formatRcvInvitationRequestData;
var sortDialInNumbers = function sortDialInNumbers(numbers, currentLocale) {
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
      location: "".concat(_i18n["default"].getString('tollFree', currentLocale))
    };
  });
  return [].concat(_toConsumableArray(defaultPhoneNumbers), _toConsumableArray(premiumNumbers), _toConsumableArray(tollFreeNumbers));
};
exports.sortDialInNumbers = sortDialInNumbers;
var formatRcvInvitationRequestDataV2 = function formatRcvInvitationRequestDataV2(params) {
  // format number
  var numbers = sortDialInNumbers(params.phoneNumbers, params.currentLocale);
  return formatRcvRequestData(params, numbers);
};

// TODO: will remove this when google app script could support export seperately
// export together because google app script not fully support export
exports.formatRcvInvitationRequestDataV2 = formatRcvInvitationRequestDataV2;
//# sourceMappingURL=videoHelper.js.map
