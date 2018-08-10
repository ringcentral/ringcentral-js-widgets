import conferenceCallErrors from 'ringcentral-integration/modules/ConferenceCall/conferenceCallErrors';

export default {
  [conferenceCallErrors.bringInFailed]: 'Das Zusammenführen von Anrufen wegen unerwarteter Fehler fehlgeschlagen. Bitte versuchen Sie es später erneut.',
  [conferenceCallErrors.makeConferenceFailed]: 'Das Zusammenführen von Anrufen wegen unerwarteter Fehler fehlgeschlagen. Bitte versuchen Sie es später erneut.',
  [conferenceCallErrors.terminateConferenceFailed]: 'Das Aufhängen der Konferenz ist aufgrund unerwarteter Fehler fehlgeschlagen. Bitte versuchen Sie es später erneut.',
  [conferenceCallErrors.removeFromConferenceFailed]: 'Das Entfernen des Teilnehmers ist aufgrund unerwarteter Fehler fehlgeschlagen. Bitte versuchen Sie es später erneut.'
};

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
