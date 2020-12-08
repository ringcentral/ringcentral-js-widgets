"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_LOCK_SETTINGS = exports.COMMON_SETTINGS = exports.SAVED_DEFAULT_MEETING_SETTINGS = exports.LAST_MEETING_SETTINGS = exports.PMIRequirePassword = exports.ASSISTED_USERS_MYSELF = exports.RCM_PASSWORD_REGEX = void 0;
var RCM_PASSWORD_REGEX = /^[\w@*-]{0,10}$/;
exports.RCM_PASSWORD_REGEX = RCM_PASSWORD_REGEX;
var ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';
exports.ASSISTED_USERS_MYSELF = ASSISTED_USERS_MYSELF;
var PMIRequirePassword;
exports.PMIRequirePassword = PMIRequirePassword;

(function (PMIRequirePassword) {
  PMIRequirePassword["JBH_ONLY"] = "jbh_only";
  PMIRequirePassword["ALL"] = "all";
  PMIRequirePassword["NONE"] = "none";
})(PMIRequirePassword || (exports.PMIRequirePassword = PMIRequirePassword = {}));

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
//# sourceMappingURL=constants.js.map
