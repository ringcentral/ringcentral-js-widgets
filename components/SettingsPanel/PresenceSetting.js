"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresenceSetting = void 0;
var _react = _interopRequireDefault(require("react"));
var _PresenceSettingSection = require("../PresenceSettingSection");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PresenceSetting = exports.PresenceSetting = function PresenceSetting(_ref) {
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
    openPresenceSettings = _ref.openPresenceSettings,
    enableAcceptQueueCallsControl = _ref.enableAcceptQueueCallsControl,
    onCallQueueManagementClick = _ref.onCallQueueManagementClick;
  return showPresenceSettings && dndStatus && userStatus ? /*#__PURE__*/_react["default"].createElement(_PresenceSettingSection.PresenceSettingSection, {
    enableAcceptQueueCallsControl: enableAcceptQueueCallsControl,
    currentLocale: currentLocale,
    dndStatus: dndStatus,
    userStatus: userStatus
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    isCallQueueMember: isCallQueueMember
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    setAvailable: setAvailable
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    setBusy: setBusy
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    setDoNotDisturb: setDoNotDisturb
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    setInvisible: setInvisible
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | undefined' is no... Remove this comment to see the full error message
    ,
    toggleAcceptCallQueueCalls: toggleAcceptCallQueueCalls
    // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
    ,
    showPresenceSettings: openPresenceSettings,
    onCallQueueManagementClick: onCallQueueManagementClick
  }) : null;
};
//# sourceMappingURL=PresenceSetting.js.map
