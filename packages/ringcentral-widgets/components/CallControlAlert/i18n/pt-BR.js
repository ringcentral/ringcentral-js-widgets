import callControlError from 'ringcentral-integration/modules/ActiveCallControl/callControlError';
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError
} = callControlError;
export default {
  [muteConflictError]: "Esta chamada foi silenciada em outro dispositivo. Reative a chamada antes da sua operação neste aplicativo.",
  [holdConflictError]: "Esta chamada foi colocada em espera em outro dispositivo. Retire a chamada de espera antes da sua operação neste aplicativo.",
  [unMuteConflictError]: "Esta chamada foi reativada em outro dispositivo. Silencie a chamada antes da sua operação neste aplicativo.",
  [unHoldConflictError]: "Esta chamada foi retirada de espera em outro dispositivo. Coloque a chamada em espera antes da sua operação neste aplicativo.",
  [generalError]: "Erro inesperado do servidor. Tente novamente mais tarde."
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
