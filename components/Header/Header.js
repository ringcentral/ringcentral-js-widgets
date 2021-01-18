"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ramda = require("ramda");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Button = require("../Button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Header = function Header(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      buttons = _ref.buttons,
      children = _ref.children;
  var label = children ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].label,
    "data-sign": "headerTitle"
  }, children) : null;

  var _addIndex = (0, _ramda.addIndex)(_ramda.reduce)(function (acc, _ref2, idx) {
    var hidden = _ref2.hidden,
        disabled = _ref2.disabled,
        placement = _ref2.placement,
        label = _ref2.label,
        props = _objectWithoutProperties(_ref2, ["hidden", "disabled", "placement", "label"]);

    if (!hidden) {
      var button = /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
        key: idx,
        className: (0, _classnames["default"])(_styles["default"].button, disabled && _styles["default"].disabled),
        disabled: disabled
      }, props), label);

      if (placement === 'right') {
        acc.rightButtons.push(button);
      } else {
        acc.leftButtons.push(button);
      }
    }

    return acc;
  }, {
    leftButtons: [],
    rightButtons: []
  }, buttons),
      leftButtons = _addIndex.leftButtons,
      rightButtons = _addIndex.rightButtons;

  return /*#__PURE__*/_react["default"].createElement("header", {
    className: (0, _classnames["default"])(_styles["default"].root, className),
    onClick: onClick,
    "data-sign": "header"
  }, label, leftButtons.length ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].buttonGroup, _styles["default"].leftButtons)
  }, leftButtons) : null, rightButtons.length ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].buttonGroup, _styles["default"].rightButtons)
  }, rightButtons) : null);
};

exports.Header = Header;
Header.defaultProps = {
  buttons: []
};
//# sourceMappingURL=Header.js.map
