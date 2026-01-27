"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateLimiter = void 0;
require("core-js/modules/es.array.some.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.number.parse-int.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _nextCore = require("@ringcentral-integration/next-core");
var _useInterval2 = require("@ringcentral/juno/es6/foundation/hooks/useInterval/useInterval.js");
var _react = _interopRequireWildcard(require("react"));
var _Client = require("../Client");
var _Environment = require("../Environment");
var _errorMessages = require("./errorMessages");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2, _descriptor;
/* eslint-disable react-hooks/rules-of-hooks */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var DEFAULT_THROTTLE_DURATION = 61 * 1000;
function calculateTimeRemaining(duration, timestamp) {
  return Math.max(Math.floor((duration - (Date.now() - timestamp)) / 1000), 0);
}
var RateLimiter = exports.RateLimiter = (_dec = (0, _nextCore.injectable)({
  name: 'RateLimiter'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('RateLimiterOptions')(target, undefined, 4);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin, typeof _Environment.Environment === "undefined" ? Object : _Environment.Environment, typeof RateLimiterOptions === "undefined" ? Object : RateLimiterOptions]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function RateLimiter(_toast, _client, _storage, _environment, _rateLimiterOptions) {
    var _this$_rateLimiterOpt, _this$_rateLimiterOpt2;
    var _this;
    _classCallCheck(this, RateLimiter);
    _this = _callSuper(this, RateLimiter);
    _this._toast = _toast;
    _this._client = _client;
    _this._storage = _storage;
    _this._environment = _environment;
    _this._rateLimiterOptions = _rateLimiterOptions;
    _this._timeoutId = null;
    _this._unbindHandlers = null;
    _this._ttl = DEFAULT_THROTTLE_DURATION;
    _initializerDefineProperty(_this, "rateLimitReachedToast", _descriptor, _this);
    /**
     * If the app is restricted, an incoming request will lead to an exception
     */
    _this._beforeRequestHandler = function () {
      if (_this.restricted) {
        throw new Error(_errorMessages.errorMessages.rateLimitReached);
      }
    };
    _this._requestErrorHandler = function (error) {
      if (!(error instanceof Error) || error.message !== 'Request rate exceeded') {
        return;
      }

      // Get `retry-after` from response headers first
      _this._ttl = DEFAULT_THROTTLE_DURATION;
      if (error.response) {
        var retryAfter = error.response.headers.get('retry-after');
        if (retryAfter) {
          _this._ttl = 1000 * Number.parseInt(retryAfter, 10);
        }
      }
      _this.showAlert();
    };
    _this._ttl = (_this$_rateLimiterOpt = (_this$_rateLimiterOpt2 = _this._rateLimiterOptions) === null || _this$_rateLimiterOpt2 === void 0 ? void 0 : _this$_rateLimiterOpt2.throttleDuration) !== null && _this$_rateLimiterOpt !== void 0 ? _this$_rateLimiterOpt : DEFAULT_THROTTLE_DURATION;
    return _this;
  }
  _inherits(RateLimiter, _RcModule);
  return _createClass(RateLimiter, [{
    key: "_suppressAlerts",
    get: function get() {
      var _this$_rateLimiterOpt3, _this$_rateLimiterOpt4;
      return (_this$_rateLimiterOpt3 = (_this$_rateLimiterOpt4 = this._rateLimiterOptions) === null || _this$_rateLimiterOpt4 === void 0 ? void 0 : _this$_rateLimiterOpt4.suppressAlerts) !== null && _this$_rateLimiterOpt3 !== void 0 ? _this$_rateLimiterOpt3 : false;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      if (this._environment) {
        (0, _nextCore.watch)(this, function () {
          return _this2._environment.changeCounter;
        }, function () {
          if (_this2.ready) {
            _this2._bindHandlers();
          }
        });
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      this._bindHandlers();
    }
  }, {
    key: "showAlert",
    value: function () {
      var _showAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(this._suppressAlerts || this.restricted)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              return _context.a(2, this._toast.open(this.rateLimitReachedToast));
          }
        }, _callee, this);
      }));
      function showAlert() {
        return _showAlert.apply(this, arguments);
      }
      return showAlert;
    }()
  }, {
    key: "restricted",
    get: function get() {
      var _this3 = this;
      return this._toast.toasts.some(function (toast) {
        return toast.group === _this3.identifier;
      });
    }
  }, {
    key: "_bindHandlers",
    value: function _bindHandlers() {
      var _this4 = this;
      if (this._unbindHandlers) {
        this._unbindHandlers();
      }
      var client = this._client.service.client();
      client.on(client.events.requestError, this._requestErrorHandler);
      client.on(client.events.beforeRequest, this._beforeRequestHandler);
      this._unbindHandlers = function () {
        client.removeListener(client.events.requestError, _this4._requestErrorHandler);
        client.removeListener(client.events.beforeRequest, _this4._beforeRequestHandler);
        _this4._unbindHandlers = null;
      };
    }
  }, {
    key: "throttleDuration",
    get: function get() {
      return this._ttl;
    }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "rateLimitReachedToast", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;
    return this._toast.create({
      view: function view() {
        var _useToastItemView = (0, _views.useToastItemView)(),
          props = _useToastItemView.props;
        var initTiming = (0, _react.useMemo)(function () {
          return calculateTimeRemaining(props.ttl, props.timestamp);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);
        var _useState = (0, _react.useState)(initTiming),
          _useState2 = _slicedToArray(_useState, 2),
          ttl = _useState2[0],
          setTtl = _useState2[1];
        var _useInterval = (0, _useInterval2.useInterval)(function () {
            var newTtl = ttl - 1;
            setTtl(newTtl);
            if (newTtl === 0) {
              cancel();
            }
          }, 1000),
          cancel = _useInterval.cancel;
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _i18n.t)('rateLimitReached', {
          ttl: ttl
        }));
      },
      props: function props() {
        return {
          level: 'warning',
          ttl: _this5._ttl,
          group: _this5.identifier
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "showAlert", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "showAlert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restricted", [_nextCore.computed, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "restricted"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=RateLimiter.js.map
