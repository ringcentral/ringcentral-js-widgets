import conferenceCallErrors from '@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors';
export default {
  [conferenceCallErrors.bringInFailed]: "Falha ao unir as chamadas devido a erros inesperados. Tente novamente mais tarde.",
  [conferenceCallErrors.makeConferenceFailed]: "Falha ao unir as chamadas devido a erros inesperados. Tente novamente mais tarde.",
  [conferenceCallErrors.terminateConferenceFailed]: "Falha ao desligar a conferência devido a erros inesperados. Tente novamente mais tarde.",
  [conferenceCallErrors.removeFromConferenceFailed]: "Falha ao remover o participante devido a erros inesperados. Tente novamente mais tarde.",
  [conferenceCallErrors.callIsRecording]: "Gravação de chamada em curso. Pare a gravação e tente novamente."
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
