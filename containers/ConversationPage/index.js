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

var _reactRedux = require('react-redux');

var _formatNumber2 = require('ringcentral-integration/lib/formatNumber');

var _formatNumber3 = _interopRequireDefault(_formatNumber2);

var _ConversationPanel = require('../../components/ConversationPanel');

var _ConversationPanel2 = _interopRequireDefault(_ConversationPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConversationPage = function (_Component) {
  (0, _inherits3.default)(ConversationPage, _Component);

  function ConversationPage() {
    (0, _classCallCheck3.default)(this, ConversationPage);
    return (0, _possibleConstructorReturn3.default)(this, (ConversationPage.__proto__ || (0, _getPrototypeOf2.default)(ConversationPage)).apply(this, arguments));
  }

  (0, _createClass3.default)(ConversationPage, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        formatPhone: this.props.formatNumber,
        formatDateTime: this.props.formatDateTime,
        changeDefaultRecipient: this.props.changeDefaultRecipient,
        getRecipientName: function getRecipientName(recipient) {
          return _this2.getRecipientName(recipient);
        }
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadConversation();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.unloadConversation();
    }
  }, {
    key: 'getRecipientName',
    value: function getRecipientName(recipient) {
      var phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
      if (phoneNumber && this.props.matcherContactName) {
        var matcherName = this.props.matcherContactName(phoneNumber);
        if (matcherName) {
          return matcherName;
        }
        return this.props.formatNumber(phoneNumber);
      }
      if (recipient.name) {
        return recipient.name;
      }
      return this.props.formatNumber(phoneNumber);
    }
  }, {
    key: 'loadConversation',
    value: function loadConversation() {
      var id = this.props.conversationId;
      this.props.loadConversationById(id);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ConversationPanel2.default, {
        conversationId: this.props.conversationId,
        currentLocale: this.props.currentLocale,
        messages: this.props.messages,
        recipients: this.props.recipients,
        showSpinner: this.props.showSpinner,
        replyToReceivers: this.props.replyToReceivers,
        sendButtonDisabled: this.props.sendButtonDisabled
      });
    }
  }]);
  return ConversationPage;
}(_react.Component);

ConversationPage.propTypes = {
  conversationId: _react.PropTypes.string.isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  sendButtonDisabled: _react.PropTypes.bool.isRequired,
  showSpinner: _react.PropTypes.bool.isRequired,
  messages: _ConversationPanel2.default.propTypes.messages,
  recipients: _ConversationPanel2.default.propTypes.recipients,
  replyToReceivers: _react.PropTypes.func.isRequired,
  unloadConversation: _react.PropTypes.func.isRequired,
  loadConversationById: _react.PropTypes.func.isRequired,
  changeDefaultRecipient: _react.PropTypes.func.isRequired,
  formatNumber: _react.PropTypes.func.isRequired,
  formatDateTime: _react.PropTypes.func.isRequired,
  matcherContactName: _react.PropTypes.func
};

ConversationPage.defaultProps = {
  matcherContactName: null
};

ConversationPage.childContextTypes = {
  formatPhone: _react.PropTypes.func.isRequired,
  formatDateTime: _react.PropTypes.func.isRequired,
  getRecipientName: _react.PropTypes.func.isRequired,
  changeDefaultRecipient: _react.PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
    currentLocale: props.locale.currentLocale,
    conversationId: props.params.conversationId,
    sendButtonDisabled: props.conversation.pushing,
    showSpinner: !props.dateTimeFormat.ready || props.contactMatcher && !props.contactMatcher.ready || !props.conversation.ready || !props.regionSettings.ready,
    recipients: props.conversation.recipients,
    messages: props.conversation.messages
  };
}

function mapDispatchToProps(dispatch, props) {
  var matcherContactName = null;
  if (props.contactMatcher && props.contactMatcher.ready) {
    matcherContactName = function matcherContactName(phoneNumber) {
      var matcherNames = props.contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(function (matcher) {
          return matcher.name;
        }).join('&');
      }
      return null;
    };
  }
  return {
    replyToReceivers: props.conversation.replyToReceivers,
    changeDefaultRecipient: props.conversation.changeDefaultRecipient,
    unloadConversation: function unloadConversation() {
      return props.conversation.unloadConversation();
    },
    loadConversationById: function loadConversationById(id) {
      return props.conversation.loadConversationById(id);
    },
    formatDateTime: function formatDateTime(utcTimestamp) {
      return props.dateTimeFormat.formatDateTime({
        utcTimestamp: utcTimestamp
      });
    },
    formatNumber: function formatNumber(phoneNumber) {
      return (0, _formatNumber3.default)({
        phoneNumber: phoneNumber,
        areaCode: props.regionSettings.areaCode,
        countryCode: props.regionSettings.countryCode
      });
    },
    matcherContactName: matcherContactName
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConversationPage);
//# sourceMappingURL=index.js.map
