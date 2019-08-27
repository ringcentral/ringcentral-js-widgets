"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Button;
exports.ButtonPropTypes = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Button = _interopRequireDefault(require("../../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Button(props) {
  var _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      checked = props.checked,
      iconClassName = props.iconClassName,
      text = props.text,
      onClick = props.onClick,
      args = _objectWithoutProperties(props, ["disabled", "checked", "iconClassName", "text", "onClick"]);

  return _react["default"].createElement(_Button["default"], _extends({}, args, {
    disabled: disabled,
    checked: checked,
    onClick: onClick,
    className: _styles["default"].button
  }), iconClassName ? _react["default"].createElement("i", {
    role: "presentation",
    className: (0, _classnames["default"])([iconClassName, _styles["default"].icon]),
    "aria-hidden": true
  }) : null, text);
}

var ButtonPropTypes = {
  disabled: _propTypes["default"].bool,
  checked: _propTypes["default"].bool,
  iconClassName: _propTypes["default"].string,
  text: _propTypes["default"].string,
  onClick: _propTypes["default"].func
};
exports.ButtonPropTypes = ButtonPropTypes;
Button.propTypes = ButtonPropTypes;
Button.defaultProps = {
  disabled: false,
  checked: false,
  text: 'test',
  iconClassName: null,
  onClick: function onClick(i) {
    return i;
  }
};
//# sourceMappingURL=index.js.map
