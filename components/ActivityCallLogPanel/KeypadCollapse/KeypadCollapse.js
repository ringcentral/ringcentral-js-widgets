"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeypadCollapse = void 0;

require("core-js/modules/es6.array.is-array");

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

var _icon = require("@ringcentral/juno/icon");

var _KeyPadWrapper = require("./styles/KeyPadWrapper");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var KeypadCollapse = function KeypadCollapse(_ref) {
  var currentLocale = _ref.currentLocale,
      isKeypadOpen = _ref.isKeypadOpen,
      keypadValue = _ref.keypadValue,
      setKeypadValue = _ref.setKeypadValue,
      setKeypadIsOpen = _ref.setKeypadIsOpen;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      keypadOpenHover = _useState2[0],
      setkeypadOpenHover = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      forceToolTipHide = _useState4[0],
      setForceToolTipHide = _useState4[1];

  return /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.Wrapper, {
    open: isKeypadOpen
  }, /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.Backdrop, {
    open: isKeypadOpen,
    "data-sign": "keypadGreyBackground"
  }), /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.StyledCollapse, {
    "in": isKeypadOpen,
    collapsedHeight: "32px",
    open: isKeypadOpen,
    onEnter: function onEnter() {
      setForceToolTipHide(true);
    },
    onExited: function onExited() {
      setForceToolTipHide(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcPaper, {
    elevation: 0
  }, isKeypadOpen ? /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.KeyPadCloseButton, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    "data-sign": "keypadCloseButton",
    variant: "plain",
    size: "medium",
    symbol: _icon.Close,
    title: _i18n["default"].getString('close', currentLocale),
    onClick: function onClick() {
      setKeypadIsOpen(false);
      setkeypadOpenHover(false);
    }
  })) : /*#__PURE__*/_react["default"].createElement(_juno.RcTooltip, {
    placement: "top",
    title: _i18n["default"].getString('keypad', currentLocale),
    open: keypadOpenHover,
    tooltipForceHide: forceToolTipHide
  }, /*#__PURE__*/_react["default"].createElement(_KeyPadWrapper.Footer, {
    onClick: function onClick() {
      if (!isKeypadOpen) {
        setKeypadIsOpen(true);
      }
    },
    onMouseOver: function onMouseOver() {
      if (!isKeypadOpen) {
        setkeypadOpenHover(true);
      }
    },
    onMouseLeave: function onMouseLeave() {
      setkeypadOpenHover(false);
    },
    keypadOpenHover: keypadOpenHover,
    open: isKeypadOpen,
    "data-sign": "keypadOpenButton"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "plain",
    size: "small",
    symbol: _icon.Keypad
  }))), /*#__PURE__*/_react["default"].createElement(_juno.RcDialer, null, isKeypadOpen && /*#__PURE__*/_react["default"].createElement(_juno.RcDialTextField, {
    "data-sign": "keypadTextField",
    value: keypadValue,
    align: "center",
    textVariant: "subheading1",
    fullWidth: true,
    onlyAllowKeypadValue: true,
    onChange: setKeypadValue,
    autoFocus: isKeypadOpen,
    keypadMode: true,
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Backspace' || e.key === '-' || e.key === '\\') {
        e.preventDefault();
      }
    }
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcDialPad, {
    sounds: _juno.RcDialerPadSounds,
    "data-sign": "keypadCollapse"
  })))));
};

exports.KeypadCollapse = KeypadCollapse;
//# sourceMappingURL=KeypadCollapse.js.map
