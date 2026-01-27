"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickToDial = void 0;
var _components = require("@ringcentral-integration/next-widgets/components");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireDefault(require("react"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ClickToDial = exports.ClickToDial = function ClickToDial(_ref) {
  var showClickToDial = _ref.showClickToDial,
    clickToTextPermission = _ref.outboundSMS,
    clickToCallPermission = _ref.clickToCallPermission,
    clickToDialEnabled = _ref.clickToDialEnabled,
    onClickToDialChange = _ref.onClickToDialChange,
    clickToDialTitle = _ref.clickToDialTitle;
  var displayText;
  if (clickToTextPermission && clickToCallPermission) {
    displayText = (0, _i18n.t)('clickToDialSMS');
  } else if (!clickToTextPermission && clickToCallPermission) {
    displayText = (0, _i18n.t)('clickToDial');
  } else if (clickToTextPermission && !clickToCallPermission) {
    displayText = (0, _i18n.t)('clickToSMS');
  } else {
    displayText = '';
  }
  if (showClickToDial && (clickToTextPermission || clickToCallPermission)) {
    return /*#__PURE__*/_react["default"].createElement(_components.Line, {
      "data-sign": "clickToDialSMS",
      icon: /*#__PURE__*/_react["default"].createElement(_springUi.Switch, {
        "data-sign": 'switchClickToDialSMS',
        checked: clickToDialEnabled,
        onChange: function onChange(e) {
          return onClickToDialChange === null || onClickToDialChange === void 0 ? void 0 : onClickToDialChange(e.target.checked);
        }
      }),
      title: clickToDialTitle
    }, displayText);
  }
  return null;
};
//# sourceMappingURL=ClickToDial.js.map
