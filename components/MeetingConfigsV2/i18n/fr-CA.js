"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("ringcentral-integration/modules/Meeting");

var _voIPOnly$telephonyOn;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_voIPOnly$telephonyOn = {
  voIPOnly: "Son par Internet seulement",
  telephonyOnly: "Téléphone seulement",
  both: "Téléphone et son par Internet",
  meetingId: "ID de meeting",
  password: "Mot de passe",
  video: "Vidéo",
  audio: "Audio",
  scheduleFor: "Planifier au nom de"
}, _defineProperty(_voIPOnly$telephonyOn, _Meeting.ASSISTED_USERS_MYSELF, "Moi-même"), _defineProperty(_voIPOnly$telephonyOn, "meetingOptions", "Options de meeting"), _defineProperty(_voIPOnly$telephonyOn, "meetingSettings", "Paramètres de la réunion"), _defineProperty(_voIPOnly$telephonyOn, "rcMeetingSettings", "Paramètres de la vidéoconférence"), _defineProperty(_voIPOnly$telephonyOn, "audioOptions", "Options de son"), _defineProperty(_voIPOnly$telephonyOn, "recurringMeeting", "Réunion récurrente"), _defineProperty(_voIPOnly$telephonyOn, "recurringNote", "Remarque : Activez cette option lorsque vous choisissiez « Récurrence »"), _defineProperty(_voIPOnly$telephonyOn, "joinBeforeHost", "Autoriser les participants à se joindre à la réunion avant l'hôte"), _defineProperty(_voIPOnly$telephonyOn, "turnOffCamera", "Éteindre la caméra pour les participants"), _defineProperty(_voIPOnly$telephonyOn, "turnOffHostCamera", "Désactiver la caméra de l'hôte lorsqu'il se joint au meeting"), _defineProperty(_voIPOnly$telephonyOn, "requirePassword", "Exiger un mot de passe"), _defineProperty(_voIPOnly$telephonyOn, "setPassword", "Définir le mot de passe *"), _defineProperty(_voIPOnly$telephonyOn, "passwordEmptyError", "Mot de passe de réunion requis"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordInvalidError", "Votre mot de passe doit contenir de 1 à 10 caractères, être composé de chiffres et ne peut pas comporter de symboles autres que @, * ou -"), _defineProperty(_voIPOnly$telephonyOn, "rcmPasswordHintText", "Votre mot de passe devrait contenir de 1 à 10 caractères, être composé de chiffres et ne peut pas comporter de symboles autres que @, * ou -"), _defineProperty(_voIPOnly$telephonyOn, "usePersonalMeetingId", "Utiliser le code de réunion personnel"), _defineProperty(_voIPOnly$telephonyOn, "pmiChangeConfirm", "Pour apporter des changements à votre meeting personnel, "), _defineProperty(_voIPOnly$telephonyOn, "changePmiSettings", "modifiez les paramètres PMI"), _defineProperty(_voIPOnly$telephonyOn, "pmiSettingChangeAlert", "Si vous modifiez les paramètres et planifiez ce meeting, tous les meetings avec le même PMI utiliseront ces paramètres."), _defineProperty(_voIPOnly$telephonyOn, "lockedTooltip", "Ces paramètres sont gérés par votre administrateur"), _voIPOnly$telephonyOn); // @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet Audio"@#@
// @key: @#@"meetingId"@#@ @source: @#@"Meeting ID"@#@
// @key: @#@"password"@#@ @source: @#@"Password"@#@
// @key: @#@"video"@#@ @source: @#@"Video"@#@
// @key: @#@"audio"@#@ @source: @#@"Audio"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"meetingOptions"@#@ @source: @#@"Meeting options"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"rcMeetingSettings"@#@ @source: @#@"Video Meeting settings"@#@
// @key: @#@"audioOptions"@#@ @source: @#@"Audio options"@#@
// @key: @#@"recurringMeeting"@#@ @source: @#@"Recurring meeting"@#@
// @key: @#@"recurringNote"@#@ @source: @#@"Note: Enable this one when choosing \"Recurrence\""@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"turnOffHostCamera"@#@ @source: @#@"Turn off camera for host when joining meeting"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
