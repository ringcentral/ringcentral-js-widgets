/* eslint-disable */
export default {
  muteConflictError:
    "L'audio di questa chiamata è stato disattivato sull'altro dispositivo. Riattivalo prima di eseguire l'operazione in questa app.",
  unMuteConflictError:
    "L'audio di questa chiamata è stato riattivato sull'altro dispositivo. Disattivalo prima di eseguire l'operazione in questa app.",
  recordError:
    'Non è possibile registrare la chiamata in questo momento. Codice errore: {errorCode}',
  recordErrorWithoutCode:
    'Non è possibile registrare la chiamata in questo momento.',
  pauseRecordError:
    'Non è stato possibile interrompere la registrazione della chiamata. Riprova più tardi.',
  holdConflictError:
    "Questa chiamata è stata ripresa sull'altro dispositivo. Mettila in attesa prima di eseguire l'operazione in questa app.",
  unHoldConflictError:
    "Questa chiamata è stata messa in attesa sull'altro dispositivo. Riprendila prima di eseguire l'operazione in questa app.",
  generalError: 'Errore inatteso del server. Riprova più tardi.',
  replyCompleted: 'Messaggio vocale inviato.',
  transferCompleted: 'Chiamata trasferita',
  toVoiceMailError:
    'Errore interno: impossibile inviare la chiamata alla segreteria telefonica',
  transferError: 'Impossibile trasferire la chiamata. Riprova più tardi.',
  forwardSuccess: 'Chiamata trasferita',
  somethingWentWrong: 'Si è verificato un problema. Riprova.',
  noOutboundCallWithoutDL:
    "Con questo interno non è attualmente consentito effettuare chiamate in uscita con il browser. Contatta il rappresentante dell'account per un upgrade.",
  tooManyParticipants: 'Numero massimo di partecipanti raggiunto.',
  callsMerged: 'Chiamate unite',
  failWithoutStatusCode:
    "Si è verificato un problema nei nostri sistemi. Se l'errore persiste, segnala il problema all'assistenza {brandName}.",
  replyEmptyError: 'Non è possibile inviare un messaggio vuoto.',
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
