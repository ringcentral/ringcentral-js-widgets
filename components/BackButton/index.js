"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BackButton;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function BackButton(_ref) {
  var label = _ref.label,
      showIcon = _ref.showIcon;
  return _react["default"].createElement("span", {
    className: _styles["default"].backButton
  }, showIcon ? _react["default"].createElement("i", {
    "data-sign": "backButton",
    className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].backIcon)
  }) : null, label ? _react["default"].createElement("span", {
    "data-sign": "backButtonLabel",
    className: _styles["default"].backLabel
  }, label) : null);
}

BackButton.propTypes = {
  label: _propTypes["default"].string,
  showIcon: _propTypes["default"].bool
};
BackButton.defaultProps = {
  label: undefined,
  showIcon: true
};
//# sourceMappingURL=index.js.map
