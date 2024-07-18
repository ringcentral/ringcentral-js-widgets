"use strict";

require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = GlipGroup;
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _formatPost = require("../../lib/formatPost");
var _GlipGroupAvatar = _interopRequireDefault(require("../GlipGroupAvatar"));
var _GlipGroupName = _interopRequireDefault(require("../GlipGroupName"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function LatestPost(_ref) {
  var latestPost = _ref.latestPost,
    members = _ref.members;
  var isGroup = members.length > 2;
  if (!latestPost) {
    return null;
  }
  var formatedText = (0, _formatPost.getPostAbstract)(latestPost, members);
  if (!isGroup || !latestPost.creator) {
    // TODO: update message with i18n
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].latestPost
    }, formatedText || 'Unsupported message');
  }
  // TODO: update message with i18n
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].latestPost
  }, latestPost.creator.firstName, ": ", formatedText || 'Unsupported message');
}
LatestPost.propTypes = {
  members: _propTypes["default"].array.isRequired,
  latestPost: _propTypes["default"].object
};
LatestPost.defaultProps = {
  latestPost: null
};
function GlipGroup(_ref2) {
  var group = _ref2.group,
    className = _ref2.className,
    onSelectGroup = _ref2.onSelectGroup,
    active = _ref2.active;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, active ? _styles["default"].active : null, className),
    onClick: onSelectGroup
  }, /*#__PURE__*/_react["default"].createElement(_GlipGroupAvatar["default"], {
    persons: group.detailMembers,
    alt: group.id,
    className: _styles["default"].avatar,
    unread: group.unread
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].content
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].name,
    title: group.name
  }, /*#__PURE__*/_react["default"].createElement(_GlipGroupName["default"], {
    group: group
  })), /*#__PURE__*/_react["default"].createElement(LatestPost, {
    latestPost: group.latestPost,
    members: group.detailMembers
  })));
}
GlipGroup.propTypes = {
  className: _propTypes["default"].string,
  group: _propTypes["default"].object,
  onSelectGroup: _propTypes["default"].func.isRequired,
  active: _propTypes["default"].bool
};
GlipGroup.defaultProps = {
  className: undefined,
  group: {},
  active: false
};
//# sourceMappingURL=index.js.map
