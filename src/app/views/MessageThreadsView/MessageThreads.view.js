"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageThreadsView = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.trim.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _components = require("@ringcentral-integration/micro-contacts/src/app/components");
var _i18n = _interopRequireDefault(require("@ringcentral-integration/micro-contacts/src/app/views/ContactSearchView/ContactSearchPanel/i18n"));
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _services3 = require("@ringcentral-integration/micro-phone/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _rxjs = require("rxjs");
var _services4 = require("../../services");
var _ConversationAlert = require("../ConversationViewSpring/ConversationAlert");
var _i18n2 = _interopRequireDefault(require("../ConversationsViewSpring/ConversationsPage/i18n"));
var _MessageThreadPage = require("./MessageThreadPage");
var _i18n3 = _interopRequireDefault(require("./MessageThreadPage/i18n"));
var _i18n4 = _interopRequireWildcard(require("./i18n"));
var _utils = require("./utils");
var _excluded = ["children"],
  _excluded2 = ["hasPermission"],
  _excluded3 = ["textUnreadCounts", "threadUnreadCount"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t6 in e) "default" !== _t6 && {}.hasOwnProperty.call(e, _t6) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t6)) && (i.get || i.set) ? o(f, _t6, i) : f[_t6] = e[_t6]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var loadingList = [1, 2, 3];
