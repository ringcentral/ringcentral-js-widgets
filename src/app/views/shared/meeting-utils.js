"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDisabledStates = calculateDisabledStates;
exports.calculateUseWaitingRoomUpdates = calculateUseWaitingRoomUpdates;
exports.calculateWaitingRoomParticipantsUpdates = calculateWaitingRoomParticipantsUpdates;
exports.calculateWhoCanJoinUpdates = calculateWhoCanJoinUpdates;
exports.createPasswordChangeHandler = createPasswordChangeHandler;
exports.createRequirePasswordChangeHandler = createRequirePasswordChangeHandler;
exports.createStartMeetingAfterJoinChangeHandler = createStartMeetingAfterJoinChangeHandler;
exports.createUseWaitingRoomChangeHandler = createUseWaitingRoomChangeHandler;
exports.createWaitingRoomParticipantsChangeHandler = createWaitingRoomParticipantsChangeHandler;
exports.createWhoCanJoinChangeHandler = createWhoCanJoinChangeHandler;
exports.getWaitingRoomOptions = getWaitingRoomOptions;
exports.getWaitingRoomValue = getWaitingRoomValue;
exports.getWhoCanJoinDisplayText = void 0;
exports.getWhoCanJoinOptions = getWhoCanJoinOptions;
exports.getWhoCanJoinValue = getWhoCanJoinValue;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _constants = require("@ringcentral-integration/commons/modules/RcVideo/constants");
var _utils = require("@ringcentral-integration/utils");
var _constants2 = require("../GenericMeetingViewSpring/constants");
var _i18n = _interopRequireDefault(require("../GenericMeetingViewSpring/i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var t = (0, _utils.getTranslateFn)(_i18n["default"]);

/**
 * Core logic for calculating who can join related updates
 * Returns the updates that should be applied to settings
 */
function calculateWhoCanJoinUpdates(currentSettings, whoCanJoinValue) {
  var settingLock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var preferences = arguments.length > 3 ? arguments[3] : undefined;
  var isOnlyCoworkersJoin = whoCanJoinValue === _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS;
  var isOnlyAuthUserJoin = whoCanJoinValue === _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS || whoCanJoinValue === _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS;
  var updates = {
    isOnlyCoworkersJoin: isOnlyCoworkersJoin,
    isOnlyAuthUserJoin: isOnlyAuthUserJoin
  };

  /* Handle waiting room mode logic */
  var currentWaitingRoomMode = currentSettings === null || currentSettings === void 0 ? void 0 : currentSettings.waitingRoomMode;
  var newWaitingRoomMode = currentWaitingRoomMode;
  var shouldUpdateWaitingRoomMode = false;
  if (currentWaitingRoomMode === undefined || currentWaitingRoomMode === null) {
    newWaitingRoomMode = _constants2.WAITING_ROOM_MODE.NOT_COWORKER;
    shouldUpdateWaitingRoomMode = true;
  }

  // If waiting room mode is locked, use preferences value at first
  if (settingLock.waitingRoomMode) {
    newWaitingRoomMode = preferences.waiting_room && preferences.waiting_room_guests_only ? _constants.RCV_WAITING_ROOM_MODE[preferences.waiting_room_guests_only] : _constants.RCV_WAITING_ROOM_MODE.off;
    shouldUpdateWaitingRoomMode = true;
  }

  // whoCanJoinValue would affect waiting room mode
  if (isOnlyCoworkersJoin /* Only my coworkers */) {
    if (newWaitingRoomMode !== _constants2.WAITING_ROOM_MODE.OFF && newWaitingRoomMode !== _constants2.WAITING_ROOM_MODE.ALL) {
      newWaitingRoomMode = _constants2.WAITING_ROOM_MODE.ALL;
      shouldUpdateWaitingRoomMode = true;
    }
  } else if (isOnlyAuthUserJoin /* Only {brand} accounts */) {
    if (newWaitingRoomMode === _constants2.WAITING_ROOM_MODE.GUESTS) {
      newWaitingRoomMode = _constants2.WAITING_ROOM_MODE.NOT_COWORKER;
      shouldUpdateWaitingRoomMode = true;
    }
  }

  // Update regardless of lock status (linkage changed)
  if (shouldUpdateWaitingRoomMode) {
    updates.waitingRoomMode = newWaitingRoomMode;
  }

  /* Handle allowJoinBeforeHost logic */
  var shouldUpdateAllowJoinBeforeHost = false;
  var newAllowJoinBeforeHost;

  // If allowJoinBeforeHost is locked, use preferences value at first
  if (settingLock.allowJoinBeforeHost) {
    newAllowJoinBeforeHost = preferences.join_before_host;
    shouldUpdateAllowJoinBeforeHost = true;
  }

  // waitingRoomMode would affect allowJoinBeforeHost
  if (updates.waitingRoomMode === _constants2.WAITING_ROOM_MODE.ALL) {
    newAllowJoinBeforeHost = false;
    shouldUpdateAllowJoinBeforeHost = true;
  }

  // Update regardless of lock status (linkage changed)
  if (shouldUpdateAllowJoinBeforeHost) {
    updates.allowJoinBeforeHost = newAllowJoinBeforeHost;
  }
  return updates;
}

/**
 * Core logic for calculating waiting room toggle updates
 * Returns the updates that should be applied to settings
 */
function calculateUseWaitingRoomUpdates(use) {
  return {
    waitingRoomMode: use ? _constants2.WAITING_ROOM_MODE.NOT_COWORKER : _constants2.WAITING_ROOM_MODE.OFF
  };
}

/**
 * Core logic for calculating waiting room participants updates
 * Returns the updates that should be applied to settings
 */
function calculateWaitingRoomParticipantsUpdates(value) {
  var settingLock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var preferences = arguments.length > 2 ? arguments[2] : undefined;
  // Map string values back to numeric waiting room modes
  var waitingRoomMode;
  switch (value) {
    case _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS:
      waitingRoomMode = _constants2.WAITING_ROOM_MODE.ALL;
      break;
    case _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY:
      waitingRoomMode = _constants2.WAITING_ROOM_MODE.NOT_COWORKER;
      break;
    case _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_NOT_SIGNED_IN:
      waitingRoomMode = _constants2.WAITING_ROOM_MODE.GUESTS;
      break;
    default:
      waitingRoomMode = _constants2.WAITING_ROOM_MODE.NOT_COWORKER;
  }
  var updates = {
    waitingRoomMode: waitingRoomMode
  };

  /* Handle allowJoinBeforeHost logic */
  var shouldUpdateAllowJoinBeforeHost = false;
  var newAllowJoinBeforeHost;

  // If allowJoinBeforeHost is locked, use preferences value at first
  if (settingLock.allowJoinBeforeHost) {
    newAllowJoinBeforeHost = preferences.join_before_host;
    shouldUpdateAllowJoinBeforeHost = true;
  }
  if (waitingRoomMode === _constants2.WAITING_ROOM_MODE.ALL) {
    newAllowJoinBeforeHost = false;
    shouldUpdateAllowJoinBeforeHost = true;
  }

  // Update regardless of lock status (linkage changed)
  if (shouldUpdateAllowJoinBeforeHost) {
    updates.allowJoinBeforeHost = newAllowJoinBeforeHost;
  }
  return updates;
}

/**
 * Determines the "Who can join" display value based on meeting settings
 */
function getWhoCanJoinValue(meeting) {
  if (meeting === null || meeting === void 0 ? void 0 : meeting.isOnlyCoworkersJoin) return _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS;
  if (meeting === null || meeting === void 0 ? void 0 : meeting.isOnlyAuthUserJoin) return _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS;
  return _constants2.WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK;
}
var getWhoCanJoinDisplayText = exports.getWhoCanJoinDisplayText = function getWhoCanJoinDisplayText(value, brandConfig) {
  var shortName = brandConfig.shortName;
  switch (value) {
    case _constants2.WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK:
      return t('anyoneWithLink');
    case _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS:
      return t('onlyMyCoworkers');
    case _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS:
      return t('onlyRingCentralAccounts', {
        shortName: shortName
      });
    default:
      return value;
  }
};

/**
 * Determines the waiting room participants display value based on meeting settings
 * This function only displays the current value, business logic is handled in calculateWhoCanJoinUpdates
 */
function getWaitingRoomValue(meeting) {
  var waitingRoomMode = meeting === null || meeting === void 0 ? void 0 : meeting.waitingRoomMode;
  var isOnlyCoworkersJoin = meeting === null || meeting === void 0 ? void 0 : meeting.isOnlyCoworkersJoin;

  // Map numeric waiting room modes to option values
  switch (waitingRoomMode) {
    case _constants2.WAITING_ROOM_MODE.OFF:
      return _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY;
    case _constants2.WAITING_ROOM_MODE.ALL:
      return _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS;
    case _constants2.WAITING_ROOM_MODE.GUESTS:
      // If "Only my coworkers" is selected, "Anyone not signed in" is not available
      // So we should return a valid option instead
      if (isOnlyCoworkersJoin) {
        return _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS;
      }
      return _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_NOT_SIGNED_IN;
    case _constants2.WAITING_ROOM_MODE.NOT_COWORKER:
      // notcoworker - only people outside company go to waiting room
      return _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY;
    default:
      if (isOnlyCoworkersJoin) {
        return _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS;
      }
      return _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY;
  }
}

/**
 * Returns the standard set of "Who can join" options for dropdowns
 */
function getWhoCanJoinOptions(brand) {
  var shortName = brand.brandConfig.shortName;
  return [{
    label: t('anyoneWithLink'),
    value: _constants2.WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK
  }, {
    label: t('onlyRingCentralAccounts', {
      shortName: shortName
    }),
    value: _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS
  }, {
    label: t('onlyMyCoworkers'),
    value: _constants2.WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS
  }];
}

/**
 * Returns appropriate waiting room options based on meeting settings
 */
function getWaitingRoomOptions(meeting) {
  var isOnlyCoworkersJoin = meeting === null || meeting === void 0 ? void 0 : meeting.isOnlyCoworkersJoin;
  var isOnlyAuthUserJoin = meeting === null || meeting === void 0 ? void 0 : meeting.isOnlyAuthUserJoin;

  // When "Only my coworkers" is selected, only show "For all participants" and "Off"
  if (isOnlyCoworkersJoin) {
    return [{
      label: t('allParticipants'),
      value: _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS
    }];
  }

  // When "Only RingCentral accounts" is selected, "For anyone not signed in" is not available
  if (isOnlyAuthUserJoin) {
    return [{
      label: t('allParticipants'),
      value: _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS
    }, {
      label: t('forAnyoneOutsideMyCompany'),
      value: _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY
    }];
  }

  // Default options for "Anyone with link"
  return [{
    label: t('allParticipants'),
    value: _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS
  }, {
    label: t('forAnyoneOutsideMyCompany'),
    value: _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY
  }, {
    label: t('forAnyoneNotSignedIn'),
    value: _constants2.WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_NOT_SIGNED_IN
  }];
}

/**
 * Calculate disabled states for UI components
 */
function calculateDisabledStates(genericMeeting, meeting) {
  // Calculate disabled states based on dependencies
  var waitingRoomMode = meeting === null || meeting === void 0 ? void 0 : meeting.waitingRoomMode;
  var enableWaitingRoom = genericMeeting.ready && genericMeeting.enableWaitingRoom;
  var showE2EE = genericMeeting.ready && genericMeeting.enableE2EE;
  var isE2eeRelatedOptionsDisabled = showE2EE && Boolean(meeting === null || meeting === void 0 ? void 0 : meeting.e2ee);
  var isWaitingRoomDisabled = genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled;
  var settingLock = (meeting === null || meeting === void 0 ? void 0 : meeting.settingLock) || {};
  return {
    // Join before host is disabled when waiting room is set to "all" (mode 1)
    isJoinBeforeHostDisabled: genericMeeting.isUpdating || enableWaitingRoom && waitingRoomMode === _constants2.WAITING_ROOM_MODE.ALL,
    // Waiting room is disabled when E2EE is enabled and active
    isWaitingRoomDisabled: isWaitingRoomDisabled,
    // Waiting room type dropdown is disabled when general disabled or waiting room disabled
    isWaitingRoomTypeDisabled: genericMeeting.isUpdating || isWaitingRoomDisabled,
    // "Who can join" options are disabled when E2EE is enabled and active
    isAuthenticatedCanJoinDisabled: genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled,
    // "Who can join" dropdown is disabled when general disabled or authenticated can join disabled
    isAuthUserTypeDisabled: genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled,
    // Require password is disabled when E2EE is enabled and active
    isRequirePasswordDisabled: genericMeeting.isUpdating || isE2eeRelatedOptionsDisabled,
    // Locked states from admin settings
    isRequirePasswordLocked: Boolean(settingLock.isMeetingSecret),
    isJoinBeforeHostLocked: Boolean(settingLock.allowJoinBeforeHost),
    isWaitingRoomLocked: Boolean(settingLock.waitingRoomMode),
    isAuthUserTypeLocked: Boolean(settingLock.isOnlyAuthUserJoin)
  };
}

/**
 * Creates a handler for requiring password changes
 */
function createRequirePasswordChangeHandler(genericMeeting, getSettings) {
  return function (require) {
    // Get current settings at the time of the update
    var settings = getSettings();
    var settingLock = (settings === null || settings === void 0 ? void 0 : settings.settingLock) || {};

    // If isMeetingSecret is locked, don't allow changes
    if (settingLock.isMeetingSecret) {
      return;
    }
    var updatedSettings = _objectSpread(_objectSpread({}, settings), {}, {
      isMeetingSecret: require
    });
    genericMeeting.updateMeetingSettings(updatedSettings);
    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for password changes
 */
function createPasswordChangeHandler(genericMeeting, getSettings) {
  return function (password) {
    var settings = getSettings();
    var updatedSettings = _objectSpread(_objectSpread({}, settings), {}, {
      meetingPassword: password
    });
    genericMeeting.updateMeetingSettings(updatedSettings);
    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for "who can join" changes
 */
function createWhoCanJoinChangeHandler(genericMeeting, getSettings) {
  return function (value) {
    // Get current settings at the time of the update
    var settings = getSettings();
    var settingLock = (settings === null || settings === void 0 ? void 0 : settings.settingLock) || {};

    // Use the core logic to calculate updates
    var updates = calculateWhoCanJoinUpdates(settings, value, settingLock, genericMeeting.preferences);
    var updatedSettings = _objectSpread(_objectSpread({}, settings), updates);
    genericMeeting.updateMeetingSettings(updatedSettings);
    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for waiting room toggle
 */
function createUseWaitingRoomChangeHandler(genericMeeting, getSettings) {
  return function (use) {
    // Get current settings at the time of the update
    var settings = getSettings();
    var settingLock = (settings === null || settings === void 0 ? void 0 : settings.settingLock) || {};

    // If waitingRoomMode is locked, don't allow changes
    if (settingLock.waitingRoomMode) {
      return;
    }

    // Use the core logic to calculate updates
    var updates = calculateUseWaitingRoomUpdates(use);
    var updatedSettings = _objectSpread(_objectSpread({}, settings), updates);
    genericMeeting.updateMeetingSettings(updatedSettings);
    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for waiting room participants changes
 */
function createWaitingRoomParticipantsChangeHandler(genericMeeting, getSettings) {
  return function (value) {
    // Get current settings at the time of the update
    var settings = getSettings();
    var settingLock = (settings === null || settings === void 0 ? void 0 : settings.settingLock) || {};

    // If waitingRoomMode is locked, don't allow changes
    if (settingLock.waitingRoomMode) {
      return;
    }

    // Use the core logic to calculate updates
    var updates = calculateWaitingRoomParticipantsUpdates(value, settingLock, genericMeeting.preferences);
    var updatedSettings = _objectSpread(_objectSpread({}, settings), updates);
    genericMeeting.updateMeetingSettings(updatedSettings);
    genericMeeting.updateHasSettingsChanged(true);
  };
}

/**
 * Creates a handler for "start meeting after join" changes
 */
function createStartMeetingAfterJoinChangeHandler(genericMeeting, getSettings) {
  return function (start) {
    // Get current settings at the time of the update
    var settings = getSettings();
    var settingLock = (settings === null || settings === void 0 ? void 0 : settings.settingLock) || {};

    // If allowJoinBeforeHost is locked, don't allow changes
    if (settingLock.allowJoinBeforeHost) {
      return;
    }
    var currentWaitingRoomMode = settings === null || settings === void 0 ? void 0 : settings.waitingRoomMode;

    // If waiting room is set to "all" (mode 1), don't allow enabling join before host
    if (currentWaitingRoomMode === _constants2.WAITING_ROOM_MODE.ALL && !start) {
      // Cannot enable join before host when waiting room is "all"
      return;
    }
    var updatedSettings = _objectSpread(_objectSpread({}, settings), {}, {
      allowJoinBeforeHost: !start
    });
    genericMeeting.updateMeetingSettings(updatedSettings);
    genericMeeting.updateHasSettingsChanged(true);
  };
}
//# sourceMappingURL=meeting-utils.js.map
