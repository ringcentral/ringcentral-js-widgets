"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

var _juno = require("@ringcentral/juno");

var _iconChevron_left = _interopRequireDefault(require("@ringcentral/juno/icons/icon-chevron_left.svg"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _toolTipDelayTime = require("../../lib/toolTipDelayTime");

var _Tooltip = require("../Rcui/Tooltip");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  (0, _react.useEffect)(function () {
    if (isClassic) {
      // this smallest clientWidth is 62.
      setMaxWidth(initWidth - (rightRef.current.clientWidth - 62));
    }
  }, [currentLocale, isClassic]);
  var rootClass = (0, _classnames2["default"])(_styles["default"].root, isClassic && _styles["default"].classic, className); // if right icon is empty then should occupy position to make title actually center align

  var rightIconClass = (0, _classnames2["default"])(_styles["default"].rightIcon, _defineProperty({}, _styles["default"].emptyRightIcon, !rightIcon));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: rootClass
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    className: (0, _classnames2["default"])(_styles["default"].back),
    variant: "round",
    size: "small",
    symbol: backIcon,
    "data-sign": "backButton",
    onClick: onBackClick
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title
  }, title ? /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: title,
    enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      maxWidth: isClassic ? maxWidth : null
    }
  }, title)) : null), /*#__PURE__*/_react["default"].createElement("div", {
    ref: rightRef,
    className: rightIconClass
  }, rightIcon));
};

BackHeader.defaultProps = {
  title: '',
  rightIcon: null,
  backIcon: _iconChevron_left["default"],
  className: null,
  currentLocale: 'en-US',
  isWide: true
};
var _default = BackHeader;
exports["default"] = _default;
//# sourceMappingURL=BackHeaderV2.js.map
