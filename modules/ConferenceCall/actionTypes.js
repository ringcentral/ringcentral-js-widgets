"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _Enum = _interopRequireDefault(require("../../lib/Enum"));

var _moduleActionTypes = _interopRequireDefault(require("../../enums/moduleActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = new _Enum.default([].concat(_toConsumableArray(Object.keys(_moduleActionTypes.default)), ['mergeStart', 'mergeSucceeded', 'mergeFailed', // make conference call
'makeConference', 'makeConferenceSucceeded', 'makeConferenceFailed', // terminate
'terminateConference', 'terminateConferenceSucceeded', 'terminateConferenceFailed', // update
'updateConference', 'updateConferenceSucceeded', 'updateConferenceFailed', // get party
'getParty', 'getPartySucceeded', 'getPartyFailed', // bring-in
'bringInConference', 'bringInConferenceSucceeded', 'bringInConferenceFailed', // remove
'removeFromConference', 'removeFromConferenceSucceeded', 'removeFromConferenceFailed', // update merge pairs
'updateFromSession', 'updateToSession', 'closeMergingPair', // for reselect
'updateCurrentConferenceId', // user action track
'participantListClickHangupTrack', 'removeParticipantClickCancelTrack', 'removeParticipantClickRemoveTrack']), 'conferenceCall');

exports.default = _default;
//# sourceMappingURL=actionTypes.js.map
