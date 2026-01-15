"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
var _RcVideo = require("@ringcentral-integration/commons/modules/RcVideo");
var _topic$date$startTime;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_topic$date$startTime = {
  topic: 'Titre de la réunion',
  date: 'Date',
  startTime: 'Heure',
  duration: 'Durée',
  scheduleFor: 'Planifier au nom de',
  meetingSettings: 'Paramètres de la réunion',
  meetingSettingsDescription: 'La mise à jour de ces paramètres s’appliquera uniquement à la réunion en cours.',
  here: 'ici'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, _RcVideo.ASSISTED_USERS_MYSELF, 'Moi-même'), "joinBeforeHost", 'Autoriser les participants à se joindre à la réunion avant l’animateur'), "enableWaitingRoom", 'Activer la salle d’attente'), "waitingRoom", 'Activer la salle d’attente pour'), "waitingRoomTitle", 'Salle d’attente'), "waitingRoomDescription", 'Gardez les réunions privées jusqu’à ce que vous admettiez les participants.'), "waitingRoomNotCoworker", 'Toute personne externe à mon entreprise'), "waitingRoomGuest", 'Personnes non connectées'), "waitingRoomAll", 'Tout le monde'), "enterPassword", 'Saisir le mot de passe'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyJoinAfterMe", 'Les participants ne peuvent se joindre qu’après moi'), "onlyJoinAfterHost", 'Les participants ne peuvent se joindre qu’après l’animateur'), "allowJoinBeforeHostDescription", 'Permet de sécuriser la réunion et d’éviter les distractions jusqu’à votre arrivée.'), "muteAudio", 'Désactiver le son des participants'), "turnOffCamera", 'Désactiver la caméra des participants'), "requirePassword", 'Exiger un mot de passe'), "useE2ee", 'Utiliser le chiffrement de bout en bout'), "e2eeTooltip", 'Les réunions chiffrées de bout en bout sont les réunions les plus confidentielles, mais des fonctionnalités comme la participation par téléphone, les sous-titres codés et l’enregistrement ne sont pas disponibles.'), "setPassword", 'Définir le mot de passe *'), "setPasswordNotSymbol", 'Définir le mot de passe'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "passwordEmptyError", 'Mot de passe de la réunion obligatoire'), "passwordInvalidError", 'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.'), "passwordHintText", 'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.'), "usePersonalMeetingId", 'Utiliser le code de réunion personnelle'), "usePersonalMeetingIdInstead", 'Utiliser plutôt la réunion personnelle'), "usePersonalMeetingName", 'Utiliser la réunion personnelle :'), "meetingSettingsSecurity", 'Sécurité'), "onlyAuthUserJoin", 'Seuls les utilisateurs authentifiés peuvent se joindre'), "signedInUsers", 'Utilisateurs connectés'), "signedInCoWorkers", 'Collègues connectés'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "limitScreenSharing", 'Seuls l’animateur et les modérateurs peuvent partager leur écran'), "lockTooltip", 'Ce paramètre est géré par l’administrateur de votre entreprise'), "pmiSettingAlert", 'Ces paramètres seront appliqués à toutes les réunions créées avec le même code de réunion personnelle'), "today", 'Aujourd’hui'), "scheduleForGuidance", 'Vous planifiez une réunion pour quelqu’un d’autre?\n1. Assurez-vous d’être dans son calendrier Outlook.\n2. Dans le menu déroulant, sélectionnez la personne pour laquelle vous planifiez une réunion.\n'), "scheduleForGuidanceMore", 'En savoir plus'), "changePmiSettings", 'Changer les paramètres de la réunion personnelle'), "allowToRecording", 'Peuvent démarrer et arrêter l’enregistrement'), "allowTranscribe", 'Peuvent démarrer et arrêter la transcription'), "everyone", 'Tout le monde'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_topic$date$startTime, "onlyHostModerators", 'Seuls l’animateur et les modérateurs'), "advancedSettings", 'Paramètres avancés'), "whoCanJoin", 'Qui peut se joindre?'), "requirePasswordDescription", 'Les participants qui se joignent à l’aide du lien de la réunion n’auront pas à entrer le mot de passe.'), "password", 'Mot de passe :'), "passwordLabel", 'Mot de passe'), "edit", 'Modifier'), "changePassword", 'Changer le mot de passe'), "passwordRequired", 'Mot de passe obligatoire'), "passwordLengthError", 'Le mot de passe doit être composé de 1 à 10 caractères'), _defineProperty(_defineProperty(_topic$date$startTime, "passwordFormatError", 'Le mot de passe ne peut contenir que des lettres et des chiffres'), "passwordHint", 'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.')); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
//# sourceMappingURL=fr-CA.js.map
