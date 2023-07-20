"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderContainer = void 0;
var _HeaderView = require("../../components/HeaderView");
var _phoneContext = require("../../lib/phoneContext");
var HeaderContainer = (0, _phoneContext.connectModule)(function (_ref) {
  var headerViewUI = _ref.headerViewUI;
  return headerViewUI;
})(_HeaderView.HeaderView);
exports.HeaderContainer = HeaderContainer;
//# sourceMappingURL=HeaderContainer.js.map
