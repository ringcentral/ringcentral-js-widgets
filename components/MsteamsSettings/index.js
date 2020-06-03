"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MsteamsSettings;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _Switch = _interopRequireDefault(require("../Switch"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MsteamsSettings(_ref) {
  var currentLocale = _ref.currentLocale,
      brandName = _ref.brandName,
      showAudioSetting = _ref.showAudioSetting,
      showVideoSetting = _ref.showVideoSetting,
      audioTakeOverEnabled = _ref.audioTakeOverEnabled,
      videoTakeOverEnabled = _ref.videoTakeOverEnabled,
      onAudioSwitchChange = _ref.onAudioSwitchChange,
      onVideoSwitchChange = _ref.onVideoSwitchChange,
      onBackClick = _ref.onBackClick;

  var audioSetting = showAudioSetting && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].block
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].text
  }, (0, _formatMessage["default"])(_i18n["default"].getString('audioSetting', currentLocale), {
    brandName: brandName
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"]["switch"]
  }, /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
    checked: audioTakeOverEnabled,
    onChange: onAudioSwitchChange
  })));

  var videoSetting = showVideoSetting && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].block
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].text
  }, (0, _formatMessage["default"])(_i18n["default"].getString('videoSetting', currentLocale), {
    brandName: brandName
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"]["switch"]
  }, /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
    checked: videoTakeOverEnabled,
    onChange: onVideoSwitchChange
  })));

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].root
  }, /*#__PURE__*/_react["default"].createElement(_BackHeader["default"], {
    onBackClick: onBackClick
  }, _i18n["default"].getString('msTeamsSettingHeader', currentLocale)), /*#__PURE__*/_react["default"].createElement(_Panel["default"], {
    className: _styles["default"].content
  }, audioSetting, videoSetting));
}

MsteamsSettings.propTypes = {
  brandName: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  showAudioSetting: _propTypes["default"].bool,
  showVideoSetting: _propTypes["default"].bool,
  audioTakeOverEnabled: _propTypes["default"].bool,
  videoTakeOverEnabled: _propTypes["default"].bool,
  onAudioSwitchChange: _propTypes["default"].func,
  onVideoSwitchChange: _propTypes["default"].func,
  onBackClick: _propTypes["default"].func.isRequired
};
MsteamsSettings.defaultProps = {
  showAudioSetting: true,
  showVideoSetting: true,
  audioTakeOverEnabled: false,
  videoTakeOverEnabled: false,
  onAudioSwitchChange: function onAudioSwitchChange() {
    return null;
  },
  onVideoSwitchChange: function onVideoSwitchChange() {
    return null;
  }
};
//# sourceMappingURL=index.js.map
