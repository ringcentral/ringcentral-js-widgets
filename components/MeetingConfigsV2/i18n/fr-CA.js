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
  today: "Aujourd’hui",
  duration: "Durée",
  topic: "Titre de la réunion",
  voIPOnly: "Son par Internet seulement",
  telephonyOnly: "Téléphone seulement",
  both: "Son du téléphone et par Internet",
  thirdParty: "Son d’un tiers",
  meetingId: "Code de réunion",
  password: "Mot de passe",
  video: "Vidéo",
  audio: "Son",
  scheduleFor: "Planifier au nom de"
}, _defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, "Moi-même"), _defineProperty(_date$time$hours$minu, "meetingOptions", "Options de réunion"), _defineProperty(_date$time$hours$minu, "meetingSettings", "Paramètres de la réunion"), _defineProperty(_date$time$hours$minu, "rcMeetingSettings", "Paramètres de la vidéoconférence"), _defineProperty(_date$time$hours$minu, "audioOptions", "Options du son"), _defineProperty(_date$time$hours$minu, "recurringMeeting", "Réunion récurrente"), _defineProperty(_date$time$hours$minu, "recurringNote", "Remarque : Activez cette option lorsque vous choisissiez « Récurrence »"), _defineProperty(_date$time$hours$minu, "joinBeforeHost", "Autoriser les participants à se joindre à la réunion avant l’animateur"), _defineProperty(_date$time$hours$minu, "turnOffCamera", "Désactiver la caméra des participants"), _defineProperty(_date$time$hours$minu, "turnOffHostCamera", "Désactiver la caméra de l’animateur lorsqu’il se joint à la réunion"), _defineProperty(_date$time$hours$minu, "requirePassword", "Exiger un mot de passe"), _defineProperty(_date$time$hours$minu, "enterPassword", "Saisissez le mot de passe"), _defineProperty(_date$time$hours$minu, "setPassword", "Définir le mot de passe*"), _defineProperty(_date$time$hours$minu, "passwordEmptyError", "Mot de passe de la réunion requis"), _defineProperty(_date$time$hours$minu, "rcmPasswordInvalidError", "Votre mot de passe doit contenir de 1 à 10 caractères, être composé de chiffres et ne peut pas comporter de symboles autres que @, * ou -"), _defineProperty(_date$time$hours$minu, "rcmPasswordHintText", "Votre mot de passe devrait contenir de 1 à 10 caractères, être composé de chiffres et ne peut pas comporter de symboles autres que @, * ou -"), _defineProperty(_date$time$hours$minu, "usePersonalMeetingId", "Utiliser le code de réunion personnel"), _defineProperty(_date$time$hours$minu, "pmiChangeConfirm", "Pour apporter des changements à votre réunion personnelle, "), _defineProperty(_date$time$hours$minu, "changePmiSettings", "changez les paramètres du code de réunion personnelle"), _defineProperty(_date$time$hours$minu, "pmiSettingChangeAlert", "Si vous changez les paramètres et planifiez cette réunion, toutes les réunions avec le même code de réunion personnelle utiliseront ces paramètres."), _defineProperty(_date$time$hours$minu, "lockedTooltip", "Ces paramètres sont gérés par votre administrateur"), _defineProperty(_date$time$hours$minu, "when", "Quand"), _defineProperty(_date$time$hours$minu, "recurringDescribe", "N’oubliez pas de vérifier la périodicité ou la répétition dans l’invitation envoyée à vos participants."), _defineProperty(_date$time$hours$minu, "ieSupportAlert", "Veuillez noter que {appName} ne fonctionnera pas dans Internet Explorer 11 après le 16 février 2022. Nous recommandons de passer à Microsoft Edge ou à Office 2016 ou à une version ultérieure."), _date$time$hours$minu); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@


exports["default"] = _default;
//# sourceMappingURL=fr-CA.js.map
