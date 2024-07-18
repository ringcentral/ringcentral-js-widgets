"use strict";

require("core-js/modules/es.array.includes");
require("core-js/modules/es.array.map");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickList = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
var PickList = function PickList(_ref) {
  var options = _ref.options,
    _ref$optionValueKey = _ref.optionValueKey,
    optionValueKey = _ref$optionValueKey === void 0 ? 'id' : _ref$optionValueKey,
    _ref$optionLabelKey = _ref.optionLabelKey,
    optionLabelKey = _ref$optionLabelKey === void 0 ? 'label' : _ref$optionLabelKey,
    label = _ref.label,
    value = _ref.value,
    required = _ref.required,
    _onChange = _ref.onChange,
    dataSign = _ref.dataSign,
    renderItem = _ref.renderItem,
    renderValue = _ref.renderValue,
    InputProps = _ref.InputProps,
    rest = _objectWithoutProperties(_ref, ["options", "optionValueKey", "optionLabelKey", "label", "value", "required", "onChange", "dataSign", "renderItem", "renderValue", "InputProps"]);
  return /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, _extends({
    "data-sign": dataSign,
    fullWidth: true,
    gutterBottom: true,
    required: required,
    label: label,
    value: value,
    InputProps: InputProps,
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;
      _onChange(value);
    },
    renderValue: renderValue
  }, rest), options.map(function (item, i) {
    var label = item[optionLabelKey];
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: i,
      value: item[optionValueKey],
      "data-sign": "option".concat(i)
    }, renderItem ? renderItem(item) : /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].menuItem,
      title: label
    }, label));
  }));
};
exports.PickList = PickList;
//# sourceMappingURL=PickList.js.map
