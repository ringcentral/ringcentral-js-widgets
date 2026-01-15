/* eslint-disable */
import callLogMessages from '@ringcentral-integration/commons/enums/callLogMessages';
export default {
  [callLogMessages.logCallLogFailed]:
    'Puhelulokin lataaminen epäonnistui odottamattoman virheen vuoksi. Päivitä sivu ja yritä uudelleen.',
  // New version of log failed message
  [callLogMessages.logFailed]:
    'Puhelun tallentaminen lokiin epäonnistui. Yritä myöhemmin uudelleen.',
  [callLogMessages.fieldRequired]: 'Pakolliset kentät tulee täyttää.',
} as const;

// @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@
// @key: @#@"[callLogMessages.fieldRequired]"@#@ @source: @#@"Mandatory fields are required."@#@
