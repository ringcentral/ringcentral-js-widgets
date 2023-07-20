"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: ", "px;\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var initWidth = 67;
var Title = (0, _juno.styled)(_juno.RcTypography)(_templateObject(), function (_ref) {
  var $maxWidth = _ref.$maxWidth;
  return $maxWidth;
});
var BackHeader = function BackHeader(_ref2) {
  var onBackClick = _ref2.onBackClick,
    _ref2$title = _ref2.title,
    title = _ref2$title === void 0 ? '' : _ref2$title,
    _ref2$rightIcon = _ref2.rightIcon,
    rightIcon = _ref2$rightIcon === void 0 ? null : _ref2$rightIcon,
    className = _ref2.className,
    _ref2$currentLocale = _ref2.currentLocale,
    currentLocale = _ref2$currentLocale === void 0 ? 'en-US' : _ref2$currentLocale,
    _ref2$isWide = _ref2.isWide,
    isWide = _ref2$isWide === void 0 ? true : _ref2$isWide,
    _ref2$backIcon = _ref2.backIcon,
    backIcon = _ref2$backIcon === void 0 ? _junoIcon.ChevronLeft : _ref2$backIcon;
  var _useState = (0, _react.useState)(initWidth),
    _useState2 = _slicedToArray(_useState, 2),
    maxWidth = _useState2[0],
    setMaxWidth = _useState2[1];
  var rightRef = (0, _react.useRef)(null);
  var isClassic = !isWide;
  (0, _react.useEffect)(function () {
    if (isClassic && rightRef.current) {
      // this smallest clientWidth is 62.
      setMaxWidth(initWidth - (rightRef.current.clientWidth - 62));
    }
  }, [currentLocale, isClassic]);
  var rootClass = (0, _classnames2["default"])(_styles["default"].root, isClassic && _styles["default"].classic, className);
  // if right icon is empty then should occupy position to make title actually center align
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
    className: _styles["default"].title,
    "data-sign": "backHeaderTitle"
  }, title ? /*#__PURE__*/_react["default"].createElement(Title, {
    color: "neutral.f06",
    variant: "body2",
    component: "span",
    $maxWidth: isClassic ? maxWidth : undefined,
    title: title
  }, title) : null), /*#__PURE__*/_react["default"].createElement("div", {
    ref: rightRef,
    className: rightIconClass
  }, rightIcon));
};
var _default = BackHeader;
exports["default"] = _default;
//# sourceMappingURL=BackHeaderV2.js.map
