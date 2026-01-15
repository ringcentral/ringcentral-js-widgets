"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partyStatusCode = exports.mergeEvents = exports.conferenceRole = exports.conferenceCallStatus = exports.MAXIMUM_CAPACITY = exports.DEFAULT_TTL = exports.DEFAULT_TIMEOUT = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var DEFAULT_TIMEOUT = exports.DEFAULT_TIMEOUT = 30000; // time out for conferencing session being accepted.
var DEFAULT_TTL = exports.DEFAULT_TTL = 5000; // timer to update the conference information
var MAXIMUM_CAPACITY = exports.MAXIMUM_CAPACITY = 10;
var conferenceRole = exports.conferenceRole = _ObjectMap.ObjectMap.fromKeys(['host', 'participant']);
var conferenceCallStatus = exports.conferenceCallStatus = /*#__PURE__*/function (conferenceCallStatus) {
  conferenceCallStatus["idle"] = "idle";
  conferenceCallStatus["requesting"] = "requesting";
  return conferenceCallStatus;
}({});
var partyStatusCode = exports.partyStatusCode = _ObjectMap.ObjectMap.fromKeys(['Setup', 'Proceeding', 'Answered', 'Disconnected', 'Gone', 'Parked', 'Hold', 'VoiceMail', 'FaxReceive', 'VoiceMailScreening'].map(function (i) {
  return i.toLowerCase();
}));
var mergeEvents = exports.mergeEvents = _ObjectMap.ObjectMap.fromKeys(['mergeSucceeded']);
//# sourceMappingURL=constants.js.map
