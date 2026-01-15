"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListV2 = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _utils = require("@ringcentral-integration/utils");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _SearchPanel = require("../SearchPanel");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SelectListV2 = exports.SelectListV2 = function SelectListV2(_ref) {
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
//# sourceMappingURL=SelectListV2.js.map
