"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _conferenceCallErrors;

var _conferenceCallErrors2 = require("ringcentral-integration/modules/ConferenceCall/conferenceCallErrors");

var _conferenceCallErrors3 = _interopRequireDefault(_conferenceCallErrors2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_conferenceCallErrors = {}, (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.bringInFailed, "Impossible de fusionner les appels en raison d'erreurs inattendues. Veuillez réessayer plus tard."), (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.makeConferenceFailed, "Impossible de fusionner les appels en raison d'erreurs inattendues. Veuillez réessayer plus tard."), (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.terminateConferenceFailed, "Impossible de raccrocher en raison d'erreurs inattendues. Veuillez réessayer plus tard."), (0, _defineProperty3.default)(_conferenceCallErrors, _conferenceCallErrors3.default.removeFromConferenceFailed, "Impossible de supprimer le participant en raison d'erreurs inattendues. Veuillez réessayer plus tard."), _conferenceCallErrors);

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
//# sourceMappingURL=fr-CA.js.map
