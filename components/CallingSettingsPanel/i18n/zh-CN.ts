import callingOptions from '@ringcentral-integration/commons/modules/CallingSettings/callingOptions';
export default {
  title: "呼叫",
  [callingOptions.softphone]: "{brand}for Desktop",
  [callingOptions.browser]: "浏览器",
  [callingOptions.jupiter]: "{brand}",
  makeCallsWith: "通过以下方式拨打电话",
  ringoutHint: "先在我的位置振铃，然后连接被叫方",
  myLocationLabel: "我的位置",
  press1ToStartCallLabel: "连接通话前提示我拨 1",
  [`${callingOptions.browser}Tooltip`]: "使用此选项通过计算机的麦克风和扬声器拨打和接听电话。",
  [`${callingOptions.softphone}Tooltip`]: "使用此选项，通过 {brand} 拨打和接听电话。",
  [`${callingOptions.ringout}Tooltip`]: "通过此选项，可以使用您选择或输入的电话号码拨打电话。",
  [`${callingOptions.ringout}Tooltip1`]: "您拨打电话时，此电话会先响铃，然后被叫方再响铃。",
  [`${callingOptions.jupiter}Tooltip`]: "使用此选项，通过 {brand} 拨打和接听电话。"
};

// @key: @#@"title"@#@ @source: @#@"Calling"@#@
// @key: @#@"[callingOptions.softphone]"@#@ @source: @#@"{brand} for Desktop"@#@
// @key: @#@"[callingOptions.browser]"@#@ @source: @#@"Browser"@#@
// @key: @#@"[callingOptions.jupiter]"@#@ @source: @#@"{brand}"@#@
// @key: @#@"makeCallsWith"@#@ @source: @#@"Make my calls with"@#@
// @key: @#@"ringoutHint"@#@ @source: @#@"Ring me at my location first, then connect the called party"@#@
// @key: @#@"myLocationLabel"@#@ @source: @#@"My Location"@#@
// @key: @#@"press1ToStartCallLabel"@#@ @source: @#@"Prompt me to dial 1 before connecting the call"@#@
// @key: @#@"[`${callingOptions.browser}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your computer’s microphone and speaker."@#@
// @key: @#@"[`${callingOptions.softphone}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip`]"@#@ @source: @#@"Use this option to make calls using your selected or entered phone number."@#@
// @key: @#@"[`${callingOptions.ringout}Tooltip1`]"@#@ @source: @#@"For the call you make, this phone will ring first then the party you called."@#@
// @key: @#@"[`${callingOptions.jupiter}Tooltip`]"@#@ @source: @#@"Use this option to make and receive calls using your {brand}."@#@
