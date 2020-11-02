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
  [muteConflictError]: "Deze oproep is gedempt op een ander apparaat. Schakel het dempen van de oproep uit voordat u deze app bedient.",
  [holdConflictError]: "Deze oproep staat in de wacht op een ander apparaat. Haal de oproep uit de wacht voordat u deze app bedient.",
  [unMuteConflictError]: "Dempen van deze oproep is uitgeschakeld op een ander apparaat. Demp de oproep voordat u deze app bedient.",
  [unHoldConflictError]: "Deze oproep is uit de wacht gehaald op een ander apparaat. Zet de oproep in de wacht voordat u deze app bedient.",
  [generalError]: "Onverwachte serverfout. Probeer het later opnieuw.",
  [forwardSuccess]: "Oproep doorgeschakeld"
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
