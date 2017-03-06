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

var _RegionSettings = require('ringcentral-integration/modules/RegionSettings');

var _RegionSettings2 = _interopRequireDefault(_RegionSettings);

var _Conversation = require('ringcentral-integration/modules/Conversation');

var _Conversation2 = _interopRequireDefault(_Conversation);

var _MessageStore = require('ringcentral-integration/modules/MessageStore');

var _MessageStore2 = _interopRequireDefault(_MessageStore);

var _DateTimeIntl = require('ringcentral-integration/modules/DateTimeIntl');

var _DateTimeIntl2 = _interopRequireDefault(_DateTimeIntl);

var _ContactMatcher = require('ringcentral-integration/modules/ContactMatcher');

var _ContactMatcher2 = _interopRequireDefault(_ContactMatcher);

var _ConversationPanel = require('../../components/ConversationPanel');

var _ConversationPanel2 = _interopRequireDefault(_ConversationPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConversationPage = function (_Component) {
  (0, _inherits3.default)(ConversationPage, _Component);

  function ConversationPage(props) {
    (0, _classCallCheck3.default)(this, ConversationPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConversationPage.__proto__ || (0, _getPrototypeOf2.default)(ConversationPage)).call(this, props));

    _this.replyToReceivers = function (text) {
      _this.props.conversation.replyToReceivers(text);
    };
    return _this;
  }

  (0, _createClass3.default)(ConversationPage, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        formatPhone: function formatPhone(phoneNumber) {
          return _this2.formatNumber(phoneNumber);
        },
        getRecipientName: function getRecipientName(recipient) {
          return _this2.getRecipientName(recipient);
        },
        formatDateTime: function formatDateTime(utcString) {
          return _this2.formatDateTime(utcString);
        },
        changeDefaultRecipient: function changeDefaultRecipient(phoneNumber) {
          return _this2.changeDefaultRecipient(phoneNumber);
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
      this.props.conversation.unloadConversation();
    }
  }, {
    key: 'getRecipientName',
    value: function getRecipientName(recipient) {
      var phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
      if (phoneNumber && this.props.contactMatcher && this.props.contactMatcher.ready) {
        var matcherNames = this.props.contactMatcher.dataMapping[phoneNumber];
        if (matcherNames && matcherNames[0] && matcherNames[0].name) {
          return matcherNames[0].name;
        }
        return this.formatNumber(phoneNumber);
      }
      if (recipient.name) {
        return recipient.name;
      }
      return this.formatNumber(phoneNumber);
    }
  }, {
    key: 'loadConversation',
    value: function loadConversation() {
      var id = this.props.conversationId;
      this.props.conversation.loadConversationById(id);
    }
  }, {
    key: 'changeDefaultRecipient',
    value: function changeDefaultRecipient(phoneNumber) {
      this.props.conversation.changeDefaultRecipient(phoneNumber);
    }
  }, {
    key: 'formatNumber',
    value: function formatNumber(phoneNumber) {
      var regionSettings = this.props.regionSettings;
      return (0, _formatNumber3.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    }
  }, {
    key: 'formatDateTime',
    value: function formatDateTime(utcString) {
      return this.props.dateTimeIntl.formatDateTime({
        utcString: utcString
      });
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
        replyToReceivers: this.replyToReceivers,
        sendButtonDisabled: this.props.sendButtonDisabled
      });
    }
  }]);
  return ConversationPage;
}(_react.Component);

ConversationPage.propTypes = {
  conversationId: _react.PropTypes.string.isRequired,
  regionSettings: _react.PropTypes.instanceOf(_RegionSettings2.default).isRequired,
  conversation: _react.PropTypes.instanceOf(_Conversation2.default).isRequired,
  messageStore: _react.PropTypes.instanceOf(_MessageStore2.default).isRequired,
  dateTimeIntl: _react.PropTypes.instanceOf(_DateTimeIntl2.default).isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  sendButtonDisabled: _react.PropTypes.bool.isRequired,
  showSpinner: _react.PropTypes.bool.isRequired,
  messages: _ConversationPanel2.default.propTypes.messages,
  recipients: _ConversationPanel2.default.propTypes.recipients,
  contactMatcher: _react.PropTypes.instanceOf(_ContactMatcher2.default)
};

ConversationPage.defaultProps = {
  contactMatcher: null
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
    conversation: props.conversation,
    regionSettings: props.regionSettings,
    messageStore: props.messageStore,
    sendButtonDisabled: props.conversation.pushing,
    showSpinner: !props.dateTimeIntl.ready || props.contactMatcher && !props.contactMatcher.ready || !props.conversation.ready || !props.regionSettings.ready,
    recipients: props.conversation.recipients,
    messages: props.conversation.messages
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ConversationPage);
//# sourceMappingURL=index.js.map
