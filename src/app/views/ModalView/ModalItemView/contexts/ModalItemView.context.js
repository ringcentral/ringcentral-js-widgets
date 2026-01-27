"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalItemView = exports.ModalItemViewContext = void 0;
var _react = require("react");
/* eslint-disable @typescript-eslint/no-explicit-any */

var ModalItemViewContext = exports.ModalItemViewContext = /*#__PURE__*/(0, _react.createContext)({
  modalMode: false,
  props: {},
  action: {}
});

/**
 * provide you can get modal view context with modal mode state and props
 */
var useModalItemView = exports.useModalItemView = function useModalItemView() {
  return (0, _react.useContext)(ModalItemViewContext);
};
//# sourceMappingURL=ModalItemView.context.js.map
