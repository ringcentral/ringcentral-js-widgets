"use strict";

require("core-js/modules/es.array.iterator");
require("core-js/modules/es.object.define-property");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.weak-map");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiMenu = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
var _styles = _interopRequireDefault(require("../styles.scss"));
var _useEmojiI18n = require("./useEmojiI18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _templateObject() {
  var data = _taggedTemplateLiteral([""]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; } /* eslint-disable jsx-a11y/no-static-element-interactions */
// Compatible with running in shared worker
// @ts-ignore
var Picker = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@emoji-mart/react'));
  });
});
var _EmojiMenu = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _props$closeWhenFocus = props.closeWhenFocusOnInput,
    closeWhenFocusOnInput = _props$closeWhenFocus === void 0 ? true : _props$closeWhenFocus,
    _props$autoClose = props.autoClose,
    autoClose = _props$autoClose === void 0 ? true : _props$autoClose,
    action = props.action,
    currentLocale = props.currentLocale,
    onSelect = props.onSelect,
    onOpen = props.onOpen,
    onClose = props.onClose,
    getInputElement = props.getInputElement,
    rest = _objectWithoutProperties(props, ["closeWhenFocusOnInput", "autoClose", "action", "currentLocale", "onSelect", "onOpen", "onClose", "getInputElement"]);
  var theme = (0, _juno.useTheme)();
  var popperRef = (0, _react.useRef)(null);
  var positionRef = (0, _react.useRef)(null);
  var innerRef = (0, _react.useRef)(null);
  var _React$useState = _react["default"].useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    anchorEl = _React$useState2[0],
    setAnchorEl = _React$useState2[1];
  var emojiI18n = (0, _useEmojiI18n.useEmojiI18n)(currentLocale);
  var isOpen = Boolean(anchorEl);
  var id = isOpen ? 'emoji-menu' : undefined;
  var anchorElRef = (0, _juno.useForkRef)(ref, innerRef);
  var close = function close() {
    if (isOpen) {
      onClose === null || onClose === void 0 ? void 0 : onClose();
      setAnchorEl(null);
    }
  };
  var open = function open() {
    if (!isOpen) {
      onOpen === null || onOpen === void 0 ? void 0 : onOpen();
      setAnchorEl(innerRef.current);
    }
  };
  var toggle = function toggle() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };
  var handleClickAway = function handleClickAway() {
    var input = getInputElement === null || getInputElement === void 0 ? void 0 : getInputElement();
    // when text input be focus, not close that popper
    if (input && !closeWhenFocusOnInput && document.activeElement === (getInputElement === null || getInputElement === void 0 ? void 0 : getInputElement())) {
      return;
    }
    close();
  };
  var handleSelectEmoji = function handleSelectEmoji(data) {
    onSelect(data, positionRef.current);
    positionRef.current = null;
    if (autoClose) {
      close();
    }
  };
  var preventFocus = function preventFocus(e) {
    var _e$nativeEvent$compos;
    var hostElm = (_e$nativeEvent$compos = e.nativeEvent.composedPath()) === null || _e$nativeEvent$compos === void 0 ? void 0 : _e$nativeEvent$compos[0];

    // when focus on search input not prevent default, and remember current focus position
    if (hostElm && hostElm.tagName.toLocaleLowerCase() === 'input') {
      var textField = getInputElement === null || getInputElement === void 0 ? void 0 : getInputElement();
      if (textField) {
        positionRef.current = (0, _juno.getSelectionPosition)(textField);
      }
      return;
    }
    e.preventDefault();
  };

  // update popper position after view ready
  (0, _react.useLayoutEffect)(function () {
    if (!isOpen) return;
    requestAnimationFrame(function () {
      var _popperRef$current;
      (_popperRef$current = popperRef.current) === null || _popperRef$current === void 0 ? void 0 : _popperRef$current.update();
    });
  });
  (0, _juno.useEventListener)(getInputElement === null || getInputElement === void 0 ? void 0 : getInputElement(), 'focus', function () {
    positionRef.current = null;
  });
  (0, _react.useImperativeHandle)(action, function () {
    return {
      close: close,
      open: open,
      toggle: toggle
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, _extends({
    "aria-describedby": id,
    ref: anchorElRef,
    title: _i18n["default"].getString('emoji', currentLocale),
    symbol: _junoIcon.Emoji,
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    },
    onClick: toggle
  }, rest)), /*#__PURE__*/_react["default"].createElement(_juno.RcPopper, {
    placement: "top",
    popperRef: popperRef,
    className: _styles["default"].emojiPopper,
    id: id,
    open: isOpen,
    anchorEl: anchorEl,
    modifiers: {
      flip: {
        enabled: false
      },
      arrow: {
        element: null,
        enabled: false
      },
      preventOverflow: {
        boundariesElement: 'viewport',
        enabled: true,
        padding: 10
      },
      hide: {
        enabled: false
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_juno.ClickAwayListener, {
    onClickAway: handleClickAway
  }, /*#__PURE__*/_react["default"].createElement("div", {
    onMouseDown: preventFocus,
    onKeyDown: function onKeyDown(e) {
      if (e.key !== 'Escape') {
        return;
      }
      e.stopPropagation();
      onClose === null || onClose === void 0 ? void 0 : onClose();
      close();
    }
  }, /*#__PURE__*/_react["default"].createElement(_react.Suspense, {
    fallback: null
  }, /*#__PURE__*/_react["default"].createElement(Picker
  // https://github.com/missive/emoji-mart#custom-emojis
  , {
    perLine: 7,
    maxFrequentRows: 2,
    previewPosition: "none",
    i18n: emojiI18n,
    onEmojiSelect: handleSelectEmoji,
    theme: theme.palette.type
  }))))));
});
var EmojiMenu = (0, _juno.styled)(_EmojiMenu)(_templateObject());
exports.EmojiMenu = EmojiMenu;
//# sourceMappingURL=EmojiMenu.js.map
