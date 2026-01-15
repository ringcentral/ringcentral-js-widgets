"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _TextInput = _interopRequireDefault(require("../TextInput"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DialTextInput = function DialTextInput(_ref) {
  var className = _ref.className,
    invalid = _ref.invalid,
    value = _ref.value,
    onChangeEvent = _ref.onChangeEvent,
    onDelete = _ref.onDelete,
    autoFocus = _ref.autoFocus;
  var deleteDisplay = value === '' ? {
    display: 'none'
  } : {
    display: 'block'
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].dialInput, className, invalid && _styles["default"].invalid)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _clsx["default"])(_styles["default"].to)
  }, _i18n["default"].getString('to')), /*#__PURE__*/_react["default"].createElement(_TextInput["default"], {
    placeholder: _i18n["default"].getString('enterNameOrPhoneNumber'),
    className: _styles["default"].dial_Input,
    value: value,
    onChange: onChangeEvent,
    autoFocus: autoFocus
  }), /*#__PURE__*/_react["default"].createElement("span", {
    style: deleteDisplay,
    className: (0, _clsx["default"])(_styles["default"]["delete"], _DynamicsFont["default"].clear),
    onClick: onDelete
  }));
};
var _default = exports["default"] = DialTextInput;
//# sourceMappingURL=index.js.map
