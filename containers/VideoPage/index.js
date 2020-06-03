"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _phoneContext = require("../../lib/phoneContext");

var _VideoPanel = require("../../components/VideoPanel");

var VideoPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.videoUI;
})(_VideoPanel.VideoPanel);
var _default = VideoPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
