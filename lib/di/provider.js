"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueProvider = exports.Provider = exports.FactoryProvider = exports.ExistingProvider = exports.ClassProvider = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// @ts-nocheck
var Provider = /*#__PURE__*/function () {
  function Provider(token, isPrivate) {
    _classCallCheck(this, Provider);
    this.token = token;
    // Provider instance reference
    this.instance = null;
    this["private"] = isPrivate || false;
  }
  _createClass(Provider, [{
    key: "setInstance",
    value: function setInstance(instance) {
      this.instance = instance;
    }
  }, {
    key: "getInstance",
    value: function getInstance() {
      return this.instance;
    }
  }, {
    key: "resolved",
    value: function resolved() {
      return this.instance !== null;
    }
  }]);
  return Provider;
}();
exports.Provider = Provider;
var ClassProvider = /*#__PURE__*/function (_Provider) {
  _inherits(ClassProvider, _Provider);
  var _super = _createSuper(ClassProvider);
  function ClassProvider(token, klass, deps, isPrivate) {
    var _this;
    _classCallCheck(this, ClassProvider);
    _this = _super.call(this, token, isPrivate);
    _this.klass = klass;
    _this.deps = deps;
    return _this;
  }
  return ClassProvider;
}(Provider);
exports.ClassProvider = ClassProvider;
var ExistingProvider = /*#__PURE__*/function (_Provider2) {
  _inherits(ExistingProvider, _Provider2);
  var _super2 = _createSuper(ExistingProvider);
  function ExistingProvider(token, useExisting, isPrivate) {
    var _this2;
    _classCallCheck(this, ExistingProvider);
    _this2 = _super2.call(this, token, isPrivate);
    _this2.useExisting = useExisting || '';
    return _this2;
  }
  return ExistingProvider;
}(Provider);
exports.ExistingProvider = ExistingProvider;
var FactoryProvider = /*#__PURE__*/function (_Provider3) {
  _inherits(FactoryProvider, _Provider3);
  var _super3 = _createSuper(FactoryProvider);
  function FactoryProvider(token, func, deps, spread, isPrivate) {
    var _this3;
    _classCallCheck(this, FactoryProvider);
    _this3 = _super3.call(this, token, isPrivate);
    _this3.func = func;
    _this3.deps = deps || [];
    _this3.spread = spread || false;
    return _this3;
  }
  return FactoryProvider;
}(Provider);
exports.FactoryProvider = FactoryProvider;
var ValueProvider = /*#__PURE__*/function (_Provider4) {
  _inherits(ValueProvider, _Provider4);
  var _super4 = _createSuper(ValueProvider);
  function ValueProvider(token, value, spread, isPrivate) {
    var _this4;
    _classCallCheck(this, ValueProvider);
    _this4 = _super4.call(this, token, isPrivate);
    _this4.value = value;
    _this4.spread = spread || false;
    _this4.setInstance({
      value: _this4.value,
      spread: _this4.spread
    });
    return _this4;
  }
  return ValueProvider;
}(Provider);
exports.ValueProvider = ValueProvider;
//# sourceMappingURL=provider.js.map
