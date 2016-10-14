'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['reducer', 'data']);

var Brand = function (_RcModule) {
  (0, _inherits3.default)(Brand, _RcModule);

  function Brand(options) {
    (0, _classCallCheck3.default)(this, Brand);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Brand.__proto__ || (0, _getPrototypeOf2.default)(Brand)).call(this, options));

    var id = options.id;
    var name = options.name;

    _this[symbols.data] = {
      id: id,
      name: name
    };
    _this[symbols.reducer] = function () {
      return _this[symbols.data];
    };
    return _this;
  }

  (0, _createClass3.default)(Brand, [{
    key: 'reducer',
    get: function get() {
      return this[symbols.reducer];
    }
  }, {
    key: 'id',
    get: function get() {
      return this.state.id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.state.name;
    }
  }]);
  return Brand;
}(_RcModule3.default);

exports.default = Brand;
//# sourceMappingURL=index.js.map
