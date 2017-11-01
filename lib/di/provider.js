'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueProvider = exports.FactoryProvider = exports.ExistingProvider = exports.ClassProvider = exports.Provider = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Provider = exports.Provider = function () {
  function Provider(token, isPrivate) {
    (0, _classCallCheck3.default)(this, Provider);

    this.token = token;
    // Provider instance reference
    this.instance = null;
    this.private = isPrivate || false;
  }

  (0, _createClass3.default)(Provider, [{
    key: 'setInstance',
    value: function setInstance(instance) {
      this.instance = instance;
    }
  }, {
    key: 'getInstance',
    value: function getInstance() {
      return this.instance;
    }
  }, {
    key: 'resolved',
    value: function resolved() {
      return this.instance !== null;
    }
  }]);
  return Provider;
}();

var ClassProvider = exports.ClassProvider = function (_Provider) {
  (0, _inherits3.default)(ClassProvider, _Provider);

  function ClassProvider(token, klass, deps, isPrivate) {
    (0, _classCallCheck3.default)(this, ClassProvider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClassProvider.__proto__ || (0, _getPrototypeOf2.default)(ClassProvider)).call(this, token, isPrivate));

    _this.klass = klass;
    _this.deps = deps;
    return _this;
  }

  return ClassProvider;
}(Provider);

var ExistingProvider = exports.ExistingProvider = function (_Provider2) {
  (0, _inherits3.default)(ExistingProvider, _Provider2);

  function ExistingProvider(token, useExisting, isPrivate) {
    (0, _classCallCheck3.default)(this, ExistingProvider);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (ExistingProvider.__proto__ || (0, _getPrototypeOf2.default)(ExistingProvider)).call(this, token, isPrivate));

    _this2.useExisting = useExisting || '';
    return _this2;
  }

  return ExistingProvider;
}(Provider);

var FactoryProvider = exports.FactoryProvider = function (_Provider3) {
  (0, _inherits3.default)(FactoryProvider, _Provider3);

  function FactoryProvider(token, func, deps, spread, isPrivate) {
    (0, _classCallCheck3.default)(this, FactoryProvider);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (FactoryProvider.__proto__ || (0, _getPrototypeOf2.default)(FactoryProvider)).call(this, token, isPrivate));

    _this3.func = func;
    _this3.deps = deps || [];
    _this3.spread = spread || false;
    return _this3;
  }

  return FactoryProvider;
}(Provider);

var ValueProvider = exports.ValueProvider = function (_Provider4) {
  (0, _inherits3.default)(ValueProvider, _Provider4);

  function ValueProvider(token, value, spread, isPrivate) {
    (0, _classCallCheck3.default)(this, ValueProvider);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (ValueProvider.__proto__ || (0, _getPrototypeOf2.default)(ValueProvider)).call(this, token, isPrivate));

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
//# sourceMappingURL=provider.js.map
