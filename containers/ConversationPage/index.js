'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _reactRedux = require('react-redux');

var _formatNumber2 = require('ringcentral-integration/lib/formatNumber');

var _formatNumber3 = _interopRequireDefault(_formatNumber2);

var _ConversationPanel = require('../../components/ConversationPanel');

var _ConversationPanel2 = _interopRequireDefault(_ConversationPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

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
        changeDefaultRecipient: this.props.changeDefaultRecipient,
        changeMatchedNames: this.props.changeMatchedNames,
        getRecipientName: function getRecipientName(recipient) {
          return _this2.getRecipientName(recipient);
        },
        getMatcherContactList: this.props.getMatcherContactList,
        getMatcherContactNameList: this.props.getMatcherContactNameList
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
      if (phoneNumber && this.props.getMatcherContactName) {
        var matcherName = this.props.getMatcherContactName(phoneNumber);
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
        brand: this.props.brand,
        countryCode: this.props.countryCode,
        areaCode: this.props.areaCode,
        disableLinks: this.props.disableLinks,
        conversationId: this.props.conversationId,
        currentLocale: this.props.currentLocale,
        messages: this.props.messages,
        conversation: this.props.conversation,
        onLogConversation: this.props.onLogConversation,
        isLoggedContact: this.props.isLoggedContact,
        recipients: this.props.recipients,
        showSpinner: this.props.showSpinner,
        replyToReceivers: this.props.replyToReceivers,
        sendButtonDisabled: this.props.sendButtonDisabled,
        autoLog: this.props.autoLog,
        dateTimeFormatter: this.props.dateTimeFormatter,
        showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder,
        goBack: this.props.goBack,
        sourceIcons: this.props.sourceIcons,
        showGroupNumberName: this.props.showGroupNumberName
      });
    }
  }]);
  return ConversationPage;
}(_react.Component);

ConversationPage.propTypes = {
  conversationId: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  sendButtonDisabled: _propTypes2.default.bool.isRequired,
  showSpinner: _propTypes2.default.bool.isRequired,
  messages: _ConversationPanel2.default.propTypes.messages,
  recipients: _ConversationPanel2.default.propTypes.recipients,
  replyToReceivers: _propTypes2.default.func.isRequired,
  unloadConversation: _propTypes2.default.func.isRequired,
  loadConversationById: _propTypes2.default.func.isRequired,
  changeDefaultRecipient: _propTypes2.default.func.isRequired,
  formatNumber: _propTypes2.default.func.isRequired,
  getMatcherContactName: _propTypes2.default.func,
  getMatcherContactList: _propTypes2.default.func,
  getMatcherContactNameList: _propTypes2.default.func,
  changeMatchedNames: _propTypes2.default.func.isRequired,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  sourceIcons: _propTypes2.default.object,
  showGroupNumberName: _propTypes2.default.bool.isRequired
};

ConversationPage.defaultProps = {
  getMatcherContactName: null,
  getMatcherContactList: function getMatcherContactList() {
    return [];
  },
  getMatcherContactNameList: function getMatcherContactNameList() {
    return [];
  },
  sourceIcons: undefined
};

ConversationPage.childContextTypes = {
  formatPhone: _propTypes2.default.func.isRequired,
  getRecipientName: _propTypes2.default.func.isRequired,
  changeDefaultRecipient: _propTypes2.default.func.isRequired,
  changeMatchedNames: _propTypes2.default.func.isRequired,
  getMatcherContactList: _propTypes2.default.func.isRequired,
  getMatcherContactNameList: _propTypes2.default.func.isRequired
};

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      brand = _ref$phone.brand,
      locale = _ref$phone.locale,
      conversation = _ref$phone.conversation,
      conversationLogger = _ref$phone.conversationLogger,
      dateTimeFormat = _ref$phone.dateTimeFormat,
      contactMatcher = _ref$phone.contactMatcher,
      regionSettings = _ref$phone.regionSettings,
      messages = _ref$phone.messages,
      rateLimiter = _ref$phone.rateLimiter,
      connectivityMonitor = _ref$phone.connectivityMonitor,
      params = _ref.params,
      _ref$enableContactFal = _ref.enableContactFallback,
      enableContactFallback = _ref$enableContactFal === undefined ? false : _ref$enableContactFal,
      _ref$showGroupNumberN = _ref.showGroupNumberName,
      showGroupNumberName = _ref$showGroupNumberN === undefined ? false : _ref$showGroupNumberN;

  return {
    brand: brand.fullName,
    enableContactFallback: enableContactFallback,
    showGroupNumberName: showGroupNumberName,
    currentLocale: locale.currentLocale,
    conversationId: params.conversationId,
    sendButtonDisabled: conversation.pushing,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    showSpinner: !(dateTimeFormat.ready && (!contactMatcher || contactMatcher.ready) && conversation.ready && regionSettings.ready && messages.ready && rateLimiter.ready && connectivityMonitor.ready && (!conversationLogger || conversationLogger.ready)),
    recipients: conversation.recipients,
    messages: conversation.messages,
    conversation: messages.allConversations.find(function (item) {
      return item.conversationId === params.conversationId;
    }),
    disableLinks: rateLimiter.isThrottling || !connectivityMonitor.connectivity,
    autoLog: !!(conversationLogger && conversationLogger.autoLog)
  };
}

