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
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyClient;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _uuid = require("uuid");
var _RcModule2 = _interopRequireDefault(require("../RcModule"));
var _ensureExist = _interopRequireDefault(require("../ensureExist"));
var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));
var _getProxyClientReducer = _interopRequireDefault(require("./getProxyClientReducer"));
var _handleProxyAction = require("./handleProxyAction");
var _excluded = ["transport"];
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
var defaultVerifyModuleFunc = function defaultVerifyModuleFunc(module) {
  return module instanceof _RcModule2["default"];
};
function getProxyClient(createTarget) {
  var verifyModuleFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultVerifyModuleFunc;
  return /*#__PURE__*/function (_RcModule) {
    function _class(_ref) {
      var _this;
      var transport = _ref.transport,
        options = _objectWithoutProperties(_ref, _excluded);
      _classCallCheck(this, _class);
      _this = _callSuper(this, _class, [_objectSpread(_objectSpread({}, options), {}, {
        actionTypes: _baseActionTypes["default"]
      })]);
      _this._id = void 0;
      _this._syncPromise = void 0;
      _this._target = void 0;
      _this._transport = void 0;
      _this._id = (0, _uuid.v4)();
      _this._target = createTarget(_objectSpread({}, options));
      // Used by client to dispatch action.
      // this._target.__proxyAction__ = this.actionTypes.action;
      _this._target._getState = function () {
        return _this.state.target;
      };
      _this._target._getProxyState = function () {
        return _this.state.proxy;
      };
      // this._target = new Target({
      //   ...options,
      //   getState: () => this.state.target,
      //   getProxyState: () => this.state.proxy,
      // });
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      _this._transport = _ensureExist["default"].call(_this, transport, 'transport');
      _this._setTransport(_this._target);
      var _loop = function _loop(subModule) {
        if (Object.prototype.hasOwnProperty.call(_this._target, subModule) && verifyModuleFunc(_this._target[subModule])) {
          Object.defineProperty(_this, subModule, {
            configurable: false,
            enumerable: true,
            get: function get() {
              return this._target[subModule];
            }
          });
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          _this[subModule]._getStateV2 = function (state, key) {
            return state.target[key];
          };
        }
      };
      for (var subModule in _this._target) {
        _loop(subModule);
      }
      _this._reducer = (0, _getProxyClientReducer["default"])({
        targetReducer: _this._target.reducer,
        proxyReducer: _this._target.proxyReducer,
        transport: transport,
        types: _this.actionTypes
      });
      return _this;
    }
    _inherits(_class, _RcModule);
    return _createClass(_class, [{
      key: "_setTransport",
      value: function _setTransport(target) {
        target._transport = this._transport;
        target._proxyActionTypes = this.actionTypes;
        target._suppressInit = true;
        for (var subModule in target) {
          if (Object.prototype.hasOwnProperty.call(target, subModule) && verifyModuleFunc(target[subModule])) {
            target[subModule]._transport = this._transport;
            target[subModule]._proxyActionTypes = this.actionTypes;
            target[subModule]._suppressInit = true;
          }
        }
      }
    }, {
      key: "_sync",
      value: function () {
        var _sync2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var result, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.p = 0;
                _context.n = 1;
                return this._transport.request({
                  payload: {
                    type: this.actionTypes.sync,
                    actionNumber: this.state.actionNumber
                  }
                });
              case 1:
                result = _context.v;
                this.store.dispatch(_objectSpread(_objectSpread({}, result), {}, {
                  type: this.actionTypes.sync
                }));
                _context.n = 3;
                break;
              case 2:
                _context.p = 2;
                _t = _context.v;
              case 3:
                this._syncPromise = null;
              case 4:
                return _context.a(2);
            }
          }, _callee, this, [[0, 2]]);
        }));
        function _sync() {
          return _sync2.apply(this, arguments);
        }
        return _sync;
      }()
    }, {
      key: "sync",
      value: function sync() {
        if (!this._syncPromise) {
          this._syncPromise = this._sync();
        }
        return this._syncPromise;
      }
    }, {
      key: "_initialize",
      value: function _initialize(target) {
        if (typeof target.initializeProxy === 'function' && !target._proxyInitialized) {
          target._proxyInitialized = true;
          target.initializeProxy();
        }
        for (var subModule in target) {
          if (Object.prototype.hasOwnProperty.call(target, subModule) && verifyModuleFunc(target[subModule]) && typeof target[subModule].initializeProxy === 'function' && !target[subModule]._proxyInitialized) {
            target[subModule]._proxyInitialized = true;
            target[subModule].initializeProxy();
          }
        }
      }

      // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    }, {
      key: "initialize",
      value: function () {
        var _initialize2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var _this2 = this;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                // initialize the instance before sync to avoid history object from
                // becoming out of sync
                this._initialize(this._target);
                this._transport.on(this._transport.events.push, /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(payload) {
                    var action;
                    return _regenerator().w(function (_context2) {
                      while (1) switch (_context2.n) {
                        case 0:
                          if (!(payload.type === _this2.actionTypes.action)) {
                            _context2.n = 3;
                            break;
                          }
                          if (!_this2._syncPromise) {
                            _context2.n = 1;
                            break;
                          }
                          _context2.n = 1;
                          return _this2._syncPromise;
                        case 1:
                          if (!(payload.actionNumber === _this2.state.actionNumber + 1)) {
                            _context2.n = 2;
                            break;
                          }
                          action = (0, _handleProxyAction.pushStates)(_this2._target, payload.action);
                          _this2.store.dispatch(_objectSpread(_objectSpread({}, payload), {}, {
                            action: action,
                            type: _this2.actionTypes.action
                          }));
                          _context2.n = 3;
                          break;
                        case 2:
                          _context2.n = 3;
                          return _this2.sync();
                        case 3:
                          return _context2.a(2);
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context3.n = 1;
                return this.sync();
              case 1:
                return _context3.a(2);
            }
          }, _callee3, this);
        }));
        function initialize() {
          return _initialize2.apply(this, arguments);
        }
        return initialize;
      }()
    }]);
  }(_RcModule2["default"]);
}
//# sourceMappingURL=getProxyClient.js.map
