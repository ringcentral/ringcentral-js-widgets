"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = LogButton;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _Button = require("../Button");

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function LogButton(_ref) {
  var className = _ref.className,
      onLog = _ref.onLog,
      isLogged = _ref.isLogged,
      disableLinks = _ref.disableLinks,
      isLogging = _ref.isLogging,
      addTitle = _ref.addTitle,
      editTitle = _ref.editTitle;
  var spinner = isLogging ? /*#__PURE__*/_react["default"].createElement(_Spinner["default"], {
    ringWidth: 2,
    className: _styles["default"].spinner
  }) : null;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _classnames["default"])(_styles["default"].log, className),
    onClick: onLog,
    disabled: disableLinks || isLogging
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: isLogged ? _DynamicsFont["default"].edit : _DynamicsFont["default"].callLog,
    title: isLogged ? editTitle : addTitle
  }), spinner);
}

LogButton.propTypes = {
  className: _propTypes["default"].string,
  onLog: _propTypes["default"].func,
  isLogged: _propTypes["default"].bool,
  disableLinks: _propTypes["default"].bool,
  isLogging: _propTypes["default"].bool,
  addTitle: _propTypes["default"].string,
  editTitle: _propTypes["default"].string
};
LogButton.defaultProps = {
  className: undefined,
  onLog: undefined,
  isLogged: false,
  disableLinks: false,
  isLogging: false,
  addTitle: undefined,
  editTitle: undefined
};
//# sourceMappingURL=index.js.map
