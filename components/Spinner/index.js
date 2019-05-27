"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Spinner;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Spinner(_ref) {
  var className = _ref.className,
      ringWidth = _ref.ringWidth;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].padding)
  }), _react["default"].createElement("div", {
    className: _styles["default"].spinner,
    style: {
      borderWidth: ringWidth
    }
  }));
}

Spinner.propTypes = {
  className: _propTypes["default"].string,
  ringWidth: _propTypes["default"].number
};
Spinner.defaultProps = {
  className: null,
  ringWidth: 8
};
//# sourceMappingURL=index.js.map
