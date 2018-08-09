'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GlipGroup;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _formatPost = require('../../lib/formatPost');

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _GlipGroupAvatar = require('../GlipGroupAvatar');

var _GlipGroupAvatar2 = _interopRequireDefault(_GlipGroupAvatar);

var _GlipGroupName = require('../GlipGroupName');

var _GlipGroupName2 = _interopRequireDefault(_GlipGroupName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LatestPost(_ref) {
  var latestPost = _ref.latestPost,
      members = _ref.members;

  var isGroup = members.length > 2;
  if (!latestPost) {
    return null;
  }
  var formatedText = (0, _formatPost.getPostAbstract)(latestPost, members);

  if (!isGroup || !latestPost.creator) {
    return _react2.default.createElement(
      'div',
      { className: _styles2.default.latestPost },
      formatedText || 'Unsupported message'
    );
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.latestPost },
    latestPost.creator.firstName,
    ': ',
    formatedText || 'Unsupported message'
  );
}

LatestPost.propTypes = {
  members: _propTypes2.default.array.isRequired,
  latestPost: _propTypes2.default.object
};

LatestPost.defaultProps = {
  latestPost: null
};

function GlipGroup(_ref2) {
  var group = _ref2.group,
      className = _ref2.className,
      onSelectGroup = _ref2.onSelectGroup,
      active = _ref2.active;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, active ? _styles2.default.active : null, className),
      onClick: onSelectGroup
    },
    _react2.default.createElement(_GlipGroupAvatar2.default, {
      persons: group.detailMembers,
      alt: group.id,
      className: _styles2.default.avatar,
      unread: group.unread
    }),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.content },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.name, title: group.name },
        _react2.default.createElement(_GlipGroupName2.default, { group: group })
      ),
      _react2.default.createElement(LatestPost, {
        latestPost: group.latestPost,
        members: group.detailMembers
      })
    )
  );
}

GlipGroup.propTypes = {
  className: _propTypes2.default.string,
  group: _propTypes2.default.object,
  onSelectGroup: _propTypes2.default.func.isRequired,
  active: _propTypes2.default.bool
};

GlipGroup.defaultProps = {
  className: undefined,
  group: {},
  active: false
};
//# sourceMappingURL=index.js.map
