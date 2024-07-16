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
  [callsMerged]: "Las llamadas se combinaron",
  [somethingWentWrong]: "Se ha producido un error. Vuelva a intentarlo.",
  [tooManyParticipants]: "Se alcanzó el número máximo de participantes.",
  [muteConflictError]: "Esta llamada se había silenciado en otro dispositivo. Desactive el silencio de la llamada antes de empezar a utilizar la aplicación.",
  [unHoldConflictError]: "Esta llamada se había puesto en espera en otro dispositivo. Reanude la llamada antes de empezar a utilizar la aplicación.",
  [unMuteConflictError]: "El audio de esta llamada se había activado en otro dispositivo. Silencie la llamada antes de empezar a utilizar la aplicación.",
  [holdConflictError]: "Esta llamada se había reanudado en otro dispositivo. Ponga la llamada en espera antes de empezar a utilizar la aplicación.",
  [generalError]: "Error en el servidor. Inténtelo de nuevo más tarde.",
  [forwardSuccess]: "Llamada desviada",
  [transferCompleted]: "Llamada transferida",
  [replyCompleted]: "Mensaje de voz enviado."
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
