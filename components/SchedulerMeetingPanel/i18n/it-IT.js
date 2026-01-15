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
  scheduleFor: 'Programma per conto di',
  scheduleForAssistedUser: 'Aggiorna le impostazioni delle riunioni per conto di {userName}.',
  scheduleForGuidance: "Stai pianificando per qualcun altro?\n1. Assicurati di essere nel loro calendario di Outlook.\n2. Dall'elenco a discesa, seleziona la persona per la quale stai pianificando.\n",
  scheduleForGuidanceMore: 'Scopri i dettagli',
  meetingSettings: 'Impostazioni riunione',
  meetingSettingsDescription: 'Gli aggiornamenti verranno applicati solo a questa riunione.'
}, _defineProperty(_scheduleFor$schedule, _RcVideo.ASSISTED_USERS_MYSELF, 'Me'), _defineProperty(_scheduleFor$schedule, "waitingRoomTitle", "Usa sala d'attesa"), _defineProperty(_scheduleFor$schedule, "waitingRoomDescription", 'I partecipanti attendono finché non vengono ammessi. Ideale per colloqui o partecipanti esterni.'), _defineProperty(_scheduleFor$schedule, "waitingRoomNotCoworker", 'Per chiunque al di fuori della mia azienda'), _defineProperty(_scheduleFor$schedule, "waitingRoomGuest", "Per chi non ha effettuato l'accesso"), _defineProperty(_scheduleFor$schedule, "waitingRoomAll", 'Per tutti i partecipanti'), _defineProperty(_scheduleFor$schedule, "enterPassword", 'Inserisci password'), _defineProperty(_scheduleFor$schedule, "onlyJoinAfterMe", 'Avvia riunione dopo il tuo accesso'), _defineProperty(_scheduleFor$schedule, "allowJoinBeforeHostDescription", 'La riunione inizierà dopo il tuo accesso per evitare conversazioni anticipate.'), _defineProperty(_scheduleFor$schedule, "requirePassword", 'Richiedi password'), _defineProperty(_scheduleFor$schedule, "requirePasswordDescription", 'Mantieni sicura la tua riunione. A chiunque utilizzi il collegamento non verrà richiesta una password.'), _defineProperty(_scheduleFor$schedule, "password", 'Password:'), _defineProperty(_scheduleFor$schedule, "passwordEmptyError", 'La password per la riunione è obbligatoria'), _defineProperty(_scheduleFor$schedule, "passwordInvalidError", 'La password deve avere 1-10 lettere e numeri e non può contenere simboli'), _defineProperty(_scheduleFor$schedule, "passwordHintText", 'La password deve contenere da 1 a 10 lettere e numeri, ma non può contenere simboli.'), _defineProperty(_scheduleFor$schedule, "usePersonalMeetingIdInstead", 'Usa collegamento riunione personale'), _defineProperty(_scheduleFor$schedule, "allowMeetingAccess", 'Gestisci chi può partecipare'), _defineProperty(_scheduleFor$schedule, "anyoneWithLink", 'Chiunque abbia un link'), _defineProperty(_scheduleFor$schedule, "signedInUsers", 'Solo account {shortName}'), _defineProperty(_scheduleFor$schedule, "signedInCoWorkers", 'Solo i miei collaboratori'), _defineProperty(_scheduleFor$schedule, "passwordLabel", 'Password'), _defineProperty(_scheduleFor$schedule, "edit", 'Modifica'), _defineProperty(_scheduleFor$schedule, "editSettings", 'Modifica impostazioni'), _defineProperty(_scheduleFor$schedule, "lockTooltip", "L'impostazione è gestita dall'amministratore dell'azienda"), _defineProperty(_scheduleFor$schedule, "cancel", 'Annulla'), _defineProperty(_scheduleFor$schedule, "update", 'Aggiorna'), _defineProperty(_scheduleFor$schedule, "pmiSettingsTitle", 'Impostazioni riunione personale'), _defineProperty(_scheduleFor$schedule, "pmiSettingsDescription", 'Imposta chi può partecipare e come per il tuo collegamento alla riunione personale.'), _scheduleFor$schedule); // @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
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
//# sourceMappingURL=it-IT.js.map
