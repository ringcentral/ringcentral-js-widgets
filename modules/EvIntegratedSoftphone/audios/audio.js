"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audios = void 0;

var _beep = _interopRequireDefault(require("./beep.wav"));

var _chatPresented = _interopRequireDefault(require("./chatPresented.wav"));

var _dtmf = _interopRequireDefault(require("./dtmf.wav"));

var _newchat = _interopRequireDefault(require("./newchat.wav"));

var _ringtone = _interopRequireDefault(require("./ringtone.wav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var audios = {
  beep: _beep["default"],
  chatPresented: _chatPresented["default"],
  dtmf: _dtmf["default"],
  newchat: _newchat["default"],
  ringtone: _ringtone["default"]
};
exports.audios = audios;
//# sourceMappingURL=audio.js.map
