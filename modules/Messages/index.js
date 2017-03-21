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

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getMessagesReducer = require('./getMessagesReducer');

var _getMessagesReducer2 = _interopRequireDefault(_getMessagesReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messages = function (_RcModule) {
  (0, _inherits3.default)(Messages, _RcModule);

  function Messages(_ref) {
    var messageStore = _ref.messageStore,
        _ref$perPage = _ref.perPage,
        perPage = _ref$perPage === undefined ? 20 : _ref$perPage,
        contactMatcher = _ref.contactMatcher,
        options = (0, _objectWithoutProperties3.default)(_ref, ['messageStore', 'perPage', 'contactMatcher']);
    (0, _classCallCheck3.default)(this, Messages);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Messages.__proto__ || (0, _getPrototypeOf2.default)(Messages)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._contactMatcher = contactMatcher;
    _this._messageStore = messageStore;
    _this._perPage = perPage;
    _this._reducer = (0, _getMessagesReducer2.default)(_this.actionTypes);
    _this.loadNextPageMessages = _this.loadNextPageMessages.bind(_this);
    _this.updateSearchingString = _this.updateSearchingString.bind(_this);
    _this.updateSearchResults = _this.updateSearchResults.bind(_this);

    _this.addSelector('normalizedMessages', function () {
      return _this.messages;
    }, function () {
      return _this._contactMatcher && _this._contactMatcher.ready ? _this._contactMatcher.dataMapping : null;
    }, function (messages, dataMapping) {
      return messages.map(function (message) {
        if (!dataMapping || !message.from || !message.to) {
          return message;
        }
        var recipients = message.recipients;
        var fromUser = (0, _extends3.default)({}, message.from);
        var toUsers = message.to;
        var fromNumber = fromUser.phoneNumber || fromUser.extensionNumber;
        fromUser.matchedNames = dataMapping[fromNumber];
        var addMatchedNamesToRecipients = function addMatchedNamesToRecipients(recipient) {
          var number = recipient.phoneNumber || recipient.extensionNumber;
          return (0, _extends3.default)({}, recipient, {
            matchedNames: dataMapping[number]
          });
        };
        toUsers = toUsers.map(addMatchedNamesToRecipients);
        if (recipients) {
          recipients = recipients.map(addMatchedNamesToRecipients);
        }
        return (0, _extends3.default)({}, message, {
          from: fromUser,
          to: toUsers,
          recipients: recipients
        });
      });
    });

    _this.addSelector('uniqueNumbers', function () {
      return _this._messageStore.conversations;
    }, function (messages) {
      var output = [];
      var numberMap = {};
      function addIfNotExist(number) {
        if (!numberMap[number]) {
          output.push(number);
          numberMap[number] = true;
        }
      }
      messages.forEach(function (message) {
        if (message.from && message.from.phoneNumber) {
          addIfNotExist(message.from.phoneNumber);
        } else if (message.from && message.from.extensionNumber) {
          addIfNotExist(message.from.extensionNumber);
        }
        if (message.to && message.to.length > 0) {
          message.to.forEach(function (toUser) {
            if (toUser && toUser.phoneNumber) {
              addIfNotExist(toUser.phoneNumber);
            } else if (toUser && toUser.extensionNumber) {
              addIfNotExist(toUser.extensionNumber);
            }
          });
        }
      });
      return output;
    });

    if (_this._contactMatcher) {
      _this._contactMatcher.addQuerySource({
        getQueriesFn: _this._selectors.uniqueNumbers,
        readyCheckFn: function readyCheckFn() {
          return _this._messageStore.ready;
        }
      });
    }
    return _this;
  }

  (0, _createClass3.default)(Messages, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.init
        });
        this._initMessages();
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      } else if (this._shouldReload()) {
        this._reloadMessages();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._messageStore.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return !this._messageStore.ready && this.ready;
    }
  }, {
    key: '_shouldReload',
    value: function _shouldReload() {
      return this.ready && this.messageStoreUpdatedAt !== this._messageStore.updatedTimestamp;
    }
  }, {
    key: '_initMessages',
    value: function _initMessages() {
      var messages = this._getCurrnetPageMessages(1);
      this.store.dispatch({
        type: this.actionTypes.resetPage
      });
      this._updateMessages(messages);
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: '_reloadMessages',
    value: function _reloadMessages() {
      var page = this.currentPage;
      var allMessages = this._messageStore.conversations;
      var bottomIndex = allMessages.length - this._perPage * page;
      if (bottomIndex < 0) {
        bottomIndex = 0;
      }
      var newMessages = allMessages.slice(bottomIndex, allMessages.length).reverse();
      this._updateMessages(newMessages);
    }
  }, {
    key: '_updateMessages',
    value: function _updateMessages(messages) {
      this.store.dispatch({
        type: this.actionTypes.updateMessages,
        messagesTimestamp: this._messageStore.updatedTimestamp,
        messages: messages
      });
    }
  }, {
    key: '_getCurrnetPageMessages',
    value: function _getCurrnetPageMessages(page) {
      var allMessages = this._messageStore.conversations;
      var maxIndex = allMessages.length - 1;
      if (maxIndex < 0) {
        return [];
      }
      if (page < 1) {
        page = 1;
      }
      var topIndex = maxIndex - this._perPage * (page - 1);
      if (topIndex < 0) {
        return [];
      }
      var bottomIndex = topIndex - this._perPage + 1;
      if (bottomIndex < 0) {
        bottomIndex = 0;
      }
      return allMessages.slice(bottomIndex, topIndex + 1).reverse();
    }
  }, {
    key: 'loadNextPageMessages',
    value: function loadNextPageMessages() {
      var page = this.currentPage + 1;
      var messages = this._getCurrnetPageMessages(page);
      if (messages.length === 0) {
        return;
      }
      this.store.dispatch({
        type: this.actionTypes.pushMessages,
        messagesTimestamp: this._messageStore.updatedTimestamp,
        messages: messages
      });
      this.store.dispatch({
        type: this.actionTypes.nextPage
      });
    }
  }, {
    key: 'updateSearchingString',
    value: function updateSearchingString(searchingString) {
      this.store.dispatch({
        type: this.actionTypes.updateSearchingString,
        searchingString: searchingString
      });
    }
  }, {
    key: 'updateSearchResults',
    value: function updateSearchResults(searchResults) {
      this.store.dispatch({
        type: this.actionTypes.updateSearchResults,
        searchResults: searchResults
      });
    }
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.status === _moduleStatuses2.default.ready;
    }
  }, {
    key: 'pending',
    get: function get() {
      return this.status === _moduleStatuses2.default.pending;
    }
  }, {
    key: 'messages',
    get: function get() {
      return this.state.messages;
    }
  }, {
    key: 'currentPage',
    get: function get() {
      return this.state.currentPage;
    }
  }, {
    key: 'loading',
    get: function get() {
      var allMessages = this._messageStore.conversations;
      return this.messages.length < allMessages.length;
    }
  }, {
    key: 'lastUpdatedAt',
    get: function get() {
      return this.state.lastUpdatedAt;
    }
  }, {
    key: 'messageStoreUpdatedAt',
    get: function get() {
      return this.state.messageStoreUpdatedAt;
    }
  }, {
    key: 'searchingString',
    get: function get() {
      return this.state.searchingString;
    }
  }, {
    key: 'searchingResults',
    get: function get() {
      return this.state.searchingResults;
    }
  }, {
    key: 'normalizedMessages',
    get: function get() {
      return this._selectors.normalizedMessages();
    }
  }]);
  return Messages;
}(_RcModule3.default);

exports.default = Messages;
//# sourceMappingURL=index.js.map
