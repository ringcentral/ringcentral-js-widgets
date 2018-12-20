
import callControlError from 'ringcentral-integration/modules/ActiveCallControl/callControlError';

const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError
} = callControlError;

export default {
  [muteConflictError]: "この通話は他のデバイスでミュートされていました。通話のミュートを解除してから、このアプリで操作してください。",
  [holdConflictError]: "この通話は他のデバイスで保留に設定されていました。通話の保留を解除してから、このアプリで操作してください。",
  [unMuteConflictError]: "この通話は他のデバイスでミュートが解除されていました。通話をミュートしてから、このアプリで操作してください。",
  [unHoldConflictError]: "この通話は他のデバイスで保留解除されています。通話を保留に設定してから、このアプリで操作してください。",
  [generalError]: "予期しないサーバエラーが発生しました。後でもう一度お試しください。"
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
