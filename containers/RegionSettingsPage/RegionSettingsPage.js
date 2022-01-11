"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionSettingsPage = void 0;

var _RegionSettingsPanel = _interopRequireDefault(require("../../components/RegionSettingsPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RegionSettingsPage = (0, _phoneContext.connectModule)(function (phone) {
  return phone.regionSettingsUI;
})(_RegionSettingsPanel["default"]);
exports.RegionSettingsPage = RegionSettingsPage;
//# sourceMappingURL=RegionSettingsPage.js.map
