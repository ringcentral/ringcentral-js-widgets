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
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.reflect.get.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmsOptOut = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _subscriptionFilters = require("@ringcentral-integration/commons/enums/subscriptionFilters");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var DEFAULT_TTL = 5 * 60 * 1000; // 5 min
var SmsOptOut = exports.SmsOptOut = (_dec = (0, _nextCore.injectable)({
  name: 'SmsOptOut'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Subscription')(target, undefined, 4);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services.NumberFormatter === "undefined" ? Object : _services.NumberFormatter, typeof _services.DataFetcher === "undefined" ? Object : _services.DataFetcher, typeof Subscription === "undefined" ? Object : Subscription]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec7 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec8 = (0, _nextCore.delegate)('server'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [typeof GetOptOutsOptions === "undefined" ? Object : GetOptOutsOptions]), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [String, Boolean]), _dec11 = (0, _nextCore.delegate)('server'), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [String, Boolean]), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [String]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_DataFetcherConsumer) {
  function SmsOptOut(_client, _auth, _numberFormatter, _dataFetcher, _subscription) {
    var _this$_subscription;
    var _this;
    _classCallCheck(this, SmsOptOut);
    _this = _callSuper(this, SmsOptOut, [_dataFetcher]);
    _this._client = _client;
    _this._auth = _auth;
    _this._numberFormatter = _numberFormatter;
    _this._dataFetcher = _dataFetcher;
    _this._subscription = _subscription;
    _this._source = new _services.DataSource({
      key: 'smsOptOuts',
      polling: false,
      disableCache: false,
      cleanOnReset: true,
      ttl: DEFAULT_TTL,
      fetchFunction: function fetchFunction() {
        return _this.getOptOuts();
      },
      readyCheckFunction: function readyCheckFunction() {
        return _this.readyCheckFunction();
      },
      permissionCheckFunction: function permissionCheckFunction() {
        return _this.permissionCheckFunction();
      }
    });
    /**
     * the user conversation opt out status map
     *
     * use for display on the conversation panel
     */
    _initializerDefineProperty(_this, "inputOptOutMap", _descriptor, _this);
    _this._dataFetcher.register(_this._source);
    (_this$_subscription = _this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.optOuts]
    });
    return _this;
  }
  _inherits(SmsOptOut, _DataFetcherConsumer);
  return _createClass(SmsOptOut, [{
    key: "optOutMap",
    get: function get() {
      var result = {};
      var _iterator = _createForOfIteratorHelper(this.data || []),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var optOut = _step.value;
          result[this.getOptOutKey(optOut)] = optOut;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }
  }, {
    key: "getOptOutKey",
    value: function getOptOutKey(_ref) {
      var from = _ref.from,
        to = _ref.to;
      // use sort to ignore the order of from and to
      var _sort = [this._numberFormatter.formatNumber(from), this._numberFormatter.formatNumber(to)].sort(),
        _sort2 = _slicedToArray(_sort, 2),
        a = _sort2[0],
        b = _sort2[1];
      return "".concat(a, "__").concat(b);
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this$_subscription2,
        _this2 = this;
      _superPropGet(SmsOptOut, "onInitOnce", this, 3)([]);
      (_this$_subscription2 = this._subscription) === null || _this$_subscription2 === void 0 ? void 0 : _this$_subscription2.fromMessage$(/\/account\/.*\/a2p-sms\/opt-outs/).pipe((0, _rxjs.tap)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _this2.refetchOptOuts();
            case 1:
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              _this2.logger.error('opt-outs update error', _t);
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }))), _nextCore.takeUntilAppDestroy).subscribe();
    }

    /**
     * Get opt-outs list with optional filters
     */
  }, {
    key: "getOptOuts",
    value: (function () {
      var _getOptOuts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var options,
          from,
          to,
          _options$status,
          status,
          pageToken,
          _options$perPage,
          perPage,
          params,
          response,
          data,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              from = options.from, to = options.to, _options$status = options.status, status = _options$status === void 0 ? 'optout' : _options$status, pageToken = options.pageToken, _options$perPage = options.perPage, perPage = _options$perPage === void 0 ? 1000 : _options$perPage;
              params = {};
              if (from) {
                params.from = from;
              }
              if (to) {
                params.to = to;
              }
              if (status) {
                params.status = status;
              }
              if (pageToken) {
                params.pageToken = pageToken;
              }
              if (perPage) {
                params.perPage = perPage;
              }
              _context2.p = 1;
              _context2.n = 2;
              return this._client.service.platform().get('/restapi/v1.0/account/~/a2p-sms/opt-outs', params);
            case 2:
              response = _context2.v;
              _context2.n = 3;
              return response.json();
            case 3:
              data = _context2.v;
              return _context2.a(2, data.records || []);
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              this.logger.error('getOptOuts error', _t2);
              return _context2.a(2, []);
          }
        }, _callee2, this, [[1, 4]]);
      }));
      function getOptOuts() {
        return _getOptOuts.apply(this, arguments);
      }
      return getOptOuts;
    }()
    /**
     * Refetch opt-outs from server
     */
    )
  }, {
    key: "refetchOptOuts",
    value: function refetchOptOuts() {
      return this.fetchData();
    }
  }, {
    key: "readyCheckFunction",
    value: function readyCheckFunction() {
      return this._auth.loggedIn;
    }
  }, {
    key: "permissionCheckFunction",
    value: function permissionCheckFunction() {
      return this._auth.loggedIn;
    }
  }, {
    key: "_setOptOut",
    value: function _setOptOut(conversationId, enabled) {
      this.inputOptOutMap[conversationId] = enabled;
    }
  }, {
    key: "setOptOut",
    value: function () {
      var _setOptOut2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(conversationId, enabled) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this._setOptOut(conversationId, enabled);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function setOptOut(_x, _x2) {
        return _setOptOut2.apply(this, arguments);
      }
      return setOptOut;
    }()
  }, {
    key: "getOptOut",
    value: function getOptOut(conversationId) {
      var _this$inputOptOutMap$;
      return (_this$inputOptOutMap$ = this.inputOptOutMap[conversationId]) !== null && _this$inputOptOutMap$ !== void 0 ? _this$inputOptOutMap$ : false;
    }

    /**
     * Attach opt-out hint to message text if opt-out is enabled for the conversation
     */
  }, {
    key: "attachOptOutHint",
    value: function attachOptOutHint(conversationId, text) {
      if (this.getOptOut(conversationId)) {
        return "".concat(text, "\n\n").concat(this.getStopHint());
      }
      return text;
    }
  }, {
    key: "getStopHint",
    value: function getStopHint() {
      return (0, _i18n.t)('replyStopToOptOut', {
        stop: 'STOP'
      });
    }
  }, {
    key: "getIsOptOutConversation",
    value: function getIsOptOutConversation(conversation) {
      var _conversation$from, _conversation$to, _conversation$to$, _conversation$to2;
      if (!conversation) {
        return false;
      }
      var fromNumber = (_conversation$from = conversation.from) === null || _conversation$from === void 0 ? void 0 : _conversation$from.phoneNumber;
      var toNumber = (_conversation$to = conversation.to) === null || _conversation$to === void 0 ? void 0 : (_conversation$to$ = _conversation$to[0]) === null || _conversation$to$ === void 0 ? void 0 : _conversation$to$.phoneNumber;
      var isOptOut = Boolean(((_conversation$to2 = conversation.to) === null || _conversation$to2 === void 0 ? void 0 : _conversation$to2.length) === 1 && this.isOptOut(fromNumber, toNumber));
      return isOptOut;
    }

    /**
     * Check if a conversation is opted out based on from and to phone numbers
     */
  }, {
    key: "isOptOut",
    value: function isOptOut(from, to) {
      if (!from || !to) {
        return false;
      }
      var key = this.getOptOutKey({
        from: from,
        to: to
      });
      var optOut = this.optOutMap[key];
      return (optOut === null || optOut === void 0 ? void 0 : optOut.status) === 'OptOut';
    }
  }, {
    key: "isOptOutWithFormat",
    value: function isOptOutWithFormat(from, to) {
      if (!from || !to) {
        return false;
      }
      var key = this.getOptOutKey({
        from: from,
        to: to
      });
      var optOut = this.optOutMap[key];
      return (optOut === null || optOut === void 0 ? void 0 : optOut.status) === 'OptOut';
    }
  }, {
    key: "resetOptOut",
    value: function resetOptOut(conversationId) {
      delete this.inputOptOutMap[conversationId];
    }
  }, {
    key: "resetData",
    value: function resetData() {
      this.inputOptOutMap = {};
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetData();
    }
  }]);
}(_services.DataFetcherConsumer), _applyDecoratedDescriptor(_class2.prototype, "optOutMap", [_nextCore.computed, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "optOutMap"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "inputOptOutMap", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "getOptOuts", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "getOptOuts"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setOptOut", [_nextCore.action, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "_setOptOut"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOptOut", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "setOptOut"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetOptOut", [_nextCore.action, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "resetOptOut"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetData", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "resetData"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SmsOptOut.js.map
