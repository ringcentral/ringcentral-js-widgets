"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientsInput = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

var _juno = require("@ringcentral/juno");

var _Deletenumber = _interopRequireDefault(require("@ringcentral/juno/icon/Deletenumber"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var throttledTime = 1000;

var RecipientsInput = function RecipientsInput(_ref) {
  var placeholder = _ref.placeholder,
      value = _ref.value,
      currentLocale = _ref.currentLocale,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      onDelete = _ref.onDelete,
      onClear = _ref.onClear,
      className = _ref.className;
  var inputRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      mouseDownTime = _useState2[0],
      setMouseDownTime = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      timer = _useState4[0],
      setTimer = _useState4[1];

  var haveDeleteButton = !!value;
  (0, _react.useEffect)(function () {
    inputRef.current.focus();
    onFocus(null); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  var mouseDown = (0, _react.useMemo)(function () {
    return function () {
      setMouseDownTime(+new Date());
      setTimer(setTimeout(function () {
        onClear();
        setTimer(null);
      }, throttledTime));
    };
  }, [onClear]);
  var mouseUp = (0, _react.useMemo)(function () {
    return function () {
      var curTime = +new Date();

      if (mouseDownTime && curTime - mouseDownTime >= throttledTime) {
        return;
      }

      clearTimeout(timer);
      onDelete();
    };
  }, [mouseDownTime, onDelete, timer]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(className, _styles["default"].inputRoot)
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTextField, {
    placeholder: placeholder || _i18n["default"].getString('dialPlaceholder', currentLocale),
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
    onFocus: onFocus,
    onBlur: onBlur,
    InputProps: {
      disableUnderline: true,
      classes: {
        root: _styles["default"].root,
        input: _styles["default"].input
      },
      endAdornment: haveDeleteButton && /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
        variant: "plain",
        size: "large",
        color: "grey.400",
        symbol: _Deletenumber["default"],
        "data-sign": "deleteButton",
        onMouseUp: mouseUp,
        onMouseDown: mouseDown
      })
    },
    autoComplete: "off"
  }));
};

exports.RecipientsInput = RecipientsInput;
//# sourceMappingURL=RecipientsInput.js.map
