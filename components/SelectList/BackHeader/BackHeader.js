"use strict";

require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackHeader = void 0;
var _BackHeaderV = _interopRequireDefault(require("@ringcentral-integration/widgets/components/BackHeaderV2"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("../styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
var BackHeader = function BackHeader(props) {
  return /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], _extends({}, props, {
    rightIcon: /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].fillRight
    }),
    className: _styles["default"].backHeader
  }));
};
exports.BackHeader = BackHeader;
//# sourceMappingURL=BackHeader.js.map
