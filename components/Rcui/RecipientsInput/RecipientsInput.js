"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.keys");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.to-string");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientsInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(className, _styles["default"].inputRoot)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, _extends({
    placeholder: placeholder || _i18n["default"].getString('dialPlaceholder', currentLocale),
    value: value,
    inputProps: {
      maxLength: 30
    },
    fullWidth: true,
    clearBtn: false,
    inputRef: inputRef,
    onChange: function (_onChange) {
      function onChange(_x2) {
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
