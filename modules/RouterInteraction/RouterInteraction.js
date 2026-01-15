"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
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
exports["default"] = void 0;
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _moduleStatuses = _interopRequireDefault(require("@ringcentral-integration/commons/enums/moduleStatuses"));
var _RcModule2 = _interopRequireDefault(require("@ringcentral-integration/commons/lib/RcModule"));
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _reactRouter = require("react-router");
var _reactRouterRedux = require("react-router-redux");
var _excluded = ["history"];
var _dec, _class, _class2; // @ts-nocheck
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
function getDefaultHistory() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (0, _reactRouter.useRouterHistory)(_reactRouter.createMemoryHistory)();
}
/**
 * Known issues for browser history:
 * https://github.com/reactjs/react-router-redux/issues/570
 * https://github.com/ReactTraining/history/issues/427
 */
var RouterInteraction = exports["default"] = (_dec = (0, _di.Module)({
  deps: [{
    dep: 'RouterInteractionOptions',
    optional: true,
    spread: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function RouterInteraction(_ref) {
    var _this;
    var _ref$history = _ref.history,
      history = _ref$history === void 0 ? getDefaultHistory() : _ref$history,
      options = _objectWithoutProperties(_ref, _excluded);
    _classCallCheck(this, RouterInteraction);
    _this = _callSuper(this, RouterInteraction, [_objectSpread({}, options)]);
    _this._reducer = _reactRouterRedux.routerReducer;
    _this._history = history;
    return _this;
  }
  _inherits(RouterInteraction, _RcModule);
  return _createClass(RouterInteraction, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;
      this._history = (0, _reactRouterRedux.syncHistoryWithStore)(this._history, this.store, {
        selectLocationState: function selectLocationState() {
          return _this2.state;
        }
      });
    }
  }, {
    key: "initializeProxy",
    value: function initializeProxy() {
      var _this3 = this;
      this._history = (0, _reactRouterRedux.syncHistoryWithStore)(this._history, this.store, {
        selectLocationState: function selectLocationState() {
          return _this3.state;
        }
      });
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      /* no action types */
      return null;
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: "history",
    get: function get() {
      return this._history;
    }
  }, {
    key: "currentPath",
    get: function get() {
      var _this$state$locationB, _this$state$locationB2;
      // according to sentry, locationBeforeTransitions can be null
      return (_this$state$locationB = (_this$state$locationB2 = this.state.locationBeforeTransitions) === null || _this$state$locationB2 === void 0 ? void 0 : _this$state$locationB2.pathname) !== null && _this$state$locationB !== void 0 ? _this$state$locationB : '/';
    }
  }, {
    key: "status",
    get: function get() {
      return _moduleStatuses["default"].ready;
    }
  }, {
    key: "push",
    value: function () {
      var _push = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$_history;
        var _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              (_this$_history = this._history).push.apply(_this$_history, _args);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function push() {
        return _push.apply(this, arguments);
      }
      return push;
    }()
  }, {
    key: "replace",
    value: function () {
      var _replace = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this$_history2;
        var _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              (_this$_history2 = this._history).replace.apply(_this$_history2, _args2);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function replace() {
        return _replace.apply(this, arguments);
      }
      return replace;
    }()
  }, {
    key: "goBack",
    value: function () {
      var _goBack = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _this$_history3;
        var _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              (_this$_history3 = this._history).goBack.apply(_this$_history3, _args3);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function goBack() {
        return _goBack.apply(this, arguments);
      }
      return goBack;
    }()
  }, {
    key: "go",
    value: function () {
      var _go = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this$_history4;
        var _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              (_this$_history4 = this._history).go.apply(_this$_history4, _args4);
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function go() {
        return _go.apply(this, arguments);
      }
      return go;
    }()
  }, {
    key: "actionTypes",
    get: function get() {
      return {
        locationChange: _reactRouterRedux.LOCATION_CHANGE
      };
    }
  }]);
}(_RcModule2["default"]), _applyDecoratedDescriptor(_class2.prototype, "push", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "push"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "replace", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "replace"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "goBack", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "goBack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "go", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "go"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=RouterInteraction.js.map
