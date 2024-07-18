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
var _topic$date$startTime;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _default = (_topic$date$startTime = {
  topic: "Tapaamisen otsikko",
  date: "Päivämäärä",
  startTime: "Aika",
  duration: "Kesto",
  scheduleFor: "Ajoita seuraavan henkilön puolesta:",
  meetingSettings: "Tapaamisen asetukset"
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, "Minä itse"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Salli osallistujien liittyä ennen ylläpitäjää"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Ota odotushuone käyttöön"), _defineProperty(_topic$date$startTime, "waitingRoom", "Ota odotushuone käyttöön kohteelle"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Kuka tahansa yritykseni ulkopuolinen"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Kuka tahansa, joka ei ole kirjautunut"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Kaikki"), _defineProperty(_topic$date$startTime, "enterPassword", "Anna salasanasi"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Osallistujat voivat liittyä vasta minun jälkeeni"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Osallistujat voivat liittyä vasta ylläpitäjän jälkeen"), _defineProperty(_topic$date$startTime, "muteAudio", "Mykistä ääni osallistujilta"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Poista kamera osallistujien käytöstä"), _defineProperty(_topic$date$startTime, "requirePassword", "Edellytä salasanaa"), _defineProperty(_topic$date$startTime, "useE2ee", "Käytä päästä päähän -salausta"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Päästä päähän salatut tapaamiset ovat yksityisimpiä, mutta ominaisuudet kuten puhelimella liittyminen, tekstitys ja tallennus eivät ole käytettävissä."), _defineProperty(_topic$date$startTime, "setPassword", "Määritä salasana*"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Määritä salasana"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Tapaamisen salasana vaaditaan"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita"), _defineProperty(_topic$date$startTime, "passwordHintText", "Salasanasi on oltava 1–10 kirjainta ja numeroa pitkä, eikä se saa sisältää symboleita"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Käytä henkilökohtaista tapaamistunnusta"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Turvallisuus"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Vain valtuutetut käyttäjät voivat liittyä"), _defineProperty(_topic$date$startTime, "signedInUsers", "Kirjautuneet käyttäjät"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Kirjautuneet työtoverit"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Vain ylläpitäjä ja moderaattorit voivat jakaa ruudun"), _defineProperty(_topic$date$startTime, "lockTooltip", "Tämä asetus on yrityksen järjestelmänvalvojan hallinnassa"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Näitä asetuksia käytetään kaikissa PMI:llä luoduissa tapaamisissa"), _defineProperty(_topic$date$startTime, "today", "Tänään"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Aikataulutatko jonkun muun puolesta?\n1. Varmista, että olet hänen Outlook-kalenterissaan.\n2. Valitse avattavasta valikosta henkilö, jonka puolesta teet aikataulua.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "Katso lisätiedot"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Muuta henkilökohtaisen tapaamisen asetuksia"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"setPasswordNotSymbol"@#@ @source: @#@"Set password"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
