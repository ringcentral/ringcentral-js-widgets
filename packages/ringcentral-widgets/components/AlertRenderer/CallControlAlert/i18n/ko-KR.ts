import { callControlError } from '@ringcentral-integration/commons/modules/ActiveCallControl';
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
  [muteConflictError]: "이 통화는 다른 디바이스에서 음소거되었습니다. 이 앱에서 컨트롤하기 전에 통화 음소거를 해제하세요.",
  [unHoldConflictError]: "이 통화는 다른 디바이스에서 대기되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기를 해제하세요.",
  [unMuteConflictError]: "이 통화는 다른 디바이스에서 음소거 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화를 음소거하세요.",
  [holdConflictError]: "이 통화는 다른 디바이스에서 대기 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기하세요.",
  [generalError]: "예기치 않은 서버 오류입니다. 나중에 다시 시도하세요.",
  [forwardSuccess]: "착신 전환됨",
  [transferCompleted]: "통화가 전달되었습니다.",
  [replyCompleted]: "음성 메시지를 보냈습니다."
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
