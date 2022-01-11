"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceParticipantPage = void 0;

var _ConferenceParticipantContainer = require("../../components/ConferenceParticipantContainer");

var _phoneContext = require("../../lib/phoneContext");

var ConferenceParticipantPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conferenceParticipantUI;
})(_ConferenceParticipantContainer.ConferenceParticipantContainer);
exports.ConferenceParticipantPage = ConferenceParticipantPage;
//# sourceMappingURL=index.js.map
