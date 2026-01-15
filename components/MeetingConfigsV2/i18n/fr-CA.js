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
var _Meeting = require("@ringcentral-integration/commons/modules/Meeting");
var _date$time$hours$minu;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = exports["default"] = (_date$time$hours$minu = {
  date: 'Date',
  time: 'Heure',
  hours: '{howMany} h',
  minutes: '{howMany}  min',
  today: 'Aujourd’hui',
  duration: 'Durée',
  topic: 'Titre de la réunion',
  voIPOnly: 'Son par Internet seulement',
  telephonyOnly: 'Téléphone seulement',
  both: 'Son du téléphone et par Internet',
  thirdParty: 'Son d’un tiers',
  meetingId: 'Code de réunion',
  password: 'Mot de passe',
  video: 'Vidéo',
  audio: 'Son',
  scheduleFor: 'Planifier au nom de'
}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_date$time$hours$minu, _Meeting.ASSISTED_USERS_MYSELF, 'Moi-même'), "meetingOptions", 'Options de réunion'), "meetingSettings", 'Paramètres de la réunion'), "rcMeetingSettings", 'Paramètres de la vidéoconférence'), "audioOptions", 'Options du son'), "recurringMeeting", 'Réunion récurrente'), "recurringNote", 'Remarque : Activez cette option lorsque vous choisissiez « Récurrence »'), "joinBeforeHost", 'Autoriser les participants à se joindre à la réunion avant l’animateur'), "turnOffCamera", 'Désactiver la caméra des participants'), "turnOffHostCamera", 'Désactiver la caméra de l’animateur lorsqu’il se joint à la réunion'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_date$time$hours$minu, "requirePassword", 'Exiger un mot de passe'), "enterPassword", 'Saisir le mot de passe'), "setPassword", 'Définir le mot de passe*'), "passwordEmptyError", 'Mot de passe de la réunion obligatoire'), "rcmPasswordInvalidError", 'Votre mot de passe doit contenir de 1 à 10 caractères, être composé de chiffres et ne peut pas comporter de symboles autres que @, * ou -'), "rcmPasswordHintText", 'Votre mot de passe devrait contenir de 1 à 10 caractères, être composé de chiffres et ne peut pas comporter de symboles autres que @, * ou -'), "usePersonalMeetingId", 'Utiliser le code de réunion personnelle'), "pmiChangeConfirm", 'Pour apporter des changements à votre réunion personnelle, '), "changePmiSettings", 'changez les paramètres du code de réunion personnelle'), "pmiSettingChangeAlert", 'Si vous changez les paramètres et planifiez cette réunion, toutes les réunions avec le même code de réunion personnelle utiliseront ces paramètres.'), _defineProperty(_defineProperty(_defineProperty(_date$time$hours$minu, "lockedTooltip", 'Ce paramètre est géré par l’administrateur de votre entreprise'), "when", 'Quand'), "recurringDescribe", 'N’oubliez pas de vérifier la périodicité ou la répétition dans l’invitation envoyée à vos participants.')); // @key: @#@"date"@#@ @source: @#@"Date"@#@
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
//# sourceMappingURL=fr-CA.js.map
