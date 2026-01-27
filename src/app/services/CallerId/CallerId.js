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
exports.CallerId = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _ramda = require("ramda");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2;
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
var CallerId = exports.CallerId = (_dec = (0, _nextCore.injectable)({
  name: 'CallerId'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('CallerIdOptions')(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.DataFetcher === "undefined" ? Object : _services.DataFetcher, typeof CallerIdOptions === "undefined" ? Object : CallerIdOptions]), _dec5 = (0, _nextCore.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", []), _dec8 = (0, _nextCore.computed)(function (_ref2) {
  var data = _ref2.data;
  return [data];
}), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = (0, _nextCore.computed)(function (_ref3) {
  var byFeature = _ref3.byFeature;
  return [byFeature];
}), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", []), _dec12 = (0, _nextCore.computed)(function (_ref4) {
  var byFeature = _ref4.byFeature;
  return [byFeature];
}), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", []), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String, Object]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_DataFetcherConsumer) {
  function CallerId(_client, _dataFetcher, _callerIdOptions) {
    var _this;
    _classCallCheck(this, CallerId);
    _this = _callSuper(this, CallerId, [_dataFetcher]);
    _this._client = _client;
    _this._dataFetcher = _dataFetcher;
    _this._callerIdOptions = _callerIdOptions;
    _this._source = new _services.DataSource(_objectSpread(_objectSpread({}, _this._callerIdOptions), {}, {
      key: 'callerId',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var response;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return _this._client.service.platform().get('/restapi/v1.0/account/~/extension/~/caller-id');
              case 1:
                response = _context.v;
                return _context.a(2, response.json());
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }()
    }));
    _this._dataFetcher.register(_this._source);
    return _this;
  }
  _inherits(CallerId, _DataFetcherConsumer);
  return _createClass(CallerId, [{
    key: "byDevice",
    get: function get() {
      var _this$data$byDevice, _this$data;
      return (_this$data$byDevice = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : _this$data.byDevice) !== null && _this$data$byDevice !== void 0 ? _this$data$byDevice : [];
    }
  }, {
    key: "byFeature",
    get: function get() {
      var _this$data$byFeature, _this$data2;
      return (_this$data$byFeature = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.byFeature) !== null && _this$data$byFeature !== void 0 ? _this$data$byFeature : [];
    }
  }, {
    key: "ringOut",
    get: function get() {
      var _find;
      return (_find = (0, _ramda.find)(function (item) {
        return item.feature === 'RingOut';
      }, this.byFeature)) === null || _find === void 0 ? void 0 : _find.callerId;
    }
  }, {
    key: "faxNumber",
    get: function get() {
      var _find2, _find2$callerId, _find2$callerId$phone;
      return (_find2 = (0, _ramda.find)(function (item) {
        return item.feature === 'FaxNumber';
      }, this.byFeature)) === null || _find2 === void 0 ? void 0 : (_find2$callerId = _find2.callerId) === null || _find2$callerId === void 0 ? void 0 : (_find2$callerId$phone = _find2$callerId.phoneInfo) === null || _find2$callerId$phone === void 0 ? void 0 : _find2$callerId$phone.phoneNumber;
    }
  }, {
    key: "setDefaultCallerId",
    value: function () {
      var _setDefaultCallerId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(newCallerId, feature) {
        var payload, res, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              payload = {
                byFeature: [{
                  feature: feature,
                  callerId: newCallerId === '0' ? {
                    type: 'Blocked'
                  } : {
                    phoneInfo: {
                      id: newCallerId
                    }
                  }
                }]
              };
              _context2.n = 1;
              return this._client.service.platform().put('/restapi/v1.0/account/~/extension/~/caller-id', payload);
            case 1:
              res = _context2.v;
              _context2.n = 2;
              return res.json();
            case 2:
              result = _context2.v;
              this.updateData(result);
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setDefaultCallerId(_x, _x2) {
        return _setDefaultCallerId.apply(this, arguments);
      }
      return setDefaultCallerId;
    }()
  }]);
}(_services.DataFetcherConsumer), _applyDecoratedDescriptor(_class2.prototype, "byDevice", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "byDevice"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "byFeature", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "byFeature"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ringOut", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "ringOut"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "faxNumber", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "faxNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDefaultCallerId", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "setDefaultCallerId"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CallerId.js.map
