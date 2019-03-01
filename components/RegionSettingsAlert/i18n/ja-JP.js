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
  region: "地域"
}, _defineProperty(_region$regionSetting, _regionSettingsMessages.default.saveSuccess, "設定が正常に保存されました。"), _defineProperty(_region$regionSetting, _regionSettingsMessages.default.dialingPlansChanged, "前の地域は、お使いのアカウントでもうサポートされません。\n    新しい{regionSettingsLink}を確認してください。"), _defineProperty(_region$regionSetting, "regionSettings", "地域の設定"), _defineProperty(_region$regionSetting, _regionSettingsMessages.default.areaCodeInvalid, "有効な市外局番を入力してください。"), _region$regionSetting); // @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@


exports.default = _default;
//# sourceMappingURL=ja-JP.js.map
