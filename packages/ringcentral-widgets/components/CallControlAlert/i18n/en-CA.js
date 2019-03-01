import callControlError from 'ringcentral-integration/modules/ActiveCallControl/callControlError';
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError
} = callControlError;
export default {
  [muteConflictError]: "This call had been muted on other device. Please unmute the call before you control in this App.",
  [holdConflictError]: "This call had been held on other device. Please unhold the call before you control in this App.",
  [unMuteConflictError]: "This call had been unmuted on other device. Please mute the call before you control in this App.",
  [unHoldConflictError]: "This call had been unheld on other device. Please hold the call before you control in this App.",
  [generalError]: "Unexpected server error. Please try again later."
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
