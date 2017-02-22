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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessageItem(props) {
  var messageClassName = null;
  if (props.direction === 'Outbound') {
    messageClassName = (0, _classnames2.default)(_styles2.default.messageBody, _styles2.default.outbound);
  } else {
    messageClassName = _styles2.default.messageBody;
  }
  if (!props.showDate) {
    return _react2.default.createElement(
      'div',
      { className: _styles2.default.messageItem },
      _react2.default.createElement(
        'div',
        { className: messageClassName },
        props.subject
      ),
      _react2.default.createElement('div', { className: _styles2.default.clear })
    );
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.messageItem },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.messsageTime },
      props.creationTime
    ),
    _react2.default.createElement(
      'div',
      { className: messageClassName },
      props.subject
    ),
    _react2.default.createElement('div', { className: _styles2.default.clear })
  );
}

MessageItem.propTypes = {
  direction: _react.PropTypes.string.isRequired,
  subject: _react.PropTypes.string.isRequired,
  creationTime: _react.PropTypes.string.isRequired,
  showDate: _react.PropTypes.bool.isRequired
};

var ConversationMessageList = function (_Component) {
  (0, _inherits3.default)(ConversationMessageList, _Component);

  function ConversationMessageList(props) {
    (0, _classCallCheck3.default)(this, ConversationMessageList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConversationMessageList.__proto__ || (0, _getPrototypeOf2.default)(ConversationMessageList)).call(this, props));

    var lastMessagesLength = 0;
    _this.scrollToLastMessage = function () {
      var conversationBody = _this.conversationBody;
      if (!conversationBody) {
        return;
      }
      if (_this.props.messages.length === lastMessagesLength) {
        return;
      }
      lastMessagesLength = props.messages.length;
      conversationBody.scrollTop = conversationBody.scrollHeight;
    };
    return _this;
  }

  (0, _createClass3.default)(ConversationMessageList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToLastMessage();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.scrollToLastMessage();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var messages = this.props.messages;
      var lastFormatedTime = null;
      var messageList = messages.map(function (message) {
        var formatedTime = _this2.context.formatDateTime(message.creationTime);
        var showDate = true;
        if (lastFormatedTime === formatedTime) {
          showDate = false;
        }
        lastFormatedTime = formatedTime;
        return _react2.default.createElement(MessageItem, {
          key: message.id,
          direction: message.direction,
          subject: message.subject,
          creationTime: formatedTime,
          showDate: showDate
        });
      });
      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.root,
          ref: function ref(body) {
            _this2.conversationBody = body;
          }
        },
        messageList
      );
    }
  }]);
  return ConversationMessageList;
}(_react.Component);

ConversationMessageList.propTypes = {
  messages: _react2.default.PropTypes.arrayOf(_react.PropTypes.shape({
    creationTime: _react.PropTypes.string,
    id: _react.PropTypes.number,
    direction: _react.PropTypes.string,
    subject: _react.PropTypes.string
  })).isRequired
};

ConversationMessageList.contextTypes = {
  formatDateTime: _react.PropTypes.func.isRequired
};

exports.default = ConversationMessageList;
//# sourceMappingURL=index.js.map
