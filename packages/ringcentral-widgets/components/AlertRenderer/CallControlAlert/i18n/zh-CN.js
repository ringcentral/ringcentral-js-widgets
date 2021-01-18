import callControlError from 'ringcentral-integration/modules/ActiveCallControl/callControlError';
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess
} = callControlError;
export default {
  [muteConflictError]: "此通话已经在其他设备上被静音。请取消静音该通话，然后再通过此应用进行操作。",
  [unHoldConflictError]: "此通话已经在其他设备上被搁置。请取消搁置该通话，然后再通过此应用进行操作。",
  [unMuteConflictError]: "此通话已经在其他设备上被取消静音。请静音该通话，然后再通过此应用进行操作。",
  [holdConflictError]: "此通话已经在其他设备上被取消搁置。请搁置该通话，然后再通过此应用进行操作。",
  [generalError]: "意外的服务器错误，请稍后再试。",
  [forwardSuccess]: "已转移呼叫"
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
