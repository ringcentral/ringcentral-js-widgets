import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
import webphoneMessages from 'ringcentral-integration/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "抱歉，电话功能当前不可用。请稍后再试。",
  [webphoneErrors.connected]: "网络电话已注册。",
  [webphoneErrors.browserNotSupported]: "抱歉，不支持使用此浏览器拨打电话。",
  [webphoneErrors.webphoneCountOverLimit]: "最多可注册 5 个网络电话。",
  [webphoneErrors.checkDLError]: "无法拨出电话。如果重复出现此错误，请联系 {brandName} 以获得帮助。",
  [webphoneErrors.noOutboundCallWithoutDL]: "当前您的分机不允许通过浏览器呼出电话，请联系您的帐户代表进行升级。",
  [webphoneErrors.provisionUpdate]: "抱歉，我们这边发生了问题。稍后我们将自动尝试重新连接。",
  [webphoneErrors.serverConnecting]: "抱歉，连接到电话服务器时发生问题。",
  [webphoneErrors.toVoiceMailError]: "由于内部错误，无法发送通话到语音信箱",
  [webphoneErrors.muteError]: "当前无法静音。",
  [webphoneErrors.holdError]: "当前无法保留。",
  [webphoneErrors.flipError]: "无法切换通话。请稍后再试。",
  [webphoneErrors.recordError]: "当前无法录音通话。错误代码：{errorCode}",
  [webphoneErrors.recordDisabled]: "抱歉，您的帐户没有通话录音功能。请联系您的帐户管理员。",
  [webphoneErrors.transferError]: "无法转移通话。请稍后再试。",
  [webphoneMessages.parked]: "您的呼叫寄存在以下号码：{parkedNumber}",
  failWithStatusCode: "抱歉，我们遇到了一个错误：{errorCode}。如果问题仍然存在，请向 {brandName} 支持部门报告此错误。",
  registeringWithStatusCode: "抱歉，发生问题。我们正在尝试重新连接。如果问题仍然存在，请向 {brandName} 支持部门报告此错误。错误代码：{errorCode}。",
  failWithoutStatusCode: "抱歉，我们这边发生了问题。如果错误仍然存在，请向 {brandName} 支持部门报告此错误。",
  registeringWithoutStatusCode: "抱歉，发生问题。我们正在尝试重新连接。如果问题仍然存在，请向 {brandName} 支持部门报告此错误。"
};

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Sorry, phone features are currently unavailable. Please retry later. "@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Sorry, making calls using this browser is not supported."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.checkDLError]"@#@ @source: @#@"Unable to make outgoing call. Contact {brandName} for support if this error keeps showing."@#@
// @key: @#@"[webphoneErrors.noOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.provisionUpdate]"@#@ @source: @#@"Sorry, something went wrong on our end. We will automatically try to reconnect shortly."@#@
// @key: @#@"[webphoneErrors.serverConnecting]"@#@ @source: @#@"Sorry, we are having an issue connecting to the phone server."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
