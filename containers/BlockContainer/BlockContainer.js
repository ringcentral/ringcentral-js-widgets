"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockContainer = void 0;

var _BlockPanel = require("../../components/BlockPanel");

var _phoneContext = require("../../lib/phoneContext");

var BlockContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.blockUI;
})(_BlockPanel.BlockPanel);
exports.BlockContainer = BlockContainer;
//# sourceMappingURL=BlockContainer.js.map
