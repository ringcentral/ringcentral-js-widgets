"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeEvents = exports.partyStatusCode = exports.conferenceCallStatus = exports.conferenceRole = exports.MAXIMUM_CAPACITY = exports.DEFAULT_TTL = exports.DEFAULT_TIMEOUT = void 0;

require("core-js/modules/es6.array.map");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var DEFAULT_TIMEOUT = 30000; // time out for conferencing session being accepted.

exports.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
var DEFAULT_TTL = 5000; // timer to update the conference information

exports.DEFAULT_TTL = DEFAULT_TTL;
var MAXIMUM_CAPACITY = 10;
exports.MAXIMUM_CAPACITY = MAXIMUM_CAPACITY;

var conferenceRole = _ObjectMap.ObjectMap.fromKeys(['host', 'participant']);

exports.conferenceRole = conferenceRole;
var conferenceCallStatus;
exports.conferenceCallStatus = conferenceCallStatus;

(function (conferenceCallStatus) {
  conferenceCallStatus["idle"] = "idle";
  conferenceCallStatus["requesting"] = "requesting";
})(conferenceCallStatus || (exports.conferenceCallStatus = conferenceCallStatus = {}));

var partyStatusCode = _ObjectMap.ObjectMap.fromKeys(['Setup', 'Proceeding', 'Answered', 'Disconnected', 'Gone', 'Parked', 'Hold', 'VoiceMail', 'FaxReceive', 'VoiceMailScreening'].map(function (i) {
  return i.toLowerCase();
}));

exports.partyStatusCode = partyStatusCode;

var mergeEvents = _ObjectMap.ObjectMap.fromKeys(['mergeSucceeded']);

exports.mergeEvents = mergeEvents;
//# sourceMappingURL=constants.js.map
