'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MessageItem = require('../MessageItem');

var _MessageItem2 = _interopRequireDefault(_MessageItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMessages(props) {
  return _react2.default.createElement(
    'p',
    { className: _styles2.default.noMessages },
    props.placeholder
  );
}

NoMessages.propTypes = {
  placeholder: _propTypes2.default.string.isRequired
};

var MessageList = function (_Component) {
  (0, _inherits3.default)(MessageList, _Component);

  function MessageList(props) {
    (0, _classCallCheck3.default)(this, MessageList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageList.__proto__ || (0, _getPrototypeOf2.default)(MessageList)).call(this, props));

    _this.onScroll = function () {
      var totalScrollHeight = _this.messagesListBody.scrollHeight;
      var clientHeight = _this.messagesListBody.clientHeight;
      var currentScrollTop = _this.messagesListBody.scrollTop;
      // load next page if scroll near buttom
      if (totalScrollHeight - _this._scrollTop > clientHeight + 10 && totalScrollHeight - currentScrollTop <= clientHeight + 10) {
        _this.setState({
          page: _this.state.page + 1
        });
      }
      _this._scrollTop = currentScrollTop;
    };

    _this._scrollTop = 0;
    _this.state = {
      page: 0
    };
    return _this;
  }

  (0, _createClass3.default)(MessageList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          currentLocale = _props.currentLocale,
          conversations = _props.conversations,
          perPage = _props.perPage,
          disableLinks = _props.disableLinks,
          placeholder = _props.placeholder,
          childProps = (0, _objectWithoutProperties3.default)(_props, ['className', 'currentLocale', 'conversations', 'perPage', 'disableLinks', 'placeholder']);


      var lastIndex = (this.state.page + 1) * perPage - 1;

      var content = conversations && conversations.length ? conversations.slice(0, lastIndex).map(function (item) {
        return _react2.default.createElement(_MessageItem2.default, (0, _extends3.default)({}, childProps, {
          conversation: item,
          currentLocale: currentLocale,
          key: item.id,
          disableLinks: disableLinks
        }));
      }) : _react2.default.createElement(NoMessages, { placeholder: placeholder });
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className),
          onScroll: this.onScroll,
          ref: function ref(list) {
            _this2.messagesListBody = list;
          }
        },
        content
      );
    }
  }]);
  return MessageList;
}(_react.Component);

exports.default = MessageList;


MessageList.propTypes = {
  brand: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  conversations: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.number,
    conversationId: _propTypes2.default.string.isRequired,
    subject: _propTypes2.default.string
  })).isRequired,
  disableLinks: _propTypes2.default.bool,
  perPage: _propTypes2.default.number,
  className: _propTypes2.default.string,
  showConversationDetail: _propTypes2.default.func.isRequired,
  readVoicemail: _propTypes2.default.func.isRequired,
  markVoicemail: _propTypes2.default.func.isRequired,
  dateTimeFormatter: _propTypes2.default.func,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  showGroupNumberName: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string
};
MessageList.defaultProps = {
  perPage: 20,
  className: undefined,
  disableLinks: false,
  dateTimeFormatter: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showGroupNumberName: false,
  placeholder: undefined
};
//# sourceMappingURL=index.js.map
