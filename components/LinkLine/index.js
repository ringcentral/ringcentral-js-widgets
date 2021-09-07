"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.string.link");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _IconLine = _interopRequireDefault(require("../IconLine"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var LinkLine = function LinkLine(_ref) {
  var _onClick = _ref.onClick,
      className = _ref.className,
      children = _ref.children,
      hideUnderline = _ref.hideUnderline,
      hrefClassName = _ref.hrefClassName,
      iconClassName = _ref.iconClassName,
      tooltip = _ref.tooltip,
      pendoSignName = _ref.pendoSignName,
      rest = _objectWithoutProperties(_ref, ["onClick", "className", "children", "hideUnderline", "hrefClassName", "iconClassName", "tooltip", "pendoSignName"]);

  return /*#__PURE__*/_react["default"].createElement("a", _extends({
    onClick: function onClick(e) {
      e.preventDefault();

      _onClick();
    },
    title: tooltip,
    className: (0, _classnames["default"])(_styles["default"].link, hrefClassName),
    style: hideUnderline ? {
      textDecoration: 'none'
    } : {},
    "data-pendo": pendoSignName || undefined
  }, rest), /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    className: className,
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].icon, iconClassName)
    })
  }, children));
};

LinkLine.propTypes = {
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  hideUnderline: _propTypes["default"].bool,
  hrefClassName: _propTypes["default"].string,
  iconClassName: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  tooltip: _propTypes["default"].string,
  pendoSignName: _propTypes["default"].string
};
LinkLine.defaultProps = {
  children: undefined,
  className: undefined,
  hideUnderline: false,
  hrefClassName: undefined,
  iconClassName: undefined,
  tooltip: undefined,
  pendoSignName: undefined
};
var _default = LinkLine;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
