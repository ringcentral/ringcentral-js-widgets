"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.set");
require("core-js/modules/es.string.iterator");
require("core-js/modules/web.dom-collections.for-each");
require("core-js/modules/web.dom-collections.iterator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _utils = require("@ringcentral-integration/commons/utils");
require("animate.css/animate.min.css");
var _ramda = require("ramda");
var _react = _interopRequireWildcard(require("react"));
var _AlertDisplay = _interopRequireDefault(require("../AlertDisplay"));
var _AnimationAlertUtils = require("./AnimationAlertUtils");
var _AnimationMessage = require("./AnimationMessage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var ENTRANCE_ANIMATION = 'fadeInDown';
var EXIT_ANIMATION = 'fadeOutUp';
var AnimationAlert = /*#__PURE__*/function (_Component) {
  _inherits(AnimationAlert, _Component);
  var _super = _createSuper(AnimationAlert);
  function AnimationAlert() {
    var _this;
    _classCallCheck(this, AnimationAlert);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    // @ts-expect-error TS(2564): Property 'mounted' has no initializer and is not d... Remove this comment to see the full error message
    _this.mounted = void 0;
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    _this.state = {
      messages: _this.props.messages
    };
    return _this;
  }
  _createClass(AnimationAlert, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;
      var messages = this.props.messages;
      if (messages === nextProps.messages) return;
      _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2$props, duration, entranceAnimation, exitAnimation, currentMessagesIDs, nextMessagesIDs, addedMessagesIDs, removedMessagesIDs, allMessagesIDs, allMessages, nextMessages, isCurrentEmpty;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2$props = _this2.props, duration = _this2$props.duration, entranceAnimation = _this2$props.entranceAnimation, exitAnimation = _this2$props.exitAnimation;
                currentMessagesIDs = messages.map(function (message) {
                  return message.id;
                });
                nextMessagesIDs = nextProps.messages.map(function (message) {
                  return message.id;
                });
                addedMessagesIDs = nextMessagesIDs.filter(function (id) {
                  return !(0, _ramda.includes)(id, currentMessagesIDs);
                });
                removedMessagesIDs = currentMessagesIDs.filter(function (id) {
                  return !(0, _ramda.includes)(id, nextMessagesIDs);
                });
                allMessagesIDs = _toConsumableArray(new Set(currentMessagesIDs.concat(nextMessagesIDs)));
                allMessages = {};
                messages.concat(nextProps.messages).forEach(function (message) {
                  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                  allMessages[message.id] = message;
                });
                nextMessages = allMessagesIDs.map(function (id) {
                  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                  var message = allMessages[id];
                  var isAddedMessage = (0, _ramda.includes)(id, addedMessagesIDs);
                  var isRemovedMessage = (0, _ramda.includes)(id, removedMessagesIDs);
                  var animation;
                  if (isAddedMessage) {
                    animation = entranceAnimation;
                  } else if (isRemovedMessage) {
                    animation = exitAnimation;
                  }
                  return _objectSpread(_objectSpread(_objectSpread({}, message), animation ? {
                    animation: animation
                  } : {}), {}, {
                    duration: duration
                  });
                });
                if (nextMessages.length > 0) {
                  _this2.setState({
                    messages: nextMessages
                  });
                }
                if (!(typeof duration !== 'undefined')) {
                  _context.next = 13;
                  break;
                }
                _context.next = 13;
                return (0, _utils.sleep)(duration);
              case 13:
                if (_this2.mounted) {
                  _context.next = 15;
                  break;
                }
                return _context.abrupt("return");
              case 15:
                isCurrentEmpty = currentMessagesIDs.length === 0;
                _this2.setState({
                  messages: isCurrentEmpty ? nextMessages : nextProps.messages
                });
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.messages !== this.state.messages;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_AlertDisplay["default"], _extends({}, this.props, {
        component: _AnimationMessage.AnimationMessage,
        messages: this.state.messages
      }));
    }
  }]);
  return AnimationAlert;
}(_react.Component);
AnimationAlert.defaultProps = _objectSpread(_objectSpread({}, _AlertDisplay["default"].defaultProps), {}, {
  entranceAnimation: ENTRANCE_ANIMATION,
  exitAnimation: EXIT_ANIMATION,
  duration: _AnimationAlertUtils.ANIMATION_DURATION
});
var _default = AnimationAlert;
exports["default"] = _default;
//# sourceMappingURL=AnimationAlert.js.map
