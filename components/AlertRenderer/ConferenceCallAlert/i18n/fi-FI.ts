/* eslint-disable */
import { conferenceCallErrors } from '@ringcentral-integration/commons/modules/ConferenceCall';
export default {
  [conferenceCallErrors.bringInFailed]:
    'Puheluiden yhdistäminen epäonnistui odottamattoman virheen vuoksi. Yritä myöhemmin uudelleen.',
  [conferenceCallErrors.makeConferenceFailed]:
    'Puheluiden yhdistäminen epäonnistui odottamattoman virheen vuoksi. Yritä myöhemmin uudelleen.',
  [conferenceCallErrors.terminateConferenceFailed]:
    'Neuvottelupuhelun lopettaminen epäonnistui odottamattoman virheen vuoksi. Yritä myöhemmin uudelleen.',
  [conferenceCallErrors.removeFromConferenceFailed]:
    'Osallistujan poistaminen epäonnistui odottamattoman virheen vuoksi. Yritä myöhemmin uudelleen.',
  [conferenceCallErrors.callIsRecording]:
    'Puhelun tallennus on käynnissä. Lopeta tallennus ja yritä uudelleen.',
} as const;

// @key: @#@"[conferenceCallErrors.bringInFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.makeConferenceFailed]"@#@ @source: @#@"Failed to merge the calls due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.terminateConferenceFailed]"@#@ @source: @#@"Failed to hangup the conference due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.removeFromConferenceFailed]"@#@ @source: @#@"Failed to remove the participant due to unexpected errors. Please try again later."@#@
// @key: @#@"[conferenceCallErrors.callIsRecording]"@#@ @source: @#@"Call recording in progress. Please stop recording and try again."@#@
