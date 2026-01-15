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
var _scheduleFor$schedule;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_scheduleFor$schedule = {
  scheduleFor: 'Planifier au nom de',
  scheduleForAssistedUser: 'Mettre à jour les paramètres des réunions au nom de {userName}.',
  scheduleForGuidance: 'Vous planifiez une réunion pour quelqu’un d’autre?\n1. Assurez-vous d’être dans son calendrier Outlook.\n2. Dans le menu déroulant, sélectionnez la personne pour laquelle vous planifiez une réunion.\n',
  scheduleForGuidanceMore: 'En savoir plus',
  meetingSettings: 'Paramètres de la réunion',
  meetingSettingsDescription: 'Les mises à jour s’appliqueront à cette réunion seulement.'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Moi-même'), "waitingRoomTitle", 'Utiliser la salle d’attente'), "waitingRoomDescription", 'Les participants attendent jusqu’à ce vous les admettiez. Idéal pour les entrevues ou pour les participants externes.'), "waitingRoomNotCoworker", 'Pour toute personne en dehors de mon entreprise'), "waitingRoomGuest", 'Pour toute personne non connectée'), "waitingRoomAll", 'Pour tous les participants'), "enterPassword", 'Saisir le mot de passe'), "onlyJoinAfterMe", 'Commencer la réunion après vous être joint'), "allowJoinBeforeHostDescription", 'La réunion commencera après que vous vous joigniez pour éviter les conversations prématurées.'), "requirePassword", 'Exiger un mot de passe'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Protégez votre réunion. Les personnes utilisant le lien ne seront pas invitées à saisir un mot de passe.'), "password", 'Mot de passe :'), "passwordEmptyError", 'Mot de passe de la réunion obligatoire'), "passwordInvalidError", 'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.'), "passwordHintText", 'Votre mot de passe doit contenir de 1 à 10 lettres et chiffres, mais ne pas contenir de symboles.'), "usePersonalMeetingIdInstead", 'Utiliser le lien de la réunion personnelle'), "allowMeetingAccess", 'Gérer qui peut s’y joindre'), "anyoneWithLink", 'Toute personne avec le lien'), "signedInUsers", 'Seulement les comptes {shortName}'), "signedInCoWorkers", 'Seulement mes collègues'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_scheduleFor$schedule, "passwordLabel", 'Mot de passe'), "edit", 'Modifier'), "editSettings", 'Modifier les paramètres'), "lockTooltip", 'Ce paramètre est géré par l’administrateur de votre entreprise'), "cancel", 'Annuler'), "update", 'Mettre à jour'), "pmiSettingsTitle", 'Paramètres de la réunion personnelle'), "pmiSettingsDescription", 'Définissez qui peut se joindre à la réunion et comment le faire pour le lien de votre réunion personnelle.')); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=fr-CA.js.map
