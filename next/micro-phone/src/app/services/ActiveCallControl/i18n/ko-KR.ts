/* eslint-disable */
export default {
  muteConflictError:
    '이 통화는 다른 디바이스에서 음소거되었습니다. 이 앱에서 컨트롤하기 전에 통화 음소거를 해제하세요.',
  unMuteConflictError:
    '이 통화는 다른 디바이스에서 음소거 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화를 음소거하세요.',
  recordError: '현재 통화를 녹음할 수 없습니다. 오류 코드: {errorCode}',
  recordErrorWithoutCode: '현재 통화를 녹음할 수 없습니다.',
  pauseRecordError:
    '죄송합니다. 통화 녹음을 중지할 수 없습니다. 나중에 다시 시도하세요.',
  holdConflictError:
    '이 통화는 다른 디바이스에서 대기 해제되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기하세요.',
  unHoldConflictError:
    '이 통화는 다른 디바이스에서 대기되었습니다. 이 앱에서 컨트롤하기 전에 통화 대기를 해제하세요.',
  generalError: '예기치 않은 서버 오류입니다. 나중에 다시 시도하세요.',
  replyCompleted: '음성 메시지를 보냈습니다.',
  transferCompleted: '통화 전달됨',
  toVoiceMailError: '내부 오류로 인해 통화를 음성 사서함으로 보낼 수 없습니다.',
  transferError: '통화를 전달할 수 없습니다. 나중에 다시 시도하세요.',
  forwardSuccess: '착신 전환됨',
  somethingWentWrong: '문제가 발생했습니다. 다시 시도하세요.',
  noOutboundCallWithoutDL:
    '현재 내선에서 브라우저를 사용하여 발신 전화를 걸 수 없습니다. 계정 담당자에게 문의하여 업그레이드하세요.',
  tooManyParticipants: '최대 참가자 수에 도달했습니다.',
  callsMerged: '통화 병합됨',
  failWithoutStatusCode:
    '죄송합니다. 시스템에서 문제가 발생했습니다. 문제가 지속되면 {brandName} 지원팀에 이 오류를 보고하세요.',
  replyEmptyError: '죄송합니다. 빈 메시지는 보낼 수 없습니다.',
} as const;

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"recordError"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"recordErrorWithoutCode"@#@ @source: @#@"You cannot record the call at the moment."@#@
// @key: @#@"pauseRecordError"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"toVoiceMailError"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"transferError"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"noOutboundCallWithoutDL"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"replyEmptyError"@#@ @source: @#@"Sorry, you cannot send an empty message."@#@
