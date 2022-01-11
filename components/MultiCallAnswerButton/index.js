"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.map");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Answer = _interopRequireDefault(require("../../assets/images/Answer.svg"));

var _End = _interopRequireDefault(require("../../assets/images/End.svg"));

var _Hold = _interopRequireDefault(require("../../assets/images/Hold.svg"));

var _CircleButton = _interopRequireDefault(require("../CircleButton"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MultiCallAnswerButton = function MultiCallAnswerButton(props) {
  var Icon = props.isEndOtherCall ? _End["default"] : _Hold["default"];
  var iconClassName = (0, _classnames["default"])(_styles["default"].button, props.isEndOtherCall ? _styles["default"].endButton : '');
  var text = props.title.split('\n').map(function (line, index) {
    return /*#__PURE__*/_react["default"].createElement("tspan", {
      dy: index ? '1.1em' : 0,
      x: "250",
      key: line,
      "data-sign": line.replace(' ', '_')
    }, line);
  });
  return /*#__PURE__*/_react["default"].createElement("svg", {
    className: props.className,
    viewBox: "0 0 500 600",
    width: props.width,
    height: props.height,
    x: props.x,
    y: props.y
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    width: "200",
    height: "200",
    x: 60,
    y: 50,
    className: iconClassName,
    onClick: props.onClick,
    icon: Icon
  }), /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    width: "250",
    height: "250",
    x: 200,
    y: 110,
    className: (0, _classnames["default"])(_styles["default"].button, _styles["default"].answer),
    showBorder: false,
    onClick: props.onClick,
    icon: _Answer["default"],
    dataSign: props.dataSign
  }), /*#__PURE__*/_react["default"].createElement("text", {
    className: _styles["default"].buttonTitle,
    x: "250",
    y: "500",
    textAnchor: "middle"
  }, text));
};

MultiCallAnswerButton.defaultProps = {
  className: null,
  isEndOtherCall: true,
  width: '100%',
  height: '100%',
  x: 0,
  y: 0
};
var _default = MultiCallAnswerButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
