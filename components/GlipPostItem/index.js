'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GlipPost;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _status = require('ringcentral-integration/modules/GlipPosts/status');

var _status2 = _interopRequireDefault(_status);

var _default_avatar = require('../../assets/images/default_avatar.png');

var _default_avatar2 = _interopRequireDefault(_default_avatar);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _GlipPostContent = require('../GlipPostContent');

var _GlipPostContent2 = _interopRequireDefault(_GlipPostContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PostAvatar(_ref) {
  var creator = _ref.creator,
      viewProfile = _ref.viewProfile;

  if (!creator) {
    return _react2.default.createElement('img', { src: _default_avatar2.default, alt: 'default avatar' });
  }
  return _react2.default.createElement('img', {
    onClick: function onClick() {
      return viewProfile(creator.id);
    },
    src: creator.avatar || _default_avatar2.default,
    alt: creator.id
  });
}

PostAvatar.propTypes = {
  creator: _propTypes2.default.object,
  viewProfile: _propTypes2.default.func.isRequired
};

PostAvatar.defaultProps = {
  creator: null
};

function PostName(_ref2) {
  var creator = _ref2.creator,
      showName = _ref2.showName,
      viewProfile = _ref2.viewProfile;

  if (!creator || !showName) {
    return null;
  }
  return _react2.default.createElement(
    'span',
    { className: _styles2.default.name, onClick: function onClick() {
        return viewProfile(creator.id);
      } },
    creator.firstName,
    ' ',
    creator.lastName
  );
}

PostName.propTypes = {
  creator: _propTypes2.default.object,
  viewProfile: _propTypes2.default.func.isRequired,
  showName: _propTypes2.default.bool.isRequired
};

PostName.defaultProps = {
  creator: null
};

function PostStatus(_ref3) {
  var sendStatus = _ref3.sendStatus;

  if (!sendStatus) {
    return null;
  }
  return _react2.default.createElement(
    'span',
    null,
    '(',
    sendStatus === _status2.default.creating ? 'Sending' : 'Send failed',
    ')'
  );
}

PostStatus.propTypes = {
  sendStatus: _propTypes2.default.string
};

PostStatus.defaultProps = {
  sendStatus: null
};

function PostTime(_ref4) {
  var creationTime = _ref4.creationTime;

  if (!creationTime) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.time },
    creationTime
  );
}

PostTime.propTypes = {
  creationTime: _propTypes2.default.string
};

PostTime.defaultProps = {
  creationTime: null
};

function GlipPost(_ref5) {
  var post = _ref5.post,
      className = _ref5.className,
      creationTime = _ref5.creationTime,
      showName = _ref5.showName,
      atRender = _ref5.atRender,
      viewProfile = _ref5.viewProfile;

  var addedPersons = null;
  if (post.type === 'PersonsAdded') {
    addedPersons = post.addedPersonIds && post.addedPersonIds.map(function (id) {
      var peronName = atRender({ id: id, type: 'Person' });
      return _react2.default.createElement(
        'span',
        { key: id },
        peronName
      );
    });
  }
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, className)
    },
    _react2.default.createElement(PostTime, {
      creationTime: creationTime
    }),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.avatar },
      _react2.default.createElement(PostAvatar, { creator: post.creator, viewProfile: viewProfile })
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.content },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.title },
        _react2.default.createElement(PostName, {
          creator: post.creator,
          showName: showName || post.type !== 'TextMessage',
          viewProfile: viewProfile
        }),
        post.type === 'PersonJoined' ? 'joined the team' : null,
        post.type === 'PersonsAdded' ? 'added ' : null,
        addedPersons,
        post.type === 'PersonsAdded' ? 'to the team' : null,
        _react2.default.createElement(PostStatus, { sendStatus: post.sendStatus })
      ),
      post.type === 'TextMessage' ? _react2.default.createElement(_GlipPostContent2.default, { post: post, atRender: atRender }) : null
    )
  );
}

GlipPost.propTypes = {
  className: _propTypes2.default.string,
  post: _propTypes2.default.object,
  creationTime: _propTypes2.default.string,
  showName: _propTypes2.default.bool,
  atRender: _propTypes2.default.func,
  viewProfile: _propTypes2.default.func.isRequired
};

GlipPost.defaultProps = {
  className: undefined,
  creationTime: undefined,
  post: {},
  showName: true,
  atRender: undefined
};
//# sourceMappingURL=index.js.map
