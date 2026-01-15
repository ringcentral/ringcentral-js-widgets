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
exports.ExtensionInfo = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.includes.js");
var _core = require("@ringcentral-integration/core");
var _permissionsMessages = require("../../enums/permissionsMessages");
var _subscriptionFilters = require("../../enums/subscriptionFilters");
var _subscriptionHints = require("../../enums/subscriptionHints");
var _renameTurkey = require("../../helpers/renameTurkey");
var _di = require("../../lib/di");
var _DataFetcherV = require("../DataFetcherV2");
var _dec, _dec2, _dec3, _class, _class2;
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
var extensionRegExp = /.*\/extension\/\d+$/;
var DEFAULT_COUNTRY = {
  id: '1',
  isoCode: 'US',
  callingCode: '1'
};
var ExtensionInfo = exports.ExtensionInfo = (_dec = (0, _di.Module)({
  name: 'ExtensionInfo',
  deps: ['Auth', 'Client', 'DataFetcherV2', 'ExtensionFeatures', {
    dep: 'Subscription',
    optional: true
  }, 'Alert', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'ExtensionInfoOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var info = _ref2.info;
  return [info];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  function ExtensionInfo(deps) {
    var _this$_deps$extension, _this$_deps$subscript;
    var _this;
    _classCallCheck(this, ExtensionInfo);
    _this = _callSuper(this, ExtensionInfo, [{
      deps: deps
    }]);
    // @ts-expect-error TS(2564): Property '_stopWatching' has no initializer and is... Remove this comment to see the full error message
    _this._stopWatching = void 0;
    var extensionInfoOptions = (_this$_deps$extension = _this._deps.extensionInfoOptions) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : {};
    var _extensionInfoOptions = extensionInfoOptions.polling,
      polling = _extensionInfoOptions === void 0 ? true : _extensionInfoOptions;
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, extensionInfoOptions), {}, {
      key: 'extensionInfo',
      polling: polling,
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var result, _error$response, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.p = 0;
                _context.n = 1;
                return _this._deps.client.account().extension().get();
              case 1:
                result = _context.v;
                return _context.a(2, result);
              case 2:
                _context.p = 2;
                _t = _context.v;
                if (!(((_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403)) {
                  _context.n = 4;
                  break;
                }
                _context.n = 3;
                return _this._deps.auth.logout();
              case 3:
                _this._deps.alert.danger({
                  message: _permissionsMessages.permissionsMessages.insufficientPrivilege,
                  ttl: 0
                });
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
        return _this._deps.auth.loggedIn;
      }
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    (_this$_deps$subscript = _this._deps.subscription) === null || _this$_deps$subscript === void 0 ? void 0 : _this$_deps$subscript.register(_this, {
      filters: [_subscriptionFilters.subscriptionFilters.extensionInfo]
    });
    return _this;
  }
  _inherits(ExtensionInfo, _DataFetcherV2Consume);
  return _createClass(ExtensionInfo, [{
    key: "_handleSubscription",
    value: function _handleSubscription(message) {
      var _this$_deps$tabManage, _this$_deps$tabManage2, _message$body, _message$body$hints, _message$body2, _message$body2$hints, _message$body3, _message$body3$hints, _message$body4, _message$body4$hints, _message$body5, _message$body5$hints;
      if (this.ready && (this._source.disableCache || ((_this$_deps$tabManage = (_this$_deps$tabManage2 = this._deps.tabManager) === null || _this$_deps$tabManage2 === void 0 ? void 0 : _this$_deps$tabManage2.active) !== null && _this$_deps$tabManage !== void 0 ? _this$_deps$tabManage : true)) && (message === null || message === void 0 ? void 0 : message.event) && extensionRegExp.test(message.event) && !(((_message$body = message.body) === null || _message$body === void 0 ? void 0 : (_message$body$hints = _message$body.hints) === null || _message$body$hints === void 0 ? void 0 : _message$body$hints.includes(_subscriptionHints.subscriptionHints.companyNumbers)) || ((_message$body2 = message.body) === null || _message$body2 === void 0 ? void 0 : (_message$body2$hints = _message$body2.hints) === null || _message$body2$hints === void 0 ? void 0 : _message$body2$hints.includes(_subscriptionHints.subscriptionHints.limits)) || ((_message$body3 = message.body) === null || _message$body3 === void 0 ? void 0 : (_message$body3$hints = _message$body3.hints) === null || _message$body3$hints === void 0 ? void 0 : _message$body3$hints.includes(_subscriptionHints.subscriptionHints.features)) || ((_message$body4 = message.body) === null || _message$body4 === void 0 ? void 0 : (_message$body4$hints = _message$body4.hints) === null || _message$body4$hints === void 0 ? void 0 : _message$body4$hints.includes(_subscriptionHints.subscriptionHints.permissions)) || ((_message$body5 = message.body) === null || _message$body5 === void 0 ? void 0 : (_message$body5$hints = _message$body5.hints) === null || _message$body5$hints === void 0 ? void 0 : _message$body5$hints.includes(_subscriptionHints.subscriptionHints.videoConfiguration)))) {
        this.fetchData();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;
      if (this._deps.subscription) {
        this._stopWatching = (0, _core.watch)(this, function () {
          return _this2._deps.subscription.message;
        }, function (message) {
          return _this2._handleSubscription(message);
        });
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;
      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
      this._stopWatching = null;
    }
  }, {
    key: "info",
    get: function get() {
      var _this$data, _this$data$regionalSe, _this$data2;
      if ((_this$data = this.data) === null || _this$data === void 0 ? void 0 : (_this$data$regionalSe = _this$data.regionalSettings) === null || _this$data$regionalSe === void 0 ? void 0 : _this$data$regionalSe.homeCountry) {
        (0, _renameTurkey.renameTurkeyCountry)(this.data.regionalSettings.homeCountry);
      }
      return (_this$data2 = this.data) !== null && _this$data2 !== void 0 ? _this$data2 : {};
    }
  }, {
    key: "id",
    get: function get() {
      return this.info.id;
    }
  }, {
    key: "extensionNumber",
    get: function get() {
      return this.info.extensionNumber;
    }
  }, {
    key: "country",
    get: function get() {
      var _this$info$regionalSe;
      return ((_this$info$regionalSe = this.info.regionalSettings) === null || _this$info$regionalSe === void 0 ? void 0 : _this$info$regionalSe.homeCountry) || DEFAULT_COUNTRY;
    }
  }, {
    key: "departments",
    get: function get() {
      return this.info.departments;
    }
  }, {
    key: "isMultipleSiteEnabled",
    get: function get() {
      var _this$_deps$extension2, _this$_deps$extension3;
      return !!((_this$_deps$extension2 = (_this$_deps$extension3 = this._deps.extensionInfoOptions) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.isMultipleSiteEnabled) !== null && _this$_deps$extension2 !== void 0 ? _this$_deps$extension2 : false);
    }
  }, {
    key: "site",
    get: function get() {
      var _this$_deps$extension4, _this$_deps$extension5;
      if (!this.isMultipleSiteEnabled) {
        return null;
      }
      if (((_this$_deps$extension4 = this._deps.extensionFeatures.features) === null || _this$_deps$extension4 === void 0 ? void 0 : (_this$_deps$extension5 = _this$_deps$extension4.SiteCodes) === null || _this$_deps$extension5 === void 0 ? void 0 : _this$_deps$extension5.available) && !this.info.site) {
        console.warn('site code enabled, but cannot retrieve site info');
      }
      return this.info.site || null;
    }
  }, {
    key: "isCallQueueMember",
    get: function get() {
      return !!this.departments && Array.isArray(this.departments) && this.departments.length > 0;
    }
  }, {
    key: "isoCode",
    get: function get() {
      var _this$info$regionalSe2, _this$info$regionalSe3;
      return (_this$info$regionalSe2 = this.info.regionalSettings) === null || _this$info$regionalSe2 === void 0 ? void 0 : (_this$info$regionalSe3 = _this$info$regionalSe2.homeCountry) === null || _this$info$regionalSe3 === void 0 ? void 0 : _this$info$regionalSe3.isoCode;
    }
  }]);
}(_DataFetcherV.DataFetcherV2Consumer), _applyDecoratedDescriptor(_class2.prototype, "info", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "info"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "site", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "site"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=ExtensionInfo.js.map