function mapToFunctions(_, _ref2) {
  var _this3 = this;

  var _ref2$phone = _ref2.phone,
      contactMatcher = _ref2$phone.contactMatcher,
      conversation = _ref2$phone.conversation,
      dateTimeFormat = _ref2$phone.dateTimeFormat,
      routerInteraction = _ref2$phone.routerInteraction,
      conversationLogger = _ref2$phone.conversationLogger,
      regionSettings = _ref2$phone.regionSettings,
      _ref2$dateTimeFormatt = _ref2.dateTimeFormatter,
      dateTimeFormatter = _ref2$dateTimeFormatt === undefined ? function () {
    return dateTimeFormat.formatDateTime.apply(dateTimeFormat, arguments);
  } : _ref2$dateTimeFormatt,
      isLoggedContact = _ref2.isLoggedContact,
      onLogConversation = _ref2.onLogConversation;

  var getMatcherContactName = void 0;
  var getMatcherContactList = void 0;
  var getMatcherContactNameList = void 0;
  if (contactMatcher && contactMatcher.ready) {
    getMatcherContactList = function getMatcherContactList(phoneNumber) {
      var matcherNames = contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(function (matcher) {
          return matcher.name + ' | ' + matcher.phoneNumbers[0].phoneType;
        });
      }
      return [];
    };
    getMatcherContactNameList = function getMatcherContactNameList(phoneNumber) {
      var matcherNames = contactMatcher.dataMapping[phoneNumber];
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.map(function (matcher) {
          return matcher.name;
        });
      }
      return [];
    };
    getMatcherContactName = function getMatcherContactName(phoneNumber) {
      var matcherNames = getMatcherContactNameList(phoneNumber);
      if (matcherNames && matcherNames.length > 0) {
        return matcherNames.join('&');
      }
      return null;
    };
  }

  return {
    replyToReceivers: function replyToReceivers() {
      return conversation.replyToReceivers.apply(conversation, arguments);
    },
    changeDefaultRecipient: function changeDefaultRecipient() {
      return conversation.changeDefaultRecipient.apply(conversation, arguments);
    },
    changeMatchedNames: function changeMatchedNames() {
      return conversation.changeMatchedNames.apply(conversation, arguments);
    },
    unloadConversation: function unloadConversation() {
      return conversation.unloadConversation();
    },
    loadConversationById: function loadConversationById(id) {
      return conversation.loadConversationById(id);
    },
    dateTimeFormatter: dateTimeFormatter,
    formatNumber: function formatNumber(phoneNumber) {
      return (0, _formatNumber3.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    getMatcherContactName: getMatcherContactName,
    getMatcherContactList: getMatcherContactList,
    getMatcherContactNameList: getMatcherContactNameList,
    isLoggedContact: isLoggedContact,
    onLogConversation: onLogConversation || conversationLogger && function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref4) {
        var _ref4$redirect = _ref4.redirect,
            redirect = _ref4$redirect === undefined ? true : _ref4$redirect,
            options = (0, _objectWithoutProperties3.default)(_ref4, ['redirect']);
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return conversationLogger.logConversation((0, _extends3.default)({}, options, {
                  redirect: redirect
                }));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this3);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(),
    goBack: function goBack() {
      routerInteraction.goBack();
    }
  };
}

exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ConversationPage));
//# sourceMappingURL=index.js.map
