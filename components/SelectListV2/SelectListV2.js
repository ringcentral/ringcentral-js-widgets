"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectListV2 = void 0;

require("core-js/modules/es6.regexp.search");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _contexts = require("../../contexts");

var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));

var _SearchPanel = require("../SearchPanel");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SelectListV2 = function SelectListV2(_ref) {
  var searchOption = _ref.searchOption,
      currentLocale = _ref.currentLocale,
      onBackClick = _ref.onBackClick,
      rightIcon = _ref.rightIcon,
      title = _ref.title,
      renderListItem = _ref.renderListItem,
      options = _ref.options,
      children = _ref.children,
      classes = _ref.classes,
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
SelectListV2.defaultProps = {
  onBackClick: function onBackClick() {},
  classes: {}
};
//# sourceMappingURL=SelectListV2.js.map
