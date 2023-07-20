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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
