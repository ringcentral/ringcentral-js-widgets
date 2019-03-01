"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _audioSettingsErrors = _interopRequireDefault(require("ringcentral-integration/modules/AudioSettings/audioSettingsErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _defineProperty({}, _audioSettingsErrors.default.userMediaPermission, "オーディオへのアクセスを{application}に許可してください。"); // @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@


exports.default = _default;
//# sourceMappingURL=ja-JP.js.map
