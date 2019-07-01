import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
export default {
  [webphoneErrors.connected]: "网络电话已注册。",
  [webphoneErrors.webphoneCountOverLimit]: "最多可注册 5 个网络电话。",
  [webphoneErrors.noOutboundCallWithoutDL]: "当前您的分机不允许通过浏览器呼出电话，请联系您的账户代表进行升级。",
  [webphoneErrors.toVoiceMailError]: "由于内部错误，无法发送通话到语音信箱",
  [webphoneErrors.muteError]: "当前无法静音。",
  [webphoneErrors.holdError]: "当前无法保留。",
  [webphoneErrors.flipError]: "无法切换通话。请稍后再试。",
  [webphoneErrors.recordError]: "当前无法录音通话。错误代码：{errorCode}",
  [webphoneErrors.recordDisabled]: "抱歉，您的账户没有通话录音功能。请联系您的账户管理员。",
  [webphoneErrors.transferError]: "无法转移通话。请稍后再试。",
};

// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@