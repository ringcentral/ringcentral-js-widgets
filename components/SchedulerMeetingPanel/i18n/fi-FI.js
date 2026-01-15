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
  scheduleFor: 'Ajoita seuraavan henkilön puolesta:',
  scheduleForAssistedUser: 'Päivitä tapaamisasetukset henkilön {userName}puolesta.',
  scheduleForGuidance: 'Aikataulutatko jonkun muun puolesta?\n1. Varmista, että olet hänen Outlook-kalenterissaan.\n2. Valitse avattavasta valikosta henkilö, jonka puolesta teet aikataulua.\n',
  scheduleForGuidanceMore: 'Katso lisätiedot',
  meetingSettings: 'Tapaamisasetukset',
  meetingSettingsDescription: 'Päivitykset koskevat vain tätä tapaamista.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Minä itse'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", 'Käytä odotushuonetta'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'Osallistujat odottavat, kunnes annat heidän liittyä. Sopii erinomaisesti haastatteluihin tai ulkopuolisille osallistujille.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'Yritykseni ulkopuolisille henkilöille'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", 'Henkilöille, jotka eivät ole kirjautuneet sisään'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'Kaikille osallistujille'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Anna salasana'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Aloita tapaaminen liittymisen jälkeen'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'Ennenaikaisten keskustelujen estämiseksi tapaaminen alkaa, kun olet liittynyt.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Edellytä salasanaa'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Pidä tapaamisesi turvallisena. Linkin käyttäjiltä ei pyydetä salasanaa.'), _defineProperty(_scheduleFor$schedule, "password", 'Salasana:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'Tapaamisen salasana vaaditaan'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Käytä henkilökohtaista tapaamislinkkiä'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Hallitse, ketkä voivat liittyä'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Kuka tahansa, jolla on linkki'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Vain {shortName} -tilit'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", 'Vain työtoverini'), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Salasana'), _defineProperty(_scheduleFor$schedule, "edit", 'Muokkaa'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Muokkaa asetuksia'), _defineProperty(_scheduleFor$schedule, "lockTooltip", 'Asetus on yrityksen järjestelmänvalvojan hallinnassa'), _defineProperty(_scheduleFor$schedule, "cancel", 'Peruuta'), _defineProperty(_scheduleFor$schedule, "update", 'Päivitä'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Henkilökohtaisen tapaamisen asetukset'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Määritä henkilökohtaiseen tapaamislinkkiisi, ketkä voivat liittyä ja miten.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=fi-FI.js.map
