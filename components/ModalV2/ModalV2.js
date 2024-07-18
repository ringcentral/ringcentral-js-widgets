"use strict";

require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalV2 = void 0;
var _juno = require("@ringcentral/juno");
var _ramda = require("ramda");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    color: ", ";\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var PopupBox = (0, _juno.styled)(_juno.RcPopupBox)(_templateObject(), _juno.RcDialogContent, (0, _juno.palette2)('neutral', 'f06'));
var ModalV2 = function ModalV2(_ref) {
  var modals = _ref.modals,
    phone = _ref.phone,
    dialogProps = _objectWithoutProperties(_ref, ["modals", "phone"]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _ramda.map)(function (_ref2) {
    var key = _ref2.key,
      open = _ref2.open,
      modalProps = _objectWithoutProperties(_ref2, ["key", "open"]);
    var _ref3 = (0, _juno.combineProps)(dialogProps, modalProps),
      children = _ref3.children,
      rest = _objectWithoutProperties(_ref3, ["children"]);
    if (modalProps.size) {
      // throw error directly
      throw new Error('[ModalV2] that size props are be deprecated, please use maxWidth');
    }
    return /*#__PURE__*/_react["default"].createElement(PopupBox, _extends({
      key: key
    }, rest, {
      open: open
    }), children);
  }, modals));
};
exports.ModalV2 = ModalV2;
//# sourceMappingURL=ModalV2.js.map
