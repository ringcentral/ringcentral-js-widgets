"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.for-each.js");
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
exports.ExtensionPhoneNumber = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.string.includes.js");
var _subscriptionFilters = require("@ringcentral-integration/commons/enums/subscriptionFilters");
var _subscriptionHints = require("@ringcentral-integration/commons/enums/subscriptionHints");
var _usageTypes = require("@ringcentral-integration/commons/enums/usageTypes");
var _fetchList = _interopRequireDefault(require("@ringcentral-integration/commons/lib/fetchList"));
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _Client = require("../Client");
var _DataFetcher = require("../DataFetcher");
var _ExtensionFeatures = require("../ExtensionFeatures");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var ExtensionPhoneNumber = exports.ExtensionPhoneNumber = (_dec = (0, _nextCore.injectable)({
  name: 'ExtensionPhoneNumber'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('Subscription')(target, undefined, 3);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 4);
}, _dec4 = function _dec4(target, key) {
  return (0, _nextCore.optional)('ExtensionPhoneNumberOptions')(target, undefined, 5);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _DataFetcher.DataFetcher === "undefined" ? Object : _DataFetcher.DataFetcher, typeof _ExtensionFeatures.ExtensionFeatures === "undefined" ? Object : _ExtensionFeatures.ExtensionFeatures, typeof Subscription === "undefined" ? Object : Subscription, Object, typeof ExtensionPhoneNumberOptions === "undefined" ? Object : ExtensionPhoneNumberOptions]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", []), _dec17 = Reflect.metadata("design:type", Function), _dec18 = Reflect.metadata("design:paramtypes", []), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = (_class2 = /*#__PURE__*/function (_DataFetcherConsumer) {
  function ExtensionPhoneNumber(_client, _dataFetcher, _extensionFeatures, _subscription, _tabManager, _extensionPhoneNumberOptions) {
    var _this$_subscription;
    var _this;
    _classCallCheck(this, ExtensionPhoneNumber);
    _this = _callSuper(this, ExtensionPhoneNumber, [_dataFetcher]);
    _this._client = _client;
    _this._dataFetcher = _dataFetcher;
    _this._extensionFeatures = _extensionFeatures;
    _this._subscription = _subscription;
    _this._tabManager = _tabManager;
    _this._extensionPhoneNumberOptions = _extensionPhoneNumberOptions;
    _this._stopWatching = void 0;
    _this._source = new _DataFetcher.DataSource(_objectSpread(_objectSpread({}, _this._extensionPhoneNumberOptions), {}, {
      key: 'extensionPhoneNumber',
      cleanOnReset: true,
      refreshDataOnPageRefresh: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var result;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return (0, _fetchList["default"])(function (params) {
                  return _this._client.account().extension().phoneNumber().list(params);
                });
              case 1:
                result = _context.v;
                return _context.a(2, result);
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return !!_this._extensionFeatures.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_extensionFeatu, _this$_extensionFeatu2, _this$_extensionFeatu3;
        return (_this$_extensionFeatu = (_this$_extensionFeatu2 = _this._extensionFeatures.features) === null || _this$_extensionFeatu2 === void 0 ? void 0 : (_this$_extensionFeatu3 = _this$_extensionFeatu2.ReadExtensionPhoneNumbers) === null || _this$_extensionFeatu3 === void 0 ? void 0 : _this$_extensionFeatu3.available) !== null && _this$_extensionFeatu !== void 0 ? _this$_extensionFeatu : false;
      }
    }));
    _this._dataFetcher.register(_this._source);
    (_this$_subscription = _this._subscription) === null || _this$_subscription === void 0 ? void 0 : _this$_subscription.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.extensionInfo]
    });
    return _this;
  }
  _inherits(ExtensionPhoneNumber, _DataFetcherConsumer);
  return _createClass(ExtensionPhoneNumber, [{
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_tabManager$act, _this$_tabManager, _message$body, _message$body$hints;
      if (this.ready && (this._source.disableCache || ((_this$_tabManager$act = (_this$_tabManager = this._tabManager) === null || _this$_tabManager === void 0 ? void 0 : _this$_tabManager.active) !== null && _this$_tabManager$act !== void 0 ? _this$_tabManager$act : true)) && (message === null || message === void 0 ? void 0 : (_message$body = message.body) === null || _message$body === void 0 ? void 0 : (_message$body$hints = _message$body.hints) === null || _message$body$hints === void 0 ? void 0 : _message$body$hints.includes(_subscriptionHints.subscriptionHints.companyNumbers))) {
        this.fetchData();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;
      if (this._subscription) {
        this._stopWatching = (0, _nextCore.watch)(this, function () {
          return _this2._subscription.message;
        }, function (newMessage) {
          return _this2._handleSubscription(newMessage);
        });
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;
      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = null;
    }
  }, {
    key: "numbers",
    get: function get() {
      var _this$data;
      return (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : [];
    }
  }, {
    key: "companyNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        return phoneNumber.usageType === _usageTypes.usageTypes.CompanyNumber;
      }, this.numbers);
    }
  }, {
    key: "mainCompanyNumber",
    get: function get() {
      return (0, _ramda.find)(function (phoneNumber) {
        return phoneNumber.usageType === _usageTypes.usageTypes.MainCompanyNumber;
      }, this.numbers);
    }
  }, {
    key: "directNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        return phoneNumber.usageType === _usageTypes.usageTypes.DirectNumber;
      }, this.numbers);
    }
  }, {
    key: "callerIdNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        var _phoneNumber$features;
        return !!((_phoneNumber$features = phoneNumber.features) === null || _phoneNumber$features === void 0 ? void 0 : _phoneNumber$features.includes('CallerId'));
      }, this.numbers);
    }
  }, {
    key: "primaryNumber",
    get: function get() {
      return (0, _ramda.find)(function (phoneNumber) {
        return !!phoneNumber.primary;
      }, this.directNumbers);
    }
  }, {
    key: "smsSenderNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        var _phoneNumber$features2;
        return !!((_phoneNumber$features2 = phoneNumber.features) === null || _phoneNumber$features2 === void 0 ? void 0 : _phoneNumber$features2.includes('SmsSender'));
      }, this.numbers);
    }
  }, {
    key: "faxSenderNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (_ref) {
        var type = _ref.type;
        return !!type && ['FaxOnly', 'VoiceFax'].includes(type);
      }, this.callerIdNumbers);
    }
  }]);
}(_DataFetcher.DataFetcherConsumer), _applyDecoratedDescriptor(_class2.prototype, "numbers", [_nextCore.computed, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "numbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "companyNumbers", [_nextCore.computed, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "companyNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mainCompanyNumber", [_nextCore.computed, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "mainCompanyNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "directNumbers", [_nextCore.computed, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "directNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "callerIdNumbers", [_nextCore.computed, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "callerIdNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "primaryNumber", [_nextCore.computed, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "primaryNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "smsSenderNumbers", [_nextCore.computed, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "smsSenderNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "faxSenderNumbers", [_nextCore.computed, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "faxSenderNumbers"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ExtensionPhoneNumber.js.map
