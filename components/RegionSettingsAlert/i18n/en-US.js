"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _regionSettingsMessages = _interopRequireDefault(require("ringcentral-integration/modules/RegionSettings/regionSettingsMessages"));

var _region$regionSetting;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_region$regionSetting = {
  region: 'Region'
}, _defineProperty(_region$regionSetting, _regionSettingsMessages.default.saveSuccess, 'Settings saved successfully.'), _defineProperty(_region$regionSetting, _regionSettingsMessages.default.dialingPlansChanged, 'The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}.'), _defineProperty(_region$regionSetting, "regionSettings", 'region settings'), _defineProperty(_region$regionSetting, _regionSettingsMessages.default.areaCodeInvalid, 'Please enter a valid area code.'), _region$regionSetting);

exports.default = _default;
//# sourceMappingURL=en-US.js.map
