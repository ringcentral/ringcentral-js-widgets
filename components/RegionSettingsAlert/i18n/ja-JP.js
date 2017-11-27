'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _region$regionSetting;

var _regionSettingsMessages = require('ringcentral-integration/modules/RegionSettings/regionSettingsMessages');

var _regionSettingsMessages2 = _interopRequireDefault(_regionSettingsMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_region$regionSetting = {
  region: '地域'
}, (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.saveSuccess, '\u8A2D\u5B9A\u304C\u6B63\u5E38\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3057\u305F\u3002'), (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.dialingPlansChanged, '\u524D\u306E\u5730\u57DF\u306F\u3001\u304A\u4F7F\u3044\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u3082\u3046\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u307E\u305B\u3093\u3002\n    \u65B0\u3057\u3044{regionSettingsLink}\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), (0, _defineProperty3.default)(_region$regionSetting, 'regionSettings', '地域の設定'), (0, _defineProperty3.default)(_region$regionSetting, _regionSettingsMessages2.default.areaCodeInvalid, '\u6709\u52B9\u306A\u5E02\u5916\u5C40\u756A\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'), _region$regionSetting);

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
//# sourceMappingURL=ja-JP.js.map
