"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _voIPOnly$telephonyOn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_voIPOnly$telephonyOn = {
  voIPOnly: "Alleen internetaudio",
  telephonyOnly: "Alleen telefoon",
  both: "Telefoon- en internetaudio",
  meetingId: "Meeting-ID",
  password: "Wachtwoord",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Plan namens"
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, "Ikzelf"), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", "Meetingsopties"), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", "Meetingsinstellingen"), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", "Instellingen videovergaderingen"), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", "Audio-opties"), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", "Terugkerende meeting"), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", "Opmerking: schakel deze in bij het kiezen van 'Terugkerend'"), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", "Deelnemers toestaan voor de host binnen te komen"), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", "Camera uitschakelen voor deelnemers"), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", "Schakel camera uit voor host wanneer u deelneemt aan een meeting"), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", "Wachtwoord verplichten"), _defineProperty(_voIPOnly$telephonyOn, "setPassword", "Wachtwoord instellen *"), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", "Wachtwoord voor meeting verplicht"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", "Uw wachtwoord moet 1-10 tekens en cijfers lang zijn en mag geen symbolen bevatten, behalve @, * of -"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", "Uw wachtwoord moet 1-10 tekens en cijfers lang zijn en mag geen symbolen bevatten, behalve @, * of -"), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", "Persoonlijke meeting-ID gebruiken"), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", "Als u wijzigingen wilt aanbrengen voor uw persoonlijke meeting, "), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", "PMI-instellingen wijzigen"), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", "Als u de instellingen wijzigt en deze meetings plant, gebruiken alle meetings met persoonlijke meeting-ID dezelfde nieuwe instellingen."), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", "Deze instelling wordt beheerd door uw bedrijfsbeheerder"), _voIPOnly$telephonyOn); // @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet Audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
