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
  scheduleFor: 'Planifier au nom de',
  scheduleForAssistedUser: 'Mettre à jour les paramètres des réunions au nom de {userName}.',
  scheduleForGuidance: 'Vous planifiez une réunion pour quelqu’un d’autre?\n1. Assurez-vous d’être dans son calendrier Outlook.\n2. Dans le menu déroulant, sélectionnez la personne pour laquelle vous planifiez une réunion.\n',
  scheduleForGuidanceMore: 'En savoir plus',
  meetingSettings: 'Paramètres de la réunion',
  meetingSettingsDescription: 'Les mises à jour s’appliqueront à cette réunion seulement.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Moi-même'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", 'Utiliser la salle d’attente'), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'Les participants attendent jusqu’à ce vous les admettiez. Idéal pour les entrevues ou pour les participants externes.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'Pour toute personne en dehors de mon entreprise'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", 'Pour toute personne non connectée'), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'Pour tous les participants'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Saisir le mot de passe'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Commencer la réunion après vous être joint'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'La réunion commencera après que vous vous joigniez pour éviter les conversations prématurées.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Exiger un mot de passe'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Protégez votre réunion. Les personnes utilisant le lien ne seront pas invitées à saisir un mot de passe.'), _defineProperty(_scheduleFor$schedule, "password", 'Mot de passe :'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'Mot de passe de la réunion obligatoire'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Utiliser le lien de la réunion personnelle'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Gérer qui peut s’y joindre'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Toute personne avec le lien'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Seulement les comptes {shortName}'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", 'Seulement mes collègues'), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Mot de passe'), _defineProperty(_scheduleFor$schedule, "edit", 'Modifier'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Modifier les paramètres'), _defineProperty(_scheduleFor$schedule, "lockTooltip", 'Ce paramètre est géré par l’administrateur de votre entreprise'), _defineProperty(_scheduleFor$schedule, "cancel", 'Annuler'), _defineProperty(_scheduleFor$schedule, "update", 'Mettre à jour'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Paramètres de la réunion personnelle'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Définissez qui peut se joindre à la réunion et comment le faire pour le lien de votre réunion personnelle.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=fr-CA.js.map
