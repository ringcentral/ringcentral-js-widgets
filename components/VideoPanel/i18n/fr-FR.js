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
  topic: "Titre de la réunion",
  date: "Date",
  startTime: "Heure",
  duration: "Durée",
  scheduleFor: "Programme défini par",
  meetingSettings: "Paramètres de la réunion"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Moi-même"), _defineProperty(_topic$date$startTime, "rcMeetingSettings", "Paramètres de la vidéoconférence"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Autoriser les participants à se connecter avant l'hôte"), _defineProperty(_topic$date$startTime, "waitingRoom", "Mettre en place une salle d'attente pour"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Toute personne extérieure à mon entreprise"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Toute personne non connectée"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Tout le monde"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Les participants ne peuvent rejoindre la réunion qu'après moi"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Les participants ne peuvent rejoindre la réunion qu'après l'hôte"), _defineProperty(_topic$date$startTime, "muteAudio", "Activer le mode silencieux pour les participants"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Désactiver la caméra pour les participants"), _defineProperty(_topic$date$startTime, "requirePassword", "Exiger un mot de passe"), _defineProperty(_topic$date$startTime, "setPassword", "Définir un mot de passe *"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Mot de passe de la réunion requis"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Utilisez 1 à 10 caractères comprenant des lettres et des chiffres mais pas de symboles"), _defineProperty(_topic$date$startTime, "passwordHintText", "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres mais ne doit pas contenir de symboles"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Utiliser l'identifiant personnel de réunion"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sécurité"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Seuls les utilisateurs authentifiés peuvent rejoindre la réunion"), _defineProperty(_topic$date$startTime, "signedInUsers", "Utilisateurs connectés"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Collaborateurs connectés"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Seuls l'hôte et les modérateurs peuvent partager l'écran"), _defineProperty(_topic$date$startTime, "lockTooltip", "Ce paramètre est géré par l'administrateur de votre entreprise"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Ces paramètres s'appliquent à toutes les réunions créées avec les paramètres PMI"), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=fr-FR.js.map
