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
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionNumberAreaCode = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _AppFeatures = require("../AppFeatures");
var _Client = require("../Client");
var _DataFetcher = require("../DataFetcher");
var _ExtensionFeatures = require("../ExtensionFeatures");
var _ExtensionPhoneNumber = require("../ExtensionPhoneNumber");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2;
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
var ExtensionNumberAreaCode = exports.ExtensionNumberAreaCode = (_dec = (0, _nextCore.injectable)({
  name: 'ExtensionNumberAreaCode'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('TabManager')(target, undefined, 5);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _AppFeatures.AppFeatures === "undefined" ? Object : _AppFeatures.AppFeatures, typeof _Client.Client === "undefined" ? Object : _Client.Client, typeof _DataFetcher.DataFetcher === "undefined" ? Object : _DataFetcher.DataFetcher, typeof _ExtensionFeatures.ExtensionFeatures === "undefined" ? Object : _ExtensionFeatures.ExtensionFeatures, typeof _ExtensionPhoneNumber.ExtensionPhoneNumber === "undefined" ? Object : _ExtensionPhoneNumber.ExtensionPhoneNumber, Object]), _dec5 = (0, _nextCore.computed)(function (that) {
  return [that._extensionPhoneNumber.primaryNumber, that._extensionPhoneNumber.mainCompanyNumber];
}), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec8 = (0, _nextCore.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_DataFetcherConsumer) {
  function ExtensionNumberAreaCode(_appFeatures, _client, _dataFetcher, _extensionFeatures, _extensionPhoneNumber, _tabManager) {
    var _this;
    _classCallCheck(this, ExtensionNumberAreaCode);
    _this = _callSuper(this, ExtensionNumberAreaCode, [_dataFetcher]);
    _this._appFeatures = _appFeatures;
    _this._client = _client;
    _this._dataFetcher = _dataFetcher;
    _this._extensionFeatures = _extensionFeatures;
    _this._extensionPhoneNumber = _extensionPhoneNumber;
    _this._tabManager = _tabManager;
    _this._stopWatching = void 0;
    _this._source = new _DataFetcher.DataSource({
      key: 'ExtensionNumberAreaCode',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var response, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.p = 0;
                _context.n = 1;
                return _this._client.service.platform().post('/restapi/v2/number-parser/parse', {
                  originalStrings: _this.originalString,
                  contextSource: 'Account',
                  context: {
                    outboundCallPrefix: _this._appFeatures.OCPValue
                  }
                });
              case 1:
                response = _context.v;
                return _context.a(2, response.json());
              case 2:
                _context.p = 2;
                _t = _context.v;
                console.error('fetch extensionNumberAreaCode', _t);
                return _context.a(2, {
                  results: []
                });
            }
          }, _callee, null, [[0, 2]]);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return !!_this._extensionPhoneNumber.ready && !!_this._appFeatures.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_extensionFeatu, _this$_extensionFeatu2, _this$_extensionFeatu3;
        return (_this$_extensionFeatu = (_this$_extensionFeatu2 = _this._extensionFeatures.features) === null || _this$_extensionFeatu2 === void 0 ? void 0 : (_this$_extensionFeatu3 = _this$_extensionFeatu2.ReadExtensionPhoneNumbers) === null || _this$_extensionFeatu3 === void 0 ? void 0 : _this$_extensionFeatu3.available) !== null && _this$_extensionFeatu !== void 0 ? _this$_extensionFeatu : false;
      }
    });
    _this._dataFetcher.register(_this._source);
    return _this;
  }
  _inherits(ExtensionNumberAreaCode, _DataFetcherConsumer);
  return _createClass(ExtensionNumberAreaCode, [{
    key: "_handleDataChange",
    value: function _handleDataChange() {
      var _this$_tabManager$act, _this$_tabManager;
      if (this.ready && (this._source.disableCache || ((_this$_tabManager$act = (_this$_tabManager = this._tabManager) === null || _this$_tabManager === void 0 ? void 0 : _this$_tabManager.active) !== null && _this$_tabManager$act !== void 0 ? _this$_tabManager$act : true))) {
        this.fetchData();
      }
    }
  }, {
    key: "onInit",
    value: function onInit() {
      var _this2 = this;
      this._stopWatching = (0, _nextCore.watch)(this, function () {
        return _this2.originalString;
      }, function () {
        return _this2._handleDataChange();
      });
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this$_stopWatching;
      (_this$_stopWatching = this._stopWatching) === null || _this$_stopWatching === void 0 ? void 0 : _this$_stopWatching.call(this);
      this._stopWatching = undefined;
    }
  }, {
    key: "originalString",
    get: function get() {
      var _this$_extensionPhone, _this$_extensionPhone2, _this$_extensionPhone3;
      var mainCompanyNumber = (_this$_extensionPhone = this._extensionPhoneNumber.mainCompanyNumber) === null || _this$_extensionPhone === void 0 ? void 0 : _this$_extensionPhone.phoneNumber;
      var primaryNumber = (_this$_extensionPhone2 = (_this$_extensionPhone3 = this._extensionPhoneNumber.primaryNumber) === null || _this$_extensionPhone3 === void 0 ? void 0 : _this$_extensionPhone3.phoneNumber) !== null && _this$_extensionPhone2 !== void 0 ? _this$_extensionPhone2 : mainCompanyNumber;
      return [primaryNumber, mainCompanyNumber];
    }
  }, {
    key: "defaultAreaCode",
    get: function get() {
      var _primaryNumber$number, _primaryNumber$number2, _mainCompanyNumber$nu;
      if (!this.data) {
        return;
      }
      var _this$data$results = _slicedToArray(this.data.results, 2),
        primaryNumber = _this$data$results[0],
        mainCompanyNumber = _this$data$results[1];
      return (_primaryNumber$number = primaryNumber === null || primaryNumber === void 0 ? void 0 : (_primaryNumber$number2 = primaryNumber.numberDetails) === null || _primaryNumber$number2 === void 0 ? void 0 : _primaryNumber$number2.areaCode) !== null && _primaryNumber$number !== void 0 ? _primaryNumber$number : mainCompanyNumber === null || mainCompanyNumber === void 0 ? void 0 : (_mainCompanyNumber$nu = mainCompanyNumber.numberDetails) === null || _mainCompanyNumber$nu === void 0 ? void 0 : _mainCompanyNumber$nu.areaCode;
    }
  }]);
}(_DataFetcher.DataFetcherConsumer), _applyDecoratedDescriptor(_class2.prototype, "originalString", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "originalString"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defaultAreaCode", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "defaultAreaCode"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ExtensionNumberAreaCode.js.map
