"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _moduleStatuses = _interopRequireDefault(require("@ringcentral-integration/commons/enums/moduleStatuses"));
var _RcModule2 = _interopRequireDefault(require("@ringcentral-integration/commons/lib/RcModule"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _ensureExist = _interopRequireDefault(require("@ringcentral-integration/commons/lib/ensureExist"));
var _getModuleStatusReducer = require("@ringcentral-integration/commons/lib/getModuleStatusReducer");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _baseMessageTypes = require("../AdapterCore/baseMessageTypes");
var _IframeMessageTransport = _interopRequireDefault(require("../IframeMessageTransport"));
var _baseActionTypes = require("./baseActionTypes");
var _getDefaultGlobalStorageReducer = _interopRequireDefault(require("./getDefaultGlobalStorageReducer"));
var _excluded = ["prefix", "storageKey", "messageTypes", "actionTypes", "globalStorage", "locale", "presence", "routerInteraction", "getGlobalStorageReducer", "messageTransport"];
var _dec, _class, _class2; // @ts-nocheck TODO: should fixed that ts issues
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var AdapterModuleCoreBase = exports["default"] = (_dec = (0, _di.Module)({
  deps: ['GlobalStorage', 'Locale', 'Presence', 'RouterInteraction', 'Storage']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function AdapterModuleCoreBase(_ref) {
    var _this;
    var prefix = _ref.prefix,
      _ref$storageKey = _ref.storageKey,
      storageKey = _ref$storageKey === void 0 ? 'adapterCore' : _ref$storageKey,
      _ref$messageTypes = _ref.messageTypes,
      messageTypes = _ref$messageTypes === void 0 ? _baseMessageTypes.baseMessageTypes : _ref$messageTypes,
      _ref$actionTypes = _ref.actionTypes,
      actionTypes = _ref$actionTypes === void 0 ? _baseActionTypes.baseActionTypes : _ref$actionTypes,
      globalStorage = _ref.globalStorage,
      locale = _ref.locale,
      presence = _ref.presence,
      routerInteraction = _ref.routerInteraction,
      _ref$getGlobalStorage = _ref.getGlobalStorageReducer,
      getGlobalStorageReducer = _ref$getGlobalStorage === void 0 ? _getDefaultGlobalStorageReducer["default"] : _ref$getGlobalStorage,
      _ref$messageTransport = _ref.messageTransport,
      messageTransport = _ref$messageTransport === void 0 ? new _IframeMessageTransport["default"]({
        targetWindow: window.parent
      }) : _ref$messageTransport,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, AdapterModuleCoreBase);
    _this = _callSuper(this, AdapterModuleCoreBase, [_objectSpread({
      prefix: prefix,
      actionTypes: actionTypes
    }, options)]);
    _this._messageTypes = _ObjectMap.ObjectMap.prefixValues(messageTypes, prefix);
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._locale = _ensureExist["default"].call(_this, locale, 'locale');
    _this._messageTransport = _ensureExist["default"].call(_this, messageTransport,
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    'messageTransport');
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    _this._presence = _ensureExist["default"].call(_this, presence, 'presence');
    _this._router = _ensureExist["default"].call(_this, routerInteraction,
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    'routerInteraction');
    _this._storageKey = storageKey;
    _this._globalStorage = _ensureExist["default"].call(_this, globalStorage,
    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    'globalStorage');
    _this._globalStorage.registerReducer({
      key: _this._storageKey,
      reducer: getGlobalStorageReducer(_this.actionTypes)
    });
    _this._reducer = (0, _getModuleStatusReducer.getModuleStatusReducer)(_this.actionTypes);
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(AdapterModuleCoreBase, _RcModule);
  return _createClass(AdapterModuleCoreBase, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this._messageTransport.addListener(function (msg) {
        return _this2._onMessage(msg);
      });
      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }

    // @ts-expect-error TS(4113): This member cannot have an 'override' modifier bec... Remove this comment to see the full error message
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._globalStorage.ready && this._locale.ready && this._router.ready;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });
        this._pushAdapterState();
        this._pushOtherStateChanges();
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      }
      this._pushPresence();
      this._pushLocale();
      this._pushOtherStateChanges();
    }
  }, {
    key: "_pushOtherStateChanges",
    value: function _pushOtherStateChanges() {
      console.log('implement to handle other state changes pushing.');
    }
  }, {
    key: "_pushPresence",
    value: function _pushPresence() {
      if (this.ready && (this._lastDndStatus !== this._presence.dndStatus || this._lastUserStatus !== this._presence.userStatus || this._lastTelephonyStatus !== this._presence.telephonyStatus)) {
        this._lastDndStatus = this._presence.dndStatus;
        this._lastUserStatus = this._presence.userStatus;
        this._lastTelephonyStatus = this._presence.telephonyStatus;
        this._postMessage({
          type: this._messageTypes.pushPresence,
          telephonyStatus: this._presence.telephonyStatus,
          userStatus: this._presence.userStatus,
          dndStatus: this._presence.dndStatus,
          presenceOption: this._presence.presenceOption
        });
      }
    }
  }, {
    key: "_pushLocale",
    value: function _pushLocale() {
      if (this.ready && this._locale.ready && this._lastLocale !== this._locale.currentLocale) {
        this._lastLocale = this._locale.currentLocale;
        this._postMessage({
          type: this._messageTypes.pushLocale,
          locale: this._locale.currentLocale,
          strings: this.localeStrings
        });
      }
    }
  }, {
    key: "_postMessage",
    value: function _postMessage(data) {
      this._messageTransport.postMessage(data);
    }
  }, {
    key: "_pushAdapterState",
    value: function _pushAdapterState() {
      if (this.ready && (this._lastDndStatus !== this._presence.dndStatus || this._lastUserStatus !== this._presence.userStatus || this._lastTelephonyStatus !== this._presence.telephonyStatus || this._lastClosed !== this.closed || this._lastMinimized !== this.minimized || this._lastPosition.translateX !== this.position.translateX || this._lastPosition.translateY !== this.position.translateY || this._lastPosition.minTranslateX !== this.position.minTranslateX || this._lastPosition.minTranslateY !== this.position.minTranslateY)) {
        this._lastDndStatus = this._presence.dndStatus;
        this._lastUserStatus = this._presence.userStatus;
        this._lastTelephonyStatus = this._presence.telephonyStatus;
        this._lastClosed = this.closed;
        this._lastMinimized = this.minimized;
        this._lastPosition = this.position;
        this._postMessage({
          type: this._messageTypes.pushAdapterState,
          size: this.size,
          minimized: this.minimized,
          closed: this.closed,
          position: this.position,
          telephonyStatus: this._presence.telephonyStatus,
          userStatus: this._presence.userStatus,
          dndStatus: this._presence.dndStatus
        });
      }
    }
  }, {
    key: "_onMessage",
    value: function _onMessage(msg) {
      if (msg) {
        switch (msg.type) {
          case this._messageTypes.syncClosed:
            this._syncClosed(msg.closed);
            break;
          case this._messageTypes.syncMinimized:
            this._syncMinimized(msg.minimized);
            break;
          case this._messageTypes.syncSize:
            this._syncSize(msg.size);
            break;
          case this._messageTypes.syncPosition:
            this._syncPosition(msg.position);
            break;
          case this._messageTypes.presenceItemClicked:
            this._onPresenceItemClicked(msg.presenceType);
            break;
          case this._messageTypes.navigateToCurrentCall:
            this._onNavigateToCurrentCall();
            break;
          case this._messageTypes.navigateToViewCalls:
            this._onNavigateToViewCalls();
            break;
          case this._messageTypes.popOut:
            this._onPopOut();
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: "_syncClosed",
    value: function () {
      var _syncClosed2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(closed) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.syncClosed,
                closed: closed
              });
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _syncClosed(_x) {
        return _syncClosed2.apply(this, arguments);
      }
      return _syncClosed;
    }()
  }, {
    key: "_syncMinimized",
    value: function () {
      var _syncMinimized2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(minimized) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.syncMinimized,
                minimized: minimized
              });
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _syncMinimized(_x2) {
        return _syncMinimized2.apply(this, arguments);
      }
      return _syncMinimized;
    }()
  }, {
    key: "_syncSize",
    value: function () {
      var _syncSize2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var size,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              size = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              this.store.dispatch({
                type: this.actionTypes.syncSize,
                size: size
              });
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _syncSize() {
        return _syncSize2.apply(this, arguments);
      }
      return _syncSize;
    }()
  }, {
    key: "_syncPosition",
    value: function () {
      var _syncPosition2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var position,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              position = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              this.store.dispatch({
                type: this.actionTypes.syncPosition,
                position: position
              });
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _syncPosition() {
        return _syncPosition2.apply(this, arguments);
      }
      return _syncPosition;
    }()
  }, {
    key: "_onPresenceItemClicked",
    value: function () {
      var _onPresenceItemClicked2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(presenceData) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._presence.setPresence(presenceData);
            case 1:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _onPresenceItemClicked(_x3) {
        return _onPresenceItemClicked2.apply(this, arguments);
      }
      return _onPresenceItemClicked;
    }()
  }, {
    key: "showAdapter",
    value: function () {
      var _showAdapter = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this.store.dispatch({
                type: this.actionTypes.showAdapter
              });
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function showAdapter() {
        return _showAdapter.apply(this, arguments);
      }
      return showAdapter;
    }()
  }, {
    key: "_onNavigateToCurrentCall",
    value: function () {
      var _onNavigateToCurrentCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              throw new Error('Should implement the _onNavigateToCurrentCall function.');
            case 1:
              return _context7.a(2);
          }
        }, _callee7);
      }));
      function _onNavigateToCurrentCall() {
        return _onNavigateToCurrentCall2.apply(this, arguments);
      }
      return _onNavigateToCurrentCall;
    }()
  }, {
    key: "_onNavigateToViewCalls",
    value: function () {
      var _onNavigateToViewCalls2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              throw new Error('Should implement the _onNavigateToViewCalls function.');
            case 1:
              return _context8.a(2);
          }
        }, _callee8);
      }));
      function _onNavigateToViewCalls() {
        return _onNavigateToViewCalls2.apply(this, arguments);
      }
      return _onNavigateToViewCalls;
    }() // @ts-expect-error TS(2345): Argument of type 'TypedPropertyDescriptor<() => vo... Remove this comment to see the full error message
  }, {
    key: "_onPopOut",
    value: function _onPopOut() {
      if (typeof this.showClientWindow === 'function') {
        this.showClientWindow();
      }
    }
  }, {
    key: "status",
    get: function get() {
      // * compatibility other sub-module
      return this.state.status || this.state;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "pending",
    get: function get() {
      return this.status === _moduleStatuses["default"].pending;
    }
  }, {
    key: "minimized",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).minimized;
    }
  }, {
    key: "closed",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).closed;
    }
  }, {
    key: "size",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).size;
    }
  }, {
    key: "position",
    get: function get() {
      return this._globalStorage.getItem(this._storageKey).position;
    }
  }]);
}(_RcModule2["default"]), _applyDecoratedDescriptor(_class2.prototype, "_syncClosed", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncClosed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncMinimized", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncMinimized"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncSize", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_syncPosition", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_syncPosition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onPresenceItemClicked", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onPresenceItemClicked"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showAdapter", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "showAdapter"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToCurrentCall", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToCurrentCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNavigateToViewCalls", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNavigateToViewCalls"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onPopOut", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_onPopOut"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=index.js.map
