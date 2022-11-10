"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingIdSection = void 0;

require("react-widgets/dist/css/react-widgets.css");

var _react = _interopRequireDefault(require("react"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _juno = require("@ringcentral/juno");

var _CheckBox = _interopRequireDefault(require("../CheckBox"));

var _MeetingSection = _interopRequireDefault(require("../MeetingSection"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MeetingIdSection = function MeetingIdSection(_ref) {
  var handlePmiConfirmed = _ref.handlePmiConfirmed,
      personalMeetingId = _ref.personalMeetingId,
      currentLocale = _ref.currentLocale,
      switchUsePersonalMeetingId = _ref.switchUsePersonalMeetingId,
      meeting = _ref.meeting,
      isChangePmiConfirmed = _ref.isChangePmiConfirmed;
  var ID_SETTING_OPTIONS = [{
    key: true,
    text: (0, _formatMessage["default"])(_i18n["default"].getString('usePmi', currentLocale), {
      meetingId: personalMeetingId
    })
  }, {
    key: false,
    text: _i18n["default"].getString('generateAutomatically', currentLocale)
  }];
  return /*#__PURE__*/_react["default"].createElement(_MeetingSection["default"], {
    title: _i18n["default"].getString('meetingId', currentLocale),
    withSwitch: true
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_CheckBox["default"], {
    onSelect: function onSelect(_ref2) {
      var key = _ref2.key;

      if (key) {
        handlePmiConfirmed(false);
      }

      switchUsePersonalMeetingId(key);
    },
    valueField: "key",
    textField: "text",
    selected: meeting.usePersonalMeetingId,
    data: ID_SETTING_OPTIONS
  }), meeting.usePersonalMeetingId && isChangePmiConfirmed ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].pmiHintContainer
  }, _i18n["default"].getString('pmiSettingChangeAlert', currentLocale)) : null, meeting.usePersonalMeetingId && !isChangePmiConfirmed ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].pmiHintContainer
  }, _i18n["default"].getString('pmiChangeConfirm', currentLocale), /*#__PURE__*/_react["default"].createElement(_juno.RcLink, {
    onClick: function onClick() {
      return handlePmiConfirmed(true);
    }
  }, _i18n["default"].getString('changePmiSettings', currentLocale)), ".") : null));
};

exports.MeetingIdSection = MeetingIdSection;
//# sourceMappingURL=MeetingIdSection.js.map
