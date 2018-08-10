'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extensionLabel$direc;

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _dndStatus = require('ringcentral-integration/modules/Presence/dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_extensionLabel$direc = {
  extensionLabel: "内線",
  directLabel: "ダイレクト",
  emailLabel: "Eメール",
  call: "通話",
  text: "テキスト"
}, (0, _defineProperty3.default)(_extensionLabel$direc, _presenceStatus2.default.available, "利用可能"), (0, _defineProperty3.default)(_extensionLabel$direc, _presenceStatus2.default.offline, "非表示"), (0, _defineProperty3.default)(_extensionLabel$direc, _presenceStatus2.default.busy, "取り込み中"), (0, _defineProperty3.default)(_extensionLabel$direc, _dndStatus2.default.doNotAcceptAnyCalls, "応答不可"), _extensionLabel$direc);

// @key: @#@"extensionLabel"@#@ @source: @#@"Ext."@#@
// @key: @#@"directLabel"@#@ @source: @#@"Direct"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
//# sourceMappingURL=ja-JP.js.map
