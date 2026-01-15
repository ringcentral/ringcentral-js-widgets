"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvLoginHeader = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _engageVoiceLogo = _interopRequireDefault(require("../../assets/icons/engageVoiceLogo.svg"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var EvLoginHeader = exports.EvLoginHeader = function EvLoginHeader(_ref) {
  var wrapperStyle = _ref.wrapperStyle,
    svgStyle = _ref.svgStyle;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].evLogin, wrapperStyle)
  }, /*#__PURE__*/_react["default"].createElement(_engageVoiceLogo["default"], {
    className: svgStyle
  }));
};
//# sourceMappingURL=EvLoginHeader.js.map
