import conferenceCallErrors from 'ringcentral-integration/modules/ConferenceCall/conferenceCallErrors';

export default {
  [conferenceCallErrors.bringInFailed]: 'No se ha podido combinar debido a un error inesperado. Inténtelo de nuevo más tarde.',
  [conferenceCallErrors.makeConferenceFailed]: 'No se ha podido combinar debido a un error inesperado. Inténtelo de nuevo más tarde.',
  [conferenceCallErrors.terminateConferenceFailed]: 'No se ha podido colgar la conferencia a causa de un error inesperado. Inténtelo de nuevo más tarde.',
  [conferenceCallErrors.removeFromConferenceFailed]: 'No se ha podido quitar al participante a causa de un error inesperado. Inténtelo de nuevo más tarde.'
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
