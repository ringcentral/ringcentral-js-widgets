"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockContainer = void 0;
var _BlockPanel = require("../../components/BlockPanel");
var _phoneContext = require("../../lib/phoneContext");
var BlockContainer = exports.BlockContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.blockUI;
})(_BlockPanel.BlockPanel);
//# sourceMappingURL=BlockContainer.js.map
