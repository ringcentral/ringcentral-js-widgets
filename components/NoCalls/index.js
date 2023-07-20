"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var NoCalls = function NoCalls(_ref) {
  var currentLocale = _ref.currentLocale,
    active = _ref.active;
  return /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].noCalls
  }, _i18n["default"].getString(active ? 'noActiveCalls' : 'noRecords', currentLocale));
};
var _default = NoCalls;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
