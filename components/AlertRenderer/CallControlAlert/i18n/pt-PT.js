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
var _ActiveCallControl = require("@ringcentral-integration/commons/modules/ActiveCallControl");
var _callsMerged$somethin;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable */
var callsMerged = _ActiveCallControl.callControlAlerts.callsMerged,
  somethingWentWrong = _ActiveCallControl.callControlAlerts.somethingWentWrong,
  tooManyParticipants = _ActiveCallControl.callControlAlerts.tooManyParticipants;
var holdConflictError = _ActiveCallControl.callControlError.holdConflictError,
  unHoldConflictError = _ActiveCallControl.callControlError.unHoldConflictError,
  muteConflictError = _ActiveCallControl.callControlError.muteConflictError,
  unMuteConflictError = _ActiveCallControl.callControlError.unMuteConflictError,
  generalError = _ActiveCallControl.callControlError.generalError,
  forwardSuccess = _ActiveCallControl.callControlError.forwardSuccess,
  transferCompleted = _ActiveCallControl.callControlError.transferCompleted,
  replyCompleted = _ActiveCallControl.callControlError.replyCompleted;
var _default = exports["default"] = (_callsMerged$somethin = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_callsMerged$somethin, callsMerged, 'Chamadas unidas'), somethingWentWrong, 'Ocorreu um erro. Tente novamente.'), tooManyParticipants, 'Número máximo de participantes atingido.'), muteConflictError, 'O som desta chamada foi desativado noutro dispositivo. Ative o som da chamada antes de assumir o controlo nesta aplicação.'), unHoldConflictError, 'Esta chamada foi colocada em espera noutro dispositivo. Retome a chamada antes de assumir o controlo nesta aplicação.'), unMuteConflictError, 'O som desta chamada foi ativado noutro dispositivo. Desative o som da chamada antes de assumir o controlo nesta aplicação.'), holdConflictError, 'Esta chamada foi retomada noutro dispositivo. Coloque a chamada em espera antes de assumir o controlo nesta aplicação.'), generalError, 'Erro de servidor inesperado. Tente novamente mais tarde.'), forwardSuccess, 'Chamada reencaminhada'), transferCompleted, 'Chamada transferida'), _defineProperty(_callsMerged$somethin, replyCompleted, 'Mensagem de voz enviada.')); // @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
//# sourceMappingURL=pt-PT.js.map
