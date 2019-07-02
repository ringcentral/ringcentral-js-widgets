"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports["default"] = void 0;

require("core-js/modules/es6.function.name");

var _reactRedux = require("react-redux");

var _MsteamsSettings = _interopRequireDefault(require("../../components/MsteamsSettings"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      brand = _ref$phone.brand,
      showAudioSetting = _ref.showAudioSetting,
      showVideoSetting = _ref.showVideoSetting,
      audioTakeOverEnabled = _ref.audioTakeOverEnabled,
      videoTakeOverEnabled = _ref.videoTakeOverEnabled;
  return {
    showAudioSetting: showAudioSetting,
    showVideoSetting: showVideoSetting,
    audioTakeOverEnabled: audioTakeOverEnabled,
    videoTakeOverEnabled: videoTakeOverEnabled,
    brandName: brand.name,
    currentLocale: locale.currentLocale
  };
}

function mapToFunctions(_, _ref2) {
  var routerInteraction = _ref2.phone.routerInteraction,
      onEnabledStatusChange = _ref2.onEnabledStatusChange;
  return {
    onBackClick: function onBackClick() {
      routerInteraction.goBack();
    },
    onAudioSwitchChange: function onAudioSwitchChange(checked) {
      onEnabledStatusChange('audio', checked);
    },
    onVideoSwitchChange: function onVideoSwitchChange(checked) {
      onEnabledStatusChange('video', checked);
    }
  };
}

var MsteamsSettingsPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_MsteamsSettings["default"]));
exports["default"] = MsteamsSettingsPage;
//# sourceMappingURL=index.js.map
