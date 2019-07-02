"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RcFont = _interopRequireDefault(require("../../assets/RcFont/RcFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RemoveButton(props) {
  var className = null;

  if (props.visibility) {
    className = (0, _classnames["default"])(_styles["default"].containner, props.className);
  } else {
    className = (0, _classnames["default"])(_styles["default"].containner, props.className, _styles["default"].hiddenRemoveButton);
  }

  return _react["default"].createElement("span", {
    "data-sign": "removeBtn",
    className: className,
    onClick: props.visibility ? props.onClick : null
  }, _react["default"].createElement("i", {
    className: _RcFont["default"].uni2471
  }));
}

RemoveButton.propTypes = {
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  visibility: _propTypes["default"].bool
};
RemoveButton.defaultProps = {
  className: null,
  visibility: true
};
var _default = RemoveButton;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
