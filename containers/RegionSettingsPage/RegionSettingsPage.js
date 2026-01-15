"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionSettingsPage = void 0;
var _RegionSettingsPanel = _interopRequireDefault(require("../../components/RegionSettingsPanel"));
var _phoneContext = require("../../lib/phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var RegionSettingsPage = exports.RegionSettingsPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.regionSettingsUI;
})(_RegionSettingsPanel["default"]);
//# sourceMappingURL=RegionSettingsPage.js.map
