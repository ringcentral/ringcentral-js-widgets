"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _IconLine = _interopRequireDefault(require("../IconLine"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function LinkLine(_ref) {
  var _onClick = _ref.onClick,
      className = _ref.className,
      children = _ref.children,
      hrefClassName = _ref.hrefClassName,
      iconClassName = _ref.iconClassName,
      tooltip = _ref.tooltip;
  return _react["default"].createElement("a", {
    onClick: function onClick(e) {
      e.preventDefault();

      _onClick();
    },
    title: tooltip,
    className: (0, _classnames["default"])(_styles["default"].link, hrefClassName)
  }, _react["default"].createElement(_IconLine["default"], {
    className: className,
    icon: _react["default"].createElement("span", {
      className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].icon, iconClassName)
    })
  }, children));
}

LinkLine.propTypes = {
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  hrefClassName: _propTypes["default"].string,
  iconClassName: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  tooltip: _propTypes["default"].string
};
LinkLine.defaultProps = {
  children: undefined,
  className: undefined,
  hrefClassName: undefined,
  iconClassName: undefined,
  tooltip: undefined
};
var _default = LinkLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
