"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _createModal = _interopRequireDefault(require("../../lib/createModal"));
var _Dialog = _interopRequireDefault(require("../Dialog"));
var _excluded = ["onCancel"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var ModalDialog = (0, _createModal["default"])(_Dialog["default"]);
var Modal = function Modal(_ref) {
  var onCancel = _ref.onCancel,
    props = _objectWithoutProperties(_ref, _excluded);
  // @ts-expect-error TS(2322): Type '{ onCancel: ((...args: any[]) => any) | unde... Remove this comment to see the full error message
  return /*#__PURE__*/_react["default"].createElement(ModalDialog, _extends({}, props, {
    onCancel: onCancel,
    onClose: onCancel
  }));
};
Modal.defaultProps = {
  onCancel: undefined
};
var _default = exports["default"] = Modal;
//# sourceMappingURL=index.js.map
