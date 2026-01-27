"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
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
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionFeatures = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.includes.js");
var _subscriptionFilters = require("@ringcentral-integration/commons/enums/subscriptionFilters");
var _subscriptionHints = require("@ringcentral-integration/commons/enums/subscriptionHints");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _Auth = require("../Auth");
var _Client = require("../Client");
var _DataFetcher = require("../DataFetcher");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2;
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var ExtensionFeatures = exports.ExtensionFeatures = (_dec = (0, _nextCore.injectable)({
  name: 'ExtensionFeatures'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Subscription')(target, undefined, 4);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 5);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('ExtensionFeaturesOptions')(target, undefined, 6);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _Auth.Auth === "undefined" ? Object : _Auth.Auth, typeof _services.Toast === "undefined" ? Object : _services.Toast, typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _DataFetcher.DataFetcher === "undefined" ? Object : _DataFetcher.DataFetcher, typeof Subscription === "undefined" ? Object : Subscription, Object, typeof ExtensionFeaturesOptions === "undefined" ? Object : ExtensionFeaturesOptions]), _dec7 = (0, _nextCore.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_DataFetcherConsumer) {
  function ExtensionFeatures(_auth, _toast, _client, _dataFetcher, _subscription, _tabManager, _extensionFeaturesOptions) {
    var _this$_extensionFeatu, _this$_extensionFeatu2, _this$_subscription;
    var _this;
    _classCallCheck(this, ExtensionFeatures);
    _this = _callSuper(this, ExtensionFeatures, [_dataFetcher]);
    _this._auth = _auth;
    _this._toast = _toast;
    _this._client = _client;
    _this._dataFetcher = _dataFetcher;
    _this._subscription = _subscription;
    _this._tabManager = _tabManager;
    _this._extensionFeaturesOptions = _extensionFeaturesOptions;
    _this._stopWatchingSubscription = null;
    _this._handleSubscription = function (message) {
      var _this$_tabManager$act, _this$_tabManager, _message$body;
      if (_this.ready && (_this._source.disableCache || ((_this$_tabManager$act = (_this$_tabManager = _this._tabManager) === null || _this$_tabManager === void 0 ? void 0 : _this$_tabManager.active) !== null && _this$_tabManager$act !== void 0 ? _this$_tabManager$act : true)) && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : _message$body.hints) && (message.body.hints.includes(_subscriptionHints.subscriptionHints.limits) || message.body.hints.includes(_subscriptionHints.subscriptionHints.features) || message.body.hints.includes(_subscriptionHints.subscriptionHints.permissions))) {
        _this.fetchData();
      }
    };
    _this._source = new _DataFetcher.DataSource(_objectSpread(_objectSpread({
      polling: (_this$_extensionFeatu = (_this$_extensionFeatu2 = _this._extensionFeaturesOptions) === null || _this$_extensionFeatu2 === void 0 ? void 0 : _this$_extensionFeatu2.polling) !== null && _this$_extensionFeatu !== void 0 ? _this$_extensionFeatu : true,
      pollingInterval: 24 * 60 * 60 * 1000
    }, _this._extensionFeaturesOptions), {}, {
      key: 'extensionFeatures',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var response, _response, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.p = 0;
                _context.n = 1;
                return _this._client.service.platform().get('/restapi/v1.0/account/~/extension/~/features');
              case 1:
                response = _context.v;
                return _context.a(2, response.json());
              case 2:
                _context.p = 2;
                _t = _context.v;
                if (!(((_response = _t.response) === null || _response === void 0 ? void 0 : _response.status) === 403)) {
                  _context.n = 4;
                  break;
                }
                _context.n = 3;
                return _this._auth.logout({
                  reason: 'Insufficient privilege',
                  payload: {
                    detail: 'ExtensionFeatures 403'
                  }
                });
              case 3:
                _this.showInsufficientPrivilege();
                return _context.a(2, {});
              case 4:
                throw _t;
              case 5:
                return _context.a(2);
            }
          }, _callee, null, [[0, 2]]);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return true;
      }
    }));
    _this._dataFetcher.register(_this._source);
    (_this$_subscription = _this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.extensionInfo]
    });
    return _this;
  }
  _inherits(ExtensionFeatures, _DataFetcherConsumer);
  return _createClass(ExtensionFeatures, [{
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      (0, _nextCore.watch)(this, function () {
        var _this2$features, _this2$features$ReadE;
        return [_this2.ready, !!_this2.data, !!((_this2$features = _this2.features) === null || _this2$features === void 0 ? void 0 : (_this2$features$ReadE = _this2$features.ReadExtensionInfo) === null || _this2$features$ReadE === void 0 ? void 0 : _this2$features$ReadE.available), _this2._auth.loginStatus === _Auth.loginStatus.loggedIn];
      }, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref2) {
          var _ref4, ready, hasData, readExtensionInfo, loggedIn;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _ref4 = _slicedToArray(_ref2, 4), ready = _ref4[0], hasData = _ref4[1], readExtensionInfo = _ref4[2], loggedIn = _ref4[3];
                _context2.n = 1;
                return _this2.checkIsInsufficientPrivilege({
                  ready: ready,
                  loggedIn: loggedIn,
                  readExtensionInfo: readExtensionInfo,
                  hasData: hasData
                });
              case 1:
                return _context2.a(2);
            }
          }, _callee2);
        }));
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }(), {
        multiple: true
      });
    }
  }, {
    key: "checkIsInsufficientPrivilege",
    value: function () {
      var _checkIsInsufficientPrivilege = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref5) {
        var ready, loggedIn, readExtensionInfo, hasData;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              ready = _ref5.ready, loggedIn = _ref5.loggedIn, readExtensionInfo = _ref5.readExtensionInfo, hasData = _ref5.hasData;
              if (!(ready && loggedIn && !readExtensionInfo)) {
                _context3.n = 2;
                break;
              }
              _context3.n = 1;
              return this._auth.logout({
                reason: 'Insufficient privilege',
                payload: {
                  detail: 'ExtensionFeatures not have readExtensionInfo permission'
                }
              });
            case 1:
              if (hasData) {
                // only show alert if featuresList was successfully fetched,
                // but the user has no ReadExtensionInfo feature
                this.showInsufficientPrivilege();
              }
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function checkIsInsufficientPrivilege(_x2) {
        return _checkIsInsufficientPrivilege.apply(this, arguments);
      }
      return checkIsInsufficientPrivilege;
    }()
  }, {
    key: "showInsufficientPrivilege",
    value: function showInsufficientPrivilege() {
      this._toast.danger({
        message: (0, _i18n.t)('insufficientPrivilege'),
        ttl: 0
      });
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this3 = this;
      if (this._subscription) {
        this._stopWatchingSubscription = (0, _nextCore.watch)(this, function () {
          return _this3._subscription.message;
        }, this._handleSubscription);
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatchingSu;
      (_this$_stopWatchingSu = this._stopWatchingSubscription) === null || _this$_stopWatchingSu === void 0 ? void 0 : _this$_stopWatchingSu.call(this);
      this._stopWatchingSubscription = null;
    }
  }, {
    key: "features",
    get: function get() {
      var _this$data$records, _this$data;
      return (0, _ramda.reduce)(function (acc, curr) {
        var id = curr === null || curr === void 0 ? void 0 : curr.id;
        if (id) acc[id] = curr;
        return acc;
      }, {}, (_this$data$records = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.records) !== null && _this$data$records !== void 0 ? _this$data$records : []);
    }
  }]);
}(_DataFetcher.DataFetcherConsumer), _applyDecoratedDescriptor(_class2.prototype, "features", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "features"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ExtensionFeatures.js.map
