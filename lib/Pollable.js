'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _RcModule2 = require('./RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('./di');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pollable = (_dec = (0, _di.Library)({
  deps: [{ dep: 'PollableOptions', optional: true }]
}), _dec(_class = function (_RcModule) {
  (0, _inherits3.default)(Pollable, _RcModule);

  function Pollable(_ref) {
    var options = (0, _objectWithoutProperties3.default)(_ref, []);
    (0, _classCallCheck3.default)(this, Pollable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Pollable.__proto__ || (0, _getPrototypeOf2.default)(Pollable)).call(this, (0, _extends3.default)({}, options)));

    _this._timeoutId = null;
    return _this;
  }
  // eslint-disable-next-line class-methods-use-this


  (0, _createClass3.default)(Pollable, [{
    key: 'fetchData',

    // eslint-disable-next-line class-methods-use-this
    value: function fetchData() {
      throw new Error('fetchData is not implemented');
    }
  }, {
    key: '_clearTimeout',
    value: function _clearTimeout() {
      if (this._timeoutId) clearTimeout(this._timeoutId);
    }
  }, {
    key: '_startPolling',
    value: function _startPolling() {
      var _this2 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timestamp + this.ttl + 10 - Date.now();

      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this2._timeoutId = null;
        if (!_this2._tabManager || _this2._tabManager.active) {
          if (!_this2.timestamp || Date.now() - _this2.timestamp > _this2.ttl) {
            _this2.fetchData();
          } else {
            _this2._startPolling();
          }
        } else if (_this2.timestamp && Date.now() - _this2.timestamp < _this2.ttl) {
          _this2._startPolling();
        } else {
          _this2._startPolling(_this2.timeToRetry);
        }
      }, t);
    }
  }, {
    key: '_retry',
    value: function _retry() {
      var _this3 = this;

      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.timeToRetry;

      this._clearTimeout();
      this._timeoutId = setTimeout(function () {
        _this3._timeoutId = null;
        if (!_this3.timestamp || Date.now() - _this3.timestamp > _this3.ttl) {
          if (!_this3._tabManager || _this3._tabManager.active) {
            _this3.fetchData();
          } else {
            // continue retry checks in case tab becomes main tab
            _this3._retry();
          }
        }
      }, t);
    }
  }, {
    key: 'timestamp',
    get: function get() {
      throw new Error('timestamp is not defined');
    }
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'ttl',
    get: function get() {
      throw new Error('ttl is not defined');
    }
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'timeToRetry',
    get: function get() {
      throw new Error('timeToRetry is not defined');
    }
  }]);
  return Pollable;
}(_RcModule3.default)) || _class);
exports.default = Pollable;
//# sourceMappingURL=Pollable.js.map
