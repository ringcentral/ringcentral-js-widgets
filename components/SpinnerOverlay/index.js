"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SpinnerOverlay;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function SpinnerOverlay(_ref) {
  var className = _ref.className,
      custom = _ref.custom;
  var Spinner = custom;
  return _react["default"].createElement("div", {
    "data-sign": "spinnerOverlay",
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, _react["default"].createElement("div", {
    className: _styles["default"].mask
  }), _react["default"].createElement("div", {
    className: _styles["default"].container
  }, _react["default"].createElement(Spinner, null)));
}

SpinnerOverlay.propTypes = {
  className: _propTypes["default"].string,
  custom: _propTypes["default"].func
};
SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: _Spinner["default"]
};
//# sourceMappingURL=index.js.map
