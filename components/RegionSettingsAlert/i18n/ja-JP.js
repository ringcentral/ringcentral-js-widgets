"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _region$regionSetting;

var _regionSettingsMessages = require("ringcentral-integration/modules/RegionSettings/regionSettingsMessages");

var _regionSettingsMessages2 = _interopRequireDefault(_regionSettingsMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_region$regionSetting = {
  region: "地域"
}, (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.saveSuccess, "設定が正常に保存されました。"), (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.dialingPlansChanged, "前の地域は、お使いのアカウントでもうサポートされません。\n    新しい{regionSettingsLink}を確認してください。"), (0, _defineProperty3.default)(_region$regionSetting, "regionSettings", "地域の設定"), (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.areaCodeInvalid, "有効な市外局番を入力してください。"), _region$regionSetting);

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
//# sourceMappingURL=ja-JP.js.map
