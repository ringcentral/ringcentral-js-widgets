"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickToDial = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconLine = _interopRequireDefault(require("../../IconLine"));

var _Switch = _interopRequireDefault(require("../../Switch"));

var _i18n = _interopRequireDefault(require("../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ClickToDial = function ClickToDial(_ref) {
  var currentLocale = _ref.currentLocale,
      showClickToDial = _ref.showClickToDial,
      outboundSMS = _ref.outboundSMS,
      clickToDialPermissions = _ref.clickToDialPermissions,
      clickToDialEnabled = _ref.clickToDialEnabled,
      onClickToDialChange = _ref.onClickToDialChange,
      clickToDialTitle = _ref.clickToDialTitle;
  var clickToDialText;

  if (outboundSMS && clickToDialPermissions) {
    clickToDialText = _i18n["default"].getString('clickToDialSMS', currentLocale);
  } else if (!outboundSMS && clickToDialPermissions) {
    clickToDialText = _i18n["default"].getString('clickToDial', currentLocale);
  } else if (outboundSMS && !clickToDialPermissions) {
    clickToDialText = _i18n["default"].getString('clickToSMS', currentLocale);
  } else {
    clickToDialText = '';
  }

  if (showClickToDial && (outboundSMS || clickToDialPermissions)) {
    return _react["default"].createElement(_IconLine["default"], {
      icon: _react["default"].createElement(_Switch["default"], {
        checked: clickToDialEnabled,
        onChange: onClickToDialChange
      }),
      title: clickToDialTitle
    }, clickToDialText);
  }

  return null;
};

exports.ClickToDial = ClickToDial;
//# sourceMappingURL=ClickToDial.js.map
