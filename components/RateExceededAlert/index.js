'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _errorMessages = require('ringcentral-integration/modules/RateLimiter/errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateState(duration, timestamp) {
  return {
    ttl: Math.max(Math.floor((duration - (Date.now() - timestamp)) / 1000), 0)
  };
}

var RequestRateExceededAlert = function (_Component) {
  (0, _inherits3.default)(RequestRateExceededAlert, _Component);

  function RequestRateExceededAlert(props) {
    (0, _classCallCheck3.default)(this, RequestRateExceededAlert);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RequestRateExceededAlert.__proto__ || (0, _getPrototypeOf2.default)(RequestRateExceededAlert)).call(this, props));

    _this.state = calculateState(props.duration, props.timestamp);
    return _this;
  }

  (0, _createClass3.default)(RequestRateExceededAlert, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.timer = setInterval(function () {
        _this2.setState(calculateState(_this2.props.duration, _this2.props.timestamp));
      }, 1000);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(calculateState(nextProps.duration, nextProps.timestamp));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.timer);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_FormattedMessage2.default, {
        message: _i18n2.default.getString('rateExceeded', this.props.currentLocale),
        values: { ttl: this.state.ttl }
      });
    }
  }]);
  return RequestRateExceededAlert;
}(_react.Component);

RequestRateExceededAlert.propTypes = {
  timestamp: _propTypes2.default.number.isRequired,
  duration: _propTypes2.default.number.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};

RequestRateExceededAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _errorMessages2.default.rateLimitReached;
};

exports.default = RequestRateExceededAlert;
//# sourceMappingURL=index.js.map
