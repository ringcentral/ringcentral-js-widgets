'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _rcModule = require('../../lib/rc-module');

var _rcModule2 = _interopRequireDefault(_rcModule);

var _reduxHelper = require('../../lib/redux-helper');

var _redux = require('redux');

var _symbolMap = require('data-types/symbol-map');

var _symbolMap2 = _interopRequireDefault(_symbolMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var symbols = new _symbolMap2.default(['reducer']);

function getSettingsReducer(prefix) {
  return function (state, action) {
    if (typeof state === 'undefined') return {};

    return state;
  };
}

var Settings = function (_RcModule) {
  (0, _inherits3.default)(Settings, _RcModule);

  function Settings(options) {
    (0, _classCallCheck3.default)(this, Settings);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Settings.__proto__ || (0, _getPrototypeOf2.default)(Settings)).call(this, (0, _extends3.default)({}, options)));

    _this[symbols.reducer] = {
      base: getSettingsReducer(_this.prefix)
    };
    return _this;
  }

  (0, _createClass3.default)(Settings, [{
    key: 'registerReducer',
    value: function registerReducer(name, reducer) {
      this[symbols.reducer][name] = reducer;
    }
  }, {
    key: 'reducer',
    get: function get() {
      return (0, _redux.combineReducers)(this[symbols.reducer]);
    }
  }]);
  return Settings;
}(_rcModule2.default);

exports.default = Settings;
//# sourceMappingURL=index.js.map
