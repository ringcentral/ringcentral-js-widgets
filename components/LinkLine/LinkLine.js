"use strict";

require("core-js/modules/es.array.index-of");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.string.link");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var LinkLine = function LinkLine(_ref) {
  var _onClick = _ref.onClick,
    className = _ref.className,
    children = _ref.children,
    _ref$hideUnderline = _ref.hideUnderline,
    hideUnderline = _ref$hideUnderline === void 0 ? false : _ref$hideUnderline,
    hrefClassName = _ref.hrefClassName,
    iconClassName = _ref.iconClassName,
    tooltip = _ref.tooltip,
    dataSign = _ref.dataSign,
    pendoSignName = _ref.pendoSignName,
    rest = _objectWithoutProperties(_ref, ["onClick", "className", "children", "hideUnderline", "hrefClassName", "iconClassName", "tooltip", "dataSign", "pendoSignName"]);
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
    "data-sign": dataSign || undefined,
    "data-pendo": pendoSignName || undefined
  }, rest), /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
    className: className,
    icon: /*#__PURE__*/_react["default"].createElement("span", {
      className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].icon, iconClassName)
    })
  }, children));
};
var _default = LinkLine;
exports["default"] = _default;
//# sourceMappingURL=LinkLine.js.map
