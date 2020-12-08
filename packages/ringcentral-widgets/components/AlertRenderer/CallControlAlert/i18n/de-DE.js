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
  [muteConflictError]: "Dieser Anruf wurde auf einem anderen Gerät stummgeschaltet. Heben Sie die Stummschaltung vor der Inbetriebnahme in dieser App auf.",
  [holdConflictError]: "Dieser Anruf wurde auf einem anderen Gerät gehalten. Heben Sie den Haltestatus vor der Inbetriebnahme in dieser App auf.",
  [unMuteConflictError]: "Die Stummschaltung dieses Anrufs wurde auf einem anderen Gerät aufgehoben. Schalten Sie ihn vor der Inbetriebnahme in dieser App stumm.",
  [unHoldConflictError]: "Der Haltestatus dieses Anrufs wurde auf einem anderen Gerät aufgehoben. Halten Sie ihn vor der Inbetriebnahme in dieser App.",
  [generalError]: "Unerwarteter Serverfehler. Versuchen Sie es später erneut.",
  [forwardSuccess]: "Anruf weitergeleitet"
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
