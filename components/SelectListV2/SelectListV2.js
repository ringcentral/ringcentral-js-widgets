"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.search");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListV2 = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("@ringcentral-integration/utils");
var _contexts = require("../../contexts");
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _SearchPanel = require("../SearchPanel");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    className: (0, _classnames["default"])(_styles["default"].root, classes.root)
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
