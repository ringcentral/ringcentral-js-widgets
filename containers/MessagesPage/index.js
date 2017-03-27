'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _messageHelper = require('ringcentral-integration/lib/messageHelper');

var _Spinner = require('../../components/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _Panel = require('../../components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _MessageList = require('../../components/MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _SearchInput = require('../../components/SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessageSpiner() {
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.spinerContainer },
    _react2.default.createElement(_Spinner2.default, null)
  );
}

var MessagesPage = function (_Component) {
  (0, _inherits3.default)(MessagesPage, _Component);

  function MessagesPage(props) {
    (0, _classCallCheck3.default)(this, MessagesPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessagesPage.__proto__ || (0, _getPrototypeOf2.default)(MessagesPage)).call(this, props));

    _this.onSearchChange = function (e) {
      var value = e.currentTarget.value;
      _this.props.updateSearchingString(value);
    };

    _this.searchMessage = _this.searchMessage.bind(_this);
    _this.getMessageRecipientNames = _this.getMessageRecipientNames.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MessagesPage, [{
    key: 'getMessageRecipientNames',
    value: function getMessageRecipientNames(message) {
      var _this2 = this;

      var recipients = message.recipients;
      if (!recipients || recipients.length === 0) {
        recipients = this.props.getRecipientsList(message);
      }
      return recipients.map(function (recipient) {
        var phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
        if (phoneNumber && _this2.props.matcherContactName) {
          if (recipient.matchedNames && recipient.matchedNames[0]) {
            return recipient.matchedNames[0];
          }
          var matcherName = _this2.props.matcherContactName(phoneNumber);
          if (matcherName) {
            return matcherName;
          }
          return _this2.props.formatPhone(phoneNumber);
        }
        if (recipient.name) {
          return recipient.name;
        }
        return _this2.props.formatPhone(phoneNumber);
      });
    }
  }, {
    key: 'isMatchRecipients',
    value: function isMatchRecipients(message, searchText, searchNumber) {
      var recipients = this.props.getRecipientsList(message);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(recipients), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var recipient = _step.value;

          var phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
          var recipientName = null;
          if (phoneNumber) {
            if (searchNumber && searchNumber.length > 0 && phoneNumber.indexOf(searchNumber) >= 0) {
              return true;
            }
            if (this.props.matcherContactName) {
              var matcherName = this.props.matcherContactName(phoneNumber);
              if (matcherName) {
                recipientName = matcherName;
              } else {
                recipientName = phoneNumber;
              }
            }
          }
          if (!recipientName && recipient.name) {
            recipientName = recipient.name;
          }
          if (recipientName && recipientName.toLowerCase().indexOf(searchText) >= 0) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'searchMessage',
    value: function searchMessage() {
      var _this3 = this;

      var searchString = this.props.searchingString;
      if (searchString.length < 3) {
        this.props.updateSearchResults([]);
        return;
      }
      var searchText = searchString.toLowerCase().trim();
      var searchNumber = searchString.replace(/[^\d]/g, '');
      if (searchString.length !== searchNumber.length && searchNumber.length < 2) {
        searchNumber = null;
      }
      var searchTextResults = this.props.searchMessagesText(searchText).reverse();
      var searchContactresults = this.props.allMessages.filter(function (message) {
        return _this3.isMatchRecipients(message, searchText, searchNumber);
      }).reverse();
      var results = [];
      var searchMap = {};
      var addSearchResultToResult = function addSearchResultToResult(message) {
        if (searchMap[message.conversationId]) {
          return;
        }
        searchMap[message.conversationId] = 1;
        results.push(message);
      };
      searchContactresults.forEach(addSearchResultToResult);
      searchTextResults.forEach(addSearchResultToResult);
      this.props.updateSearchResults(results);
    }
  }, {
    key: 'renderMessageList',
    value: function renderMessageList() {
      if (this.props.searchingString.length >= 3) {
        return _react2.default.createElement(_MessageList2.default, {
          messages: this.props.searchingResults,
          loadNextPageMessages: function loadNextPageMessages() {
            return null;
          },
          loading: false,
          placeholder: _i18n2.default.getString('noSearchResults'),
          formatDateTime: this.props.formatDateTime,
          getMessageRecipientNames: this.getMessageRecipientNames
        });
      }
      return _react2.default.createElement(_MessageList2.default, {
        messages: this.props.messages,
        loadNextPageMessages: this.props.loadNextPageMessages,
        placeholder: _i18n2.default.getString('noMessages'),
        formatDateTime: this.props.formatDateTime,
        getMessageRecipientNames: this.getMessageRecipientNames
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var showSpinner = this.props.showSpinner;
      if (showSpinner) {
        return _react2.default.createElement(
          'div',
          { className: _styles2.default.root },
          _react2.default.createElement(MessageSpiner, null)
        );
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.content },
        _react2.default.createElement(_SearchInput2.default, {
          value: this.props.searchingString,
          onChange: this.onSearchChange,
          onKeyUp: this.searchMessage,
          maxLength: 30,
          placeholder: _i18n2.default.getString('search')
        }),
        _react2.default.createElement(
          _Panel2.default,
          null,
          this.renderMessageList()
        )
      );
    }
  }]);
  return MessagesPage;
}(_react.Component);

MessagesPage.propTypes = {
  messages: _MessageList2.default.propTypes.messages,
  allMessages: _MessageList2.default.propTypes.messages,
  searchingResults: _MessageList2.default.propTypes.messages,
  loadNextPageMessages: _react.PropTypes.func.isRequired,
  updateSearchingString: _react.PropTypes.func.isRequired,
  showSpinner: _react.PropTypes.bool.isRequired,
  searchingString: _react.PropTypes.string.isRequired,
  formatDateTime: _react.PropTypes.func.isRequired,
  formatPhone: _react.PropTypes.func.isRequired,
  getRecipientsList: _react.PropTypes.func.isRequired,
  searchMessagesText: _react.PropTypes.func.isRequired,
  updateSearchResults: _react.PropTypes.func.isRequired,
  matcherContactName: _react.PropTypes.func
};

MessagesPage.defaultProps = {
  matcherContactName: null
};

function mapStateToProps(state, props) {
  return {
    currentLocale: props.locale.currentLocale,
    messages: props.messages.messages,
    allMessages: props.messageStore.conversations,
    showSpinner: !props.messages.ready || props.contactMatcher && !props.contactMatcher.ready || !props.extensionInfo.ready || !props.dateTimeFormat.ready,
    lastUpdatedAt: props.messages.lastUpdatedAt,
    searchingString: props.messages.searchingString,
    searchingResults: props.messages.searchingResults
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
    loadNextPageMessages: props.messages.loadNextPageMessages,
    updateSearchingString: props.messages.updateSearchingString,
    updateSearchResults: props.messages.updateSearchResults,
    formatDateTime: props.formatDateTime || function (utcTimestamp) {
      return props.dateTimeFormat.formatDateTime({
        utcTimestamp: utcTimestamp
      });
    },
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: props.regionSettings.areaCode,
        countryCode: props.regionSettings.countryCode
      });
    },
    getRecipientsList: function getRecipientsList(message) {
      return (0, _messageHelper.getRecipients)({
        message: message,
        myExtensionNumber: props.extensionInfo.extensionNumber
      });
    },
    searchMessagesText: function searchMessagesText(searchText) {
      return props.messageStore.searchMessagesText(searchText);
    },
    matcherContactName: matcherContactName
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MessagesPage);
//# sourceMappingURL=index.js.map
