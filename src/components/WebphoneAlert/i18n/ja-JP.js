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
};
