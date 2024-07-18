"use strict";

require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabContentView = void 0;
var _react = _interopRequireDefault(require("react"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _TabContentPanel = _interopRequireDefault(require("../TabContentPanel"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
var TabContentView = function TabContentView(props) {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.showSpinner) {
    return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null);
  }
  return /*#__PURE__*/_react["default"].createElement(_TabContentPanel["default"], _extends({}, props, {
    navClassName: _styles["default"].nav,
    tabContentClassName: _styles["default"].content
  }));
};
exports.TabContentView = TabContentView;
//# sourceMappingURL=TabContentView.js.map
