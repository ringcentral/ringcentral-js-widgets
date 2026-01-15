"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectToDial = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireDefault(require("react"));
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _Switch = _interopRequireDefault(require("../Switch"));
var _i18n = require("./i18n");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SelectToDial = function SelectToDial(_ref) {
  var currentLocale = _ref.currentLocale,
    showSelectToDial = _ref.showSelectToDial,
    smsPermission = _ref.smsPermission,
    callPermission = _ref.callPermission,
    selectToDialEnabled = _ref.selectToDialEnabled,
    onSelectToDialChange = _ref.onSelectToDialChange,
    selectToDialTitle = _ref.selectToDialTitle;
  var displayText;
  if (smsPermission && callPermission) {
    displayText = (0, _i18n.t)('selectToDialSMS', currentLocale);
  } else if (!smsPermission && callPermission) {
    displayText = (0, _i18n.t)('selectToDial', currentLocale);
  } else if (smsPermission && !callPermission) {
    displayText = (0, _i18n.t)('selectToSMS', currentLocale);
  } else {
    displayText = '';
  }
  if (showSelectToDial && (smsPermission || callPermission)) {
    return /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
      dataSign: "selectToDialSMS",
      icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
        dataSign: "switchSelectToDialSMS",
        checked: selectToDialEnabled,
        onChange: onSelectToDialChange
      }),
      title: selectToDialTitle
    }, displayText, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
      className: _styles["default"].tooltipIcon2,
      variant: "plain",
      size: "small",
      title: (0, _i18n.t)('selectToDialHint'),
      "data-sign": "selectToDialHint",
      symbol: _junoIcon.InfoBorder
    }));
  }
  return null;
};
exports.SelectToDial = SelectToDial;
//# sourceMappingURL=SelectToDial.js.map
