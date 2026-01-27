"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* eslint-disable */
var _default = exports["default"] = {
  video: 'Video',
  meetingTitle: 'Meetingtitel',
  date: 'Datum',
  time: 'Tijd',
  duration: 'Duur',
  scheduleVideoMeeting: 'Videomeeting plannen',
  requirePassword: 'Wachtwoord verplichten',
  requirePasswordDescription: 'Houd uw meeting veilig. Deelnemers die de link gebruiken, worden niet om een wachtwoord gevraagd.',
  password: 'Wachtwoord',
  edit: 'Bewerken',
  noPasswordSet: 'Geen wachtwoord ingesteld',
  manageWhoCanJoin: 'Beheren wie mag deelnemen',
  useWaitingRoom: 'Wachtkamer gebruiken',
  useWaitingRoomDescription: 'Deelnemers wachten tot u ze toelaat. Geweldig voor sollicitatiegesprekken of deelnemers van buitenaf.',
  startMeetingAfterJoin: 'Meeting starten nadat u deelneemt',
  startMeetingAfterJoinDescription: 'De meeting start nadat u deelneemt om vroegtijdige gesprekken te voorkomen.',
  usePersonalMeetingLink: 'Persoonlijke meetinglink gebruiken',
  personalMeetingLink: 'Persoonlijke meetinglink',
  editSettings: 'Instellingen bewerken',
  scheduleMeeting: 'Meeting inplannen',
  cancel: 'Annuleren',
  update: 'Bijwerken',
  updating: 'Bijwerken...',
  passwordFormatError: 'Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten',
  passwordRequiredError: 'Wachtwoord is verplicht',
  updatePassword: 'Wachtwoord bijwerken',
  passwordRequired: 'Wachtwoord is verplicht',
  passwordValidationHint: 'Voer een wachtwoord in van 1-10 tekens lang (alleen letters en cijfers)',
  anyoneWithLink: 'Iedereen met een link',
  onlyRingCentralAccounts: 'Alleen {shortName}-accounts',
  onlyMyCoworkers: "Alleen mijn collega's",
  allParticipants: 'Alle deelnemers',
  forAnyoneOutsideMyCompany: 'Voor iedereen buiten mijn bedrijf',
  forAnyoneNotSignedIn: 'Voor iedereen die niet is aangemeld',
  personalMeetingSettings: 'Instellingen voor persoonlijke meeting',
  personalMeetingSettingsDescription: 'Stel voor uw persoonlijke meetinglink in wie kan deelnemen en hoe.',
  hour: 'uur',
  minute: 'min',
  adminLockedSetting: 'Deze instelling wordt beheerd door uw bedrijfsbeheerder',
  passwordPlaceholder: 'Wachtwoord invoeren'
}; // @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"meetingTitle"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleVideoMeeting"@#@ @source: @#@"Schedule video meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won’t be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"noPasswordSet"@#@ @source: @#@"No password set"@#@
// @key: @#@"manageWhoCanJoin"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"useWaitingRoom"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"useWaitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"startMeetingAfterJoin"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"startMeetingAfterJoinDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"usePersonalMeetingLink"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"personalMeetingLink"@#@ @source: @#@"Personal meeting link"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"scheduleMeeting"@#@ @source: @#@"Schedule meeting"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"updating"@#@ @source: @#@"Updating..."@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordRequiredError"@#@ @source: @#@"Password is required"@#@
// @key: @#@"updatePassword"@#@ @source: @#@"Update Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordValidationHint"@#@ @source: @#@"Enter a password 1-10 characters long (letters and numbers only)"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"onlyRingCentralAccounts"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"onlyMyCoworkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"allParticipants"@#@ @source: @#@"All participants"@#@
// @key: @#@"forAnyoneOutsideMyCompany"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"forAnyoneNotSignedIn"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"personalMeetingSettings"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"personalMeetingSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
// @key: @#@"hour"@#@ @source: @#@"hr"@#@
// @key: @#@"minute"@#@ @source: @#@"min"@#@
// @key: @#@"adminLockedSetting"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"passwordPlaceholder"@#@ @source: @#@"Enter Password"@#@
//# sourceMappingURL=nl-NL.js.map
