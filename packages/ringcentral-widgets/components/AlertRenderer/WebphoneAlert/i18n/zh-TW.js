import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
import webphoneMessages from 'ringcentral-integration/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "抱歉，電話功能目前不可用。請稍後再試一次。",
  [webphoneErrors.connected]: "網路電話已註冊。",
  [webphoneErrors.browserNotSupported]: "抱歉，使用此瀏覽器進行通話不受支援。",
  [webphoneErrors.webphoneCountOverLimit]: "可註冊最多 5 支網路電話。",
  [webphoneErrors.checkDLError]: "無法撥出電話。如果此錯誤持續發生，請聯絡 {brandName} 尋求支援。",
  [webphoneErrors.noOutboundCallWithoutDL]: "您的分機目前不允許使用瀏覽器撥出電話，請聯絡您的帳戶代表進行升級。",
  [webphoneErrors.provisionUpdate]: "抱歉，我們這邊出了一些問題。我們很快就會自動嘗試重新連線。",
  [webphoneErrors.serverConnecting]: "抱歉，連線至電話伺服器時發生問題。",
  [webphoneErrors.toVoiceMailError]: "因為發生內部錯誤，無法將通話轉至語音信箱",
  [webphoneErrors.muteError]: "目前無法靜音。",
  [webphoneErrors.holdError]: "目前無法保留。",
  [webphoneErrors.flipError]: "無法轉接通話。請稍後再試一次。",
  [webphoneErrors.recordError]: "目前無法對通話進行錄音。錯誤代碼：{errorCode}",
  [webphoneErrors.recordDisabled]: "抱歉，您的帳戶並不具進行通話錄音的功能。請聯絡您的帳戶管理員。",
  [webphoneErrors.transferError]: "無法轉接通話。請稍後再試一次。",
  [webphoneMessages.parked]: "您的通話寄存位置為：{parkedNumber}",
  failWithStatusCode: "抱歉，我們遇到了錯誤：{errorCode}。如果問題仍然存在，請向 {brandName} 支援人員回報此錯誤。",
  registeringWithStatusCode: "抱歉，出了一些問題。我們正在嘗試重新連線。如果問題仍然存在，請向 {brandName} 支援人員回報此錯誤。錯誤代碼：{errorCode}。",
  failWithoutStatusCode: "抱歉，我們這邊出了一些問題。如果錯誤仍然存在，請向 {brandName} 支援人員回報此錯誤。",
  registeringWithoutStatusCode: "抱歉，出了一些問題。我們正在嘗試重新連線。如果問題仍然存在，請向 {brandName} 支援人員回報此錯誤。"
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
