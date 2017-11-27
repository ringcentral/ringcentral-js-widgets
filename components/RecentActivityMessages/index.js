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

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cx = _bind2.default.bind(_styles2.default);
function MessageItem(_ref) {
  var message = _ref.message,
      navigateTo = _ref.navigateTo,
      dateTimeFormatter = _ref.dateTimeFormatter;
  var subject = message.subject,
      creationTime = message.creationTime,
      readStatus = message.readStatus,
      conversationId = message.conversationId;

  var isUnread = readStatus !== 'Read';
  var time = dateTimeFormatter({ utcTimestamp: creationTime });
  return _react2.default.createElement(
    'div',
    {
      className: cx('messageItem', { localMessageItem: !message.fromRemote }),
      onClick: function onClick() {
        return !message.fromRemote && navigateTo('/conversations/' + conversationId);
      }
    },
    _react2.default.createElement(
      'dl',
      { className: _styles2.default.dl },
      _react2.default.createElement(
        'dt',
        { className: cx('messageSubject', { unread: isUnread }), title: subject },
        subject
      ),
      _react2.default.createElement(
        'dd',
        { className: cx('messageTime', { unread: isUnread }), title: time },
        time
      )
    )
  );
}

MessageItem.propTypes = {
  message: _propTypes2.default.object.isRequired,
  navigateTo: _propTypes2.default.func.isRequired,
  dateTimeFormatter: _propTypes2.default.func.isRequired
};

var RecentActivityMessages = function (_Component) {
  (0, _inherits3.default)(RecentActivityMessages, _Component);

  function RecentActivityMessages() {
    (0, _classCallCheck3.default)(this, RecentActivityMessages);
    return (0, _possibleConstructorReturn3.default)(this, (RecentActivityMessages.__proto__ || (0, _getPrototypeOf2.default)(RecentActivityMessages)).apply(this, arguments));
  }

  (0, _createClass3.default)(RecentActivityMessages, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.currentLocale !== this.props.currentLocale || nextProps.messages !== this.props.messages || nextProps.isMessagesLoaded !== this.props.isMessagesLoaded;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          messages = _props.messages,
          isMessagesLoaded = _props.isMessagesLoaded,
          navigateTo = _props.navigateTo,
          dateTimeFormatter = _props.dateTimeFormatter;

      var messageListView = null;
      if (!isMessagesLoaded) {
        messageListView = _react2.default.createElement(_Spinner2.default, { className: _styles2.default.spinner, ringWidth: 4 });
      } else if (messages.length > 0) {
        messageListView = messages.map(function (message) {
          return _react2.default.createElement(MessageItem, {
            key: message.id,
            message: message,
            navigateTo: navigateTo,
            dateTimeFormatter: dateTimeFormatter
          });
        });
      } else {
        messageListView = _react2.default.createElement(
          'p',
          { className: _styles2.default.noRecords },
          _i18n2.default.getString('noRecords', currentLocale)
        );
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.messages },
        messageListView
      );
    }
  }]);
  return RecentActivityMessages;
}(_react.Component);

exports.default = RecentActivityMessages;


RecentActivityMessages.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  messages: _propTypes2.default.array.isRequired,
  isMessagesLoaded: _propTypes2.default.bool.isRequired,
  navigateTo: _propTypes2.default.func.isRequired,
  dateTimeFormatter: _propTypes2.default.func.isRequired
};
//# sourceMappingURL=index.js.map
