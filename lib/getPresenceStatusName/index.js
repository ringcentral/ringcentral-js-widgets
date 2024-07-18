"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresenceStatusName = getPresenceStatusName;
var _Presence = require("@ringcentral-integration/commons/modules/Presence");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getPresenceStatusName(currentUserStatus, currentDndStatus, currentLocale) {
  if (currentDndStatus === _Presence.dndStatus.doNotAcceptAnyCalls) {
    return _i18n["default"].getString(currentDndStatus, currentLocale);
  }
  return _i18n["default"].getString(currentUserStatus, currentLocale);
}
//# sourceMappingURL=index.js.map
