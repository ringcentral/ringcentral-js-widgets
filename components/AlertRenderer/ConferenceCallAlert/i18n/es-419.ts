import conferenceCallErrors from '@ringcentral-integration/commons/modules/ConferenceCall/conferenceCallErrors';
export default {
  [conferenceCallErrors.bringInFailed]: "No se pudo combinar las llamadas a causa de un error inesperado. Vuelva a intentarlo más tarde.",
  [conferenceCallErrors.makeConferenceFailed]: "No se pudo combinar las llamadas a causa de un error inesperado. Vuelva a intentarlo más tarde.",
  [conferenceCallErrors.terminateConferenceFailed]: "No se pudo colgar la conferencia a causa de un error inesperado. Vuelva a intentarlo más tarde.",
  [conferenceCallErrors.removeFromConferenceFailed]: "No se pudo quitar al participante a causa de un error inesperado. Vuelva a intentarlo más tarde.",
  [conferenceCallErrors.callIsRecording]: "Grabación de llamada en curso. Detenga la grabación y vuelva a intentarlo."
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
