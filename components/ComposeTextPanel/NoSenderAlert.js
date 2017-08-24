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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _messageSenderMessages = require('ringcentral-integration/modules/MessageSender/messageSenderMessages');

var _messageSenderMessages2 = _interopRequireDefault(_messageSenderMessages);

var _AlertDisplay = require('../AlertDisplay');

var _AlertDisplay2 = _interopRequireDefault(_AlertDisplay);

var _MessageSenderAlert = require('../MessageSenderAlert');

var _MessageSenderAlert2 = _interopRequireDefault(_MessageSenderAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoSenderAlert = function (_Component) {
  (0, _inherits3.default)(NoSenderAlert, _Component);

  function NoSenderAlert(props) {
    (0, _classCallCheck3.default)(this, NoSenderAlert);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NoSenderAlert.__proto__ || (0, _getPrototypeOf2.default)(NoSenderAlert)).call(this, props));

    _this.state = {
      showAlert: !props.hasSenderNumbers && _this.props.outboundSMS
    };
    _this.onDismissAlert = function () {
      _this.setState({
        showAlert: false
      });
    };
    _this.getRenderer = function () {
      return _MessageSenderAlert2.default;
    };
    _this.messages = [{
      id: '1',
      level: 'warning',
      message: _messageSenderMessages2.default.senderNumberInvalid
    }];
    return _this;
  }

  (0, _createClass3.default)(NoSenderAlert, [{
    key: 'render',
    value: function render() {
      return this.state.showAlert ? _react2.default.createElement(_AlertDisplay2.default, {
        currentLocale: this.props.currentLocale,
        messages: this.messages,
        dismiss: this.onDismissAlert,
        getRenderer: this.getRenderer
      }) : null;
    }
  }]);
  return NoSenderAlert;
}(_react.Component);

exports.default = NoSenderAlert;


NoSenderAlert.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  outboundSMS: _propTypes2.default.bool.isRequired,
  hasSenderNumbers: _propTypes2.default.bool.isRequired
};
//# sourceMappingURL=NoSenderAlert.js.map
