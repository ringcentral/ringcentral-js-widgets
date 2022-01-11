"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _regionSettingsMessages = require("@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages");

var _region$regionSetting;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_region$regionSetting = {
  region: "Alue"
}, _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.saveSuccess, "Asetukset tallennettu."), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.dialingPlansChanged, "Aiempaa aluetta ei enää tueta tililläsi.\n    Vahvista uudet {regionSettingsLink}."), _defineProperty(_region$regionSetting, "regionSettings", "alueasetukset"), _defineProperty(_region$regionSetting, _regionSettingsMessages.regionSettingsMessages.areaCodeInvalid, "Anna kelvollinen suuntanumero."), _region$regionSetting); // @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@


exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
