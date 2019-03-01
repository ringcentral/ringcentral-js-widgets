"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderButton = HeaderButton;
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function HeaderButton(props) {
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(_styles.default.button, props.disabled && _styles.default.disabled),
    onClick: props.disabled ? undefined : props.onClick,
    title: props.title
  }, props.label);
}

HeaderButton.propTypes = {
  onClick: _propTypes.default.func,
  label: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  title: _propTypes.default.string
};
HeaderButton.defaultProps = {
  onClick: undefined,
  label: undefined,
  disabled: false,
  title: undefined
};

function Header(props) {
  var label = null;

  if (props.children) {
    label = _react.default.createElement("div", {
      className: _styles.default.label
    }, props.children);
  }

  var leftButtons = props.buttons.filter(function (b) {
    return b.placement !== 'right' && !b.hidden;
  }).map(function (b, idx) {
    return _react.default.createElement(HeaderButton, _extends({
      key: idx
    }, b));
  });
  var rightButtons = props.buttons.filter(function (b) {
    return b.placement === 'right' && !b.hidden;
  }).map(function (b, idx) {
    return _react.default.createElement(HeaderButton, _extends({
      key: idx
    }, b));
  });
  return _react.default.createElement("header", {
    className: (0, _classnames.default)(_styles.default.root, props.className)
  }, label, leftButtons.length ? _react.default.createElement("div", {
    className: _styles.default.leftButtons
  }, leftButtons) : null, rightButtons.length ? _react.default.createElement("div", {
    className: _styles.default.rightButtons
  }, rightButtons) : null);
}

Header.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  buttons: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.node.isRequired,
    onClick: _propTypes.default.funcs,
    placement: _propTypes.default.oneOf(['left', 'right'])
  }))
};
Header.defaultProps = {
  className: '',
  children: undefined,
  buttons: []
};
var _default = Header;
exports.default = _default;
//# sourceMappingURL=index.js.map
