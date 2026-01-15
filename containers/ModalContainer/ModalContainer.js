"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalContainer = void 0;
var _ModalV = require("../../components/ModalV2");
var _phoneContext = require("../../lib/phoneContext");
var ModalContainer = exports.ModalContainer = (0, _phoneContext.connectModule)(function (phone) {
  return phone.modalUI;
})(_ModalV.ModalV2);
//# sourceMappingURL=ModalContainer.js.map
