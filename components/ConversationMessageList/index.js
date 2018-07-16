'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

exports.Message = Message;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Message(_ref) {
  var subject = _ref.subject,
      time = _ref.time,
      direction = _ref.direction,
      sender = _ref.sender,
      SubjectRenderer = _ref.subjectRenderer;

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.message },
    time ? _react2.default.createElement(
      'div',
      { className: _styles2.default.time },
      time
    ) : null,
    sender && direction === 'Inbound' ? _react2.default.createElement(
      'div',
      { className: _styles2.default.sender },
      sender
    ) : null,
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(_styles2.default.messageBody, direction === 'Outbound' ? _styles2.default.outbound : _styles2.default.inbound, subject && subject.length > 500 && _styles2.default.big) },
      SubjectRenderer ? _react2.default.createElement(SubjectRenderer, { subject: subject }) : subject
    ),
    _react2.default.createElement('div', { className: _styles2.default.clear })
  );
}

Message.propTypes = {
  direction: _propTypes2.default.string.isRequired,
  subject: _propTypes2.default.string,
  time: _propTypes2.default.string,
  sender: _propTypes2.default.string,
  subjectRenderer: _propTypes2.default.func
};

Message.defaultProps = {
  subject: '',
  sender: undefined,
  time: undefined,
  subjectRenderer: undefined
};

var ConversationMessageList = function (_Component) {
  (0, _inherits3.default)(ConversationMessageList, _Component);

  function ConversationMessageList() {
    var _ref2,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ConversationMessageList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = ConversationMessageList.__proto__ || (0, _getPrototypeOf2.default)(ConversationMessageList)).call.apply(_ref2, [this].concat(args))), _this), _this.onScroll = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var currentScrollTop, clientHeight;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this._listRef) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              currentScrollTop = _this._listRef.scrollTop;

              _this._scrollHeight = _this._listRef.scrollHeight;
              clientHeight = _this._listRef.clientHeight;

              if (currentScrollTop < _this._scrollTop) {
                // user scroll up
                _this._scrollUp = true;
              } else if (currentScrollTop + clientHeight > _this._scrollHeight - 200) {
                // user scroll down to bottom
                _this._scrollUp = false;
              }
              if (currentScrollTop < 20 && _this._scrollTop >= 20) {
                _this.props.loadPreviousMessages();
              }
              _this._scrollTop = currentScrollTop;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.scrollToLastMessage = function () {
      if (_this._listRef) {
        _this._listRef.scrollTop = _this._listRef.scrollHeight;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ConversationMessageList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToLastMessage();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(previousProps) {
      if (previousProps.messages.length === this.props.messages.length) {
        return;
      }
      if (!this._scrollUp) {
        this.scrollToLastMessage();
      } else if (this._listRef && this._scrollHeight !== this._listRef.scrollHeight) {
        this._listRef.scrollTop = this._listRef.scrollTop + (this._listRef.scrollHeight - this._scrollHeight);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          className = _props.className,
          dateTimeFormatter = _props.dateTimeFormatter,
          messages = _props.messages,
          showSender = _props.showSender,
          height = _props.height,
          messageSubjectRenderer = _props.messageSubjectRenderer,
          formatPhone = _props.formatPhone,
          loadingNextPage = _props.loadingNextPage;


      var lastDate = 0;
      var messageList = messages.map(function (message) {
        var sender = showSender ? message.from.name || formatPhone(message.from.extensionNumber || message.from.phoneNumber) : null;
        var date = new Date(message.creationTime);
        var time = date - lastDate < 60 * 60 * 1000 && date.getHours() === lastDate.getHours() ? null : dateTimeFormatter({ utcTimestamp: message.creationTime, type: 'long' });
        lastDate = date;
        return _react2.default.createElement(Message, {
          key: message.id,
          sender: sender,
          time: time,
          direction: message.direction,
          subject: message.subject,
          subjectRenderer: messageSubjectRenderer
        });
      });
      var loading = loadingNextPage ? _react2.default.createElement(
        'div',
        { className: _styles2.default.loading },
        'Loading...'
      ) : null;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className),
          style: { height: height },
          ref: function ref(body) {
            _this3._listRef = body;
          },
          onScroll: this.onScroll
        },
        loading,
        messageList
      );
    }
  }]);
  return ConversationMessageList;
}(_react.Component);

ConversationMessageList.propTypes = {
  messages: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    creationTime: _propTypes2.default.number,
    id: _propTypes2.default.number,
    direction: _propTypes2.default.string,
    subject: _propTypes2.default.string
  })).isRequired,
  className: _propTypes2.default.string,
  showSender: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  messageSubjectRenderer: _propTypes2.default.func,
  formatPhone: _propTypes2.default.func.isRequired,
  loadPreviousMessages: _propTypes2.default.func,
  loadingNextPage: _propTypes2.default.bool,
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

ConversationMessageList.defaultProps = {
  className: null,
  showSender: false,
  messageSubjectRenderer: undefined,
  height: '100%',
  loadingNextPage: false,
  loadPreviousMessages: function loadPreviousMessages() {
    return null;
  }
};

exports.default = ConversationMessageList;
//# sourceMappingURL=index.js.map
