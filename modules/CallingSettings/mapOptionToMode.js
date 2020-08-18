"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mapOptionToMode;

var _callingOptions = _interopRequireDefault(require("./callingOptions"));

var _callingModes = _interopRequireDefault(require("./callingModes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapOptionToMode(callWith) {
  switch (callWith) {
    case _callingOptions["default"].softphone:
      return _callingModes["default"].softphone;

    case _callingOptions["default"].ringout:
      return _callingModes["default"].ringout;

    case _callingOptions["default"].browser:
      return _callingModes["default"].webphone;

    case _callingOptions["default"].jupiter:
      return _callingModes["default"].jupiter;

    default:
      return _callingModes["default"].softphone;
  }
}
//# sourceMappingURL=mapOptionToMode.js.map