var MessageThreadsView = exports.MessageThreadsView = (_dec = (0, _nextCore.injectable)({
  name: 'MessageThreadsView'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _ConversationAlert.ConversationAlert === "undefined" ? Object : _ConversationAlert.ConversationAlert, typeof _services3.CallQueues === "undefined" ? Object : _services3.CallQueues, typeof _views.SyncTabView === "undefined" ? Object : _views.SyncTabView, typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services4.MessageThread === "undefined" ? Object : _services4.MessageThread, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _services4.MessageStore === "undefined" ? Object : _services4.MessageStore, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager]), _dec4 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [String, typeof StateSnapshot === "undefined" ? Object : StateSnapshot]), _dec7 = (0, _nextCore.delegate)('server'), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String, typeof StateSnapshot === "undefined" ? Object : StateSnapshot]), _dec0 = Reflect.metadata("design:type", typeof SharedSearchForm === "undefined" ? Object : SharedSearchForm), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [Object]), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function MessageThreadsView(_conversationAlert, _callQueues, _syncTabView, _modalView, _messageThread, _router, _toast, _extensionInfo, _messageStore, _portManager) {
    var _this;
    _classCallCheck(this, MessageThreadsView);
    _this = _callSuper(this, MessageThreadsView);
    _this._conversationAlert = _conversationAlert;
    _this._callQueues = _callQueues;
    _this._syncTabView = _syncTabView;
    _this._modalView = _modalView;
    _this._messageThread = _messageThread;
    _this._router = _router;
    _this._toast = _toast;
    _this._extensionInfo = _extensionInfo;
    _this._messageStore = _messageStore;
    _this._portManager = _portManager;
    _initializerDefineProperty(_this, "assignThreadModal", _descriptor, _this);
    _initializerDefineProperty(_this, "lastPosition", _descriptor2, _this);
    _initializerDefineProperty(_this, "sharedSearchForm", _descriptor3, _this);
    _this.useThreadConversationItemInfo = function (conversation) {
      var conversationId = conversation.conversationId;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          var _this$_messageThread$, _this$_messageThread$2;
          return {
            threadInfo: conversationId ? (_this$_messageThread$ = _this._messageThread.getThread(conversationId)) === null || _this$_messageThread$ === void 0 ? void 0 : _this$_messageThread$.threadInfo : undefined,
            threadLoading: conversationId ? (_this$_messageThread$2 = _this._messageThread.getThreadMetadata(conversationId)) === null || _this$_messageThread$2 === void 0 ? void 0 : _this$_messageThread$2.loading : false,
            isThread: conversationId && _this._messageThread.hasPermission && Boolean(_this._messageThread.getThread(conversationId)),
            extensionId: _this._extensionInfo.id
          };
        }),
        threadInfo = _useConnector.threadInfo,
        threadLoading = _useConnector.threadLoading,
        isThread = _useConnector.isThread,
        extensionId = _useConnector.extensionId;
      var smsSentCapability = (0, _nextCore.useConnector)(function () {
        return _this._conversationAlert.getSmsSentCapability(conversation);
      });
      var actions = (0, _react.useMemo)(function () {
        var _threadInfo$assignee;
        var actions = [];
        if (!isThread || !smsSentCapability.hasCapability) return [];
        var currentExtensionId = extensionId === null || extensionId === void 0 ? void 0 : extensionId.toString();
        var isAssignedToMe = (threadInfo === null || threadInfo === void 0 ? void 0 : (_threadInfo$assignee = threadInfo.assignee) === null || _threadInfo$assignee === void 0 ? void 0 : _threadInfo$assignee.extensionId) === currentExtensionId;
        var isResolved = (threadInfo === null || threadInfo === void 0 ? void 0 : threadInfo.status) === 'Resolved';
        var isAssigned = !!(threadInfo === null || threadInfo === void 0 ? void 0 : threadInfo.assignee);

        // Logic 1: Initial unassigned state
        if (!isAssigned && !isResolved) {
          // Show text (reply), assign, and resolveThread buttons
          actions.push({
            type: 'assignToMe',
            disabled: threadLoading
          });
          actions.push({
            type: 'assignThread',
            disabled: threadLoading
          });
          actions.push({
            type: 'resolveThread',
            disabled: threadLoading
          });
        }
        // Logic 2: Resolved thread
        else if (isResolved) {
          // Show text (reply) button only
          actions.push({
            type: 'assignToMe',
            disabled: threadLoading
          });
        }
        // Logic 3: Assigned to me
        else if (isAssignedToMe && !isResolved) {
          // Show resolveThread, assignThread (reassign), unassignThread
          actions.push({
            type: 'resolveThread',
            disabled: threadLoading
          });
          actions.push({
            type: 'reassignThread',
            disabled: threadLoading
          });
          actions.push({
            type: 'unassignThread',
            disabled: threadLoading
          });
        }
        // Logic 4: Assigned to someone else
        else if (isAssigned && !isAssignedToMe && !isResolved) {
          // Show resolveThread, assignThread (reassign), unassignThread
          actions.push({
            type: 'resolveThread',
            disabled: threadLoading
          });
          actions.push({
            type: 'reassignThread',
            disabled: threadLoading
          });
          actions.push({
            type: 'unassignThread',
            disabled: threadLoading
          });
        }
        return actions;
      }, [extensionId, isThread, smsSentCapability.hasCapability, threadInfo === null || threadInfo === void 0 ? void 0 : threadInfo.assignee, threadInfo === null || threadInfo === void 0 ? void 0 : threadInfo.status, threadLoading]);
      return {
        threadInfo: threadInfo,
        actions: actions,
        extensionId: extensionId
      };
    };
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.bindThreadViewListener();
      });
    } else {
      _this.bindThreadViewListener();
    }
    return _this;
  }
  _inherits(MessageThreadsView, _RcViewModule);
  return _createClass(MessageThreadsView, [{
    key: "_setLastPosition",
    value: function _setLastPosition(page, val) {
      this.lastPosition[page] = val;
    }
  }, {
    key: "setLastPosition",
    value: function () {
      var _setLastPosition2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(page, val) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setLastPosition(page, val);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setLastPosition(_x, _x2) {
        return _setLastPosition2.apply(this, arguments);
      }
      return setLastPosition;
    }()
  }, {
    key: "smsRecipientCallQueues",
    get: function get() {
      return this._messageThread.smsRecipientCallQueues;
    }
  }, {
    key: "updateSharedSearchForm",
    value: function updateSharedSearchForm(updates) {
      if (updates === 'reset') {
        Object.assign(this.sharedSearchForm, {
          filter: 'All',
          statusFilter: ['Open', 'Resolved'],
          selectedAssignees: ['__CURRENT_USER__', '__ASSIGNED_TO_OTHERS__', '__UNASSIGNED__'],
          selectedCallQueues: this.allCallQueueIds
        });
        return;
      }
      Object.assign(this.sharedSearchForm, updates);
    }
  }, {
    key: "allCallQueueIds",
    get: function get() {
      return this.smsRecipientCallQueues.map(function (queue) {
        return queue.id;
      });
    }
  }, {
    key: "filteredThreadConversations",
    get: function get() {
      var _this$_extensionInfo$,
        _this2 = this;
      var threads = this._messageThread.threadConversationsInfo.conversations;
      var filter = this.sharedSearchForm.filter;
      var statusFilter = this.sharedSearchForm.statusFilter;
      var searchInput = this.sharedSearchForm.searchInput.toLowerCase().trim();
      var selectedAssignees = this.sharedSearchForm.selectedAssignees;
      var selectedCallQueues = this.sharedSearchForm.selectedCallQueues;
      var currentExtensionId = (_this$_extensionInfo$ = this._extensionInfo.id) === null || _this$_extensionInfo$ === void 0 ? void 0 : _this$_extensionInfo$.toString();
      var filtered = threads;

      // Filter by status (Open/Resolved)
      if (statusFilter.length < 2) {
        filtered = filtered.filter(function (conversation) {
          var _this2$_messageThread;
          var threadId = conversation.conversationId;
          var threadInfo = (_this2$_messageThread = _this2._messageThread.getThread(threadId)) === null || _this2$_messageThread === void 0 ? void 0 : _this2$_messageThread.threadInfo;
          var threadStatus = threadInfo === null || threadInfo === void 0 ? void 0 : threadInfo.status;
          if (statusFilter.includes('Open') && !statusFilter.includes('Resolved')) {
            return threadStatus !== 'Resolved';
          } else if (statusFilter.includes('Resolved') && !statusFilter.includes('Open')) {
            return threadStatus === 'Resolved';
          }
          return true;
        });
      }

      // only when less than all assignees are selected
      if (selectedAssignees.length < _utils.assignmentOptions.length) {
        filtered = filtered.filter(function (conversation) {
          var _this2$_messageThread2, _threadInfo$assignee2;
          var threadId = conversation.conversationId;
          var threadInfo = (_this2$_messageThread2 = _this2._messageThread.getThread(threadId)) === null || _this2$_messageThread2 === void 0 ? void 0 : _this2$_messageThread2.threadInfo;
          var assigneeExtensionId = threadInfo === null || threadInfo === void 0 ? void 0 : (_threadInfo$assignee2 = threadInfo.assignee) === null || _threadInfo$assignee2 === void 0 ? void 0 : _threadInfo$assignee2.extensionId;
          var includeAssignedToOthers = selectedAssignees.includes(_utils.assignmentOptionMap.assignedToOthers.value);
          var includeUnassigned = selectedAssignees.includes(_utils.assignmentOptionMap.unassigned.value);
          var includeCurrentUser = selectedAssignees.includes(_utils.assignmentOptionMap.currentUser.value);
          return includeUnassigned && !assigneeExtensionId || includeCurrentUser && assigneeExtensionId === currentExtensionId || includeAssignedToOthers &&
          // must be assigned to others, not current user
          assigneeExtensionId && assigneeExtensionId !== currentExtensionId;
        });
      }

      // Filter by unread
      if (filter === 'Unread') {
        filtered = filtered.filter(function (conversation) {
          var _this2$_messageThread3, _this2$_messageThread4;
          var threadId = conversation.conversationId;
          var unreadCount = (_this2$_messageThread3 = (_this2$_messageThread4 = _this2._messageThread.getThread(threadId)) === null || _this2$_messageThread4 === void 0 ? void 0 : _this2$_messageThread4.unreadCount) !== null && _this2$_messageThread3 !== void 0 ? _this2$_messageThread3 : 0;
          // Check if thread has unread messages
          return unreadCount > 0;
        });
      }

      // Filter by call queues
      if (selectedCallQueues.length < this.smsRecipientCallQueues.length) {
        filtered = filtered.filter(function (conversation) {
          var _this2$_messageThread5, _threadInfo$owner;
          var threadId = conversation.conversationId;
          var threadInfo = (_this2$_messageThread5 = _this2._messageThread.getThread(threadId)) === null || _this2$_messageThread5 === void 0 ? void 0 : _this2$_messageThread5.threadInfo;
          var ownerExtensionId = threadInfo === null || threadInfo === void 0 ? void 0 : (_threadInfo$owner = threadInfo.owner) === null || _threadInfo$owner === void 0 ? void 0 : _threadInfo$owner.extensionId;
          return ownerExtensionId && selectedCallQueues.includes(ownerExtensionId);
        });
      }

      // Filter by search
      if (searchInput) {
        filtered = filtered.filter(function (conversation) {
          var _conversation$corresp, _conversation$subject;
          var searchLower = searchInput.toLowerCase();
          // Search in correspondents
          var matchCorrespondent = (_conversation$corresp = conversation.correspondents) === null || _conversation$corresp === void 0 ? void 0 : _conversation$corresp.some(function (contact) {
            var _contact$name, _contact$phoneNumber, _contact$extensionNum;
            return ((_contact$name = contact.name) === null || _contact$name === void 0 ? void 0 : _contact$name.toLowerCase().includes(searchLower)) || ((_contact$phoneNumber = contact.phoneNumber) === null || _contact$phoneNumber === void 0 ? void 0 : _contact$phoneNumber.includes(searchInput)) || ((_contact$extensionNum = contact.extensionNumber) === null || _contact$extensionNum === void 0 ? void 0 : _contact$extensionNum.includes(searchInput));
          });
          if (matchCorrespondent) return true;

          // Search in subject/message text
          var matchSubject = (_conversation$subject = conversation.subject) === null || _conversation$subject === void 0 ? void 0 : _conversation$subject.toLowerCase().includes(searchLower);
          if (matchSubject) return true;

          // Search in all messages of the conversation
          var threadId = conversation.conversationId;
          var matchMessages = threadId ? _this2._messageThread.getThreadMessages(threadId).some(function (message) {
            var _message$subject;
            return (_message$subject = message.subject) === null || _message$subject === void 0 ? void 0 : _message$subject.toLowerCase().includes(searchLower);
          }) : false;
          if (matchMessages) return true;
          return false;
        });
      }
      return filtered;
    }
  }, {
    key: "AssignThreadModalContent",
    value: function AssignThreadModalContent() {
      var _this3 = this;
      var _useModalItemView = (0, _views.useModalItemView)(),
        props = _useModalItemView.props,
        action = _useModalItemView.action;
      var _ref = props.payload,
        threadId = _ref.threadId;
      var _useLocale = (0, _hooks.useLocale)(_i18n4["default"], _i18n2["default"]),
        t = _useLocale.t;
      var _useLocale2 = (0, _hooks.useLocale)(_i18n["default"]),
        contactsT = _useLocale2.t;
      var _useLocale3 = (0, _hooks.useLocale)(_i18n3["default"]),
        messageThreadsT = _useLocale3.t;
      var _useState = (0, _react.useState)(''),
        _useState2 = _slicedToArray(_useState, 2),
        searchText = _useState2[0],
        setSearchText = _useState2[1];

      // Get recipients and loading state from service
      var _useConnector2 = (0, _nextCore.useConnector)(function () {
          var _threadInfo$owner2, _threadInfo$assignee3;
          var threads = _this3._messageThread.data.threads;
          var thread = threads[threadId];
          var threadInfo = thread === null || thread === void 0 ? void 0 : thread.threadInfo;
          var ownerExtensionId = threadInfo === null || threadInfo === void 0 ? void 0 : (_threadInfo$owner2 = threadInfo.owner) === null || _threadInfo$owner2 === void 0 ? void 0 : _threadInfo$owner2.extensionId;
          var assigneeExtensionId = threadInfo === null || threadInfo === void 0 ? void 0 : (_threadInfo$assignee3 = threadInfo.assignee) === null || _threadInfo$assignee3 === void 0 ? void 0 : _threadInfo$assignee3.extensionId;
          var recipients = !ownerExtensionId ? [] : _this3._callQueues.getSmsRecipients(ownerExtensionId);
          return {
            threadInfo: threadInfo,
            recipients: recipients,
            assigneeExtensionId: assigneeExtensionId,
            ownerExtensionId: ownerExtensionId
          };
        }),
        _recipients = _useConnector2.recipients,
        assigneeExtensionId = _useConnector2.assigneeExtensionId,
        ownerExtensionId = _useConnector2.ownerExtensionId;
      var recipients = (0, _react.useMemo)(function () {
        return assigneeExtensionId ? _recipients.filter(function (recipient) {
          return recipient.id !== assigneeExtensionId;
        }) : _recipients;
      }, [_recipients, assigneeExtensionId]);
      var loading = (0, _nextCore.useConnector)(function () {
        if (!ownerExtensionId) return false;
        return _this3._callQueues.getSmsRecipientsLoading(ownerExtensionId);
      });
      var assignLoading = (0, _nextCore.useConnector)(function () {
        var _this3$_messageThread;
        return (_this3$_messageThread = _this3._messageThread.getThreadMetadata(threadId)) === null || _this3$_messageThread === void 0 ? void 0 : _this3$_messageThread.loading;
      });
      var hasData = recipients.length > 0;

      // Load recipients when modal opens or extensionId changes
      (0, _react.useEffect)(function () {
        if (!ownerExtensionId) return;
        // Load if should load (first time) or refetch if cache expired
        _this3._callQueues.loadSmsRecipients(ownerExtensionId, false);
      }, [ownerExtensionId]);
      var filteredRecipients = (0, _react.useMemo)(function () {
        if (!searchText.trim()) return recipients;
        var lowerSearch = searchText.toLowerCase();
        return recipients.filter(function (recipient) {
          return recipient.name.toLowerCase().includes(lowerSearch) || recipient.extensionNumber.includes(searchText);
        });
      }, [recipients, searchText]);
      var handleAssign = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(extensionId) {
          var isAssignedToCurrentUser, recipient, recipientName, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _context2.p = 0;
                _context2.n = 1;
                return _this3._messageThread.assignThread(threadId, extensionId);
              case 1:
                // Show appropriate success message based on who the thread was assigned to
                isAssignedToCurrentUser = extensionId === String(_this3._extensionInfo.id);
                if (isAssignedToCurrentUser) {
                  _this3._toast.success({
                    message: t('assignedToYouTooltip')
                  });
                } else {
                  // Find the recipient's name for the "assigned to other" message
                  recipient = recipients.find(function (r) {
                    return r.id === extensionId;
                  });
                  recipientName = (recipient === null || recipient === void 0 ? void 0 : recipient.name) || 'Unknown';
                  _this3._toast.success({
                    message: t('assignedToOtherTooltip', {
                      name: recipientName
                    })
                  });
                }
                _context2.n = 3;
                break;
              case 2:
                _context2.p = 2;
                _t = _context2.v;
                _this3.logger.error('assignThread error', _t);
                _this3._toast.danger({
                  message: t('failedToAssignThread')
                });
              case 3:
                action === null || action === void 0 ? void 0 : action.close();
              case 4:
                return _context2.a(2);
            }
          }, _callee2, null, [[0, 2]]);
        }));
        return function handleAssign(_x3) {
          return _ref2.apply(this, arguments);
        };
      }();
      var title = t('assignConversationTo');
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex flex-col h-full relative -my-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "px-6 py-3 border-b border-neutral-b4/50"
      }, /*#__PURE__*/_react["default"].createElement("h3", {
        className: "typography-subtitle text-center truncate",
        title: title
      }, title)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "px-4 pt-3 pb-2"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.TextField, {
        fullWidth: true,
        size: "medium",
        placeholder: messageThreadsT('search'),
        value: searchText,
        onChange: function onChange(e) {
          return setSearchText(e.target.value);
        },
        disabled: assignLoading,
        startAdornment: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
          symbol: _springIcon.SearchMd,
          size: "small"
        })
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "px-4 py-2 border-neutral-b4/50 border-b"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex flex-row items-center gap-2 typography-descriptor text-neutral-b2"
      }, t('companyContacts'), loading && hasData && /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
        size: "small"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex-1 overflow-auto relative"
      }, loading && !hasData ?
      /*#__PURE__*/
      // First time loading - show skeleton
      _react["default"].createElement("div", {
        className: "flex flex-col gap-4 py-2"
      }, loadingList.map(function (i) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i,
          className: "flex flex-row gap-4 typography-label"
        }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
          variant: "circular",
          className: "w-9 h-9"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "flex flex-col items-center justify-center grow [&>*]:grow-0"
        }, /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
          variant: "text",
          className: "w-3/5"
        }), /*#__PURE__*/_react["default"].createElement(_springUi.Skeleton, {
          variant: "text",
          className: "w-2/5"
        })));
      })) : !loading && filteredRecipients.length === 0 ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex justify-center py-8 px-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "typography-mainText text-neutral-b2"
      }, t('noSearchResults'))) : /*#__PURE__*/_react["default"].createElement(_springUi.List, null, filteredRecipients.map(function (recipient) {
        return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
          key: recipient.id,
          size: "large",
          divider: false,
          onClick: function onClick() {
            return !assignLoading && handleAssign(recipient.id);
          },
          className: assignLoading ? 'opacity-50 cursor-not-allowed' : '',
          "data-sign": "assignRecipient-".concat(recipient.id)
        }, /*#__PURE__*/_react["default"].createElement(_components.ContactAvatar, {
          size: "large"
          // TODO: add contact to the contact avatar
          // contact={{
          //   id: recipient.id,
          //   name: recipient.name,
          //   type: 'company',
          // }}
          ,
          phoneNumber: recipient.extensionNumber,
          contactName: recipient.name
        }), /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
          primary: recipient.name,
          secondary: "".concat(contactsT('extension'), " ").concat(recipient.extensionNumber)
        }));
      }))), assignLoading && /*#__PURE__*/_react["default"].createElement("div", {
        className: "absolute inset-0 bg-neutral-base/75 flex items-center justify-center z-10 rounded-lg"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
        size: "large"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "absolute top-0 right-2"
      }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
        variant: "icon",
        size: "small",
        color: "secondary",
        symbol: _springIcon.Xmd,
        onClick: function onClick() {
          return action === null || action === void 0 ? void 0 : action.close();
        },
        "data-sign": "assignConversationClose"
      })));
    }
  }, {
    key: "bindThreadViewListener",
    value: function bindThreadViewListener() {
      var _this4 = this;
      var markThreadAsViewed$ = (0, _nextCore.fromWatchValue)(this, function () {
        return _this4._router.currentPath;
      }).pipe((0, _rxjs.map)(function (currentPath) {
        var match = currentPath.match(/^\/conversations\/(.+)$/);
        if (match) {
          var conversationId = match[1];
          if (_this4._messageThread.isThreadId(conversationId)) {
            return conversationId;
          }
        }
        return null;
      }), (0, _rxjs.distinctUntilChanged)(), (0, _rxjs.filter)(function (threadId) {
        return threadId !== null;
      }), (0, _rxjs.switchMap)(function (threadId) {
        var group = _this4._messageThread.getThreadGroup(threadId);
        // when the user already in the thread page, any unread count change should mark the thread as viewed
        return (0, _nextCore.fromWatchValue)(_this4, function () {
          var _group$unreadCount;
          return (_group$unreadCount = group === null || group === void 0 ? void 0 : group.unreadCount) !== null && _group$unreadCount !== void 0 ? _group$unreadCount : 0;
        }).pipe((0, _rxjs.filter)(function (unreadCount) {
          return unreadCount > 0;
        }), (0, _rxjs.tap)(function () {
          _this4._messageThread.markThreadAsViewed(threadId);
        }));
      }));

      // when able to selected queue change, should remove the not exist queue from the selected call queues
      var verifySelectedCallQueues$ = (0, _nextCore.fromWatchValue)(this, function () {
        return _this4.smsRecipientCallQueues;
      }).pipe((0, _rxjs.tap)(function (selectedCallQueues) {
        var validQueues = _this4.sharedSearchForm.selectedCallQueues.filter(function (queue) {
          return selectedCallQueues.some(function (q) {
            return q.id === queue;
          });
        });
        var validQueuesLength = validQueues.length;
        // if that filter is same as the all call queue ids, should reset the selected call queues
        if (validQueuesLength === 0 || validQueuesLength === selectedCallQueues.length) {
          _this4.updateSharedSearchForm({
            selectedCallQueues: _this4.allCallQueueIds
          });
        } else {
          _this4.updateSharedSearchForm({
            selectedCallQueues: validQueues
          });
        }
      }));
      this._messageThread.hasPermission$.pipe((0, _rxjs.switchMap)(function (permission) {
        return permission ? (0, _rxjs.merge)(markThreadAsViewed$, verifySelectedCallQueues$) : _rxjs.EMPTY;
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "openAssignThreadModal",
    value: function openAssignThreadModal(threadId) {
      this._modalView.open(this.assignThreadModal, {
        threadId: threadId
      });
    }
  }, {
    key: "handleResolveThread",
    value: function () {
      var _handleResolveThread = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(conversationId) {
        var _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this._messageThread.resolveThread(conversationId);
            case 1:
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t2 = _context3.v;
              this.logger.error('resolveThread error', _t2);
              this._toast.danger({
                message: (0, _i18n4.t)('failedToResolveThread')
              });
              throw _t2;
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function handleResolveThread(_x4) {
        return _handleResolveThread.apply(this, arguments);
      }
      return handleResolveThread;
    }()
  }, {
    key: "handleAssignToMe",
    value: function () {
      var _handleAssignToMe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(conversationId) {
        var _this5 = this;
        var threads, thread, threadInfo, isResolved, postAssignToMe, _this$_extensionInfo$2, extensionId, _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              threads = this._messageThread.data.threads;
              thread = threads[conversationId];
              threadInfo = thread === null || thread === void 0 ? void 0 : thread.threadInfo;
              isResolved = (threadInfo === null || threadInfo === void 0 ? void 0 : threadInfo.status) === 'Resolved';
              postAssignToMe = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
                  return _regenerator().w(function (_context4) {
                    while (1) switch (_context4.n) {
                      case 0:
                        if (_this5._router.currentPath.includes('/conversations')) {
                          _context4.n = 1;
                          break;
                        }
                        _context4.n = 1;
                        return _this5._router.push("/conversations/".concat(conversationId));
                      case 1:
                        return _context4.a(2);
                    }
                  }, _callee4);
                }));
                return function postAssignToMe() {
                  return _ref3.apply(this, arguments);
                };
              }();
              if (!isResolved) {
                _context5.n = 3;
                break;
              }
              _context5.n = 1;
              return this._messageThread.reopenResolvedThread(conversationId);
            case 1:
              _context5.n = 2;
              return postAssignToMe();
            case 2:
              return _context5.a(2);
            case 3:
              _context5.p = 3;
              extensionId = (_this$_extensionInfo$2 = this._extensionInfo.id) === null || _this$_extensionInfo$2 === void 0 ? void 0 : _this$_extensionInfo$2.toString();
              if (extensionId) {
                _context5.n = 4;
                break;
              }
              _nextCore.logger.warn('assignToMe: extensionId not available');
              return _context5.a(2);
            case 4:
              _context5.n = 5;
              return this._messageThread.assignThread(conversationId, extensionId);
            case 5:
              _context5.n = 6;
              return postAssignToMe();
            case 6:
              this._toast.success({
                message: (0, _i18n4.t)('assignedToYouTooltip')
              });
              _context5.n = 8;
              break;
            case 7:
              _context5.p = 7;
              _t3 = _context5.v;
              this.logger.error('assignToMe error', _t3);
              this._toast.danger({
                message: (0, _i18n4.t)('failedToAssignThread')
              });
              throw _t3;
            case 8:
              return _context5.a(2);
          }
        }, _callee5, this, [[3, 7]]);
      }));
      function handleAssignToMe(_x5) {
        return _handleAssignToMe.apply(this, arguments);
      }
      return handleAssignToMe;
    }()
  }, {
    key: "handleAssignThread",
    value: function handleAssignThread(conversationId) {
      this.openAssignThreadModal(conversationId);
    }
  }, {
    key: "handleUnassignThread",
    value: function () {
      var _handleUnassignThread = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(conversationId) {
        var _t4;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this._messageThread.unassignThread(conversationId);
            case 1:
              this._toast.success({
                message: (0, _i18n4.t)('conversationUnassigned')
              });
              _context6.n = 3;
              break;
            case 2:
              _context6.p = 2;
              _t4 = _context6.v;
              this.logger.error('unassignThread error', _t4);
              this._toast.danger({
                message: (0, _i18n4.t)('failedToUnassignThread')
              });
              throw _t4;
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function handleUnassignThread(_x6) {
        return _handleUnassignThread.apply(this, arguments);
      }
      return handleUnassignThread;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var threadConversations = this._messageThread.hasPermission ? this.filteredThreadConversations : [];
      return {
        threadConversations: threadConversations,
        form: this.sharedSearchForm,
        lastPosition: this.lastPosition['shared'],
        loading: this._messageThread.historyLoading,
        callQueues: this.smsRecipientCallQueues,
        assignmentOptions: _utils.assignmentOptions
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this6 = this;
      return {
        setLastPosition: function setLastPosition(page, position) {
          _this6.setLastPosition(page, position);
        },
        onSharedSearchFormUpdate: function onSharedSearchFormUpdate(updates) {
          _this6.updateSharedSearchForm(updates);
        },
        onEndReached: function onEndReached() {
          _this6._messageThread.loadMoreMessages();
        }
      };
    }
  }, {
    key: "processThreadAction",
    value: function () {
      var _processThreadAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(conversationId, actionType) {
        var _t5;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (conversationId) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2, false);
            case 1:
              _t5 = actionType;
              _context7.n = _t5 === 'resolveThread' ? 2 : _t5 === 'assignToMe' ? 4 : _t5 === 'reassignThread' ? 6 : _t5 === 'assignThread' ? 6 : _t5 === 'unassignThread' ? 7 : 9;
              break;
            case 2:
              _context7.n = 3;
              return this.handleResolveThread(conversationId);
            case 3:
              return _context7.a(3, 10);
            case 4:
              _context7.n = 5;
              return this.handleAssignToMe(conversationId);
            case 5:
              return _context7.a(3, 10);
            case 6:
              this.handleAssignThread(conversationId);
              return _context7.a(3, 10);
            case 7:
              _context7.n = 8;
              return this.handleUnassignThread(conversationId);
            case 8:
              return _context7.a(3, 10);
            case 9:
              return _context7.a(2, false);
            case 10:
              return _context7.a(2, true);
          }
        }, _callee7, this);
      }));
      function processThreadAction(_x7, _x8) {
        return _processThreadAction.apply(this, arguments);
      }
      return processThreadAction;
    }()
  }, {
    key: "component",
    value: function component(_ref4) {
      var _this7 = this;
      var children = _ref4.children,
        rest = _objectWithoutProperties(_ref4, _excluded);
      var _useConnector3 = (0, _nextCore.useConnector)(function () {
          return _objectSpread({
            textUnreadCounts: _this7._messageStore.textUnreadCounts,
            threadUnreadCount: _this7._messageThread.threadUnreadCount,
            hasPermission: _this7._messageThread.hasPermission
          }, _this7.getUIProps());
        }),
        hasPermission = _useConnector3.hasPermission,
        threadProps = _objectWithoutProperties(_useConnector3, _excluded2);
      var _useResultRef = (0, _springUi.useResultRef)(function () {
          return _this7.getUIFunctions();
        }),
        uiFunctions = _useResultRef.current;
      var textUnreadCounts = threadProps.textUnreadCounts,
        threadUnreadCount = threadProps.threadUnreadCount,
        _props = _objectWithoutProperties(threadProps, _excluded3);
      var tabs = (0, _react.useMemo)(function () {
        if (!hasPermission) {
          return null;
        }
        return [{
          id: _views.ConversationsSyncTabId.PERSONAL,
          label: (0, _i18n4.t)('personal'),
          BadgeProps: {
            count: textUnreadCounts
          },
          component: children
        }, {
          id: _views.ConversationsSyncTabId.SHARED,
          label: (0, _i18n4.t)('shared'),
          BadgeProps: {
            count: threadUnreadCount
          },
          component: /*#__PURE__*/_react["default"].createElement(_MessageThreadPage.MessageThreadPage, _extends({}, _props, rest, uiFunctions))
        }];
      }, [_props, children, hasPermission, rest, threadUnreadCount, uiFunctions, textUnreadCounts]);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, tabs ? /*#__PURE__*/_react["default"].createElement(this._syncTabView.component, {
        id: _views.SyncTabId.CONVERSATIONS,
        tabs: tabs,
        defaultValue: _views.ConversationsSyncTabId.PERSONAL,
        "data-sign": "conversationsTabs",
        className: '[&_.sui-tab]:max-w-none [&_.sui-tab]:flex-none [&_.sui-tab]:w-1/2',
        variant: "standard"
      }) : children);
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "assignThreadModal", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;
    return this._modalView.create({
      view: function view() {
        return /*#__PURE__*/_react["default"].createElement(_this8.AssignThreadModalContent, null);
      },
      props: function props(_ref5) {
        var _this8$_messageThread, _this8$_messageThread2;
        var threadId = _ref5.threadId;
        return {
          header: null,
          disableBackdropClick: (_this8$_messageThread = (_this8$_messageThread2 = _this8._messageThread.getThreadMetadata(threadId)) === null || _this8$_messageThread2 === void 0 ? void 0 : _this8$_messageThread2.loading) !== null && _this8$_messageThread !== void 0 ? _this8$_messageThread : false,
          disableRestoreFocus: true,
          'aria-label': 'Assign conversation to'
        };
      }
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lastPosition", [_nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLastPosition", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLastPosition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLastPosition", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "setLastPosition"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sharedSearchForm", [_nextCore.state, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      searchInput: '',
      filter: 'All',
      statusFilter: ['Open', 'Resolved'],
      selectedAssignees: ['__CURRENT_USER__', '__ASSIGNED_TO_OTHERS__', '__UNASSIGNED__'],
      selectedCallQueues: []
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "updateSharedSearchForm", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSharedSearchForm"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allCallQueueIds", [_nextCore.computed, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "allCallQueueIds"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "filteredThreadConversations", [_nextCore.computed, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "filteredThreadConversations"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "AssignThreadModalContent", [_nextCore.autobind, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "AssignThreadModalContent"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=MessageThreads.view.js.map
