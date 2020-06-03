"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = GlipPost;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _status = _interopRequireDefault(require("ringcentral-integration/modules/GlipPosts/status"));

var _default_avatar = _interopRequireDefault(require("../../assets/images/default_avatar.png"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _GlipPostContent = _interopRequireDefault(require("../GlipPostContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function PostAvatar(_ref) {
  var creator = _ref.creator,
      viewProfile = _ref.viewProfile;

  if (!creator) {
    // TODO: update alt with i18n
    return /*#__PURE__*/_react["default"].createElement("img", {
      src: _default_avatar["default"],
      alt: "default avatar"
    });
  }

  return /*#__PURE__*/_react["default"].createElement("img", {
    onClick: function onClick() {
      return viewProfile(creator.id);
    },
    src: creator.avatar || _default_avatar["default"],
    alt: creator.id
  });
}

PostAvatar.propTypes = {
  creator: _propTypes["default"].object,
  viewProfile: _propTypes["default"].func.isRequired
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

  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].name,
    onClick: function onClick() {
      return viewProfile(creator.id);
    }
  }, creator.firstName, " ", creator.lastName);
}

PostName.propTypes = {
  creator: _propTypes["default"].object,
  viewProfile: _propTypes["default"].func.isRequired,
  showName: _propTypes["default"].bool.isRequired
};
PostName.defaultProps = {
  creator: null
};

function PostStatus(_ref3) {
  var sendStatus = _ref3.sendStatus;

  if (!sendStatus) {
    return null;
  } // TODO: update sending status with i18n


  return /*#__PURE__*/_react["default"].createElement("span", null, "(", sendStatus === _status["default"].creating ? 'Sending' : 'Send failed', ")");
}

PostStatus.propTypes = {
  sendStatus: _propTypes["default"].string
};
PostStatus.defaultProps = {
  sendStatus: null
};

function PostTime(_ref4) {
  var creationTime = _ref4.creationTime;

  if (!creationTime) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].time
  }, creationTime);
}

PostTime.propTypes = {
  creationTime: _propTypes["default"].string
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
      var peronName = atRender({
        id: id,
        type: 'Person'
      });
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: id
      }, peronName);
    });
  } // TODO: update joining status with i18n


  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement(PostTime, {
    creationTime: creationTime
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatar
  }, /*#__PURE__*/_react["default"].createElement(PostAvatar, {
    creator: post.creator,
    viewProfile: viewProfile
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].title
  }, /*#__PURE__*/_react["default"].createElement(PostName, {
    creator: post.creator,
    showName: showName || post.type !== 'TextMessage',
    viewProfile: viewProfile
  }), post.type === 'PersonJoined' ? 'joined the team' : null, post.type === 'PersonsAdded' ? 'added ' : null, addedPersons, post.type === 'PersonsAdded' ? 'to the team' : null, /*#__PURE__*/_react["default"].createElement(PostStatus, {
    sendStatus: post.sendStatus
  })), post.type === 'TextMessage' ? /*#__PURE__*/_react["default"].createElement(_GlipPostContent["default"], {
    post: post,
    atRender: atRender
  }) : null));
}

GlipPost.propTypes = {
  className: _propTypes["default"].string,
  post: _propTypes["default"].object,
  creationTime: _propTypes["default"].string,
  showName: _propTypes["default"].bool,
  atRender: _propTypes["default"].func,
  viewProfile: _propTypes["default"].func.isRequired
};
GlipPost.defaultProps = {
  className: undefined,
  creationTime: undefined,
  post: {},
  showName: true,
  atRender: undefined
};
//# sourceMappingURL=index.js.map
