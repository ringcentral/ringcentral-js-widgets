"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickToDial = void 0;
var _react = _interopRequireDefault(require("react"));
var _IconLine = _interopRequireDefault(require("../IconLine"));
var _Switch = _interopRequireDefault(require("../Switch"));
var _i18n = require("./i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ClickToDial = exports.ClickToDial = function ClickToDial(_ref) {
  var currentLocale = _ref.currentLocale,
    showClickToDial = _ref.showClickToDial,
    clickToTextPermission = _ref.outboundSMS,
    clickToCallPermission = _ref.clickToCallPermission,
    clickToDialEnabled = _ref.clickToDialEnabled,
    onClickToDialChange = _ref.onClickToDialChange,
    clickToDialTitle = _ref.clickToDialTitle;
  var displayText;
  if (clickToTextPermission && clickToCallPermission) {
    displayText = (0, _i18n.t)('clickToDialSMS', currentLocale);
  } else if (!clickToTextPermission && clickToCallPermission) {
    displayText = (0, _i18n.t)('clickToDial', currentLocale);
  } else if (clickToTextPermission && !clickToCallPermission) {
    displayText = (0, _i18n.t)('clickToSMS', currentLocale);
  } else {
    displayText = '';
  }
  if (showClickToDial && (clickToTextPermission || clickToCallPermission)) {
    return /*#__PURE__*/_react["default"].createElement(_IconLine["default"], {
      dataSign: "clickToDialSMS",
      icon: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
        dataSign: "switchClickToDialSMS",
        checked: clickToDialEnabled,
        onChange: onClickToDialChange
      }),
      title: clickToDialTitle
    }, displayText);
  }
  return null;
};
//# sourceMappingURL=ClickToDial.js.map
