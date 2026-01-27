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
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
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
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogger = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _callDirections = require("@ringcentral-integration/commons/enums/callDirections");
var _callLoggerTriggerTypes = require("@ringcentral-integration/commons/enums/callLoggerTriggerTypes");
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _services = require("@ringcentral-integration/micro-contacts/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _CallHistory = require("../CallHistory");
var _CallMonitor = require("../CallMonitor");
var _callLoggerHelper = require("./callLoggerHelper");
var _excluded = ["call"],
  _excluded2 = ["call", "contact"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var DEFAULT_OPACITY = 20;
var CallLogger = exports.CallLogger = (_dec = (0, _nextCore.injectable)({
  name: 'CallLogger'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('CallLoggerOptions')(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 4);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 5);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _CallHistory.CallHistory === "undefined" ? Object : _CallHistory.CallHistory, typeof _CallMonitor.CallMonitor === "undefined" ? Object : _CallMonitor.CallMonitor, typeof CallLoggerOptions === "undefined" ? Object : CallLoggerOptions, typeof _services.ActivityMatcher === "undefined" ? Object : _services.ActivityMatcher, typeof _services.ContactMatcher === "undefined" ? Object : _services.ContactMatcher]), _dec7 = Reflect.metadata("design:type", Array), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [Boolean]), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Boolean]), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [String, String]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof LogOptions === "undefined" ? Object : LogOptions]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [typeof Call === "undefined" ? Object : Call]), _dec18 = (0, _nextCore.delegate)('server'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [typeof LogCallOptions === "undefined" ? Object : LogCallOptions]), _dec21 = (0, _nextCore.delegate)('server'), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [typeof AutoLogCallOptions === "undefined" ? Object : AutoLogCallOptions]), _dec24 = (0, _nextCore.delegate)('server'), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", [typeof Call === "undefined" ? Object : Call, typeof CallLoggerTriggerType === "undefined" ? Object : CallLoggerTriggerType]), _dec27 = (0, _nextCore.delegate)('server'), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [Object]), _dec30 = (0, _nextCore.delegate)('server'), _dec31 = Reflect.metadata("design:type", Function), _dec32 = Reflect.metadata("design:paramtypes", [typeof UpdatedCall === "undefined" ? Object : UpdatedCall, typeof T === "undefined" ? Object : T]), _dec33 = (0, _nextCore.delegate)('server'), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [typeof ActiveCall === "undefined" ? Object : ActiveCall]), _dec36 = (0, _nextCore.delegate)('server'), _dec37 = Reflect.metadata("design:type", Function), _dec38 = Reflect.metadata("design:paramtypes", [Boolean]), _dec39 = (0, _nextCore.delegate)('server'), _dec40 = Reflect.metadata("design:type", Function), _dec41 = Reflect.metadata("design:paramtypes", [Boolean]), _dec42 = (0, _nextCore.computed)(function (that) {
  return [that.transferredCallsList];
}), _dec43 = Reflect.metadata("design:type", Function), _dec44 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_LoggerBase) {
  function CallLogger(_storage, _callHistory, _callMonitor, _callLoggerOptions, _activityMatcher, _contactMatcher) {
    var _this;
    _classCallCheck(this, CallLogger);
    _this = _callSuper(this, CallLogger);
    _this._storage = _storage;
    _this._callHistory = _callHistory;
    _this._callMonitor = _callMonitor;
    _this._callLoggerOptions = _callLoggerOptions;
    _this._activityMatcher = _activityMatcher;
    _this._contactMatcher = _contactMatcher;
    _this._customMatcherHooks = [];
    _this._identityFunction = _callLoggerHelper.callIdentityFunction;
    _this._logFunction = _this._callLoggerOptions.logFunction;
    _this._readyCheckFunction = _this._callLoggerOptions.readyCheckFunction;
    _initializerDefineProperty(_this, "_autoLog", _descriptor, _this);
    _initializerDefineProperty(_this, "logOnRinging", _descriptor2, _this);
    _initializerDefineProperty(_this, "transferredCallsList", _descriptor3, _this);
    _this._storage.enable(_this);
    if (typeof _this._callLoggerOptions.autoLog !== 'undefined') {
      _this._autoLog = _this._callLoggerOptions.autoLog;
    }
    return _this;
  }
  _inherits(CallLogger, _LoggerBase);
  return _createClass(CallLogger, [{
    key: "_setLogOnRinging",
    value: function _setLogOnRinging(logOnRinging) {
      this.logOnRinging = !!logOnRinging;
    }
  }, {
    key: "_setAutoLog",
    value: function _setAutoLog(autoLog) {
      this._autoLog = !!autoLog;
    }
  }, {
    key: "autoLog",
    get: function get() {
      return this._autoLog;
    }
  }, {
    key: "_addTransferredCall",
    value: function _addTransferredCall(sessionId, transferredMiddleNumber) {
      this.transferredCallsList = [].concat(_toConsumableArray(this.transferredCallsList.slice(this.transferredCallsList.length >= DEFAULT_OPACITY ? 1 : 0, DEFAULT_OPACITY)), [_defineProperty({}, sessionId, {
        transferredMiddleNumber: transferredMiddleNumber
      })]);
    }
  }, {
    key: "log",
    value: function () {
      var _log = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref2) {
        var call, options;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              call = _ref2.call, options = _objectWithoutProperties(_ref2, _excluded);
              return _context.a(2, _superPropGet(CallLogger, "log", this, 3)([_objectSpread({
                item: call
              }, options)]));
          }
        }, _callee, this);
      }));
      function log(_x) {
        return _log.apply(this, arguments);
      }
      return log;
    }()
  }, {
    key: "_shouldLogNewCall",
    value: function () {
      var _shouldLogNewCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(call) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, this.autoLog && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)));
          }
        }, _callee2, this);
      }));
      function _shouldLogNewCall(_x2) {
        return _shouldLogNewCall2.apply(this, arguments);
      }
      return _shouldLogNewCall;
    }()
  }, {
    key: "logCall",
    value: function () {
      var _logCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref3) {
        var call, contact, options, inbound, fromEntity, toEntity;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              call = _ref3.call, contact = _ref3.contact, options = _objectWithoutProperties(_ref3, _excluded2);
              inbound = (0, _callLogHelpers.isInbound)(call);
              fromEntity = inbound && contact || null;
              toEntity = !inbound && contact || null;
              _context3.n = 1;
              return this.log(_objectSpread(_objectSpread({}, options), {}, {
                call: _objectSpread(_objectSpread({}, call), {}, {
                  duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                  result: call.result || call.telephonyStatus
                }),
                fromEntity: fromEntity,
                toEntity: toEntity
              }));
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function logCall(_x3) {
        return _logCall.apply(this, arguments);
      }
      return logCall;
    }()
  }, {
    key: "_autoLogCall",
    value: function () {
      var _autoLogCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref4) {
        var call, fromEntity, toEntity, triggerType;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              call = _ref4.call, fromEntity = _ref4.fromEntity, toEntity = _ref4.toEntity, triggerType = _ref4.triggerType;
              if (this.ready) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              _context4.n = 2;
              return this.log({
                call: _objectSpread(_objectSpread({}, call), {}, {
                  duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration : Math.round((Date.now() - call.startTime) / 1000),
                  result: call.result || call.telephonyStatus
                }),
                fromEntity: fromEntity,
                toEntity: toEntity,
                triggerType: triggerType
              });
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _autoLogCall(_x4) {
        return _autoLogCall2.apply(this, arguments);
      }
      return _autoLogCall;
    }()
  }, {
    key: "_activityMatcherCheck",
    value: function _activityMatcherCheck(sessionId) {
      var _this$_activityMatche, _this$_activityMatche2;
      return !((_this$_activityMatche = this._activityMatcher) === null || _this$_activityMatche === void 0 ? void 0 : _this$_activityMatche.dataMapping[sessionId]) || !((_this$_activityMatche2 = this._activityMatcher) === null || _this$_activityMatche2 === void 0 ? void 0 : _this$_activityMatche2.dataMapping[sessionId].length);
    }
  }, {
    key: "_customMatcherCheck",
    value: function _customMatcherCheck(sessionId) {
      if (!this._customMatcherHooks.length) {
        return true;
      }
      return this._customMatcherHooks.some(function (hook) {
        return hook(sessionId);
      });
    }
  }, {
    key: "addCustomMatcherHook",
    value: function addCustomMatcherHook(hook) {
      this._customMatcherHooks.push(hook);
    }
  }, {
    key: "_onNewCall",
    value: function () {
      var _onNewCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(call, triggerType) {
        var _this$_activityMatche3, _this$_contactMatcher, _this$_contactMatcher2, _this$_contactMatcher3, toNumberEntity, fromMatches, toMatches, fromEntity, toEntity;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this._shouldLogNewCall(call);
            case 1:
              if (!_context5.v) {
                _context5.n = 6;
                break;
              }
              _context5.n = 2;
              return (_this$_activityMatche3 = this._activityMatcher) === null || _this$_activityMatche3 === void 0 ? void 0 : _this$_activityMatche3.triggerMatch();
            case 2:
              if (!(this._activityMatcherCheck(call.sessionId) && this._customMatcherCheck(call.sessionId))) {
                _context5.n = 5;
                break;
              }
              _context5.n = 3;
              return (_this$_contactMatcher = this._contactMatcher) === null || _this$_contactMatcher === void 0 ? void 0 : _this$_contactMatcher.triggerMatch();
            case 3:
              toNumberEntity = call.toNumberEntity || '';
              fromMatches = call.from && call.from.phoneNumber && ((_this$_contactMatcher2 = this._contactMatcher) === null || _this$_contactMatcher2 === void 0 ? void 0 : _this$_contactMatcher2.dataMapping[call.from.phoneNumber]) || [];
              toMatches = call.to && call.to.phoneNumber && ((_this$_contactMatcher3 = this._contactMatcher) === null || _this$_contactMatcher3 === void 0 ? void 0 : _this$_contactMatcher3.dataMapping[call.to.phoneNumber]) || [];
              fromEntity = fromMatches && fromMatches.length === 1 && fromMatches[0] || null;
              toEntity = null;
              if (toMatches && toMatches.length === 1) {
                /* eslint { "prefer-destructuring": 0 } */
                toEntity = toMatches[0];
              } else if (toMatches && toMatches.length > 1 && toNumberEntity !== '') {
                toEntity = toMatches.find(function (match) {
                  return toNumberEntity === match.id;
                });
              }
              _context5.n = 4;
              return this._autoLogCall({
                call: call,
                fromEntity: fromEntity,
                toEntity: toEntity,
                triggerType: triggerType
              });
            case 4:
              _context5.n = 6;
              break;
            case 5:
              _context5.n = 6;
              return this._autoLogCall({
                call: call,
                triggerType: triggerType
              });
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _onNewCall(_x5, _x6) {
        return _onNewCall2.apply(this, arguments);
      }
      return _onNewCall;
    }()
  }, {
    key: "_shouldLogUpdatedCall",
    value: function () {
      var _shouldLogUpdatedCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(call) {
        var _this$_activityMatche4, _this$_activityMatche5, activityMatches;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(this.logOnRinging || !(0, _callLogHelpers.isRinging)(call))) {
                _context6.n = 3;
                break;
              }
              if (!this.autoLog) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2, true);
            case 1:
              _context6.n = 2;
              return (_this$_activityMatche4 = this._activityMatcher) === null || _this$_activityMatche4 === void 0 ? void 0 : _this$_activityMatche4.triggerMatch();
            case 2:
              activityMatches = ((_this$_activityMatche5 = this._activityMatcher) === null || _this$_activityMatche5 === void 0 ? void 0 : _this$_activityMatche5.dataMapping[call.sessionId]) || [];
              return _context6.a(2, activityMatches.length > 0);
            case 3:
              return _context6.a(2, false);
          }
        }, _callee6, this);
      }));
      function _shouldLogUpdatedCall(_x7) {
        return _shouldLogUpdatedCall2.apply(this, arguments);
      }
      return _shouldLogUpdatedCall;
    }()
  }, {
    key: "_onCallUpdated",
    value: function () {
      var _onCallUpdated2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(call, triggerType) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this._shouldLogUpdatedCall(call);
            case 1:
              if (!_context7.v) {
                _context7.n = 2;
                break;
              }
              _context7.n = 2;
              return this._autoLogCall({
                call: call,
                triggerType: triggerType
              });
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function _onCallUpdated(_x8, _x9) {
        return _onCallUpdated2.apply(this, arguments);
      }
      return _onCallUpdated;
    }()
  }, {
    key: "_onCallAnswered",
    value: function () {
      var _onCallAnswered2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(_call) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              return _context8.a(2);
          }
        }, _callee8);
      }));
      function _onCallAnswered(_x0) {
        return _onCallAnswered2.apply(this, arguments);
      }
      return _onCallAnswered;
    }()
    /**
     * Check whether the given call matches AAL-configured call types.
     * Supported types: 'ALL' | 'OUTGOING_CALLS' | 'INCOMING_ANSWERED' | 'MISSED_WITHOUT_VOICEMAIL' | 'MISSED_WITH_VOICEMAIL'.
     */
  }, {
    key: "isCallTypeAllowedByAalConfig",
    value: function isCallTypeAllowedByAalConfig(call, allowedCallTypes) {
      if (!allowedCallTypes || allowedCallTypes.length === 0) return false;
      if (allowedCallTypes.includes('ALL')) return true;
      var isInboundCall = call.direction === _callDirections.callDirection.inbound;
      var isOutboundCall = call.direction === _callDirections.callDirection.outbound;
      var result = call.result;
      var isAnsweredCall = result === 'Accepted' || result === 'Connected';
      var isMissedCallWithoutVoiceMail = result === 'Missed';
      var isMissedCallWithVoiceMail = result === 'Voicemail';
      if (allowedCallTypes.includes('OUTGOING_CALLS') && isOutboundCall) {
        return true;
      }
      if (allowedCallTypes.includes('INCOMING_ANSWERED') && isAnsweredCall && isInboundCall) {
        return true;
      }
      if (allowedCallTypes.includes('MISSED_WITHOUT_VOICEMAIL') && isMissedCallWithoutVoiceMail) {
        return true;
      }
      if (allowedCallTypes.includes('MISSED_WITH_VOICEMAIL') && isMissedCallWithVoiceMail) {
        return true;
      }
      return false;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _nextCore.watch)(this, function () {
        return _this2._callMonitor.allCalls;
      }, function (newCalls, oldCalls) {
        if (_this2.ready) {
          var _oldCalls;
          oldCalls = ((_oldCalls = oldCalls) === null || _oldCalls === void 0 ? void 0 : _oldCalls.slice()) || [];
          (0, _callLogHelpers.removeDuplicateSelfCalls)(newCalls).forEach(function (call) {
            var oldCallIndex = oldCalls.findIndex(function (item) {
              return item.sessionId === call.sessionId;
            });
            if (oldCallIndex === -1) {
              _this2._onNewCall(call, _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
            } else {
              var oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);
              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall: !!_this2.transferredCallsMap[call.sessionId],
                  transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
                if (oldCall.telephonyStatus === 'Ringing' && call.telephonyStatus === 'CallConnected') {
                  _this2._onCallAnswered(call);
                }
              }
              if ((call.from && call.from.phoneNumber) !== (oldCall.from && oldCall.from.phoneNumber)) {
                var _oldCall$from;
                _this2._addTransferredCall(call.sessionId, (_oldCall$from = oldCall.from) === null || _oldCall$from === void 0 ? void 0 : _oldCall$from.phoneNumber);
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall: true,
                  transferredMiddleNumber: oldCall.from && oldCall.from.phoneNumber,
                  phoneNumberUpdated: true
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
              }
            }
          });
          oldCalls.forEach(function (call) {
            _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
              isTransferredCall: !!_this2.transferredCallsMap[call.sessionId],
              transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
            }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
          });
        }
      });
      (0, _nextCore.watch)(this, function () {
        return _this2._callHistory.endedCalls;
      }, function (newCall, oldCalls) {
        if (_this2.ready) {
          var _oldCalls2;
          oldCalls = ((_oldCalls2 = oldCalls) === null || _oldCalls2 === void 0 ? void 0 : _oldCalls2.slice()) || [];
          var currentSessions = {};
          newCall.forEach(function (call) {
            currentSessions[call.sessionId] = true;
          });
          oldCalls.forEach(function (call) {
            if (!currentSessions[call.sessionId]) {
              // call log updated
              var callInfo = _this2._callHistory.getHistoryCallBySessionId(call.sessionId);
              if (callInfo) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, callInfo), {}, {
                  isTransferredCall: !!_this2.transferredCallsMap[callInfo.sessionId],
                  transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.callLogSync);
              }
            }
          });
        }
      });
    }
  }, {
    key: "setAutoLog",
    value: function () {
      var _setAutoLog2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(autoLog) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (this.ready && autoLog !== this.autoLog) {
                this._setAutoLog(autoLog);
              }
            case 1:
              return _context9.a(2);
          }
        }, _callee9, this);
      }));
      function setAutoLog(_x1) {
        return _setAutoLog2.apply(this, arguments);
      }
      return setAutoLog;
    }()
  }, {
    key: "setLogOnRinging",
    value: function () {
      var _setLogOnRinging2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(logOnRinging) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (this.ready && logOnRinging !== this.logOnRinging) {
                this._setLogOnRinging(logOnRinging);
              }
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function setLogOnRinging(_x10) {
        return _setLogOnRinging2.apply(this, arguments);
      }
      return setLogOnRinging;
    }()
  }, {
    key: "transferredCallsMap",
    get: function get() {
      return (0, _ramda.reduce)(function (mapping, matcher) {
        return _objectSpread(_objectSpread({}, mapping), matcher);
      }, {}, this.transferredCallsList);
    }
  }]);
}(_services2.LoggerBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_autoLog", [_nextCore.storage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "logOnRinging", [_nextCore.storage, _nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "transferredCallsList", [_nextCore.storage, _nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLogOnRinging", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAutoLog", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addTransferredCall", [_nextCore.action, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "_addTransferredCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "log", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogNewCall", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logCall", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "logCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_autoLogCall", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "_autoLogCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNewCall", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogUpdatedCall", [_dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogUpdatedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallUpdated", [_dec30, _dec31, _dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallUpdated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallAnswered", [_dec33, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallAnswered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoLog", [_dec36, _dec37, _dec38], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogOnRinging", [_dec39, _dec40, _dec41], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferredCallsMap", [_dec42, _dec43, _dec44], Object.getOwnPropertyDescriptor(_class2.prototype, "transferredCallsMap"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallLogger.js.map
