"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationPanel = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _juno = require("@ringcentral/juno");
require("animate.css/animate.min.css");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _NotificationItem = require("./NotificationItem");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _excluded = ["entranceAnimation", "exitAnimation", "backdropEntranceAnimation", "backdropExitAnimation", "duration", "messages", "className"]; // TODO: should use juno animation to do that
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var NotificationPanel = exports.NotificationPanel = function NotificationPanel(_ref) {
  var _ref$entranceAnimatio = _ref.entranceAnimation,
    entranceAnimation = _ref$entranceAnimatio === void 0 ? 'fadeInDown' : _ref$entranceAnimatio,
    _ref$exitAnimation = _ref.exitAnimation,
    exitAnimation = _ref$exitAnimation === void 0 ? 'fadeOutUp' : _ref$exitAnimation,
    _ref$backdropEntrance = _ref.backdropEntranceAnimation,
    backdropEntranceAnimation = _ref$backdropEntrance === void 0 ? 'fadeIn' : _ref$backdropEntrance,
    _ref$backdropExitAnim = _ref.backdropExitAnimation,
    backdropExitAnimation = _ref$backdropExitAnim === void 0 ? 'fadeOut' : _ref$backdropExitAnim,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 500 : _ref$duration,
    messages = _ref.messages,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useState = (0, _react.useState)(messages),
    _useState2 = _slicedToArray(_useState, 2),
    currentMessages = _useState2[0],
    setCurrentMessages = _useState2[1];
  var _useSleep = (0, _juno.useSleep)(),
    sleep = _useSleep.sleep,
    cancel = _useSleep.cancel;
  (0, _react.useEffect)(function () {
    var updatedMessages = [];
    // if length is grater means that is delete item.
    if (currentMessages.length > messages.length) {
      currentMessages.forEach(function (currentMessage) {
        var updatedMessage = _objectSpread({}, currentMessage);
        // if that can't find this id, that means that is delete
        if (!messages.some(function (m) {
          return m.id === currentMessage.id;
        })) {
          updatedMessage.animation = exitAnimation;
          updatedMessage.backdropAnimation = backdropExitAnimation;
        } else {
          updatedMessage.animation = '';
          updatedMessage.backdropAnimation = '';
        }
        updatedMessages.push(updatedMessage);
      });
      setCurrentMessages(updatedMessages);
      if (duration > 0) {
        sleep(duration).then(function () {
          setCurrentMessages(messages);
        })["catch"](function () {
          // ignore cancel
        });
      }
    } else {
      cancel();
      setCurrentMessages(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, currentMessages.map(function (data, i) {
    var _data$backdropAnimati, _data$animation;
    return /*#__PURE__*/_react["default"].createElement(_NotificationItem.NotificationItem, _extends({}, rest, {
      data: data,
      duration: duration,
      backdropAnimation: (_data$backdropAnimati = data.backdropAnimation) !== null && _data$backdropAnimati !== void 0 ? _data$backdropAnimati : backdropEntranceAnimation,
      animation: (_data$animation = data.animation) !== null && _data$animation !== void 0 ? _data$animation : entranceAnimation,
      key: i
    }));
  }));
};
//# sourceMappingURL=NotificationPanel.js.map
