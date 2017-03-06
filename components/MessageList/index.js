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

var _MessageItem = require('../MessageItem');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMessages(props) {
  return _react2.default.createElement(
    'p',
    { className: _styles2.default.NoMessages },
    props.placeholder
  );
}

NoMessages.propTypes = {
  placeholder: _react.PropTypes.string.isRequired
};

var MessageList = function (_Component) {
  (0, _inherits3.default)(MessageList, _Component);

  function MessageList(props) {
    (0, _classCallCheck3.default)(this, MessageList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageList.__proto__ || (0, _getPrototypeOf2.default)(MessageList)).call(this, props));

    var lastScrollHeight = 0;
    var currentScrollHeight = 0;

    _this.onScroll = function () {
      var totalScrollHeight = _this.messagesListBody.scrollHeight;
      var clientHeight = _this.messagesListBody.clientHeight;
      currentScrollHeight = _this.messagesListBody.scrollTop;
      // loadNextPageMessages if srroll near buttom
      if (totalScrollHeight - lastScrollHeight > clientHeight + 10 && totalScrollHeight - currentScrollHeight <= clientHeight + 10) {
        _this.props.loadNextPageMessages();
      }
      lastScrollHeight = currentScrollHeight;
    };
    return _this;
  }

  (0, _createClass3.default)(MessageList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var messages = this.props.messages;
      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.messageList,
          onScroll: this.onScroll,
          ref: function ref(list) {
            _this2.messagesListBody = list;
          }
        },
        messages && messages.length ? messages.map(function (message) {
          return _react2.default.createElement(_MessageItem2.default, {
            type: message.type,
            unreadCounts: message.unreadCounts,
            conversationId: message.conversationId,
            subject: message.subject,
            contactList: _this2.props.getMessageRecipientNames(message),
            creationTime: message.creationTime,
            formatDateTime: _this2.props.formatDateTime,
            key: message.id });
        }) : _react2.default.createElement(NoMessages, { placeholder: this.props.placeholder })
      );
    }
  }]);
  return MessageList;
}(_react.Component);

exports.default = MessageList;


MessageList.propTypes = {
  messages: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    id: _react.PropTypes.number,
    type: _react.PropTypes.string,
    unreadCounts: _react.PropTypes.number,
    conversationId: _react.PropTypes.string.isRequired,
    subject: _react.PropTypes.string,
    creationTime: _react.PropTypes.string,
    to: _react.PropTypes.array,
    from: _react.PropTypes.object
  })).isRequired,
  loadNextPageMessages: _react.PropTypes.func.isRequired,
  placeholder: _react.PropTypes.string.isRequired,
  formatDateTime: _react.PropTypes.func.isRequired,
  getMessageRecipientNames: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=index.js.map
