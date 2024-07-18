"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.define-property");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyClient;
require("regenerator-runtime/runtime");
var uuid = _interopRequireWildcard(require("uuid"));
var _RcModule2 = _interopRequireDefault(require("../RcModule"));
var _ensureExist = _interopRequireDefault(require("../ensureExist"));
var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));
var _getProxyClientReducer = _interopRequireDefault(require("./getProxyClientReducer"));
var _handleProxyAction = require("./handleProxyAction");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var defaultVerifyModuleFunc = function defaultVerifyModuleFunc(module) {
  return module instanceof _RcModule2["default"];
};
function getProxyClient(createTarget) {
  var verifyModuleFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultVerifyModuleFunc;
  return /*#__PURE__*/function (_RcModule) {
    _inherits(_class2, _RcModule);
    var _super = _createSuper(_class2);
    function _class2(_ref) {
      var _this;
      var transport = _ref.transport,
        options = _objectWithoutProperties(_ref, ["transport"]);
      _classCallCheck(this, _class2);
      _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
        actionTypes: _baseActionTypes["default"]
      }));
      _this._id = void 0;
      _this._syncPromise = void 0;
      _this._target = void 0;
      _this._transport = void 0;
      _this._id = uuid.v4();
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
      _this._transport = _ensureExist["default"].call(_assertThisInitialized(_this), transport, 'transport');
      _this._setTransport(_this._target);
      var _loop = function _loop(subModule) {
        if (Object.prototype.hasOwnProperty.call(_this._target, subModule) && verifyModuleFunc(_this._target[subModule])) {
          Object.defineProperty(_assertThisInitialized(_this), subModule, {
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
    _createClass(_class2, [{
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
        var _sync2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return this._transport.request({
                    payload: {
                      type: this.actionTypes.sync,
                      actionNumber: this.state.actionNumber
                    }
                  });
                case 3:
                  result = _context.sent;
                  this.store.dispatch(_objectSpread(_objectSpread({}, result), {}, {
                    type: this.actionTypes.sync
                  }));
                  _context.next = 9;
                  break;
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                case 9:
                  this._syncPromise = null;
                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
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
      } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    }, {
      key: "initialize",
      value: function () {
        var _initialize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var _this2 = this;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  // initialize the instance before sync to avoid history object from
                  // becoming out of sync
                  this._initialize(this._target);
                  this._transport.on(this._transport.events.push, /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
                      var action;
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              if (!(payload.type === _this2.actionTypes.action)) {
                                _context2.next = 11;
                                break;
                              }
                              if (!_this2._syncPromise) {
                                _context2.next = 4;
                                break;
                              }
                              _context2.next = 4;
                              return _this2._syncPromise;
                            case 4:
                              if (!(payload.actionNumber === _this2.state.actionNumber + 1)) {
                                _context2.next = 9;
                                break;
                              }
                              action = (0, _handleProxyAction.pushStates)(_this2._target, payload.action);
                              _this2.store.dispatch(_objectSpread(_objectSpread({}, payload), {}, {
                                action: action,
                                type: _this2.actionTypes.action
                              }));
                              _context2.next = 11;
                              break;
                            case 9:
                              _context2.next = 11;
                              return _this2.sync();
                            case 11:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));
                    return function (_x) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                  _context3.next = 4;
                  return this.sync();
                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));
        function initialize() {
          return _initialize2.apply(this, arguments);
        }
        return initialize;
      }()
    }]);
    return _class2;
  }(_RcModule2["default"]);
}
//# sourceMappingURL=getProxyClient.js.map
