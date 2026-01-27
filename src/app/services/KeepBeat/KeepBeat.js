"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
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
exports.KeepBeat = void 0;
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2;
/**
 * A module that emits events to keep track of system activity.
 *
 * The KeepBeat module emits a "beat" once every 24 hours for each user account.
 *
 * When the system wakes from sleep or receives a heartbeat, it checks if 24 hours
 * have passed since the last beat for the current user. If so, it emits a beat event
 * and updates the timestamp.
 *
 * works for both logged-in and non-logged-in users.
 */
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var BEAT_INTERVAL = 1000 * 60 * 60 * 24; // beat once in 24 hours

var DEFAULT_NON_LOGIN_ID = 'non-login-id';

/**
 *
 */
var KeepBeat = exports.KeepBeat = (_dec = (0, _nextCore.injectable)({
  name: 'KeepBeat'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _services.SleepDetector === "undefined" ? Object : _services.SleepDetector, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager]), _dec4 = (0, _nextCore.dynamic)('Auth'), _dec5 = Reflect.metadata("design:type", typeof Auth === "undefined" ? Object : Auth), _dec6 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [Number]), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = (0, _nextCore.delegate)('server'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function KeepBeat(_storagePlugin, _sleepDetector, _portManager) {
    var _this;
    _classCallCheck(this, KeepBeat);
    _this = _callSuper(this, KeepBeat);
    _this._storagePlugin = _storagePlugin;
    _this._sleepDetector = _sleepDetector;
    _this._portManager = _portManager;
    _initializerDefineProperty(_this, "_auth", _descriptor, _this);
    /**
     * the beat will emit once in 24 hours base on the defined interval time
     *
     * the interval time is 24 hours once, for each account will have there own beat time check
     *
     * also a beat for non login account
     */
    _this.beat$ = new _rxjs.Subject();
    // ! should not use userStorage to prevent the rehydrated$ not triggered
    _initializerDefineProperty(_this, "beatTimeStampMap", _descriptor2, _this);
    _this._storagePlugin.enable(_this);
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        _this.listenBeat();
      });
    } else {
      _this.listenBeat();
    }
    return _this;
  }
  _inherits(KeepBeat, _RcModule);
  return _createClass(KeepBeat, [{
    key: "beatTimeStamp",
    get: function get() {
      var _this$_auth;
      var ownerId = ((_this$_auth = this._auth) === null || _this$_auth === void 0 ? void 0 : _this$_auth.ownerId) || DEFAULT_NON_LOGIN_ID;
      return this.beatTimeStampMap[ownerId] || 0;
    }
  }, {
    key: "_setBeatTimeStamp",
    value: function _setBeatTimeStamp(val) {
      var _this$_auth2;
      var ownerId = ((_this$_auth2 = this._auth) === null || _this$_auth2 === void 0 ? void 0 : _this$_auth2.ownerId) || DEFAULT_NON_LOGIN_ID;
      Object.assign(this.beatTimeStampMap, _defineProperty({}, ownerId, val));
    }
  }, {
    key: "_clearBeatTimeStamp",
    value: function _clearBeatTimeStamp() {
      this.beatTimeStampMap = {};
    }
  }, {
    key: "clearBeatTimeStamp",
    value: function () {
      var _clearBeatTimeStamp2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._clearBeatTimeStamp();
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function clearBeatTimeStamp() {
        return _clearBeatTimeStamp2.apply(this, arguments);
      }
      return clearBeatTimeStamp;
    }()
  }, {
    key: "listenBeat",
    value: function listenBeat() {
      var _this2 = this;
      var ownerId$ = (0, _nextCore.fromWatchValue)(this, function () {
        return _this2._auth;
      }).pipe((0, _rxjs.switchMap)(function (auth) {
        return auth ? auth.ownerId$ : (0, _rxjs.of)(null);
      }), (0, _rxjs.distinctUntilChanged)());
      var beatEvent$ = (0, _rxjs.merge)(this._sleepDetector.heartbeat$, this._sleepDetector.detect$);
      this.ready$.pipe((0, _rxjs.switchMap)(function () {
        return ownerId$;
      }), (0, _rxjs.switchMap)(function () {
        return beatEvent$.pipe((0, _rxjs.startWith)(null));
      }), (0, _rxjs.filter)(function () {
        return Date.now() - _this2.beatTimeStamp >= BEAT_INTERVAL;
      }), (0, _rxjs.tap)(function () {
        var _this2$_auth;
        _this2._setBeatTimeStamp(Date.now());
        _this2.beat$.next(((_this2$_auth = _this2._auth) === null || _this2$_auth === void 0 ? void 0 : _this2$_auth.ownerId) || null);
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_auth", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "beatTimeStampMap", [_nextCore.globalStorage, _nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setBeatTimeStamp", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_setBeatTimeStamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearBeatTimeStamp", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearBeatTimeStamp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clearBeatTimeStamp", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "clearBeatTimeStamp"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=KeepBeat.js.map
