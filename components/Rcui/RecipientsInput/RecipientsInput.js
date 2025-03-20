"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientsInput = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
var throttledTime = 1000;

/** @deprecated use juno RcDialTextField directly */
var RecipientsInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var placeholder = _ref.placeholder,
    value = _ref.value,
    currentLocale = _ref.currentLocale,
    onChange = _ref.onChange,
    onDelete = _ref.onDelete,
    onClear = _ref.onClear,
    className = _ref.className,
    deleteIconProps = _ref.deleteIconProps,
    rest = _objectWithoutProperties(_ref, ["placeholder", "value", "currentLocale", "onChange", "onDelete", "onClear", "className", "deleteIconProps"]);
  var innerRef = (0, _react.useRef)();
  var inputRef = (0, _juno.useForkRef)(ref, innerRef);
  // @ts-expect-error TS(2345): Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    mouseDownTime = _useState2[0],
    setMouseDownTime = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    timer = _useState4[0],
    setTimer = _useState4[1];
  var haveDeleteButton = !!value;
  var handleMouseDown = (0, _juno.useEventCallback)(function () {
    setMouseDownTime(+new Date());
    setTimer(
    // @ts-expect-error TS(2345): Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
    setTimeout(function () {
      onClear();
      setTimer(null);
    }, throttledTime));
  });
  var handleMouseUp = (0, _juno.useEventCallback)(function () {
    var curTime = +new Date();
    if (mouseDownTime && curTime - mouseDownTime >= throttledTime) {
      return;
    }

    // @ts-expect-error TS(2769): No overload matches this call.
    clearTimeout(timer);
    onDelete();
  });
  (0, _react.useEffect)(function () {
    innerRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  var placeholderText = placeholder || _i18n["default"].getString('dialPlaceholder', currentLocale);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(className, _styles["default"].inputRoot)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, _extends({
    placeholder: placeholderText,
    title: placeholderText,
    value: value,
    inputProps: {
      maxLength: 30
    },
    fullWidth: true,
    clearBtn: false,
    inputRef: inputRef,
    onChange: function (_onChange) {
      function onChange(_x) {
        return _onChange.apply(this, arguments);
      }
      onChange.toString = function () {
        return _onChange.toString();
      };
      return onChange;
    }(function (e) {
      onChange(e.target.value);
    }),
    classes: {
      root: _styles["default"].textFieldRoot
    },
    "data-sign": "numberField",
    InputProps: {
      disableUnderline: true,
      classes: {
        root: _styles["default"].root,
        input: _styles["default"].input
      },
      endAdornment: haveDeleteButton && /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, _extends({
        color: "neutral.f03",
        symbol: _junoIcon.Deletenumber,
        "data-sign": "deleteButton",
        title: "delete"
      }, (0, _juno.combineProps)({
        onMouseUp: handleMouseUp,
        onMouseDown: handleMouseDown
      }, deleteIconProps), {
        variant: "plain",
        size: "large"
      }))
    },
    autoComplete: "off"
  }, rest)));
});
exports.RecipientsInput = RecipientsInput;
//# sourceMappingURL=RecipientsInput.js.map
