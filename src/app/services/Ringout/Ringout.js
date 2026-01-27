"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
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
exports.Ringout = void 0;
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-contacts/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _ringoutErrors = require("./ringoutErrors");
var _ringoutStatus = require("./ringoutStatus");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor;
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
var DEFAULT_MONITOR_INTERVAL = 2500;
var DEFAULT_TIME_BETWEEN_CALLS = 10000;
var Ringout = exports.Ringout = (_dec = (0, _nextCore.injectable)({
  name: 'Ringout'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 2);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('RingoutOptions')(target, undefined, 3);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services2.ContactMatcher === "undefined" ? Object : _services2.ContactMatcher, typeof RingoutOptions === "undefined" ? Object : RingoutOptions]), _dec6 = Reflect.metadata("design:type", String), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof MakeCallOptions === "undefined" ? Object : MakeCallOptions]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [Object, Number]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Object]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function Ringout(_auth, _client, _contactMatcher, _ringoutOptions) {
    var _this$_ringoutOptions, _this$_ringoutOptions2, _this$_ringoutOptions3, _this$_ringoutOptions4;
    var _this;
    _classCallCheck(this, Ringout);
    _this = _callSuper(this, Ringout);
    _this._auth = _auth;
    _this._client = _client;
    _this._contactMatcher = _contactMatcher;
    _this._ringoutOptions = _ringoutOptions;
    _this._monitorInterval = void 0;
    _this._timeBetweenCalls = void 0;
    _initializerDefineProperty(_this, "ringoutStatus", _descriptor, _this);
    _this._monitorInterval = (_this$_ringoutOptions = (_this$_ringoutOptions2 = _this._ringoutOptions) === null || _this$_ringoutOptions2 === void 0 ? void 0 : _this$_ringoutOptions2.monitorInterval) !== null && _this$_ringoutOptions !== void 0 ? _this$_ringoutOptions : DEFAULT_MONITOR_INTERVAL;
    _this._timeBetweenCalls = (_this$_ringoutOptions3 = (_this$_ringoutOptions4 = _this._ringoutOptions) === null || _this$_ringoutOptions4 === void 0 ? void 0 : _this$_ringoutOptions4.timeBetweenCalls) !== null && _this$_ringoutOptions3 !== void 0 ? _this$_ringoutOptions3 : DEFAULT_TIME_BETWEEN_CALLS;
    return _this;
  }
  _inherits(Ringout, _RcModule);
  return _createClass(Ringout, [{
    key: "setRingoutStatus",
    value: function setRingoutStatus(ringoutStatus) {
      this.ringoutStatus = ringoutStatus;
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._auth.loggedIn && this.ready;
    }
  }, {
    key: "makeCall",
    value: function () {
      var _makeCall = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var fromNumber, toNumber, prompt, resp, _this$_contactMatcher, startTime, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              fromNumber = _ref.fromNumber, toNumber = _ref.toNumber, prompt = _ref.prompt;
              if (!this.ready) {
                _context.n = 6;
                break;
              }
              this.setRingoutStatus(_ringoutStatus.ringoutStatus.connecting);
              _context.p = 1;
              _context.n = 2;
              return this._client.account().extension().ringOut().post({
                from: {
                  phoneNumber: fromNumber
                },
                to: {
                  phoneNumber: toNumber
                },
                playPrompt: prompt
              });
            case 2:
              resp = _context.v;
              try {
                (_this$_contactMatcher = this._contactMatcher) === null || _this$_contactMatcher === void 0 ? void 0 : _this$_contactMatcher.forceMatchBatchNumbers({
                  phoneNumbers: [fromNumber, toNumber]
                });
              } catch (error) {
                _nextCore.logger.error('makeCall forceMatchBatchNumbers error', error);
              }
              startTime = Date.now();
              _context.n = 3;
              return this._monitorRingout(resp.id, startTime);
            case 3:
              this.setRingoutStatus(_ringoutStatus.ringoutStatus.idle);
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              this.setRingoutStatus(_ringoutStatus.ringoutStatus.idle);
              if (!(_t.message !== _ringoutErrors.ringoutErrors.pollingCancelled)) {
                _context.n = 5;
                break;
              }
              throw _t;
            case 5:
              _context.n = 6;
              break;
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 4]]);
      }));
      function makeCall(_x) {
        return _makeCall.apply(this, arguments);
      }
      return makeCall;
    }()
  }, {
    key: "_monitorRingout",
    value: function () {
      var _monitorRingout2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ringoutId, startTime) {
        var callerStatus;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this._fetchRingoutStatus(ringoutId);
            case 1:
              callerStatus = _context2.v;
            case 2:
              if (!(callerStatus === 'InProgress')) {
                _context2.n = 6;
                break;
              }
              if (!(Date.now() - startTime > this._timeBetweenCalls)) {
                _context2.n = 3;
                break;
              }
              throw new Error(_ringoutErrors.ringoutErrors.pollingCancelled);
            case 3:
              _context2.n = 4;
              return (0, _utils.sleep)(this._monitorInterval);
            case 4:
              _context2.n = 5;
              return this._fetchRingoutStatus(ringoutId);
            case 5:
              callerStatus = _context2.v;
              _context2.n = 2;
              break;
            case 6:
              if (!(callerStatus !== 'Success' && callerStatus !== 'NoAnswer')) {
                _context2.n = 7;
                break;
              }
              throw new Error(_ringoutErrors.ringoutErrors.firstLegConnectFailed);
            case 7:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _monitorRingout(_x2, _x3) {
        return _monitorRingout2.apply(this, arguments);
      }
      return _monitorRingout;
    }()
  }, {
    key: "_fetchRingoutStatus",
    value: function () {
      var _fetchRingoutStatus2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(ringoutId) {
        var callStatus, resp, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this._client.account().extension().ringOut(ringoutId).get()["catch"](function (error) {
                if (error && error.response && error.response.status === 404) {
                  callStatus = 'Success';
                }
              });
            case 1:
              resp = _context3.v;
              return _context3.a(2, callStatus || resp.status.callerStatus);
            case 2:
              _context3.p = 2;
              _t2 = _context3.v;
              throw new Error(_ringoutErrors.ringoutErrors.pollingFailed);
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function _fetchRingoutStatus(_x4) {
        return _fetchRingoutStatus2.apply(this, arguments);
      }
      return _fetchRingoutStatus;
    }()
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "ringoutStatus", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _ringoutStatus.ringoutStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setRingoutStatus", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "setRingoutStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "makeCall", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "makeCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_monitorRingout", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "_monitorRingout"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchRingoutStatus", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchRingoutStatus"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Ringout.js.map
