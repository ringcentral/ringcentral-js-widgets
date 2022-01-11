"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueProvider = exports.Provider = exports.FactoryProvider = exports.ExistingProvider = exports.ClassProvider = void 0;

require("core-js/modules/es6.object.define-property");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Provider = /*#__PURE__*/function () {
  function Provider(token, isPrivate) {
    _classCallCheck(this, Provider);

    this.token = token; // Provider instance reference

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
