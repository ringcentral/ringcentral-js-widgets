"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SAVED_DEFAULT_MEETING_SETTINGS = exports.RCM_PASSWORD_REGEX = exports.RCM_ITEM_NAME = exports.PMIRequirePassword = exports.LAST_MEETING_SETTINGS = exports.DEFAULT_LOCK_SETTINGS = exports.COMMON_SETTINGS = exports.ASSISTED_USERS_MYSELF = void 0;
var RCM_PASSWORD_REGEX = /^[\w@*-]{0,10}$/;
exports.RCM_PASSWORD_REGEX = RCM_PASSWORD_REGEX;
var ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';
exports.ASSISTED_USERS_MYSELF = ASSISTED_USERS_MYSELF;
var PMIRequirePassword = /*#__PURE__*/function (PMIRequirePassword) {
  PMIRequirePassword["JBH_ONLY"] = "jbh_only";
  PMIRequirePassword["ALL"] = "all";
  PMIRequirePassword["NONE"] = "none";
  return PMIRequirePassword;
}({});
exports.PMIRequirePassword = PMIRequirePassword;
var LAST_MEETING_SETTINGS = ['startHostVideo', 'startParticipantsVideo', 'allowJoinBeforeHost', 'audioOptions', '_saved'];
exports.LAST_MEETING_SETTINGS = LAST_MEETING_SETTINGS;
var SAVED_DEFAULT_MEETING_SETTINGS = ['startHostVideo', 'startParticipantsVideo', 'allowJoinBeforeHost', 'audioOptions', '_saved', 'password', '_requireMeetingPassword'];
exports.SAVED_DEFAULT_MEETING_SETTINGS = SAVED_DEFAULT_MEETING_SETTINGS;
var COMMON_SETTINGS = ['allowJoinBeforeHost', 'audioOptions', 'startHostVideo', 'startParticipantsVideo'];
exports.COMMON_SETTINGS = COMMON_SETTINGS;
var DEFAULT_LOCK_SETTINGS = {
  _lockRequireMeetingPassword: false,
  settingLock: {
    allowJoinBeforeHost: false,
    audioOptions: false,
    startHostVideo: false,
    startParticipantsVideo: false
  }
};
exports.DEFAULT_LOCK_SETTINGS = DEFAULT_LOCK_SETTINGS;
var RCM_ITEM_NAME = {
  scheduleFor: 'scheduleFor',
  password: 'password',
  allowJoinBeforeHost: 'allowJoinBeforeHost',
  _requireMeetingPassword: '_requireMeetingPassword'
};
exports.RCM_ITEM_NAME = RCM_ITEM_NAME;
//# sourceMappingURL=constants.js.map
