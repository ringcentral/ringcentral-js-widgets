"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _title$callingOptions;

var _callingOptions = require("ringcentral-integration/modules/CallingSettings/callingOptions");

var _callingOptions2 = _interopRequireDefault(_callingOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_title$callingOptions = {
  title: "通話"
}, (0, _defineProperty3.default)(_title$callingOptions, _callingOptions2.default.softphone, "{brand} for Desktop"), (0, _defineProperty3.default)(_title$callingOptions, _callingOptions2.default.myphone, "自分の{brand}電話"), (0, _defineProperty3.default)(_title$callingOptions, _callingOptions2.default.otherphone, "その他の電話"), (0, _defineProperty3.default)(_title$callingOptions, _callingOptions2.default.customphone, "カスタム電話"), (0, _defineProperty3.default)(_title$callingOptions, _callingOptions2.default.browser, "ブラウザー"), (0, _defineProperty3.default)(_title$callingOptions, "makeCallsWith", "通話発信に使用する電話"), (0, _defineProperty3.default)(_title$callingOptions, "ringoutHint", "最初に自分の場所で自身を呼び出した後、通話相手に接続する"), (0, _defineProperty3.default)(_title$callingOptions, "myLocationLabel", "自分の場所"), (0, _defineProperty3.default)(_title$callingOptions, "press1ToStartCallLabel", "通話接続前に「1」をダイヤルするように指示するメッセージを受け取る"), _title$callingOptions);

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.myphone]"@#@ @source: @#@"My {brand} Phone"@#@
// @key: @#@"[callingOptions.otherphone]"@#@ @source: @#@"Other Phone"@#@
// @key: @#@"[callingOptions.customphone]"@#@ @source: @#@"Custom Phone"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
//# sourceMappingURL=ja-JP.js.map
