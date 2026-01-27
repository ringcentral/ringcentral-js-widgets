"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastItemView = exports.ToastItemViewContext = void 0;
var _react = require("react");
/* eslint-disable @typescript-eslint/no-explicit-any */

var ToastItemViewContext = exports.ToastItemViewContext = /*#__PURE__*/(0, _react.createContext)({
  toastMode: false,
  props: {},
  action: {}
});

/**
 * provide you can get toast view context with toast mode state and props
 */
var useToastItemView = exports.useToastItemView = function useToastItemView() {
  return (0, _react.useContext)(ToastItemViewContext);
};
//# sourceMappingURL=ToastItemView.context.js.map
