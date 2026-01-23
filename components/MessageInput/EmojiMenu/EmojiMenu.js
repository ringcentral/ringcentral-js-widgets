"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmojiMenu = void 0;
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _styledComponents = require("@ringcentral/juno/es6/foundation/styled-components.js");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _i18n = _interopRequireDefault(require("../i18n"));
require("./styles.scss");
var _useEmojiI18n = require("./useEmojiI18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); } /* eslint-disable jsx-a11y/no-static-element-interactions */
// Compatible with running in shared worker
// @ts-ignore
var Picker = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@emoji-mart/react'));
  });
});
var EmojiMenu = exports.EmojiMenu = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _props$closeWhenFocus = props.closeWhenFocusOnInput,
    closeWhenFocusOnInput = _props$closeWhenFocus === void 0 ? true : _props$closeWhenFocus,
    _props$autoClose = props.autoClose,
    autoClose = _props$autoClose === void 0 ? true : _props$autoClose,
    action = props.action,
    onSelect = props.onSelect,
    onOpen = props.onOpen,
    onClose = props.onClose,
    getInputElement = props.getInputElement;
  var theme = (0, _styledComponents.RcUseTheme)();
  var popperRef = (0, _react.useRef)(null);
  var positionRef = (0, _react.useRef)(null);
  var innerRef = (0, _react.useRef)(null);
  var _React$useState = _react["default"].useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    anchorEl = _React$useState2[0],
    setAnchorEl = _React$useState2[1];
  var emojiI18n = (0, _useEmojiI18n.useEmojiI18n)();
  var isOpen = Boolean(anchorEl);
  var id = isOpen ? 'emoji-menu' : undefined;
  var anchorElRef = (0, _springUi.useForkRef)(ref, innerRef);
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
        positionRef.current = (0, _springUi.getSelectionPosition)(textField);
      }
      return;
    }
    e.preventDefault();
  };
  (0, _react.useEffect)(function () {
    // preload emoji picker
    // @ts-ignore
    Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@emoji-mart/react'));
    });
  }, []);

  // update popper position after view ready
  (0, _react.useLayoutEffect)(function () {
    if (!isOpen) return;
    requestAnimationFrame(function () {
      var _popperRef$current, _popperRef$current$up;
      (_popperRef$current = popperRef.current) === null || _popperRef$current === void 0 ? void 0 : (_popperRef$current$up = _popperRef$current.update) === null || _popperRef$current$up === void 0 ? void 0 : _popperRef$current$up.call(_popperRef$current);
    });
  });
  (0, _springUi.useEventListener)(getInputElement === null || getInputElement === void 0 ? void 0 : getInputElement(), 'focus', function () {
    positionRef.current = null;
  });
  (0, _react.useImperativeHandle)(action, function () {
    return {
      close: close,
      open: open,
      toggle: toggle
    };
  });
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    variant: "icon",
    size: "large",
    color: "secondary",
    "aria-describedby": id,
    className: "text-neutral-b2",
    ref: anchorElRef,
    TooltipProps: {
      title: t('emoji')
    },
    "data-sign": "emojiButton",
    symbol: _springIcon.EmojiMd,
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
    },
    onClick: toggle
  }), isOpen && /*#__PURE__*/_react["default"].createElement(_springUi.Popper, {
    placement: "top",
    ref: popperRef,
    className: "z-modal min-h-[300px] min-w-[280px] w-full",
    id: id,
    anchorEl: anchorEl,
    padding: {
      left: 10
    }
  }, /*#__PURE__*/_react["default"].createElement(_springUi.ClickAwayListener, {
    onClickAway: handleClickAway
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "border rounded-sui-sm shadow-md",
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
    onEmojiSelect: handleSelectEmoji
    // TODO: spring-ui not have light or dark in the theme info, need to fix inside spring-ui
    ,
    theme: theme.palette.type
  }))))));
});
//# sourceMappingURL=EmojiMenu.js.map
