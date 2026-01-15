"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RCV_WAITING_ROOM_MODE_REVERSE = exports.RCV_WAITING_ROOM_MODE = exports.RCV_WAITING_ROOM_API_KEYS = exports.RCV_PASSWORD_REGEX = exports.RCV_ITEM_NAME = exports.RCV_E2EE_API_KEYS = exports.JBH_LABEL = exports.INVITATION_BOUNDARY_REGEX = exports.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH = exports.AUTH_USER_TYPE = exports.ASSISTED_USERS_MYSELF = exports.ALLOW_MEETING_ACCESS = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RCV_WAITING_ROOM_API_KEYS = exports.RCV_WAITING_ROOM_API_KEYS = 'waitingRoomMode';
var ASSISTED_USERS_MYSELF = exports.ASSISTED_USERS_MYSELF = 'ASSISTED_USERS_MYSELF';
var AUTH_USER_TYPE = exports.AUTH_USER_TYPE = {
  SIGNED_IN_CO_WORKERS: 'signedInCoWorkers',
  SIGNED_IN_USERS: 'signedInUsers'
};
var ALLOW_MEETING_ACCESS = exports.ALLOW_MEETING_ACCESS = {
  SIGNED_IN_CO_WORKERS: 'signedInCoWorkers',
  SIGNED_IN_USERS: 'signedInUsers',
  ANYONE_WITH_LINK: 'anyoneWithLink'
};
var JBH_LABEL = exports.JBH_LABEL = {
  JOIN_AFTER_HOST: 'onlyJoinAfterHost',
  JOIN_AFTER_ME: 'onlyJoinAfterMe'
};
var RCV_WAITING_ROOM_MODE = exports.RCV_WAITING_ROOM_MODE = {
  off: 0,
  all: 1,
  guests: 2,
  notcoworker: 3
};
var DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH = exports.DISABLE_E2EE_WHEN_RELATED_OPTION_MATCH = _defineProperty(_defineProperty({
  isMeetingSecret: false
}, RCV_WAITING_ROOM_API_KEYS, RCV_WAITING_ROOM_MODE.off), "isOnlyAuthUserJoin", false);
var RCV_WAITING_ROOM_MODE_REVERSE = exports.RCV_WAITING_ROOM_MODE_REVERSE = {
  0: 'all',
  1: 'all',
  2: 'guests',
  3: 'notcoworker'
};
var RCV_PASSWORD_REGEX = exports.RCV_PASSWORD_REGEX = /^[A-Za-z0-9]{1,10}$/;
var INVITATION_BOUNDARY_REGEX = exports.INVITATION_BOUNDARY_REGEX = /-*Boundary(_\d+)*-*(\r\n)?|((Content-Type|Content-Disposition).+((\r\n)+(\s+\n)?))|-{3}(\n\r\n)*/g;
var RCV_E2EE_API_KEYS = exports.RCV_E2EE_API_KEYS = 'e2ee';
var RCV_ITEM_NAME = exports.RCV_ITEM_NAME = {
  scheduleFor: 'scheduleFor',
  isMeetingSecret: 'isMeetingSecret',
  meetingPassword: 'meetingPassword',
  allowJoinBeforeHost: 'allowJoinBeforeHost',
  waitingRoomMode: 'waitingRoomMode',
  waitingRoomType: 'waitingRoomType',
  e2ee: 'e2ee',
  isOnlyAuthUserJoin: 'isOnlyAuthUserJoin',
  isOnlyCoworkersJoin: 'isOnlyCoworkersJoin',
  muteVideo: 'muteVideo',
  muteAudio: 'muteAudio',
  allowScreenSharing: 'allowScreenSharing',
  allowAnyoneRecord: 'allowAnyoneRecord',
  allowAnyoneTranscribe: 'allowAnyoneTranscribe'
};

// eslint-disable-next-line max-len

// eslint-disable-next-line max-len
//# sourceMappingURL=constants.js.map
