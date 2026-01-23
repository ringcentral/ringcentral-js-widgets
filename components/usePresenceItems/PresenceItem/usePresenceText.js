"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePresenceText = usePresenceText;
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _react = require("react");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function usePresenceText(_ref) {
  var dndStatus = _ref.dndStatus,
    presenceStatus = _ref.presenceStatus;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  return (0, _react.useMemo)(function () {
    if (dndStatus === 'DoNotAcceptAnyCalls') {
      return t(dndStatus);
    }
    return t(presenceStatus);
  }, [dndStatus, t, presenceStatus]);
}
//# sourceMappingURL=usePresenceText.js.map
