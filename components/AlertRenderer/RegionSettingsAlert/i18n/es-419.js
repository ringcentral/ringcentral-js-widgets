"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _regionSettingsMessages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages"));

var _region$regionSetting;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_region$regionSetting = {
  region: "Región"
}, _defineProperty(_region$regionSetting, _regionSettingsMessages["default"].saveSuccess, "La configuración se guardó correctamente."), _defineProperty(_region$regionSetting, _regionSettingsMessages["default"].dialingPlansChanged, "Su cuenta ya no se admite para su cuenta.\n    Verifique su nueva {regionSettingsLink}."), _defineProperty(_region$regionSetting, "regionSettings", "configuración de región"), _defineProperty(_region$regionSetting, _regionSettingsMessages["default"].areaCodeInvalid, "Ingrese un código de área válido."), _region$regionSetting); // @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@


exports["default"] = _default;
//# sourceMappingURL=es-419.js.map
