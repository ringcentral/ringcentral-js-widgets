"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectField = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var SelectField = function SelectField(_ref) {
  var options = _ref.options,
    labelClassName = _ref.labelClassName,
    rest = _objectWithoutProperties(_ref, ["options", "labelClassName"]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, _extends({
    gutterBottom: true
  }, rest), options.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: i,
      value: !item.value ? undefined : "".concat(item.value),
      "data-sign": "option".concat(i),
      disabled: item.disabled,
      title: item.label
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: labelClassName
    }, item.label));
  }));
};
exports.SelectField = SelectField;
//# sourceMappingURL=SelectField.js.map
