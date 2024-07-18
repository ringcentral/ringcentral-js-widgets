"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.search");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListV2 = void 0;
var _utils = require("@ringcentral-integration/utils");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _SearchPanel = require("../SearchPanel");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SelectListV2 = function SelectListV2(_ref) {
  var _ref$onBackClick = _ref.onBackClick,
    onBackClick = _ref$onBackClick === void 0 ? _utils.emptyFn : _ref$onBackClick,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? {} : _ref$classes,
    searchOption = _ref.searchOption,
    currentLocale = _ref.currentLocale,
    rightIcon = _ref.rightIcon,
    title = _ref.title,
    renderListItem = _ref.renderListItem,
    options = _ref.options,
    children = _ref.children,
    placeholder = _ref.placeholder;
  var scrollElmRef = (0, _react.useRef)();
  return /*#__PURE__*/_react["default"].createElement(_contexts.SelectListContext.Provider, {
    value: {
      scrollElmRef: scrollElmRef
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, classes.root)
  }, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
    currentLocale: currentLocale,
    title: title,
    onBackClick: onBackClick,
    className: classes.backHeader,
    rightIcon: rightIcon
  }), /*#__PURE__*/_react["default"].createElement(_SearchPanel.SearchPanel, {
    options: options,
    searchOption: searchOption,
    currentLocale: currentLocale,
    renderListItem: renderListItem,
    classes: classes.search,
    placeholder: placeholder
  }), children));
};
exports.SelectListV2 = SelectListV2;
//# sourceMappingURL=SelectListV2.js.map
