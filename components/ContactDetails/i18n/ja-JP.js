'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _phoneTypes$extension;

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _dndStatus = require('ringcentral-integration/modules/Presence/dndStatus');

var _dndStatus2 = _interopRequireDefault(_dndStatus);

var _phoneTypes = require('../../../enums/phoneTypes');

var _phoneTypes2 = _interopRequireDefault(_phoneTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_phoneTypes$extension = {}, (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.extension, "内線"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.direct, "ダイレクト"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.mobile, "モバイル"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.home, "自宅"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.business, "ビジネス"), (0, _defineProperty3.default)(_phoneTypes$extension, _phoneTypes2.default.fax, "FAX"), (0, _defineProperty3.default)(_phoneTypes$extension, 'emailLabel', "Eメール"), (0, _defineProperty3.default)(_phoneTypes$extension, 'call', "通話"), (0, _defineProperty3.default)(_phoneTypes$extension, 'text', "テキスト"), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.available, "利用可能"), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.offline, "非表示"), (0, _defineProperty3.default)(_phoneTypes$extension, _presenceStatus2.default.busy, "取り込み中"), (0, _defineProperty3.default)(_phoneTypes$extension, _dndStatus2.default.doNotAcceptAnyCalls, "応答不可"), (0, _defineProperty3.default)(_phoneTypes$extension, 'notActivated', "非アクティブ"), _phoneTypes$extension);

// @key: @#@"[phoneTypes.extension]"@#@ @source: @#@"Ext."@#@
// @key: @#@"[phoneTypes.direct]"@#@ @source: @#@"Direct"@#@
// @key: @#@"[phoneTypes.mobile]"@#@ @source: @#@"Mobile"@#@
// @key: @#@"[phoneTypes.home]"@#@ @source: @#@"Home"@#@
// @key: @#@"[phoneTypes.business]"@#@ @source: @#@"Business"@#@
// @key: @#@"[phoneTypes.fax]"@#@ @source: @#@"Fax"@#@
// @key: @#@"emailLabel"@#@ @source: @#@"Email"@#@
// @key: @#@"call"@#@ @source: @#@"Call"@#@
// @key: @#@"text"@#@ @source: @#@"Text"@#@
// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
// @key: @#@"notActivated"@#@ @source: @#@"Inactive"@#@
//# sourceMappingURL=ja-JP.js.map
