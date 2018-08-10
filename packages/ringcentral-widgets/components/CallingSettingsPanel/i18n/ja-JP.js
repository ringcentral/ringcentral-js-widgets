import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: "通話",
  [callingOptions.softphone]: "{brand} for Desktop",
  [callingOptions.myphone]: "自分の{brand}電話",
  [callingOptions.otherphone]: "その他の電話",
  [callingOptions.customphone]: "カスタム電話",
  [callingOptions.browser]: "ブラウザー",
  makeCallsWith: "通話発信に使用する電話",
  ringoutHint: "最初に自分の場所で自身を呼び出した後、通話相手に接続する",
  myLocationLabel: "自分の場所",
  press1ToStartCallLabel: "通話接続前に「1」をダイヤルするように指示するメッセージを受け取る"
};

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
