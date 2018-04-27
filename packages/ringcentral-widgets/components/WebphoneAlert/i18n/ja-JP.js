import webphoneErrors from 'ringcentral-integration/modules/Webphone/webphoneErrors';

export default {
  [webphoneErrors.connectFailed]: 'ウェブ電話サーバーとの接続が失敗しました\u3002',
  [webphoneErrors.connected]: 'ウェブ電話は登録されています\u3002',
  [webphoneErrors.browserNotSupported]: 'ブラウザーを使用した通話は\u3001Chromeのみでサポートされています\u3002',
  [webphoneErrors.webphoneCountOverLimit]: '登録できるウェブ電話は最大5台です\u3002',
  [webphoneErrors.notOutboundCallWithoutDL]: 'お使いの内線は\u3001現在\u3001ブラウザーを使用した通話発信を許可されていません\u3002アップグレードについてアカウント担当者にお問い合わせください\u3002',
  [webphoneErrors.getSipProvisionError]: 'メッセージを送信するためのアクセス許可がありません\u3002',
  [webphoneErrors.toVoiceMailError]: '内部エラーにより\u3001通話をボイスメールに送信できません',
  [webphoneErrors.muteError]: '現在\u3001通話をミュートできません\u3002',
  [webphoneErrors.holdError]: '現在\u3001通話を保留できません\u3002',
  [webphoneErrors.flipError]: '通話をフリップできません\u3002後でもう一度やり直してください\u3002',
  [webphoneErrors.recordError]: '現在\u3001通話を録音できません\u3002エラーコード\uFF1A{errorCode}',
  [webphoneErrors.recordDisabled]: '申し訳ありません\u3002お使いのアカウントでは\u3001通話を録音する機能はサポートされていません\u3002アカウント管理者にお問い合わせください\u3002',
  [webphoneErrors.transferError]: '通話を転送できません\u3002後でもう一度やり直してください\u3002',
  webphoneUnavailable: '{error}\u3002サーバーに再接続しています\u3002エラーが解決しない場合は\u3001このエラーを{brandName}サポートに報告してください\u3002',
  errorCode: '内部エラーコード\uFF1A{errorCode}',
  occurs: '内部エラーコード',
};

// @key: @#@"[webphoneErrors.connectFailed]"@#@ @source: @#@"Connect with web phone server failed."@#@
// @key: @#@"[webphoneErrors.connected]"@#@ @source: @#@"Web phone registered."@#@
// @key: @#@"[webphoneErrors.browserNotSupported]"@#@ @source: @#@"Calling with browser is only supported on Chrome."@#@
// @key: @#@"[webphoneErrors.webphoneCountOverLimit]"@#@ @source: @#@"A maximum of 5 web phones could be registered."@#@
// @key: @#@"[webphoneErrors.notOutboundCallWithoutDL]"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"[webphoneErrors.getSipProvisionError]"@#@ @source: @#@"You have no permission to send message."@#@
// @key: @#@"[webphoneErrors.toVoiceMailError]"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"[webphoneErrors.muteError]"@#@ @source: @#@"Call cannot be muted at the moment."@#@
// @key: @#@"[webphoneErrors.holdError]"@#@ @source: @#@"Call cannot be hold at the moment."@#@
// @key: @#@"[webphoneErrors.flipError]"@#@ @source: @#@"Cannot flip the call. Please try again later."@#@
// @key: @#@"[webphoneErrors.recordError]"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"webphoneUnavailable"@#@ @source: @#@"{error}. We are reconnecting to server. If the error persists, please report this error to {brandName} Support."@#@
// @key: @#@"errorCode"@#@ @source: @#@"Internal error code: {errorCode}"@#@
// @key: @#@"occurs"@#@ @source: @#@"Internal error occurs"@#@
