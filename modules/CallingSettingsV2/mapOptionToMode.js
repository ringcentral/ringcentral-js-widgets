"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOptionToMode = mapOptionToMode;

var _callingModes = require("./callingModes");

var _callingOptions = require("./callingOptions");

function mapOptionToMode(callWith) {
  switch (callWith) {
    case _callingOptions.callingOptions.softphone:
      return _callingModes.callingModes.softphone;

    case _callingOptions.callingOptions.ringout:
      return _callingModes.callingModes.ringout;

    case _callingOptions.callingOptions.browser:
      return _callingModes.callingModes.webphone;

    case _callingOptions.callingOptions.jupiter:
      return _callingModes.callingModes.jupiter;

    default:
      return _callingModes.callingModes.softphone;
  }
}
//# sourceMappingURL=mapOptionToMode.js.map
