'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MessageItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RcFont = require('../../assets/RcFont/RcFont.scss');

var _RcFont2 = _interopRequireDefault(_RcFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MessageItem(props) {
  var messageIcon = props.type === 'SMS' ? _react2.default.createElement('span', { className: _RcFont2.default.uniA5 }) : _react2.default.createElement('span', { className: _RcFont2.default.uni41 });
  var className = null;
  if (props.unreadCounts > 0) {
    className = (0, _classnames2.default)(_styles2.default.messageItem, _styles2.default.unRead);
  } else {
    className = _styles2.default.messageItem;
  }
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      _reactRouter.Link,
      {
        to: '/conversations/' + props.conversationId,
        className: _styles2.default.messageLink
      },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.typeIcon },
        messageIcon
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.messageContent },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.messageFrom },
          props.contactList.join(',')
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.messageText },
          props.subject
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.messageInfo },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.messageTime },
            props.formatDateTime(props.creationTime)
          )
        )
      )
    ),
    _react2.default.createElement(
      _reactRouter.Link,
      {
        to: '/messages',
        className: _styles2.default.messageLink
      },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.contactInfo },
        _react2.default.createElement('span', { className: _RcFont2.default.uni2477 })
      )
    )
  );
}

MessageItem.propTypes = {
  type: _react.PropTypes.string.isRequired,
  unreadCounts: _react.PropTypes.number,
  conversationId: _react.PropTypes.string.isRequired,
  subject: _react.PropTypes.string,
  contactList: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
  creationTime: _react.PropTypes.string.isRequired,
  formatDateTime: _react.PropTypes.func.isRequired
};

MessageItem.defaultProps = {
  unreadCounts: 0,
  subject: ''
};
//# sourceMappingURL=index.js.map
