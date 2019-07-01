import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';
export default {
  [webphoneErrors.connected]: "網路電話已註冊。",
  [webphoneErrors.webphoneCountOverLimit]: "可註冊最多 5 支網路電話。",
  [webphoneErrors.noOutboundCallWithoutDL]: "您的分機目前不允許使用瀏覽器進行撥出通話，請聯絡您的帳號代表進行升級。",
  [webphoneErrors.toVoiceMailError]: "因為發生內部錯誤，無法將通話轉語音信箱",
  [webphoneErrors.muteError]: "目前無法靜音。",
  [webphoneErrors.holdError]: "目前無法保留。",
  [webphoneErrors.flipError]: "無法翻轉通話。請稍後再試一次。",
  [webphoneErrors.recordError]: "目前無法對通話進行錄音。錯誤代碼：{errorCode}",
  [webphoneErrors.recordDisabled]: "抱歉，您的帳號並不具進行通話錄音的功能。請聯絡您的帳戶管理員。",
  [webphoneErrors.transferError]: "無法轉接通話。請稍後再試一次。",
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
