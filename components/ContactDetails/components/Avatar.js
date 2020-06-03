"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _PlaceholderImage = _interopRequireDefault(require("../../PlaceholderImage"));

var _DefaultAvatar = _interopRequireDefault(require("../../../assets/images/DefaultAvatar.svg"));

var _styles = _interopRequireDefault(require("../styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Avatar = function Avatar(_ref) {
  var name = _ref.name,
      avatarUrl = _ref.avatarUrl,
      inactive = _ref.inactive,
      source = _ref.source;
  var imageClassName = (0, _classnames["default"])(_styles["default"].avatarImage, inactive && _styles["default"].inactive);
  var sourceNode = source ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sourceWrapper
  }, source) : null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatar
  }, /*#__PURE__*/_react["default"].createElement(_PlaceholderImage["default"], {
    className: imageClassName,
    alt: name,
    src: avatarUrl,
    placeholder: /*#__PURE__*/_react["default"].createElement(_DefaultAvatar["default"], {
      className: imageClassName
    })
  }), sourceNode);
};

exports.Avatar = Avatar;
Avatar.defaultProps = {
  inactive: false
};
//# sourceMappingURL=Avatar.js.map
