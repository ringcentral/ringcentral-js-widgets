"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");

var _date$time$hours$minu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_date$time$hours$minu = {
  date: "Date",
  time: "Heure",
  hours: "{howMany} h",
  minutes: "{howMany} min",
  today: "Aujourd'hui",
  duration: "Durée",
  topic: "Titre de la réunion",
  voIPOnly: "Audio sur Internet uniquement",
  telephonyOnly: "Téléphone uniquement",
  both: "Téléphone et audio sur Internet",
  thirdParty: "Audio tiers",
  meetingId: "ID de réunion",
  password: "Mot de passe",
  video: "Vidéo",
  audio: "Audio",
  scheduleFor: "Programme défini par"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Moi-même"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Options de réunion"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Paramètres de la réunion"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Paramètres de la vidéoconférence"), _defineProperty(_date$time$hours$minu, "audioOptions", "Options audio"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Réunion récurrente"), _defineProperty(_date$time$hours$minu, "recurringNote", "Remarque : activez celle-ci lorsque vous sélectionnez « Récurrence »."), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Autoriser les participants à se connecter avant l'hôte"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Désactiver la caméra pour les participants"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Désactiver la caméra pour l'hôte lorsque vous rejoignez une réunion"), _defineProperty(_date$time$hours$minu, "requirePassword", "Exiger un mot de passe"), _defineProperty(_date$time$hours$minu, "enterPassword", "Entrer le mot de passe"), _defineProperty(_date$time$hours$minu, "setPassword", "Définir un mot de passe *"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Mot de passe de la réunion requis"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres et ne peut pas comporter de symboles autres que @, * ou -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "Votre mot de passe doit être composé de 1 à 10 lettres et chiffres et ne peut pas comporter de symboles autres que @, * ou -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Utiliser l'identifiant personnel de réunion"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "Si vous souhaitez apporter des modifications à votre réunion personnelle, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "modifiez les paramètres PMI"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "Si vous modifiez les paramètres et programmez la réunion, toutes les réunions avec ID personnel de réunion utiliseront ces mêmes paramètres."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "Ce paramètre est géré par l'administrateur de votre entreprise"), _defineProperty(_date$time$hours$minu, "when", "Date"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "N'oubliez pas de vérifier la récurrence ou de renouveler votre invitation aux participants."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"time"@#@ @source: @#@"Time"@#@
// @key: @#@"hours"@#@ @source: @#@"{howMany} hr"@#@
// @key: @#@"minutes"@#@ @source: @#@"{howMany} min"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"voIPOnly"@#@ @source: @#@"Internet audio only"@#@
// @key: @#@"telephonyOnly"@#@ @source: @#@"Telephone only"@#@
// @key: @#@"both"@#@ @source: @#@"Telephone and Internet audio"@#@
// @key: @#@"thirdParty"@#@ @source: @#@"3rd party audio"@#@
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
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"rcmPasswordInvalidError"@#@ @source: @#@"Your password must be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"rcmPasswordHintText"@#@ @source: @#@"Your password should be 1-10 characters, numbers long and cannot have symbols except @, * or -"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"pmiChangeConfirm"@#@ @source: @#@"If you want to make changes for your Personal Meeting, "@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"change PMI settings"@#@
// @key: @#@"pmiSettingChangeAlert"@#@ @source: @#@"If you change the settings and schedule this meeting, all of meetings with Personal Meeting ID will use the same latest settings."@#@
// @key: @#@"lockedTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"when"@#@ @source: @#@"When"@#@
// @key: @#@"recurringDescribe"@#@ @source: @#@"Please remember to check recurrence or repeat in your calendar invitation to your attendees."@#@


exports["default"] = _default;
//# sourceMappingURL=fr-FR.js.map
