"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var NoCalls = function NoCalls(_ref) {
  var currentLocale = _ref.currentLocale,
    active = _ref.active;
  return /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].noCalls
  }, _i18n["default"].getString(active ? 'noActiveCalls' : 'noRecords', currentLocale));
};
var _default = exports["default"] = NoCalls;
//# sourceMappingURL=index.js.map
