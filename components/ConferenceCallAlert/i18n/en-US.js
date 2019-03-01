"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _conferenceCallErrors2 = _interopRequireDefault(require("ringcentral-integration/modules/ConferenceCall/conferenceCallErrors"));

var _conferenceCallErrors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_conferenceCallErrors = {}, _defineProperty(_conferenceCallErrors, _conferenceCallErrors2.default.bringInFailed, 'Failed to merge the calls due to unexpected errors. Please try again later.'), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2.default.makeConferenceFailed, 'Failed to merge the calls due to unexpected errors. Please try again later.'), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2.default.terminateConferenceFailed, 'Failed to hangup the conference due to unexpected errors. Please try again later.'), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2.default.removeFromConferenceFailed, 'Failed to remove the participant due to unexpected errors. Please try again later.'), _defineProperty(_conferenceCallErrors, _conferenceCallErrors2.default.callIsRecording, 'Call recording in progress. Please stop recording and try again.'), _conferenceCallErrors);

exports.default = _default;
//# sourceMappingURL=en-US.js.map
