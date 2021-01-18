"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _date$time$duration$t;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$duration$t = {
  date: "Datum",
  time: "Tijdstip",
  duration: "Duur",
  topic: "Titel meeting",
  voIPOnly: "Alleen internetaudio",
  telephonyOnly: "Alleen telefoon",
  both: "Telefoon- en internetaudio",
  meetingId: "Meeting-ID",
  password: "Wachtwoord",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Plan namens"
}, _defineProperty(_date$time$duration$t, _Meeting.ASSISTED_USERS_MYSELF, "Ikzelf"), _defineProperty(_date$time$duration$t, "meetingOptions", "Meetingsopties"), _defineProperty(_date$time$duration$t, "meetingSettings", "Meetingsinstellingen"), _defineProperty(_date$time$duration$t, "rcMeetingSettings", "Instellingen videovergaderingen"), _defineProperty(_date$time$duration$t, "audioOptions", "Audio-opties"), _defineProperty(_date$time$duration$t, "recurringMeeting", "Terugkerende meeting"), _defineProperty(_date$time$duration$t, "recurringNote", "Opmerking: schakel deze in bij het kiezen van 'Terugkerend'"), _defineProperty(_date$time$duration$t, "joinBeforeHost", "Deelnemers toestaan voor de host binnen te komen"), _defineProperty(_date$time$duration$t, "turnOffCamera", "Camera uitschakelen voor deelnemers"), _defineProperty(_date$time$duration$t, "turnOffHostCamera", "Schakel camera uit voor host wanneer u deelneemt aan een meeting"), _defineProperty(_date$time$duration$t, "requirePassword", "Wachtwoord verplichten"), _defineProperty(_date$time$duration$t, "setPassword", "Wachtwoord instellen *"), _defineProperty(_date$time$duration$t, "passwordEmptyError", "Wachtwoord voor meeting verplicht"), _defineProperty(_date$time$duration$t, "rcmPasswordInvalidError", "Uw wachtwoord moet 1-10 tekens en cijfers lang zijn en mag geen symbolen bevatten, behalve @, * of -"), _defineProperty(_date$time$duration$t, "rcmPasswordHintText", "Uw wachtwoord moet 1-10 tekens en cijfers lang zijn en mag geen symbolen bevatten, behalve @, * of -"), _defineProperty(_date$time$duration$t, "usePersonalMeetingId", "Persoonlijke meeting-ID gebruiken"), _defineProperty(_date$time$duration$t, "pmiChangeConfirm", "Als u wijzigingen wilt aanbrengen voor uw persoonlijke meeting, "), _defineProperty(_date$time$duration$t, "changePmiSettings", "PMI-instellingen wijzigen"), _defineProperty(_date$time$duration$t, "pmiSettingChangeAlert", "Als u de instellingen wijzigt en deze meetings plant, gebruiken alle meetings met persoonlijke meeting-ID dezelfde nieuwe instellingen."), _defineProperty(_date$time$duration$t, "lockedTooltip", "Deze instelling wordt beheerd door uw bedrijfsbeheerder"), _defineProperty(_date$time$duration$t, "when", "Wanneer"), _defineProperty(_date$time$duration$t, "recurringDescribe", "Vergeet niet om terugkeren of herhaling aan te vinken in uw agenda-uitnodiging voor uw bezoekers."), _date$time$duration$t); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
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
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
