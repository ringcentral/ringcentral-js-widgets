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
  extensionLabel: "分机",
  directLabel: "直线",
  emailLabel: "电子邮件",
  call: "呼叫",
  text: "短信"
}, (0, _defineProperty3.default)(_extensionLabel$direc, _presenceStatus2.default.available, "在线"), (0, _defineProperty3.default)(_extensionLabel$direc, _presenceStatus2.default.offline, "隐身"), (0, _defineProperty3.default)(_extensionLabel$direc, _presenceStatus2.default.busy, "忙碌"), (0, _defineProperty3.default)(_extensionLabel$direc, _dndStatus2.default.doNotAcceptAnyCalls, "勿扰"), _extensionLabel$direc);

// @key: @#@"extensionLabel"@#@ @source: @#@"Ext."@#@
// @key: @#@"directLabel"@#@ @source: @#@"Direct"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
//# sourceMappingURL=zh-CN.js.map
