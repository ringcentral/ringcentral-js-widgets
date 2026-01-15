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
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _callLoggerTriggerTypes = require("../../enums/callLoggerTriggerTypes");
var _LoggerBase2 = require("../../lib/LoggerBase");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _di = require("../../lib/di");
var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));
var _callLoggerHelper = require("./callLoggerHelper");
var _excluded = ["call"],
  _excluded2 = ["call", "contact"];
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var CallLogger = exports.CallLogger = (_dec = (0, _di.Module)({
  name: 'CallLogger',
  deps: ['Storage', 'CallHistory', 'CallMonitor', 'CallLoggerOptions', {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.transferredCallsList];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_LoggerBase) {
  function CallLogger(deps) {
    var _this;
    _classCallCheck(this, CallLogger);
    _this = _callSuper(this, CallLogger, [deps, {
      enableCache: true,
      storageKey: 'CallLogger'
    }]);
    _this._customMatcherHooks = [];
    _this._identityFunction = _callLoggerHelper.callIdentityFunction;
    _this._logFunction = _this._deps.callLoggerOptions.logFunction;
    _this._readyCheckFunction = _this._deps.callLoggerOptions.readyCheckFunction;
    _initializerDefineProperty(_this, "autoLog", _descriptor, _this);
    _initializerDefineProperty(_this, "logOnRinging", _descriptor2, _this);
    _initializerDefineProperty(_this, "transferredCallsList", _descriptor3, _this);
    if (typeof _this._deps.callLoggerOptions.autoLog !== 'undefined') {
      _this.autoLog = _this._deps.callLoggerOptions.autoLog;
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
      this.autoLog = !!autoLog;
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
    key: "_ensureActive",
    value: function () {
      var _ensureActive2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var isActive, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _t = !this._deps.tabManager;
              if (_t) {
                _context2.n = 2;
                break;
              }
              _context2.n = 1;
              return this._deps.tabManager.checkIsMain();
            case 1:
              _t = _context2.v;
            case 2:
              isActive = _t;
              return _context2.a(2, isActive);
          }
        }, _callee2, this);
      }));
      function _ensureActive() {
        return _ensureActive2.apply(this, arguments);
      }
      return _ensureActive;
    }()
  }, {
    key: "_shouldLogNewCall",
    value: function () {
      var _shouldLogNewCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(call) {
        var isActive;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this._ensureActive();
            case 1:
              isActive = _context3.v;
              return _context3.a(2, isActive && this.autoLog && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)));
          }
        }, _callee3, this);
      }));
      function _shouldLogNewCall(_x2) {
        return _shouldLogNewCall2.apply(this, arguments);
      }
      return _shouldLogNewCall;
    }()
  }, {
    key: "logCall",
    value: function () {
      var _logCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref3) {
        var call, contact, options, inbound, fromEntity, toEntity;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              call = _ref3.call, contact = _ref3.contact, options = _objectWithoutProperties(_ref3, _excluded2);
              inbound = (0, _callLogHelpers.isInbound)(call);
              fromEntity = inbound && contact || null;
              toEntity = !inbound && contact || null; // @ts-expect-error TS(2345): Argument of type 'Omit<LogCallOptions<T>, "call" |... Remove this comment to see the full error message
              _context4.n = 1;
              return this.log(_objectSpread(_objectSpread({}, options), {}, {
                call: _objectSpread(_objectSpread({}, call), {}, {
                  duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration :
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  Math.round((Date.now() - call.startTime) / 1000),
                  result: call.result || call.telephonyStatus
                }),
                fromEntity: fromEntity,
                toEntity: toEntity
              }));
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function logCall(_x3) {
        return _logCall.apply(this, arguments);
      }
      return logCall;
    }()
  }, {
    key: "_autoLogCall",
    value: function () {
      var _autoLogCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref4) {
        var call, fromEntity, toEntity, triggerType;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              call = _ref4.call, fromEntity = _ref4.fromEntity, toEntity = _ref4.toEntity, triggerType = _ref4.triggerType;
              if (this.ready) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              _context5.n = 2;
              return this.log({
                call: _objectSpread(_objectSpread({}, call), {}, {
                  // @ts-expect-error TS(2322): Type 'number | undefined' is not assignable to typ... Remove this comment to see the full error message
                  duration: Object.prototype.hasOwnProperty.call(call, 'duration') ? call.duration :
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  Math.round((Date.now() - call.startTime) / 1000),
                  result: call.result || call.telephonyStatus
                }),
                fromEntity: fromEntity,
                toEntity: toEntity,
                triggerType: triggerType
              });
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _autoLogCall(_x4) {
        return _autoLogCall2.apply(this, arguments);
      }
      return _autoLogCall;
    }()
  }, {
    key: "_activityMatcherCheck",
    value: function _activityMatcherCheck(sessionId) {
      return (
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        !this._deps.activityMatcher.dataMapping[sessionId] ||
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        !this._deps.activityMatcher.dataMapping[sessionId].length
      );
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
      var _onNewCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(call, triggerType) {
        var toNumberEntity, fromMatches, toMatches, fromEntity, toEntity;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this._shouldLogNewCall(call);
            case 1:
              if (!_context6.v) {
                _context6.n = 6;
                break;
              }
              _context6.n = 2;
              return this._deps.activityMatcher.triggerMatch();
            case 2:
              if (!(this._activityMatcherCheck(call.sessionId) && this._customMatcherCheck(call.sessionId))) {
                _context6.n = 5;
                break;
              }
              _context6.n = 3;
              return this._deps.contactMatcher.triggerMatch();
            case 3:
              toNumberEntity = call.toNumberEntity || '';
              fromMatches = call.from && call.from.phoneNumber &&
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.contactMatcher.dataMapping[call.from.phoneNumber] || [];
              toMatches = call.to && call.to.phoneNumber &&
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.contactMatcher.dataMapping[call.to.phoneNumber] || [];
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
              _context6.n = 4;
              return this._autoLogCall({
                call: call,
                // @ts-expect-error TS(2322): Type 'Entity | null' is not assignable to type 'En... Remove this comment to see the full error message
                fromEntity: fromEntity,
                // @ts-expect-error TS(2322): Type 'Entity | null | undefined' is not assignable... Remove this comment to see the full error message
                toEntity: toEntity,
                triggerType: triggerType
              });
            case 4:
              _context6.n = 6;
              break;
            case 5:
              _context6.n = 6;
              return this._autoLogCall({
                call: call,
                triggerType: triggerType
              });
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function _onNewCall(_x5, _x6) {
        return _onNewCall2.apply(this, arguments);
      }
      return _onNewCall;
    }()
  }, {
    key: "_shouldLogUpdatedCall",
    value: function () {
      var _shouldLogUpdatedCall2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(call) {
        var isActive, activityMatches;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this._ensureActive();
            case 1:
              isActive = _context7.v;
              if (!(isActive && (this.logOnRinging || !(0, _callLogHelpers.isRinging)(call)))) {
                _context7.n = 4;
                break;
              }
              if (!this.autoLog) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2, true);
            case 2:
              _context7.n = 3;
              return this._deps.activityMatcher.triggerMatch();
            case 3:
              activityMatches =
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.activityMatcher.dataMapping[call.sessionId] || [];
              return _context7.a(2, activityMatches.length > 0);
            case 4:
              return _context7.a(2, false);
          }
        }, _callee7, this);
      }));
      function _shouldLogUpdatedCall(_x7) {
        return _shouldLogUpdatedCall2.apply(this, arguments);
      }
      return _shouldLogUpdatedCall;
    }()
  }, {
    key: "_onCallUpdated",
    value: function () {
      var _onCallUpdated2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(call, triggerType) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this._shouldLogUpdatedCall(call);
            case 1:
              if (!_context8.v) {
                _context8.n = 2;
                break;
              }
              _context8.n = 2;
              return this._autoLogCall({
                call: call,
                triggerType: triggerType
              });
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function _onCallUpdated(_x8, _x9) {
        return _onCallUpdated2.apply(this, arguments);
      }
      return _onCallUpdated;
    }()
  }, {
    key: "_onCallAnswered",
    value: function () {
      var _onCallAnswered2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(call) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2);
          }
        }, _callee9);
      }));
      function _onCallAnswered(_x0) {
        return _onCallAnswered2.apply(this, arguments);
      }
      return _onCallAnswered;
    }()
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _core.watch)(this, function () {
        return _this2._deps.callMonitor.calls;
      }, function (newCalls, oldCalls) {
        if (_this2.ready) {
          var _oldCalls;
          oldCalls = ((_oldCalls = oldCalls) === null || _oldCalls === void 0 ? void 0 : _oldCalls.slice()) || [];
          // @ts-expect-error TS(2345): Argument of type 'Call[]' is not assignable to par... Remove this comment to see the full error message
          (0, _callLogHelpers.removeDuplicateSelfCalls)(newCalls).forEach(function (call) {
            var oldCallIndex = oldCalls.findIndex(function (item) {
              return item.sessionId === call.sessionId;
            });
            if (oldCallIndex === -1) {
              // @ts-expect-error TS(2345): Argument of type 'ActiveCall' is not assignable to... Remove this comment to see the full error message
              _this2._onNewCall(call, _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
            } else {
              var oldCall = oldCalls[oldCallIndex];
              oldCalls.splice(oldCallIndex, 1);
              if (call.telephonyStatus !== oldCall.telephonyStatus) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall:
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  !!_this2.transferredCallsMap[call.sessionId],
                  transferredMiddleNumber: _this2.transferredCallsMap[
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  call.sessionId] ?
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
                if (oldCall.telephonyStatus === 'Ringing' && call.telephonyStatus === 'CallConnected') {
                  _this2._onCallAnswered(call);
                }
              }
              if ((call.from && call.from.phoneNumber) !== (oldCall.from && oldCall.from.phoneNumber)) {
                var _oldCall$from;
                _this2._addTransferredCall(
                // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                call.sessionId, (_oldCall$from = oldCall.from) === null || _oldCall$from === void 0 ? void 0 : _oldCall$from.phoneNumber);
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
                  isTransferredCall: true,
                  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                  transferredMiddleNumber: oldCall.from && oldCall.from.phoneNumber,
                  phoneNumberUpdated: true
                }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
              }
            }
          });
          oldCalls.forEach(function (call) {
            _this2._onCallUpdated(_objectSpread(_objectSpread({}, call), {}, {
              isTransferredCall: !!_this2.transferredCallsMap[call.sessionId],
              // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
              transferredMiddleNumber: _this2.transferredCallsMap[call.sessionId] ? _this2.transferredCallsMap[call.sessionId].transferredMiddleNumber : null
            }), _callLoggerTriggerTypes.callLoggerTriggerTypes.presenceUpdate);
          });
        }
      });
      (0, _core.watch)(this, function () {
        return _this2._deps.callHistory.endedCalls;
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
              var callInfo = _this2._deps.callHistory.calls.find(function (item) {
                return item.sessionId === call.sessionId;
              });
              if (callInfo) {
                _this2._onCallUpdated(_objectSpread(_objectSpread({}, callInfo), {}, {
                  isTransferredCall:
                  // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
                  !!_this2.transferredCallsMap[callInfo.sessionId],
                  // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
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
      var _setAutoLog2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(autoLog) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (this.ready && autoLog !== this.autoLog) {
                this._setAutoLog(autoLog);
              }
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function setAutoLog(_x1) {
        return _setAutoLog2.apply(this, arguments);
      }
      return setAutoLog;
    }()
  }, {
    key: "setLogOnRinging",
    value: function () {
      var _setLogOnRinging2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(logOnRinging) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (this.ready && logOnRinging !== this.logOnRinging) {
                this._setLogOnRinging(logOnRinging);
              }
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
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
}(_LoggerBase2.LoggerBase), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoLog", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "logOnRinging", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "transferredCallsList", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLogOnRinging", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAutoLog", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_addTransferredCall", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_addTransferredCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "log", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "log"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogNewCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "logCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "logCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_autoLogCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_autoLogCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onNewCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onNewCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_shouldLogUpdatedCall", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_shouldLogUpdatedCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallUpdated", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallUpdated"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_onCallAnswered", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_onCallAnswered"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAutoLog", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setAutoLog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setLogOnRinging", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "setLogOnRinging"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "transferredCallsMap", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "transferredCallsMap"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=CallLogger.js.map
