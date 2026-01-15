/* eslint-disable */
import {
  callControlAlerts,
  callControlError,
} from '@ringcentral-integration/commons/modules/ActiveCallControl';
const { callsMerged, somethingWentWrong, tooManyParticipants } =
  callControlAlerts;
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess,
  transferCompleted,
  replyCompleted,
} = callControlError;
export default {
  [callsMerged]: 'Llamadas combinadas',
  [somethingWentWrong]: 'Se produjo un error. Vuelva a intentarlo.',
  [tooManyParticipants]: 'Se alcanzó la cantidad máxima de participantes.',
  [muteConflictError]:
    'Esta llamada se había silenciado en otro dispositivo. Reactive el audio de la llamada antes de empezar a utilizar esta aplicación.',
  [unHoldConflictError]:
    'Esta llamada se había puesto en espera en otro dispositivo. Reanude la llamada antes de empezar a utilizar esta aplicación.',
  [unMuteConflictError]:
    'El audio de esta llamada se había activado en otro dispositivo. Silencie la llamada antes de empezar a utilizar esta aplicación.',
  [holdConflictError]:
    'Esta llamada se había reanudado en otro dispositivo. Ponga la llamada en espera antes de empezar a utilizar esta aplicación.',
  [generalError]:
    'Se ha producido un error inesperado en el servidor. Inténtelo de nuevo más tarde.',
  [forwardSuccess]: 'Llamada desviada',
  [transferCompleted]: 'Llamada transferida',
  [replyCompleted]: 'Mensaje de voz enviado.',
} as const;

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
