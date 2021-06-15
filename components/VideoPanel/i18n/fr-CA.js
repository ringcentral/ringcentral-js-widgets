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
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Moi-même"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Autoriser les participants à se joindre à la réunion avant l'animateur"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Activer la salle d’attente"), _defineProperty(_topic$date$startTime, "waitingRoom", "Activer la salle d'attente pour"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Personnes externes"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Personnes non connectées"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Tout le monde"), _defineProperty(_topic$date$startTime, "enterPassword", "Saisissez le mot de passe"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Les participants ne peuvent se joindre à la réunion qu'après moi"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Les participants ne peuvent se joindre à la réunion qu'après l'animateur"), _defineProperty(_topic$date$startTime, "muteAudio", "Activer le mode discrétion pour les participants"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Désactiver la caméra des participants"), _defineProperty(_topic$date$startTime, "requirePassword", "Exiger un mot de passe"), _defineProperty(_topic$date$startTime, "setPassword", "Définir le mot de passe *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Définir le mot de passe"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Mot de passe de réunion requis"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne peut pas contenir de symboles."), _defineProperty(_topic$date$startTime, "passwordHintText", "Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne peut pas comporter de symboles."), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Utiliser le code de réunion personnel"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sécurité"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Seuls les utilisateurs authentifiés peuvent se joindre"), _defineProperty(_topic$date$startTime, "signedInUsers", "Utilisateurs connectés"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Collègues connectés"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Seuls l'animateur et les modérateurs peuvent partager leur écran"), _defineProperty(_topic$date$startTime, "lockTooltip", "Ces paramètres sont gérés par votre administrateur"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Ces paramètres s'appliqueront à toutes les réunions créées avec le même PMI"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
