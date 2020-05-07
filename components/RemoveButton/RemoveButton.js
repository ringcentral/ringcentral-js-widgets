"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RcFont = _interopRequireDefault(require("../../assets/RcFont/RcFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RemoveButton = function RemoveButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      visibility = _ref.visibility;
  return _react["default"].createElement("span", {
    "data-sign": "removeBtn",
    className: (0, _classnames["default"])(_styles["default"].container, className, !visibility && _styles["default"].hideRemoveButton),
    onClick: visibility ? onClick : null
  }, _react["default"].createElement("i", {
    className: _RcFont["default"].uni2471
  }));
};

exports.RemoveButton = RemoveButton;
RemoveButton.defaultProps = {
  className: null,
  visibility: true
};
//# sourceMappingURL=RemoveButton.js.map
