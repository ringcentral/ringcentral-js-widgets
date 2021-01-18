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
  [muteConflictError]: "O som desta chamada foi desativado noutro dispositivo. Ative o som da chamada antes de assumir o controlo nesta aplicação.",
  [unHoldConflictError]: "Esta chamada foi colocada em espera noutro dispositivo. Retome a chamada antes de assumir o controlo nesta aplicação.",
  [unMuteConflictError]: "O som desta chamada foi ativado noutro dispositivo. Desative o som da chamada antes de assumir o controlo nesta aplicação.",
  [holdConflictError]: "Esta chamada foi retomada noutro dispositivo. Coloque a chamada em espera antes de assumir o controlo nesta aplicação.",
  [generalError]: "Erro de servidor inesperado. Tente novamente mais tarde.",
  [forwardSuccess]: "Chamada reencaminhada"
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
