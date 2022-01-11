"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _constants = require("@ringcentral-integration/commons/modules/RcVideo/constants");

var _topic$date$startTime;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_topic$date$startTime = {
  topic: "Titre de la réunion",
  date: "Date",
  startTime: "Heure",
  duration: "Durée",
  scheduleFor: "Programme défini par",
  meetingSettings: "Paramètres de la réunion"
}, _defineProperty(_topic$date$startTime, _constants.ASSISTED_USERS_MYSELF, "Moi-même"), _defineProperty(_topic$date$startTime, "joinBeforeHost", "Autoriser les participants à se connecter avant l’hôte"), _defineProperty(_topic$date$startTime, "enableWaitingRoom", "Activer la salle d’attente"), _defineProperty(_topic$date$startTime, "waitingRoom", "Mettre en place une salle d’attente pour"), _defineProperty(_topic$date$startTime, "waitingRoomNotCoworker", "Util. extérieur à mon entreprise"), _defineProperty(_topic$date$startTime, "waitingRoomGuest", "Util. non connecté"), _defineProperty(_topic$date$startTime, "waitingRoomAll", "Tout le monde"), _defineProperty(_topic$date$startTime, "enterPassword", "Entrer le mot de passe"), _defineProperty(_topic$date$startTime, "onlyJoinAfterMe", "Les participants ne peuvent rejoindre la réunion qu’après moi"), _defineProperty(_topic$date$startTime, "onlyJoinAfterHost", "Les participants ne peuvent rejoindre la réunion qu’après l’hôte"), _defineProperty(_topic$date$startTime, "muteAudio", "Désactiver l’audio pour les participants"), _defineProperty(_topic$date$startTime, "turnOffCamera", "Désactiver la caméra pour les participants"), _defineProperty(_topic$date$startTime, "requirePassword", "Exiger un mot de passe"), _defineProperty(_topic$date$startTime, "useE2ee", "Utiliser le chiffrement de bout en bout"), _defineProperty(_topic$date$startTime, "e2eeTooltip", "Les réunions chiffrées de bout en bout sont les réunions les plus privées possibles, mais les fonctionnalités comme Rejoindre via téléphone, les sous-titres et l’enregistrement ne sont pas disponibles."), _defineProperty(_topic$date$startTime, "setPassword", "Définir un mot de passe *"), _defineProperty(_topic$date$startTime, "setPasswordNotSymbol", "Définir un mot de passe"), _defineProperty(_topic$date$startTime, "passwordEmptyError", "Mot de passe de la réunion requis"), _defineProperty(_topic$date$startTime, "passwordInvalidError", "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres et ne peut pas comporter de symboles"), _defineProperty(_topic$date$startTime, "passwordHintText", "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres et ne peut pas comporter de symboles"), _defineProperty(_topic$date$startTime, "usePersonalMeetingId", "Utiliser l’ID de réunion personnel"), _defineProperty(_topic$date$startTime, "meetingSettingsSecurity", "Sécurité"), _defineProperty(_topic$date$startTime, "onlyAuthUserJoin", "Seuls les utilisateurs authentifiés peuvent rejoindre la réunion"), _defineProperty(_topic$date$startTime, "signedInUsers", "Utilisateurs connectés"), _defineProperty(_topic$date$startTime, "signedInCoWorkers", "Collaborateurs connectés"), _defineProperty(_topic$date$startTime, "limitScreenSharing", "Seuls l’hôte et les modérateurs peuvent partager l’écran"), _defineProperty(_topic$date$startTime, "lockTooltip", "Ce paramètre est géré par l’administrateur de votre entreprise"), _defineProperty(_topic$date$startTime, "pmiSettingAlert", "Ces paramètres s’appliquent à toutes les réunions créées avec les paramètres PMI"), _defineProperty(_topic$date$startTime, "today", "Aujourd’hui"), _defineProperty(_topic$date$startTime, "scheduleForGuidance", "Vous planifiez pour quelqu’un d’autre ?\n1. Assurez-vous d’être dans leur calendrier Outlook.\n2. À partir de la liste déroulante, sélectionner la personne pour qui vous planifiez.\n"), _defineProperty(_topic$date$startTime, "scheduleForGuidanceMore", "En savoir plus"), _defineProperty(_topic$date$startTime, "changePmiSettings", "Modifier les paramètres de réunion personnelle"), _defineProperty(_topic$date$startTime, "ieSupportAlert", "Veuillez noter que {appName} ne fonctionnera plus avec Internet Explorer 11 après le 16 février 2022. Nous vous recommandons d’utiliser Microsoft Edge ou de passer à Outlook 2016 ou version ultérieure."), _topic$date$startTime); // @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=fr-FR.js.map
