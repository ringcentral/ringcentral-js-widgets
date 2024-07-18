"use strict";

require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EmojiSelect;
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactEmojione = _interopRequireDefault(require("react-emojione"));
var _emojione = _interopRequireDefault(require("../../assets/images/emojione.png"));
var _emojis = _interopRequireDefault(require("./emojis.json"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function EmojiSelect(_ref) {
  var onSelect = _ref.onSelect,
    className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, _emojis["default"].map(function (emoji) {
    var emojsStr = ":".concat(emoji, ":");
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: emoji,
      className: _styles["default"].emoji,
      onClick: function onClick() {
        return onSelect(emojsStr);
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactEmojione["default"], {
      style: {
        width: 25,
        height: 25,
        backgroundImage: "url(\"".concat(_emojione["default"], "\")")
      }
    }, emojsStr));
  }));
}
EmojiSelect.propTypes = {
  onSelect: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string
};
EmojiSelect.defaultProps = {
  className: undefined
};
//# sourceMappingURL=index.js.map
