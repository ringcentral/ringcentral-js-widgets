import callControlError from 'ringcentral-integration/modules/ActiveCallControl/callControlError';
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError
} = callControlError;
export default {
  [muteConflictError]: "Esta llamada se había silenciado en otro dispositivo. Reactive el audio de la llamada antes de empezar a utilizar esta aplicación.",
  [holdConflictError]: "Esta llamada se había puesto en espera en otro dispositivo. Reanude la llamada antes de empezar a utilizar esta aplicación.",
  [unMuteConflictError]: "El audio de esta llamada se había activado en otro dispositivo. Silencie la llamada antes de empezar a utilizar esta aplicación.",
  [unHoldConflictError]: "Esta llamada se había reanudado en otro dispositivo. Ponga la llamada en espera antes de empezar a utilizar esta aplicación.",
  [generalError]: "Se ha producido un error inesperado en el servidor. Vuelva a intentarlo más tarde."
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
