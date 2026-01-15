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
var _ConferenceCall = require("@ringcentral-integration/commons/modules/ConferenceCall");
var _conferenceCallErrors;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var _default = (_conferenceCallErrors = {}, _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.bringInFailed, 'Das Zusammenführen von Anrufen ist wegen unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.'), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.makeConferenceFailed, 'Das Zusammenführen von Anrufen ist wegen unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.'), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.terminateConferenceFailed, 'Das Beenden der Konferenz ist aufgrund unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.'), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.removeFromConferenceFailed, 'Das Entfernen des Teilnehmers ist aufgrund unerwarteter Fehler fehlgeschlagen. Versuchen Sie es später noch einmal.'), _defineProperty(_conferenceCallErrors, _ConferenceCall.conferenceCallErrors.callIsRecording, 'Anrufaufzeichnung in Verarbeitung. Bitte stoppen Sie die Aufzeichnung und versuchen Sie es erneut.'), _conferenceCallErrors); // @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
exports["default"] = _default;
//# sourceMappingURL=de-DE.js.map
