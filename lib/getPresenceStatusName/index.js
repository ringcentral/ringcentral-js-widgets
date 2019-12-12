"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresenceStatusName = getPresenceStatusName;

var _dndStatus = _interopRequireDefault(require("ringcentral-integration/modules/Presence/dndStatus"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getPresenceStatusName(presenceStatus, dndStatus, currentLocale) {
  if (dndStatus === _dndStatus["default"].doNotAcceptAnyCalls) {
    return _i18n["default"].getString(dndStatus, currentLocale);
  }

  return _i18n["default"].getString(presenceStatus, currentLocale);
}
//# sourceMappingURL=index.js.map
