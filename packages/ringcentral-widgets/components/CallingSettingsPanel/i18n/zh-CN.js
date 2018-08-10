import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: "正在呼叫",
  [callingOptions.softphone]: "桌面版 {brand}",
  [callingOptions.myphone]: "我的 {brand} 电话",
  [callingOptions.otherphone]: "其他电话",
  [callingOptions.customphone]: "自定义电话",
  [callingOptions.browser]: "浏览器",
  makeCallsWith: "通过以下方式拨打电话",
  ringoutHint: "先在我的位置响铃，然后连接被叫方",
  myLocationLabel: "我的位置",
  press1ToStartCallLabel: "连接通话前提示我拨 1"
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
