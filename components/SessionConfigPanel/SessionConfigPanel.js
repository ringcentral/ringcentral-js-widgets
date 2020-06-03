"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionConfigPanel = void 0;

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _CustomArrowButton = require("ringcentral-widgets/components/Rcui/CustomArrowButton");

var _EvLoginHeader = require("../EvLoginHeader");

var _PickList = require("../PickList");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable react/jsx-no-duplicate-props */
var SessionConfigPanel = function SessionConfigPanel(_ref) {
  var currentLocale = _ref.currentLocale,
      selectedSkillProfileId = _ref.selectedSkillProfileId,
      skillProfileList = _ref.skillProfileList,
      setSkillProfileId = _ref.setSkillProfileId,
      loginTypeList = _ref.loginTypeList,
      loginType = _ref.loginType,
      setLoginType = _ref.setLoginType,
      extensionNumber = _ref.extensionNumber,
      setExtensionNumber = _ref.setExtensionNumber,
      takingCall = _ref.takingCall,
      setTakingCall = _ref.setTakingCall,
      autoAnswer = _ref.autoAnswer,
      setAutoAnswer = _ref.setAutoAnswer,
      setConfigure = _ref.setConfigure,
      children = _ref.children,
      inboundQueuesFieldText = _ref.inboundQueuesFieldText,
      isLoading = _ref.isLoading,
      isExtensionNumber = _ref.isExtensionNumber,
      navigateToInboundQueuesPage = _ref.navigateToInboundQueuesPage;
  return /*#__PURE__*/_react["default"].createElement("main", {
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement(_EvLoginHeader.EvLoginHeader, {
    wrapperStyle: _styles["default"].wrapperStyle,
    svgStyle: _styles["default"].svgStyle
  }), /*#__PURE__*/_react["default"].createElement(_rcui.RcTextField, {
    "data-sign": "inboundQueues",
    label: _i18n["default"].getString('inboundQueues', currentLocale),
    title: inboundQueuesFieldText,
    value: inboundQueuesFieldText,
    fullWidth: true,
    classes: {
      root: _styles["default"].customSelect
    },
    InputProps: {
      readOnly: true,
      endAdornment: /*#__PURE__*/_react["default"].createElement(_CustomArrowButton.CustomArrowButton, null)
    },
    clearBtn: false,
    onClick: navigateToInboundQueuesPage
  }), skillProfileList.length > 0 && /*#__PURE__*/_react["default"].createElement(_PickList.PickList, {
    "data-sign": "skillProfile",
    options: skillProfileList,
    label: _i18n["default"].getString('skillProfile', currentLocale),
    value: selectedSkillProfileId,
    optionValueKey: "profileId",
    optionLabelKey: "profileName",
    onChange: function onChange(e) {
      setSkillProfileId(e);
    }
  }), /*#__PURE__*/_react["default"].createElement(_PickList.PickList, {
    "data-sign": "loginType",
    options: loginTypeList,
    label: _i18n["default"].getString('voiceConnection', currentLocale),
    value: loginType,
    onChange: function onChange(e) {
      setLoginType(e);
    }
  }), isExtensionNumber && /*#__PURE__*/_react["default"].createElement(_rcui.RcTextField, {
    "data-sign": "extensionNumber",
    label: _i18n["default"].getString('extensionNumber', currentLocale),
    fullWidth: true,
    value: extensionNumber,
    placeholder: _i18n["default"].getString('enterYourPhoneNumber', currentLocale),
    inputProps: {
      maxLength: 255
    },
    clearBtn: false,
    classes: {
      root: _styles["default"].customSelect
    },
    onChange: function onChange(_ref2) {
      var value = _ref2.target.value;
      setExtensionNumber(value);
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].button
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcButton, {
    "data-sign": "setConfigure",
    fullWidth: true,
    disabled: isLoading,
    loading: isLoading,
    size: "medium",
    onClick: function onClick() {
      setConfigure();
    }
  }, _i18n["default"].getString('continue', currentLocale))), children);
};

exports.SessionConfigPanel = SessionConfigPanel;
//# sourceMappingURL=SessionConfigPanel.js.map
