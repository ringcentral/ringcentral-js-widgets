"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;
require("core-js/modules/es.function.name.js");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _DefaultAvatar = _interopRequireDefault(require("../../../assets/images/DefaultAvatar.svg"));
var _PlaceholderImage = _interopRequireDefault(require("../../PlaceholderImage"));
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Avatar = exports.Avatar = function Avatar(_ref) {
  var name = _ref.name,
    avatarUrl = _ref.avatarUrl,
    inactive = _ref.inactive,
    source = _ref.source;
  var imageClassName = (0, _clsx["default"])(_styles["default"].avatarImage, inactive && _styles["default"].inactive);
  var sourceNode = source ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sourceWrapper
  }, source) : null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatar
  }, /*#__PURE__*/_react["default"].createElement(_PlaceholderImage["default"]
  // @ts-expect-error TS(2322): Type '{ className: string; alt: string; src: strin... Remove this comment to see the full error message
  , {
    className: imageClassName,
    alt: name,
    src: avatarUrl,
    placeholder: /*#__PURE__*/_react["default"].createElement(_DefaultAvatar["default"], {
      "data-sign": "profile",
      "data-inactive": inactive,
      className: imageClassName
    })
  }), sourceNode);
};
Avatar.defaultProps = {
  inactive: false
};
//# sourceMappingURL=Avatar.js.map
