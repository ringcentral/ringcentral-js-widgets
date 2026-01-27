"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectToDial = void 0;
var _components = require("@ringcentral-integration/next-widgets/components");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SelectToDial = exports.SelectToDial = function SelectToDial(_ref) {
  var showSelectToDial = _ref.showSelectToDial,
    smsPermission = _ref.smsPermission,
    callPermission = _ref.callPermission,
    selectToDialEnabled = _ref.selectToDialEnabled,
    onSelectToDialChange = _ref.onSelectToDialChange,
    selectToDialTitle = _ref.selectToDialTitle;
  var displayText;
  if (smsPermission && callPermission) {
    displayText = (0, _i18n.t)('selectToDialSMS');
  } else if (!smsPermission && callPermission) {
    displayText = (0, _i18n.t)('selectToDial');
  } else if (smsPermission && !callPermission) {
    displayText = (0, _i18n.t)('selectToSMS');
  } else {
    displayText = '';
  }
  if (showSelectToDial && (smsPermission || callPermission)) {
    return /*#__PURE__*/_react["default"].createElement(_components.Line, {
      "data-sign": "selectToDialSMS",
      icon: /*#__PURE__*/_react["default"].createElement(_springUi.Switch, {
        "data-sign": 'switchSelectToDialSMS',
        checked: selectToDialEnabled,
        onChange: function onChange(e) {
          return onSelectToDialChange === null || onSelectToDialChange === void 0 ? void 0 : onSelectToDialChange(e.target.checked);
        }
      }),
      title: selectToDialTitle
    }, displayText, /*#__PURE__*/_react["default"].createElement(_components.Tooltip, {
      title: (0, _i18n.t)('selectToDialHint')
    }, /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      size: "small",
      symbol: _springIcon.InfoMd,
      "data-sign": "selectToDialHint"
    })));
  }
  return null;
};
//# sourceMappingURL=SelectToDial.js.map
