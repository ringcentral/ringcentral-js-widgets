import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import webphoneMessages from '@ringcentral-integration/commons/modules/Webphone/webphoneMessages';
export default {
  [webphoneErrors.connectFailed]: "申し訳ございません。現在、電話機能は使用できません。後でやり直してください。 ",
  [webphoneErrors.connected]: "ウェブ電話は登録されています。",
  [webphoneErrors.browserNotSupported]: "申し訳ございません。このブラウザーを使用して通話を行うことはできません。",
  [webphoneErrors.webphoneCountOverLimit]: "登録できるウェブ電話は最大5台です。",
  [webphoneErrors.checkDLError]: "外線通話ができません。このエラーが表示され続ける場合は、{brandName} サポートにお問い合わせください。",
  [webphoneErrors.noOutboundCallWithoutDL]: "お使いの内線は現在ブラウザーを使用した通話発信を許可されていません。アップグレードについてアカウント担当者にお問い合わせください。",
  [webphoneErrors.provisionUpdate]: "申し訳ございません。こちら側で問題が発生しました。まもなく自動的に再接続を試みます。",
  [webphoneErrors.serverConnecting]: "申し訳ございません。電話サーバーへの接続に問題があります。",
  [webphoneErrors.toVoiceMailError]: "内部エラーにより、通話をボイスメールに送信できません",
  [webphoneErrors.muteError]: "現在、通話をミュートできません。",
  [webphoneErrors.holdError]: "現在、通話を保留できません。",
  [webphoneErrors.flipError]: "通話をフリップできません。後でもう一度やり直してください。",
  [webphoneErrors.recordError]: "現在、通話を録音できません。エラーコード：{errorCode}",
  [webphoneErrors.pauseRecordError]: "申し訳ございません。通話の録音を停止することができませんでした。もう一度やり直してください。",
  [webphoneErrors.recordDisabled]: "申し訳ありません。お使いのアカウントでは、通話を録音する機能はサポートされていません。アカウント管理者にお問い合わせください。",
  [webphoneErrors.transferError]: "通話を転送できません。後でもう一度やり直してください。",
  [webphoneMessages.parked]: "通話は{parkedNumber}でパークされました",
  failWithStatusCode: "申し訳ございません。エラー{errorCode}が発生しました。問題が解決しない場合は、このエラーを{brandName}サポートに報告してください。",
  registeringWithStatusCode: "申し訳ございません。問題が発生しました。再接続しようとしています。問題が解決しない場合は、このエラーを{brandName}サポートに報告してください。エラーコード：{errorCode}",
  failWithoutStatusCode: "申し訳ございません。こちら側で問題が発生しました。エラーが解決しない場合は、このエラーを{brandName}サポートに報告してください。",
  registeringWithoutStatusCode: "申し訳ございません。問題が発生しました。再接続しようとしています。問題が解決しない場合は、このエラーを{brandName}サポートに報告してください。"
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
// @key: @#@"[webphoneErrors.pauseRecordError]"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"[webphoneErrors.recordDisabled]"@#@ @source: @#@"Sorry, your account does not have the feature to record a call. Please contact your account administrator."@#@
// @key: @#@"[webphoneErrors.transferError]"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"[webphoneMessages.parked]"@#@ @source: @#@"Your call is parked at location: {parkedNumber}"@#@
// @key: @#@"failWithStatusCode"@#@ @source: @#@"Sorry, we've encountered an error: {errorCode}. If the problem persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support. Error code: {errorCode}."@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"registeringWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong. We are trying to reconnect. If the problem persists, please report this error to {brandName} support."@#@
