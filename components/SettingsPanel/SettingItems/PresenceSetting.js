"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceSetting = void 0;

var _react = _interopRequireDefault(require("react"));

var _PresenceSettingSection = _interopRequireDefault(require("../../PresenceSettingSection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PresenceSetting = function PresenceSetting(_ref) {
  var showPresenceSettings = _ref.showPresenceSettings,
      dndStatus = _ref.dndStatus,
      userStatus = _ref.userStatus,
      currentLocale = _ref.currentLocale,
      isCallQueueMember = _ref.isCallQueueMember,
      setAvailable = _ref.setAvailable,
      setBusy = _ref.setBusy,
      setDoNotDisturb = _ref.setDoNotDisturb,
      setInvisible = _ref.setInvisible,
      toggleAcceptCallQueueCalls = _ref.toggleAcceptCallQueueCalls,
      openPresenceSettings = _ref.openPresenceSettings;
  return showPresenceSettings && dndStatus && userStatus ? _react["default"].createElement(_PresenceSettingSection["default"], {
    currentLocale: currentLocale,
    dndStatus: dndStatus,
    userStatus: userStatus,
    isCallQueueMember: isCallQueueMember,
    setAvailable: setAvailable,
    setBusy: setBusy,
    setDoNotDisturb: setDoNotDisturb,
    setInvisible: setInvisible,
    toggleAcceptCallQueueCalls: toggleAcceptCallQueueCalls,
    showPresenceSettings: openPresenceSettings
  }) : null;
};

exports.PresenceSetting = PresenceSetting;
//# sourceMappingURL=PresenceSetting.js.map
