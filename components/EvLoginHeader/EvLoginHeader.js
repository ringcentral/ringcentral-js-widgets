"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvLoginHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _engageVoiceLogo = _interopRequireDefault(require("../../assets/icons/engageVoiceLogo.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EvLoginHeader = function EvLoginHeader(_ref) {
  var wrapperStyle = _ref.wrapperStyle,
      svgStyle = _ref.svgStyle;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].evLogin, wrapperStyle)
  }, /*#__PURE__*/_react["default"].createElement(_engageVoiceLogo["default"], {
    className: svgStyle
  }));
};

exports.EvLoginHeader = EvLoginHeader;
//# sourceMappingURL=EvLoginHeader.js.map
