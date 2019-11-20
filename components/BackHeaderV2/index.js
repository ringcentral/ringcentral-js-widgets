"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireWildcard(require("react"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initWidth = 67;

var BackHeader = function BackHeader(_ref) {
  var onBackClick = _ref.onBackClick,
      title = _ref.title,
      rightIcon = _ref.rightIcon,
      className = _ref.className,
      currentLocale = _ref.currentLocale,
      isWide = _ref.isWide,
      backIcon = _ref.backIcon;

  var _useState = (0, _react.useState)(initWidth),
      _useState2 = _slicedToArray(_useState, 2),
      maxWidth = _useState2[0],
      setMaxWidth = _useState2[1];

  var rightRef = (0, _react.useRef)();
  var isClassic = !isWide;

  if (isClassic) {
    (0, _react.useEffect)(function () {
      // this smallest clientWidth is 62.
      setMaxWidth(initWidth - (rightRef.current.clientWidth - 62));
    }, [currentLocale]);
  }

  var rootClass = (0, _classnames["default"])(_styles["default"].root, isClassic && _styles["default"].classic, className);
  return _react["default"].createElement("div", {
    className: rootClass
  }, _react["default"].createElement(_rcui.RcIconButton, {
    className: (0, _classnames["default"])(_styles["default"].back),
    variant: "round",
    size: "small",
    icon: backIcon,
    "data-sign": "backButton",
    onClick: onBackClick
  }), _react["default"].createElement("div", {
    className: _styles["default"].title
  }, title ? _react["default"].createElement("span", {
    style: {
      maxWidth: isClassic ? maxWidth : null
    },
    title: title
  }, title) : null), _react["default"].createElement("div", {
    ref: rightRef
  }, rightIcon));
};

BackHeader.propTypes = {
  onBackClick: _propTypes["default"].func.isRequired,
  title: _propTypes["default"].string,
  backIcon: _propTypes["default"].string,
  rightIcon: _propTypes["default"].node,
  className: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string,
  isWide: _propTypes["default"].bool
};
BackHeader.defaultProps = {
  title: '',
  rightIcon: null,
  backIcon: 'chevron_left',
  className: null,
  currentLocale: 'en-US',
  isWide: true
};
var _default = BackHeader;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
