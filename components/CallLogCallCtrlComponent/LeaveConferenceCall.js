"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeaveConferenceCall = void 0;
var _juno = require("@ringcentral/juno");
var _react = _interopRequireDefault(require("react"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var LeaveConferenceCall = exports.LeaveConferenceCall = function LeaveConferenceCall(props) {
  var currentLocale = props.currentLocale,
    onLeaveCall = props.onLeaveCall,
    onEndCallForEveryOne = props.onEndCallForEveryOne;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col items-center"
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcTypography, {
    "data-sign": "leaveOrEndCallTitle",
    className: "w-[305px] px-4 self-center mb-3",
    align: 'center',
    variant: "subheading2"
  }, _i18n["default"].getString('leaveOrEndCall', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "leaveCall",
    variant: "contained",
    radius: "round",
    className: "min-w-[96px] h-[36px] w-[273px] self-center",
    onClick: onLeaveCall,
    size: 'large'
  }, _i18n["default"].getString('leaveCall', currentLocale)), /*#__PURE__*/_react["default"].createElement(_juno.RcButton, {
    "data-sign": "endCallForEveryone",
    className: "m-2 mx-3 align-self-center",
    fullWidth: false,
    size: 'large',
    variant: "text",
    onClick: onEndCallForEveryOne
  }, _i18n["default"].getString('endCallForEveryone', currentLocale))));
};
//# sourceMappingURL=LeaveConferenceCall.js.map
