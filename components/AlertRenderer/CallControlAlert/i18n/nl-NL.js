"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("@ringcentral-integration/commons/modules/ActiveCallControl/callControlError"));

var _muteConflictError$un;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError["default"].holdConflictError,
    unHoldConflictError = _callControlError["default"].unHoldConflictError,
    muteConflictError = _callControlError["default"].muteConflictError,
    unMuteConflictError = _callControlError["default"].unMuteConflictError,
    generalError = _callControlError["default"].generalError,
    forwardSuccess = _callControlError["default"].forwardSuccess;

var _default = (_muteConflictError$un = {}, _defineProperty(_muteConflictError$un, muteConflictError, "Deze oproep is gedempt op een ander apparaat. Schakel het dempen van de oproep uit voordat u deze app bedient."), _defineProperty(_muteConflictError$un, unHoldConflictError, "Deze oproep staat in de wacht op een ander apparaat. Haal de oproep uit de wacht voordat u deze app bedient."), _defineProperty(_muteConflictError$un, unMuteConflictError, "Dempen van deze oproep is uitgeschakeld op een ander apparaat. Demp de oproep voordat u deze app bedient."), _defineProperty(_muteConflictError$un, holdConflictError, "Deze oproep is uit de wacht gehaald op een ander apparaat. Zet de oproep in de wacht voordat u deze app bedient."), _defineProperty(_muteConflictError$un, generalError, "Onverwachte serverfout. Probeer het later opnieuw."), _defineProperty(_muteConflictError$un, forwardSuccess, "Oproep doorverbonden"), _muteConflictError$un); // @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
