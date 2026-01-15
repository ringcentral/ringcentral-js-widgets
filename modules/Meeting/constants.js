"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SAVED_DEFAULT_MEETING_SETTINGS = exports.RCM_PASSWORD_REGEX = exports.RCM_ITEM_NAME = exports.PMIRequirePassword = exports.LAST_MEETING_SETTINGS = exports.DEFAULT_LOCK_SETTINGS = exports.COMMON_SETTINGS = exports.ASSISTED_USERS_MYSELF = void 0;
var RCM_PASSWORD_REGEX = exports.RCM_PASSWORD_REGEX = /^[\w@*-]{0,10}$/;
var ASSISTED_USERS_MYSELF = exports.ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';
var PMIRequirePassword = exports.PMIRequirePassword = /*#__PURE__*/function (PMIRequirePassword) {
  PMIRequirePassword["JBH_ONLY"] = "jbh_only";
  PMIRequirePassword["ALL"] = "all";
  PMIRequirePassword["NONE"] = "none";
  return PMIRequirePassword;
}({});
var LAST_MEETING_SETTINGS = exports.LAST_MEETING_SETTINGS = ['startHostVideo', 'startParticipantsVideo', 'allowJoinBeforeHost', 'audioOptions', '_saved'];
var SAVED_DEFAULT_MEETING_SETTINGS = exports.SAVED_DEFAULT_MEETING_SETTINGS = ['startHostVideo', 'startParticipantsVideo', 'allowJoinBeforeHost', 'audioOptions', '_saved', 'password', '_requireMeetingPassword'];
var COMMON_SETTINGS = exports.COMMON_SETTINGS = ['allowJoinBeforeHost', 'audioOptions', 'startHostVideo', 'startParticipantsVideo'];
var DEFAULT_LOCK_SETTINGS = exports.DEFAULT_LOCK_SETTINGS = {
  _lockRequireMeetingPassword: false,
  settingLock: {
    allowJoinBeforeHost: false,
    audioOptions: false,
    startHostVideo: false,
    startParticipantsVideo: false
  }
};
var RCM_ITEM_NAME = exports.RCM_ITEM_NAME = {
  scheduleFor: 'scheduleFor',
  password: 'password',
  allowJoinBeforeHost: 'allowJoinBeforeHost',
  _requireMeetingPassword: '_requireMeetingPassword'
};
//# sourceMappingURL=constants.js.map
