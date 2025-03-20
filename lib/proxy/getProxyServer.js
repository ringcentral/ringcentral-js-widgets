"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.define-property");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyServer;
require("regenerator-runtime/runtime");
var _RcModule2 = _interopRequireDefault(require("../RcModule"));
var _ensureExist = _interopRequireDefault(require("../ensureExist"));
var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));
var _getProxyServerReducer = _interopRequireDefault(require("./getProxyServerReducer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
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

// @ts-expect-error TS(4094): Property '_getState' of exported class expression ... Remove this comment to see the full error message
function getProxyServer(createTarget) {
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
      _this._target = void 0;
      _this._transport = void 0;
      _this._target = createTarget(_objectSpread({}, options));
      _this._target._getState = function () {
        return _this.state.target;
      };
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

      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      _this._transport = _ensureExist["default"].call(_assertThisInitialized(_this), transport, 'transport');
      _this._reducer = (0, _getProxyServerReducer["default"])({
        moduleReducer: _this._target.reducer,
        transport: transport,
        prefix: _this.prefix
      });
      transport.on(transport.events.request, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
          var requestId, _ref2$payload, type, functionPath, args, actionNumber, _functionPath$split$s, _functionPath$split$s2, pathTokens, fnName, target, _target, result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  requestId = _ref2.requestId, _ref2$payload = _ref2.payload, type = _ref2$payload.type, functionPath = _ref2$payload.functionPath, args = _ref2$payload.args, actionNumber = _ref2$payload.actionNumber;
                  _context.t0 = type;
                  _context.next = _context.t0 === _this.actionTypes.execute ? 4 : _context.t0 === _this.actionTypes.sync ? 19 : 21;
                  break;
                case 4:
                  _functionPath$split$s = functionPath.split('.').slice(1), _functionPath$split$s2 = _toArray(_functionPath$split$s), pathTokens = _functionPath$split$s2.slice(0);
                  fnName = pathTokens.pop();
                  target = _this._target;
                  pathTokens.forEach(function (token) {
                    target = target[token];
                  });
                  _context.prev = 8;
                  _context.next = 11;
                  return (_target = target)[fnName].apply(_target, _toConsumableArray(args));
                case 11:
                  result = _context.sent;
                  transport.response({
                    requestId: requestId,
                    result: result
                  });
                  _context.next = 18;
                  break;
                case 15:
                  _context.prev = 15;
                  _context.t1 = _context["catch"](8);
                  transport.response({
                    requestId: requestId,
                    error: _context.t1
                  });
                case 18:
                  return _context.abrupt("break", 23);
                case 19:
                  if (actionNumber !== _this.state.actionNumber) {
                    transport.response({
                      requestId: requestId,
                      result: _this.state
                    });
                  } else {
                    transport.response({
                      requestId: requestId,
                      error: new Error('State is already up to date.')
                    });
                  }
                  return _context.abrupt("break", 23);
                case 21:
                  transport.response({
                    requestId: requestId,
                    error: new Error("Invalid request type '".concat(type, "'."))
                  });
                  return _context.abrupt("break", 23);
                case 23:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[8, 15]]);
        }));
        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
      return _this;
    }
    return _class2;
  }(_RcModule2["default"]);
}
//# sourceMappingURL=getProxyServer.js.map
