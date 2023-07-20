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
  [muteConflictError]: "L'audio di questa chiamata è stato disattivato sull'altro dispositivo. Riattivalo prima di eseguire l'operazione in questa app.",
  [unHoldConflictError]: "Questa chiamata è stata messa in attesa sull'altro dispositivo. Riprendila prima di eseguire l'operazione in questa app.",
  [unMuteConflictError]: "L'audio di questa chiamata è stato riattivato sull'altro dispositivo. Disattivalo prima di eseguire l'operazione in questa app.",
  [holdConflictError]: "Questa chiamata è stata ripresa sull'altro dispositivo. Mettila in attesa prima di eseguire l'operazione in questa app.",
  [generalError]: "Errore inatteso del server. Riprova più tardi.",
  [forwardSuccess]: "Chiamata trasferita",
  [transferCompleted]: "Trasferimento di chiamata completato",
  [replyCompleted]: "Messaggio vocale inviato."
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
