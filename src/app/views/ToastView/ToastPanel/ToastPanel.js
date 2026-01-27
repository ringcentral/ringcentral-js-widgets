"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastPanel = exports.DEFAULT_TOAST_GET_RENDERER = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.set.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _ClickAwayListener = require("@ringcentral/juno/es6/components/ClickAwayListener/ClickAwayListener.js");
var _newPalette = require("@ringcentral/juno/es6/foundation/styles/newPalette.js");
var _Fade = require("@ringcentral/juno/es6/components/Transitions/Fade/Fade.js");
var _Portal = require("@ringcentral/juno/es6/components/Portal/Portal.js");
var _Slide = require("@ringcentral/juno/es6/components/Transitions/Slide/Slide.js");
var _palette = require("@ringcentral/juno/es6/foundation/styles/palette.js");
var _spacing = require("@ringcentral/juno/es6/foundation/styles/spacing.js");
var _styledComponents = _interopRequireDefault(require("@ringcentral/juno/es6/foundation/styled-components.js"));
var _useChange = require("@ringcentral/juno/es6/foundation/hooks/useChange/useChange.js");
var _useEventCallback = require("@ringcentral/juno/es6/foundation/hooks/useEventCallback/useEventCallback.js");
var _useEventListener2 = require("@ringcentral/juno/es6/foundation/hooks/useEventListener/useEventListener.js");
var _useRefState3 = require("@ringcentral/juno/es6/foundation/hooks/useRefState/useRefState.js");
var _useResultRef = require("@ringcentral/juno/es6/foundation/hooks/useResultRef/useResultRef.js");
var _zIndex = require("@ringcentral/juno/es6/foundation/styles/zIndex.js");
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../../../hooks");
var _ToastItemPanel = require("../ToastItemView/ToastItemPanel/ToastItemPanel");
var _excluded = ["id", "payload", "timestamp", "message", "level", "ttl", "loading", "action", "backdrop", "brand", "in", "getRenderer", "dismiss", "onExited", "component"],
  _excluded2 = ["className", "messages", "size", "messageAlign", "fullWidth", "position", "backdrop", "disableBackdropClick", "disableEscapeKeyDown", "dismiss", "component"],
  _excluded3 = ["disableBackdropClick", "disableEscapeKeyDown"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var ToastPanelHost = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: ", ";\n  pointer-events: none;\n  padding-top: ", ";\n  display: flex;\n  justify-content: center;\n"])), (0, _zIndex.zIndex)('snackbar'), (0, _spacing.spacing)(3));
var backdropColor = (0, _palette.setOpacity)((0, _newPalette.palette2)('neutral', 'b01'), '40');
var ToastBackdrop = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: ", ";\n  z-index: -1;\n  pointer-events: auto;\n"])), backdropColor);
var ToastList = _styledComponents["default"].section(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  pointer-events: auto;\n  display: inline-flex;\n  flex-direction: column;\n  pointer-events: none;\n  width: ", ";\n  gap: ", ";\n  padding: ", ";\n"])), function (_ref) {
  var fullWidth = _ref.fullWidth;
  return fullWidth && '100%';
}, (0, _spacing.spacing)(2, 0), (0, _spacing.spacing)(0, 5));
var AnimationHost = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n"])));
var DefaultContent = function DefaultContent(_ref2) {
  var message = _ref2.message;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, message.message);
};
var DEFAULT_TOAST_GET_RENDERER = exports.DEFAULT_TOAST_GET_RENDERER = function DEFAULT_TOAST_GET_RENDERER() {
  return DefaultContent;
};
var MemoToastItem = /*#__PURE__*/(0, _react.memo)(function (props) {
  var id = props.id,
    payload = props.payload,
    timestamp = props.timestamp,
    message = props.message,
    level = props.level,
    ttl = props.ttl,
    loading = props.loading,
    action = props.action,
    backdrop = props.backdrop,
    brand = props.brand,
    inProp = props["in"],
    _props$getRenderer = props.getRenderer,
    getRenderer = _props$getRenderer === void 0 ? DEFAULT_TOAST_GET_RENDERER : _props$getRenderer,
    dismiss = props.dismiss,
    _onExited = props.onExited,
    _props$component = props.component,
    Component = _props$component === void 0 ? _ToastItemPanel.ToastItemPanel : _props$component,
    rest = _objectWithoutProperties(props, _excluded);
  var alertItem = {
    id: id,
    message: message,
    payload: payload,
    timestamp: timestamp,
    level: level,
    ttl: ttl,
    loading: loading,
    action: action,
    backdrop: backdrop
  };
  var Message = getRenderer(alertItem);
  var _useLocale = (0, _hooks.useLocale)(),
    currentLocale = _useLocale.currentLocale;
  return /*#__PURE__*/_react["default"].createElement(_Slide.RcSlide, {
    key: id,
    "in": inProp,
    onExited: function onExited() {
      return _onExited(id);
    }
  }, /*#__PURE__*/_react["default"].createElement(AnimationHost, null, /*#__PURE__*/_react["default"].createElement(Component, _extends({}, rest, alertItem, {
    dismiss: dismiss
  }), /*#__PURE__*/_react["default"].createElement(Message, {
    message: alertItem,
    currentLocale: currentLocale,
    brand: brand,
    payload: payload
  }))));
});
var ToastPanel = exports.ToastPanel = function ToastPanel(_ref3) {
  var className = _ref3.className,
    messages = _ref3.messages,
    _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? 'small' : _ref3$size,
    _ref3$messageAlign = _ref3.messageAlign,
    messageAlign = _ref3$messageAlign === void 0 ? 'left' : _ref3$messageAlign,
    _ref3$fullWidth = _ref3.fullWidth,
    fullWidth = _ref3$fullWidth === void 0 ? true : _ref3$fullWidth,
    _ref3$position = _ref3.position,
    position = _ref3$position === void 0 ? 'bottom' : _ref3$position,
    backdrop = _ref3.backdrop,
    _ref3$disableBackdrop = _ref3.disableBackdropClick,
    disableBackdropClick = _ref3$disableBackdrop === void 0 ? true : _ref3$disableBackdrop,
    _ref3$disableEscapeKe = _ref3.disableEscapeKeyDown,
    disableEscapeKeyDown = _ref3$disableEscapeKe === void 0 ? true : _ref3$disableEscapeKe,
    dismiss = _ref3.dismiss,
    component = _ref3.component,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  var _useRefState = (0, _useRefState3.useRefState)(messages),
    _useRefState2 = _slicedToArray(_useRefState, 2),
    currentMessagesRef = _useRefState2[0],
    setCurrentMessages = _useRefState2[1];
  var listening = (0, _react.useRef)(false);
  var deleteMapRef = (0, _useResultRef.useResultRef)(function () {
    return new Map();
  });
  (0, _useChange.useChange)(function (prev, next) {
    if (prev) {
      var prevLength = prev.length;
      var nextLength = next.length;
      var _deleteMap = deleteMapRef.current;
      if (prevLength !== nextLength) {
        var nextSet = new Set(next.map(function (msg) {
          return msg.id;
        }));
        if (nextLength < prevLength) {
          prev.forEach(function (x) {
            if (!nextSet.has(x.id)) {
              _deleteMap.set(x.id, true);
            }
          });
          return;
        }
      }
    }
    // find need remove messages
    setCurrentMessages(next, false);
  }, function () {
    return messages;
  });
  var currentMessages = currentMessagesRef.current;
  var deleteMap = deleteMapRef.current;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var handleClickAway = (0, _useEventCallback.useEventCallback)(function (e) {
    var _currentMessages$slic = currentMessages.slice(-1),
      _currentMessages$slic2 = _slicedToArray(_currentMessages$slic, 1),
      lastOne = _currentMessages$slic2[0];
    var _lastOne$disableBackd = lastOne.disableBackdropClick,
      itemDisabled = _lastOne$disableBackd === void 0 ? disableBackdropClick : _lastOne$disableBackd;
    if (!itemDisabled) {
      dismiss(lastOne.id, 'backdropClick');
    }
  });

  // TODO: work with mui modal manager, otherwise modal and Toast esc will got error behaviors when open at same time
  var _useEventListener = (0, _useEventListener2.useEventListener)(document, 'keydown', function (e) {
      if (e.key !== 'Escape') return;

      // using current message
      var _messages$slice = messages.slice(-1),
        _messages$slice2 = _slicedToArray(_messages$slice, 1),
        lastOne = _messages$slice2[0];
      var _lastOne$disableEscap = lastOne.disableEscapeKeyDown,
        itemDisabled = _lastOne$disableEscap === void 0 ? disableEscapeKeyDown : _lastOne$disableEscap;
      if (!itemDisabled) {
        dismiss(lastOne.id, 'escapeKeyDown');
        e.preventDefault();
        e.stopPropagation();
      }
    }, {
      startImmediately: false
    }),
    listen = _useEventListener.listen,
    remove = _useEventListener.remove;
  var handleExited = (0, _useEventCallback.useEventCallback)(function (id) {
    deleteMap["delete"](id);
    setCurrentMessages(messages);
  });
  var nonElement = currentMessages.length === 0;
  (0, _react.useEffect)(function () {
    if (nonElement) {
      if (listening.current) {
        remove();
        listening.current = false;
      }
      return;
    }
    listen();
    listening.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonElement]);
  if (nonElement) {
    return null;
  }
  var showBackdrop = backdrop || currentMessages.some(function (msg) {
    return !deleteMap.get(msg.id) && msg.backdrop;
  });
  return /*#__PURE__*/_react["default"].createElement(_Portal.RcPortal, null, /*#__PURE__*/_react["default"].createElement(ToastPanelHost, {
    "data-sign": "toast-container",
    className: className
  }, /*#__PURE__*/_react["default"].createElement(_Fade.RcFade, {
    "in": showBackdrop
  }, /*#__PURE__*/_react["default"].createElement(ToastBackdrop, null)), /*#__PURE__*/_react["default"].createElement(_ClickAwayListener.ClickAwayListener, {
    onClickAway: handleClickAway
  }, /*#__PURE__*/_react["default"].createElement(ToastList, {
    fullWidth: fullWidth
  }, currentMessages.map(function (_ref4) {
    var disableBackdropClick = _ref4.disableBackdropClick,
      disableEscapeKeyDown = _ref4.disableEscapeKeyDown,
      message = _objectWithoutProperties(_ref4, _excluded3);
    return /*#__PURE__*/_react["default"].createElement(MemoToastItem, _extends({
      key: message.id,
      fullWidth: fullWidth,
      size: size,
      component: component,
      messageAlign: messageAlign,
      onExited: handleExited,
      "in": !deleteMap.get(message.id),
      dismiss: dismiss
    }, message, rest));
  })))));
};
//# sourceMappingURL=ToastPanel.js.map
