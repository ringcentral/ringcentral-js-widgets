"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callControlError = _interopRequireDefault(require("ringcentral-integration/modules/ActiveCallControl/callControlError"));

var _muteConflictError$ho;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var holdConflictError = _callControlError.default.holdConflictError,
    unHoldConflictError = _callControlError.default.unHoldConflictError,
    muteConflictError = _callControlError.default.muteConflictError,
    unMuteConflictError = _callControlError.default.unMuteConflictError,
    generalError = _callControlError.default.generalError;

var _default = (_muteConflictError$ho = {}, _defineProperty(_muteConflictError$ho, muteConflictError, 'This call had been muted on other device. Please unmute the call before you control in this App.'), _defineProperty(_muteConflictError$ho, holdConflictError, 'This call had been held on other device. Please unhold the call before you control in this App.'), _defineProperty(_muteConflictError$ho, unMuteConflictError, 'This call had been unmuted on other device. Please mute the call before you control in this App.'), _defineProperty(_muteConflictError$ho, unHoldConflictError, 'This call had been unheld on other device. Please hold the call before you control in this App.'), _defineProperty(_muteConflictError$ho, generalError, 'Unexpected server error. Please try again later.'), _muteConflictError$ho);

exports.default = _default;
//# sourceMappingURL=en-US.js.map
