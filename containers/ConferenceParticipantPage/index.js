"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceParticipantPage = void 0;
var _ConferenceParticipantContainer = require("../../components/ConferenceParticipantContainer");
var _phoneContext = require("../../lib/phoneContext");
var ConferenceParticipantPage = exports.ConferenceParticipantPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conferenceParticipantUI;
})(_ConferenceParticipantContainer.ConferenceParticipantContainer);
//# sourceMappingURL=index.js.map
