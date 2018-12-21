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

var _RcModule2 = require('ringcentral-integration/lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('ringcentral-integration/enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RcUIModule = function (_RcModule) {
  (0, _inherits3.default)(RcUIModule, _RcModule);

  function RcUIModule() {
    (0, _classCallCheck3.default)(this, RcUIModule);
    return (0, _possibleConstructorReturn3.default)(this, (RcUIModule.__proto__ || (0, _getPrototypeOf2.default)(RcUIModule)).apply(this, arguments));
  }

  (0, _createClass3.default)(RcUIModule, [{
    key: 'uiProps',
    value: function uiProps() {
      throw Error(this.constructor.name + '::uiProps is not implemented');
    }
  }, {
    key: 'uiFunctions',
    value: function uiFunctions() {
      throw Error(this.constructor.name + '::uiFunctions is not implemented');
    }
  }, {
    key: 'status',
    get: function get() {
      return _moduleStatuses2.default.ready;
    }
  }]);
  return RcUIModule;
}(_RcModule3.default);

exports.default = RcUIModule;
//# sourceMappingURL=index.js.map
