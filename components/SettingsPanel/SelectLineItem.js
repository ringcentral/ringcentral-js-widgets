"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectLineItem = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _Line = _interopRequireDefault(require("../Line"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SelectLineItem = function SelectLineItem(_ref) {
  var show = _ref.show,
    name = _ref.name,
    customTitle = _ref.customTitle,
    currentLocale = _ref.currentLocale,
    dataSign = _ref.dataSign,
    disabled = _ref.disabled,
    value = _ref.value,
    options = _ref.options,
    _onChange = _ref.onChange;
  if (!show) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(_Line["default"], null, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "".concat(dataSign, "_label"),
    className: (0, _clsx["default"])(disabled && _styles["default"].disableText, _styles["default"].selectTitle)
  }, customTitle || _i18n["default"].getString(name, currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcSelect, {
    fullWidth: true,
    "data-sign": dataSign,
    variant: "box",
    value: value,
    className: _styles["default"].selectSection,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    }
  }, options.map(function (_ref2) {
    var value = _ref2.value,
      label = _ref2.label;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: value,
      value: value
    }, _i18n["default"].getString(label, currentLocale));
  })));
};
exports.SelectLineItem = SelectLineItem;
//# sourceMappingURL=SelectLineItem.js.map
