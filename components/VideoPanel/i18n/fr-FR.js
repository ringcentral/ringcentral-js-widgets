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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_topic$date$startTime = {
  topic: 'Titre de la réunion',
  date: 'Date',
  startTime: 'Heure',
  duration: 'Durée',
  scheduleFor: 'Planifier au nom de',
  meetingSettings: 'Paramètres de la réunion',
  meetingSettingsDescription: 'La mise à jour de ces paramètres ne s’appliquera qu’à la réunion en cours.',
  here: 'ici'
}, _defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Moi-même'), _defineProperty(_topic$date$startTime, "joinBeforeHost", 'Autoriser les participants à se connecter avant l’hôte'), _defineProperty(_topic$date$startTime, "enableWaitingRoom", 'Activer la salle d’attente'), _defineProperty(_topic$date$startTime, "waitingRoom", 'Mettre en place une salle d’attente pour'), _defineProperty(_topic$date$startTime, "waitingRoomTitle", 'Salle d’attente'), _defineProperty(_topic$date$startTime, "waitingRoomDescription", 'La réunion reste privée tant que vous n’acceptez pas de participants.'), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", 'Toute personne hors entreprise'), _defineProperty(_topic$date$startTime, "waitingRoomGuest", 'Toute personne non inscrite'), _defineProperty(_topic$date$startTime, "waitingRoomAll", 'Tout le monde'), _defineProperty(_topic$date$startTime, "enterPassword", 'Saisir le mot de passe'), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Les participants ne peuvent rejoindre la réunion qu’après moi'), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", 'Les participants peuvent uniquement rejoindre la réunion après l’hôte'), _defineProperty(_topic$date$startTime, "allowJoinBeforeHostDescription", 'Permet de sécuriser la réunion et d’éviter les distractions jusqu’à votre arrivée.'), _defineProperty(_topic$date$startTime, "muteAudio", 'Désactiver l’audio pour les participants'), _defineProperty(_topic$date$startTime, "turnOffCamera", 'Désactiver la caméra pour les participants'), _defineProperty(_topic$date$startTime, "requirePassword", 'Exiger un mot de passe'), _defineProperty(_topic$date$startTime, "useE2ee", 'Utiliser le chiffrement de bout en bout'), _defineProperty(_topic$date$startTime, "e2eeTooltip", 'Les réunions chiffrées de bout en bout sont les plus privées, mais des fonctions telles que rejoindre une réunion par téléphone, les sous-titres et l’enregistrement ne sont pas disponibles.'), _defineProperty(_topic$date$startTime, "setPassword", 'Définir un mot de passe *'), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", 'Définir un mot de passe'), _defineProperty(_topic$date$startTime, "passwordEmptyError", 'Mot de passe de la réunion requis'), _defineProperty(_topic$date$startTime, "passwordInvalidError", 'Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, et ne peut pas comporter de symboles'), _defineProperty(_topic$date$startTime, "passwordHintText", 'Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, mais ne doit pas contenir de symboles.'), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", 'Utiliser l’ID de réunion personnel'), _defineProperty(_topic$date$startTime, "usePersonalMeetingIdInstead", 'Utiliser plutôt la réunion personnelle'), _defineProperty(_topic$date$startTime, "usePersonalMeetingName", 'Utiliser la réunion personnelle :'), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", 'Sécurité'), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", 'Seuls les utilisateurs authentifiés peuvent participer'), _defineProperty(_topic$date$startTime, "signedInUsers", 'Utilisateurs connectés'), _defineProperty(_topic$date$startTime, "signedInCoWorkers", 'Collaborateurs connectés'), _defineProperty(_topic$date$startTime, "limitScreenSharing", 'Seuls l’hôte et les modérateurs peuvent partager l’écran'), _defineProperty(_topic$date$startTime, "lockTooltip", 'Ce paramètre est géré par l’administrateur de votre entreprise'), _defineProperty(_topic$date$startTime, "pmiSettingAlert", 'Ces paramètres s’appliquent à toutes les réunions créées avec les paramètres PMI'), _defineProperty(_topic$date$startTime, "today", 'Aujourd’hui'), _defineProperty(_topic$date$startTime, "scheduleForGuidance", 'Vous planifiez pour quelqu’un d’autre ?\n1. Assurez-vous d’être dans leur calendrier Outlook.\n2. À partir de la liste déroulante, sélectionner la personne pour qui vous planifiez.\n'), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", 'En savoir plus'), _defineProperty(_topic$date$startTime, "changePmiSettings", 'Modifier les paramètres de réunion personnelle'), _defineProperty(_topic$date$startTime, "allowToRecording", 'Peut lancer et arrêter l’enregistrement'), _defineProperty(_topic$date$startTime, "allowTranscribe", 'Peut lancer et arrêter la transcription'), _defineProperty(_topic$date$startTime, "everyone", 'Tout le monde'), _defineProperty(_topic$date$startTime, "onlyHostModerators", 'Uniquement l’hôte et les modérateurs'), _defineProperty(_topic$date$startTime, "advancedSettings", 'Paramètres avancés'), _defineProperty(_topic$date$startTime, "whoCanJoin", 'Qui peut participer ?'), _defineProperty(_topic$date$startTime, "requirePasswordDescription", 'Les participants qui rejoignent la réunion via le lien n’auront pas besoin de saisir le mot de passe.'), _defineProperty(_topic$date$startTime, "password", 'Mot de passe :'), _defineProperty(_topic$date$startTime, "passwordLabel", 'Mot de passe'), _defineProperty(_topic$date$startTime, "edit", 'Modifier'), _defineProperty(_topic$date$startTime, "changePassword", 'Modifier le mot de passe'), _defineProperty(_topic$date$startTime, "passwordRequired", 'Le mot de passe est requis'), _defineProperty(_topic$date$startTime, "passwordLengthError", 'Le mot de passe doit être composé de 1 à 10 caractères'), _defineProperty(_topic$date$startTime, "passwordFormatError", 'Le mot de passe ne peut contenir que des lettres et des chiffres'), _defineProperty(_topic$date$startTime, "passwordHint", 'Votre mot de passe doit être composé de 1 à 10 lettres et chiffres, mais ne doit pas contenir de symboles.'), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"meetingSettingsDescription"@#@ @source: @#@"Update these settings will apply to current meeting only."@#@
// @key: @#@"here"@#@ @source: @#@"here"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomTitle"@#@ @source: @#@"Waiting room"@#@
// @key: @#@"waitingRoomDescription"@#@ @source: @#@"Keep meetings private until you admit participants."@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"allowJoinBeforeHostDescription"@#@ @source: @#@"Keeps the meeting secure and distraction-free until you join."@#@
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
// @key: @#@"usePersonalMeetingIdInstead"@#@ @source: @#@"Use personal meeting instead"@#@
// @key: @#@"usePersonalMeetingName"@#@ @source: @#@"Use personal meeting:"@#@
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
// @key: @#@"allowToRecording"@#@ @source: @#@"Allow to start and stop recording"@#@
// @key: @#@"allowTranscribe"@#@ @source: @#@"Allow to start and stop transcription"@#@
// @key: @#@"everyone"@#@ @source: @#@"Everyone"@#@
// @key: @#@"onlyHostModerators"@#@ @source: @#@"Only host and moderators"@#@
// @key: @#@"advancedSettings"@#@ @source: @#@"Advanced settings"@#@
// @key: @#@"whoCanJoin"@#@ @source: @#@"Who can join?"@#@
// @key: @#@"requirePasswordDescription"@#@ @source: @#@"Participants who join via the meeting link won’t need to enter the password."@#@
// @key: @#@"password"@#@ @source: @#@"Password:"@#@
// @key: @#@"passwordLabel"@#@ @source: @#@"Password"@#@
// @key: @#@"edit"@#@ @source: @#@"Edit"@#@
// @key: @#@"changePassword"@#@ @source: @#@"Change Password"@#@
// @key: @#@"passwordRequired"@#@ @source: @#@"Password is required"@#@
// @key: @#@"passwordLengthError"@#@ @source: @#@"Password must be 1-10 characters long"@#@
// @key: @#@"passwordFormatError"@#@ @source: @#@"Password can only contain letters and numbers"@#@
// @key: @#@"passwordHint"@#@ @source: @#@"Your password should be 1-10 letters and numbers long, but can not contain symbols."@#@
exports["default"] = _default;
//# sourceMappingURL=fr-FR.js.map
