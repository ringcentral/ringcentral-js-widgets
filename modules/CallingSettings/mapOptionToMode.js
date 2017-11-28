'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapOptionToMode;

var _callingOptions = require('./callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

var _callingModes = require('./callingModes');

var _callingModes2 = _interopRequireDefault(_callingModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapOptionToMode(callWith) {
  switch (callWith) {
    case _callingOptions2.default.softphone:
      return _callingModes2.default.softphone;

    case _callingOptions2.default.myphone:
    case _callingOptions2.default.otherphone:
    case _callingOptions2.default.customphone:
      return _callingModes2.default.ringout;
    case _callingOptions2.default.browser:
      return _callingModes2.default.webphone;
    default:
      return _callingModes2.default.softphone;
  }
}
//# sourceMappingURL=mapOptionToMode.js.map
