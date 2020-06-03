"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.array.filter");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _default_avatar = _interopRequireDefault(require("../../assets/images/default_avatar.png"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GroupAvatar(_ref) {
  var persons = _ref.persons,
      className = _ref.className,
      unread = _ref.unread;
  var image;

  if (persons.length <= 2) {
    var personsWithoutMe = persons.filter(function (p) {
      return !p.isMe;
    });
    var person = personsWithoutMe && personsWithoutMe[0];
    image = /*#__PURE__*/_react["default"].createElement("img", {
      className: _styles["default"].big,
      src: person && person.avatar || _default_avatar["default"],
      alt: person && person.id
    });
  } else {
    image = /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].images
    }, persons.slice(0, 9).map(function (person) {
      return /*#__PURE__*/_react["default"].createElement("img", {
        key: person.id,
        className: _styles["default"].small,
        src: person && person.avatar || _default_avatar["default"],
        alt: person && person.id
      });
    }));
  }

  var unreadEl;

  if (unread > 0) {
    unreadEl = /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].unread
    }, unread > 99 ? '99+' : unread);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].root, className)
  }, image, unreadEl);
}

GroupAvatar.propTypes = {
  className: _propTypes["default"].string,
  persons: _propTypes["default"].array,
  unread: _propTypes["default"].number
};
GroupAvatar.defaultProps = {
  className: undefined,
  unread: 0,
  persons: []
};
var _default = GroupAvatar;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
