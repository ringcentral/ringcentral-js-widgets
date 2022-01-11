"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _date$time$hours$minu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$hours$minu = {
  date: "Datum",
  time: "Tijdstip",
  hours: "{howMany} u.",
  minutes: "{howMany} min.",
  today: "Vandaag",
  duration: "Duur",
  topic: "Meetingtitel",
  voIPOnly: "Alleen internetaudio",
  telephonyOnly: "Alleen telefoon",
  both: "Audio telefoon en internet",
  thirdParty: "Audio derde partij",
  meetingId: "Meeting-ID",
  password: "Wachtwoord",
  video: "Video",
  audio: "Audio",
  scheduleFor: "Plannen namens"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Mijzelf"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Meetingopties"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Meetinginstellingen"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Instellingen videovergaderingen"), _defineProperty(_date$time$hours$minu, "audioOptions", "Audio-opties"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Terugkerende meeting"), _defineProperty(_date$time$hours$minu, "recurringNote", "Opmerking: schakel deze in bij het kiezen van 'Terugkerend'"), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Deelnemers toestaan voor de host binnen te komen"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Camera uitschakelen voor deelnemers"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Schakel camera uit voor host wanneer u deelneemt aan een meeting"), _defineProperty(_date$time$hours$minu, "requirePassword", "Wachtwoord vereisen"), _defineProperty(_date$time$hours$minu, "enterPassword", "Wachtwoord invoeren"), _defineProperty(_date$time$hours$minu, "setPassword", "Wachtwoord instellen *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Wachtwoord meeting vereist"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "Uw wachtwoord moet 1-10 tekens en cijfers lang zijn en mag geen symbolen bevatten, behalve @, * of -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "Uw wachtwoord moet 1-10 tekens en cijfers lang zijn en mag geen symbolen bevatten, behalve @, * of -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Persoonlijke meeting-ID gebruiken"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "Als u wijzigingen wilt aanbrengen voor uw persoonlijke meeting, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "wijzigt u de PMI-instellingen"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "Als u de instellingen wijzigt en deze meetings plant, gebruiken alle meetings met persoonlijke meeting-ID dezelfde nieuwe instellingen."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "Deze instelling wordt beheerd door uw bedrijfsbeheerder"), _defineProperty(_date$time$hours$minu, "when", "Wanneer"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "Vergeet niet om terugkeren of herhaling aan te vinken in uw agenda-uitnodiging voor uw bezoekers."), _defineProperty(_date$time$hours$minu, "ieSupportAlert", "Houd er rekening mee dat na 16 februari 2022 {appName} niet werkt met Internet Explorer 11. We raden aan over te schakelen naar Microsoft Edge of te updaten naar Outlook 2016 of hoger."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
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
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
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
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
