"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserGuidePage = void 0;

var _UserGuide = _interopRequireDefault(require("../../components/UserGuide"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserGuidePage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.userGuideUI;
})(_UserGuide["default"]);
exports.UserGuidePage = UserGuidePage;
//# sourceMappingURL=index.js.map
