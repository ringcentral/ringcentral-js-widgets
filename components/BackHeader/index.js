"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BackHeader;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _Header = _interopRequireDefault(require("../Header"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function BackHeader(props) {
  var buttons = props.buttons || [];

  var defaultBackButton = _react["default"].createElement("i", {
    "data-sign": "backButton",
    className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].iconRotate)
  });

  buttons.push({
    label: props.backButton || defaultBackButton,
    onClick: props.onBackClick,
    placement: 'left'
  });
  return _react["default"].createElement(_Header["default"], {
    buttons: buttons,
    className: props.className
  }, props.children);
}

BackHeader.propTypes = {
  className: _propTypes["default"].string,
  children: _propTypes["default"].node,
  backButton: _propTypes["default"].node,
  buttons: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    label: _propTypes["default"].node.isRequired,
    onClick: _propTypes["default"].funcs,
    placement: _propTypes["default"].oneOf(['left', 'right'])
  })),
  onBackClick: _propTypes["default"].func
};
BackHeader.defaultProps = {
  className: '',
  children: undefined,
  buttons: undefined,
  backButton: undefined,
  onBackClick: undefined
};
//# sourceMappingURL=index.js.map
