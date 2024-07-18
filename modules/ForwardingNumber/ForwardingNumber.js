"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.includes");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.string.includes");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForwardingNumber = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _ramda = require("ramda");
var _di = require("../../lib/di");
var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));
var _DataFetcherV = require("../DataFetcherV2");
var _dec, _dec2, _dec3, _dec4, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var ForwardingNumber = (_dec = (0, _di.Module)({
  name: 'ForwardingNumber',
  deps: ['Client', 'ExtensionFeatures', 'DataFetcherV2', {
    dep: 'ForwardingNumberOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var data = _ref.data;
  return [data];
}), _dec3 = (0, _core.computed)(function (_ref2) {
  var numbers = _ref2.numbers;
  return [numbers];
}), _dec4 = (0, _core.computed)(function (_ref3) {
  var numbers = _ref3.numbers;
  return [numbers];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataFetcherV2Consume) {
  _inherits(ForwardingNumber, _DataFetcherV2Consume);
  var _super = _createSuper(ForwardingNumber);
  function ForwardingNumber(deps) {
    var _this;
    _classCallCheck(this, ForwardingNumber);
    _this = _super.call(this, {
      deps: deps
    });
    _this._source = new _DataFetcherV.DataSource(_objectSpread(_objectSpread({}, deps.forwardingNumberOptions), {}, {
      key: 'forwardingNumber',
      cleanOnReset: true,
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var forwardingNumbers, _error$response;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return (0, _fetchList["default"])(function (params) {
                    return _this._deps.client.account().extension().forwardingNumber().list(params);
                  });
                case 3:
                  forwardingNumbers = _context.sent;
                  return _context.abrupt("return", forwardingNumbers);
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  if (!(((_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 403)) {
                    _context.next = 11;
                    break;
                  }
                  return _context.abrupt("return", []);
                case 11:
                  throw _context.t0;
                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 7]]);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        return _this._deps.extensionFeatures.ready;
      },
      permissionCheckFunction: function permissionCheckFunction() {
        var _this$_deps$extension, _this$_deps$extension2, _this$_deps$extension3;
        return (_this$_deps$extension = (_this$_deps$extension2 = _this._deps.extensionFeatures.features) === null || _this$_deps$extension2 === void 0 ? void 0 : (_this$_deps$extension3 = _this$_deps$extension2.ReadExtensionAnsweringRules) === null || _this$_deps$extension3 === void 0 ? void 0 : _this$_deps$extension3.available) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false;
      }
    }));
    _this._deps.dataFetcherV2.register(_this._source);
    return _this;
  }
  _createClass(ForwardingNumber, [{
    key: "numbers",
    get: function get() {
      var _this$data;
      return (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : [];
    }
  }, {
    key: "flipNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        var _phoneNumber$features;
        return !!(((_phoneNumber$features = phoneNumber.features) === null || _phoneNumber$features === void 0 ? void 0 : _phoneNumber$features.includes('CallFlip')) && phoneNumber.phoneNumber);
      }, this.numbers);
    }
  }, {
    key: "forwardingNumbers",
    get: function get() {
      return (0, _ramda.filter)(function (phoneNumber) {
        var _phoneNumber$features2;
        return !!(((_phoneNumber$features2 = phoneNumber.features) === null || _phoneNumber$features2 === void 0 ? void 0 : _phoneNumber$features2.includes('CallForwarding')) && phoneNumber.phoneNumber);
      }, this.numbers);
    }
  }]);
  return ForwardingNumber;
}(_DataFetcherV.DataFetcherV2Consumer), (_applyDecoratedDescriptor(_class2.prototype, "numbers", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "numbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flipNumbers", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "flipNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forwardingNumbers", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "forwardingNumbers"), _class2.prototype)), _class2)) || _class);
exports.ForwardingNumber = ForwardingNumber;
//# sourceMappingURL=ForwardingNumber.js.map
