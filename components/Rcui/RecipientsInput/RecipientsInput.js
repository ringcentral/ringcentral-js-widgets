"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientsInput = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireWildcard(require("react"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var throttledTime = 1000;

var RecipientsInput = function RecipientsInput(_ref) {
  var placeholder = _ref.placeholder,
      value = _ref.value,
      currentLocale = _ref.currentLocale,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onDelete = _ref.onDelete,
      onClear = _ref.onClear;
  var inputRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      remainSpace = _useState2[0],
      setRemainSpace = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      mouseDownTime = _useState4[0],
      setMouseDownTime = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      timer = _useState6[0],
      setTimer = _useState6[1];

  var deleteRef = (0, _react.useRef)();
  var hasDeletetn = !!value;
  (0, _react.useEffect)(function () {
    inputRef.current.focus();
    onFocus(null);
  }, [value]);
  (0, _react.useEffect)(function () {
    setRemainSpace(deleteRef.current.clientWidth);
  }, [hasDeletetn]);

  var mouseDown = function mouseDown() {
    setMouseDownTime(+new Date());
    setTimer(setTimeout(function () {
      onClear();
      setTimer(null);
    }, throttledTime));
  };

  var mouseUp = function mouseUp() {
    var curTime = +new Date();

    if (mouseDownTime && curTime - mouseDownTime >= throttledTime) {
      return;
    }

    clearTimeout(timer);
    onDelete();
  };

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("i", {
    style: {
      width: remainSpace
    }
  }), _react["default"].createElement("div", {
    className: _styles["default"].inputRoot
  }, _react["default"].createElement(_rcui.RcTextField, {
    placeholder: placeholder || _i18n["default"].getString('dialPlaceholder', currentLocale),
    value: value,
    inputProps: {
      maxLength: 30
    },
    fullWidth: true,
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
    "data-sign": "numberField",
    onFocus: onFocus // eslint-disable-next-line react/jsx-no-duplicate-props
    ,
    InputProps: {
      disableUnderline: true,
      classes: {
        root: _styles["default"].root,
        input: _styles["default"].input
      }
    },
    autoComplete: "off"
  })), _react["default"].createElement("div", {
    className: _styles["default"].deleteIcon,
    ref: deleteRef
  }, hasDeletetn && _react["default"].createElement(_rcui.RcIconButton, {
    variant: "plain",
    size: "small",
    icon: "deletenumber",
    "data-sign": "deleteButton",
    onMouseUp: mouseUp,
    onMouseDown: mouseDown
  })));
};

exports.RecipientsInput = RecipientsInput;
//# sourceMappingURL=RecipientsInput.js.map
