"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActiveCallButton;

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ActiveCallButton(props) {
  var className = (0, _classnames.default)(_styles.default.btnSvg, props.className);
  var buttonClassName = (0, _classnames.default)(_styles.default.button, props.buttonClassName, props.active ? _styles.default.buttonActive : null, props.disabled ? _styles.default.buttonDisabled : null);
  var text = props.title.split('\n').map(function (line, index) {
    return _react.default.createElement("tspan", {
      dy: index ? '1.1em' : 0,
      x: "250",
      key: line
    }, line);
  });
  var buttonSize = 383.8;
  return _react.default.createElement("svg", {
    className: className,
    viewBox: "0 0 500 600",
    width: props.width,
    height: props.height,
    x: props.x,
    y: props.y
  }, _react.default.createElement(_CircleButton.default, {
    width: buttonSize.toString(),
    height: buttonSize.toString(),
    x: 500 / 2 - buttonSize / 2,
    y: 0,
    className: buttonClassName,
    onClick: props.onClick,
    icon: props.icon,
    disabled: props.disabled,
    showBorder: props.showBorder,
    iconClassName: props.buttonClassName,
    iconWidth: props.iconWidth,
    iconHeight: props.iconHeight,
    iconX: props.iconX,
    iconY: props.iconY,
    showRipple: props.showRipple,
    dataSign: props.dataSign
  }), _react.default.createElement("text", {
    className: _styles.default.buttonTitle,
    x: "250",
    y: "500",
    textAnchor: "middle"
  }, text));
}

ActiveCallButton.propTypes = {
  className: _propTypes.default.string,
  buttonClassName: _propTypes.default.string,
  onClick: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  active: _propTypes.default.bool,
  title: _propTypes.default.string.isRequired,
  icon: _propTypes.default.func,
  showBorder: _propTypes.default.bool,
  width: _propTypes.default.string,
  height: _propTypes.default.string,
  x: _propTypes.default.number,
  y: _propTypes.default.number,
  iconWidth: _propTypes.default.number,
  iconHeight: _propTypes.default.number,
  iconX: _propTypes.default.number,
  iconY: _propTypes.default.number,
  showRipple: _propTypes.default.bool,
  dataSign: _propTypes.default.string
};
ActiveCallButton.defaultProps = {
  className: undefined,
  buttonClassName: undefined,
  onClick: undefined,
  disabled: false,
  active: false,
  icon: undefined,
  showBorder: true,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0,
  iconWidth: undefined,
  iconHeight: undefined,
  iconX: undefined,
  iconY: undefined,
  showRipple: false
};
//# sourceMappingURL=index.js.map
