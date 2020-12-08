"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("ringcentral-integration/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: "Titre du meeting",
  date: "Date",
  startTime: "Heure",
  duration: "Durée",
  scheduleFor: "Planifier au nom de",
  meetingSettings: "Paramètres de la réunion"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Moi-même"), _defineProperty(_topic$date$startTime, "rcMeetingSettings", "Paramètres de la vidéoconférence"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Autoriser les participants à se joindre à la réunion avant l'hôte"), _defineProperty(_topic$date$startTime, "waitingRoom", "Activer la salle d'attente pour"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Toute personne extérieure à mon entreprise"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Toute personne qui n'est pas connectée"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Tout le monde"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Les participants ne peuvent se joindre au meeting qu'après moi"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Les participants ne peuvent se joindre au meeting qu'après l'hôte"), _defineProperty(_topic$date$startTime, "muteAudio", "Activer le mode discrétion pour les participants"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Éteindre la caméra pour les participants"), _defineProperty(_topic$date$startTime, "requirePassword", "Exiger un mot de passe"), _defineProperty(_topic$date$startTime, "setPassword", "Définir le mot de passe *"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Mot de passe de réunion requis"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Utilisez de 1 à 10 caractères comprenant des lettres et des chiffres mais pas de symboles"), _defineProperty(_topic$date$startTime, "passwordHintText", "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, mais ne doit pas contenir de symboles"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Utiliser le code de réunion personnel"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sécurité"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Seuls les utilisateurs authentifiés peuvent se joindre"), _defineProperty(_topic$date$startTime, "signedInUsers", "Utilisateurs connectés"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Collègues connectés"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Seuls l'hôte et les modérateurs peuvent partager leur écran"), _defineProperty(_topic$date$startTime, "lockTooltip", "Ces paramètres sont gérés par votre administrateur"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Ces paramètres s'appliqueront à tous les meetings créés avec le même PMI"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Use 1 to 10 characters which include alphabets and numbers but no symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but not contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
