import { callControlAlerts, callControlError } from '@ringcentral-integration/commons/modules/ActiveCallControl';
const {
  callsMerged,
  somethingWentWrong,
  tooManyParticipants
} = callControlAlerts;
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess,
  transferCompleted,
  replyCompleted
} = callControlError;
export default {
  [callsMerged]: "通话已合并",
  [somethingWentWrong]: "发生错误。请重试。",
  [tooManyParticipants]: "已达到参与者人数上限。",
  [muteConflictError]: "此通话在另一台设备上已静音。请取消静音该通话，然后再通过此应用进行操作。",
  [unHoldConflictError]: "此通话已经在其他设备上被搁置。请取消搁置该通话，然后再通过此应用进行操作。",
  [unMuteConflictError]: "此通话已经在其他设备上被取消静音。请静音该通话，然后再通过此应用进行操作。",
  [holdConflictError]: "此通话已经在其他设备上被取消搁置。请搁置该通话，然后再通过此应用进行操作。",
  [generalError]: "意外的服务器错误。请稍后重试。",
  [forwardSuccess]: "呼叫已转接",
  [transferCompleted]: "呼叫已转接",
  [replyCompleted]: "已发送语音消息。"
};

// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
