"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;

require("core-js/modules/es6.object.define-property");

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Alert = function Alert(props) {
  var _classnames;

  var children = props.children,
      type = props.type,
      className = props.className,
      dataSign = props.dataSign;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": dataSign,
    className: (0, _classnames2["default"])(_styles["default"].container, className, (_classnames = {}, _defineProperty(_classnames, _styles["default"].error, type === _types.AlertType.ERROR), _defineProperty(_classnames, _styles["default"].info, type === _types.AlertType.INFO), _classnames))
  }, children);
};

exports.Alert = Alert;
Alert.defaultProps = {
  className: '',
  dataSign: ''
};
//# sourceMappingURL=Alert.js.map
