"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _conferenceCallErrors2 = _interopRequireDefault(require("@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors"));

var _conferenceCallErrors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_conferenceCallErrors = {}, _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].bringInFailed, "Het samenvoegen van de oproepen is mislukt vanwege onverwachte fouten. Probeer het later opnieuw."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].makeConferenceFailed, "Het samenvoegen van de oproepen is mislukt vanwege onverwachte fouten. Probeer het later opnieuw."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].terminateConferenceFailed, "Het ophangen van de conference is mislukt vanwege onverwachte fouten. Probeer het later opnieuw."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].removeFromConferenceFailed, "Het verwijderen van de deelnemer is mislukt vanwege onverwachte fouten. Probeer het later opnieuw."), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2["default"].callIsRecording, "Oproepopname bezig. Stop met opnemen en probeer het opnieuw."), _conferenceCallErrors); // @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@


exports["default"] = _default;
//# sourceMappingURL=nl-NL.js.map
