"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_scheduleFor$schedule = {
  scheduleFor: 'Plannen namens',
  scheduleForAssistedUser: 'Meetinginstellingen bijwerken namens {userName}.',
  scheduleForGuidance: 'Plannen namens iemand anders?\n1. Zorg dat u toegang hebt tot zijn of haar Outlook Agenda.\n2. Selecteer in de vervolgkeuzelijst de persoon voor wie u plant.\n',
  scheduleForGuidanceMore: 'Meer informatie',
  meetingSettings: 'Meetinginstellingen',
  meetingSettingsDescription: 'Updates zijn alleen van toepassing op deze meeting.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Mezelf'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", 'Wachtkamer gebruiken'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'Deelnemers wachten tot u ze toelaat. Geweldig voor sollicitatiegesprekken of deelnemers van buitenaf.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'Voor iedereen buiten mijn bedrijf'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", 'Voor iedereen die niet is aangemeld'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'Voor alle deelnemers'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Wachtwoord invoeren'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Meeting starten nadat u deelneemt'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'De meeting start nadat u deelneemt om vroegtijdige gesprekken te voorkomen.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Wachtwoord verplichten'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Houd uw meeting veilig. Iedereen die de link gebruikt, wordt niet om een wachtwoord gevraagd.'), _defineProperty(_scheduleFor$schedule, "password", 'Wachtwoord:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'Wachtwoord meeting vereist'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'Uw wachtwoord moet 1-10 letters en cijfers lang zijn, maar mag geen symbolen bevatten.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Link persoonlijke meeting gebruiken'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Beheren wie kan deelnemen'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Iedereen met een link'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Alleen {shortName}-accounts'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", "Alleen mijn collega's"), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Wachtwoord'), _defineProperty(_scheduleFor$schedule, "edit", 'Bewerken'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Instellingen bewerken'), _defineProperty(_scheduleFor$schedule, "lockTooltip", 'Deze instelling wordt beheerd door uw bedrijfsbeheerder'), _defineProperty(_scheduleFor$schedule, "cancel", 'Annuleren'), _defineProperty(_scheduleFor$schedule, "update", 'Bijwerken'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Instellingen voor persoonlijke meeting'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Stel voor uw persoonlijke meetinglink in wie kan deelnemen en hoe.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"scheduleForAssistedUser"@#@ @source: @#@"Update meetings settings on behalf of {userName}."@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Updates will apply to this meeting only."@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Use waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Participants wait until you admit them. Great for interviews or outside attendees."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"For anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"For anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"For all participants"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Start meeting after you join"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"The meeting will start after you join to prevent early conversations."@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Keep your meeting secure. Anyone using the link won't be prompted for a password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting link"@#@
// @key: @#@"allowMeetingAccess"@#@ @source: @#@"Manage who can join"@#@
// @key: @#@"anyoneWithLink"@#@ @source: @#@"Anyone with link"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Only {shortName} accounts"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Only my coworkers"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"editSettings"@#@ @source: @#@"Edit settings"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"cancel"@#@ @source: @#@"Cancel"@#@
// @key: @#@"update"@#@ @source: @#@"Update"@#@
// @key: @#@"pmiSettingsTitle"@#@ @source: @#@"Personal meeting settings"@#@
// @key: @#@"pmiSettingsDescription"@#@ @source: @#@"Set who can join and how for your personal meeting link."@#@
exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
