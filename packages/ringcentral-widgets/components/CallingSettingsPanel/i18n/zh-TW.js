import callingOptions from 'ringcentral-integration/modules/CallingSettings/callingOptions';

export default {
  title: "正在撥號",
  [callingOptions.softphone]: "桌面版 {brand}",
  [callingOptions.myphone]: "我的 {brand} 電話",
  [callingOptions.otherphone]: "其他電話",
  [callingOptions.customphone]: "自訂電話",
  [callingOptions.browser]: "瀏覽器",
  makeCallsWith: "我的通話進行時使用",
  ringoutHint: "先對我的位置響鈴，然後接通受話方",
  myLocationLabel: "我的位置",
  press1ToStartCallLabel: "在接通通話前提示我按 1"
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
