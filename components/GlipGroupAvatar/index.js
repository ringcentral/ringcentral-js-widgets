'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _default_avatar = require('../../assets/images/default_avatar.png');

var _default_avatar2 = _interopRequireDefault(_default_avatar);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GroupAvatar(_ref) {
  var persons = _ref.persons,
      className = _ref.className,
      unread = _ref.unread;

  var image = void 0;
  if (persons.length <= 2) {
    var noMes = persons.filter(function (p) {
      return !p.isMe;
    });
    var person = noMes && noMes[0];
    image = _react2.default.createElement('img', {
      className: _styles2.default.big,
      src: person && person.avatar || _default_avatar2.default,
      alt: person && person.id
    });
  } else {
    image = _react2.default.createElement(
      'div',
      { className: _styles2.default.images },
      persons.slice(0, 9).map(function (person) {
        return _react2.default.createElement('img', {
          key: person.id,
          className: _styles2.default.small,
          src: person && person.avatar || _default_avatar2.default,
          alt: person && person.id
        });
      })
    );
  }
  var unreadEl = void 0;
  if (unread > 0) {
    unreadEl = _react2.default.createElement(
      'span',
      { className: _styles2.default.unread },
      unread > 99 ? '99+' : unread
    );
  }
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    image,
    unreadEl
  );
}

GroupAvatar.propTypes = {
  className: _propTypes2.default.string,
  persons: _propTypes2.default.array,
  unread: _propTypes2.default.number
};

GroupAvatar.defaultProps = {
  className: undefined,
  unread: 0,
  persons: []
};

exports.default = GroupAvatar;
//# sourceMappingURL=index.js.map
