"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserGuidePage = void 0;
var _UserGuide = _interopRequireDefault(require("../../components/UserGuide"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var UserGuidePage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.userGuideUI;
})(_UserGuide["default"]);
exports.UserGuidePage = UserGuidePage;
//# sourceMappingURL=index.js.map
