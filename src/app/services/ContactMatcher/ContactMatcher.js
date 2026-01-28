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
require("core-js/modules/es.number.constructor.js");
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
exports.ContactMatcher = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2;
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
var ContactMatcher = exports.ContactMatcher = (_dec = (0, _nextCore.injectable)({
  name: 'ContactMatcher'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ContactMatcherOptions')(target, undefined, 0);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof ContactMatcherOptions === "undefined" ? Object : ContactMatcherOptions, typeof _nextCore.StoragePlugin === "undefined" ? Object : _nextCore.StoragePlugin]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof HasMatchNumberOptions === "undefined" ? Object : HasMatchNumberOptions]), _dec9 = (0, _nextCore.delegate)('server'), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [typeof ForceMatchBatchNumbersOptions === "undefined" ? Object : ForceMatchBatchNumbersOptions]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [typeof ForceMatchNumberOptions === "undefined" ? Object : ForceMatchNumberOptions]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [void 0]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_DataMatcher) {
  function ContactMatcher(_contactMatcherOptions, _storage) {
    var _this;
    _classCallCheck(this, ContactMatcher);
    _this = _callSuper(this, ContactMatcher, [_storage]);
    _this._contactMatcherOptions = _contactMatcherOptions;
    _this._storage = _storage;
    /**
     * async function to get queries
     */
    _this.asyncGetQueries = void 0;
    return _this;
  }
  _inherits(ContactMatcher, _DataMatcher);
  return _createClass(ContactMatcher, [{
    key: "dataMatcherOptions",
    get: function get() {
      var _this$_contactMatcher;
      return (_this$_contactMatcher = this._contactMatcherOptions) !== null && _this$_contactMatcher !== void 0 ? _this$_contactMatcher : {};
    }
  }, {
    key: "hasMatchNumber",
    value: function () {
      var _hasMatchNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var _this$dataMapping$pho;
        var phoneNumber, _ref$ignoreCache, ignoreCache;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              phoneNumber = _ref.phoneNumber, _ref$ignoreCache = _ref.ignoreCache, ignoreCache = _ref$ignoreCache === void 0 ? false : _ref$ignoreCache;
              _context.n = 1;
              return this.match({
                queries: [phoneNumber],
                ignoreCache: ignoreCache
              });
            case 1:
              return _context.a(2, ((_this$dataMapping$pho = this.dataMapping[phoneNumber]) === null || _this$dataMapping$pho === void 0 ? void 0 : _this$dataMapping$pho.length) > 0);
          }
        }, _callee, this);
      }));
      function hasMatchNumber(_x) {
        return _hasMatchNumber.apply(this, arguments);
      }
      return hasMatchNumber;
    }()
  }, {
    key: "forceMatchBatchNumbers",
    value: function () {
      var _forceMatchBatchNumbers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref2) {
        var phoneNumbers;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              phoneNumbers = _ref2.phoneNumbers;
              _context2.n = 1;
              return this.match({
                queries: phoneNumbers,
                ignoreCache: true,
                ignoreQueue: true
              });
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function forceMatchBatchNumbers(_x2) {
        return _forceMatchBatchNumbers.apply(this, arguments);
      }
      return forceMatchBatchNumbers;
    }()
  }, {
    key: "forceMatchNumber",
    value: function () {
      var _forceMatchNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref3) {
        var phoneNumber;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              phoneNumber = _ref3.phoneNumber;
              _context3.n = 1;
              return this.forceMatchBatchNumbers({
                phoneNumbers: [phoneNumber]
              });
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function forceMatchNumber(_x3) {
        return _forceMatchNumber.apply(this, arguments);
      }
      return forceMatchNumber;
    }()
  }, {
    key: "triggerMatch",
    value: function () {
      var _triggerMatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _ref4,
          _ref4$ignoreCache,
          ignoreCache,
          _ref4$ignoreQueue,
          ignoreQueue,
          queries,
          _queries,
          _args4 = arguments,
          _t,
          _t2;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _ref4 = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {}, _ref4$ignoreCache = _ref4.ignoreCache, ignoreCache = _ref4$ignoreCache === void 0 ? false : _ref4$ignoreCache, _ref4$ignoreQueue = _ref4.ignoreQueue, ignoreQueue = _ref4$ignoreQueue === void 0 ? false : _ref4$ignoreQueue, queries = _ref4.queries;
              if (!this.ready) {
                _context4.n = 6;
                break;
              }
              if (!(queries !== null && queries !== void 0)) {
                _context4.n = 1;
                break;
              }
              _t = queries;
              _context4.n = 5;
              break;
            case 1:
              if (!this.asyncGetQueries) {
                _context4.n = 3;
                break;
              }
              _context4.n = 2;
              return this.asyncGetQueries();
            case 2:
              _t2 = _context4.v;
              _context4.n = 4;
              break;
            case 3:
              _t2 = this._getQueries();
            case 4:
              _t = _t2;
            case 5:
              _queries = _t;
              this._cleanUp();
              _context4.n = 6;
              return this.match({
                queries: _queries,
                ignoreCache: ignoreCache,
                ignoreQueue: ignoreQueue
              });
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function triggerMatch() {
        return _triggerMatch.apply(this, arguments);
      }
      return triggerMatch;
    }()
  }]);
}(_services.DataMatcher), _applyDecoratedDescriptor(_class2.prototype, "hasMatchNumber", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "hasMatchNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchBatchNumbers", [_dec9, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchBatchNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchNumber", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triggerMatch", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "triggerMatch"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=ContactMatcher.js.map
