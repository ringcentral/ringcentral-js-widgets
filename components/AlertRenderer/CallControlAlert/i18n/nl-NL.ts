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
  [callsMerged]: "Oproepen samengevoegd",
  [somethingWentWrong]: "Er is iets fout gegaan. Probeer het opnieuw.",
  [tooManyParticipants]: "Maximale aantal deelnemers is bereikt.",
  [muteConflictError]: "Deze oproep is gedempt op een ander apparaat. Schakel het dempen van de oproep uit voordat u deze app bedient.",
  [unHoldConflictError]: "Deze oproep staat in de wacht op een ander apparaat. Haal de oproep uit de wacht voordat u deze app bedient.",
  [unMuteConflictError]: "Dempen van deze oproep is uitgeschakeld op een ander apparaat. Demp de oproep voordat u deze app bedient.",
  [holdConflictError]: "Deze oproep is uit de wacht gehaald op een ander apparaat. Zet de oproep in de wacht voordat u deze app bedient.",
  [generalError]: "Onverwachte serverfout. Probeer het later opnieuw.",
  [forwardSuccess]: "Oproep doorverbonden",
  [transferCompleted]: "Oproep doorverbonden",
  [replyCompleted]: "Spraakbericht verzonden."
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
