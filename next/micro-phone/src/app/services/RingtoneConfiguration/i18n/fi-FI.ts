/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Anna palvelulle {application} äänesi käyttöoikeus.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'Tiedosto, jota yrität ladata, on liian suuri. Kokeile tiedostoa, jonka koko on alle 5 Mt.',
  [audioSettingsErrors.duplicateRingtone]:
    'Soittoääni, jota yrität lisätä, on jo olemassa.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'Soittoäänesi lisäämisessä on ongelma. Yritä uudelleen.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'Soittoäänesi poistamisessa on ongelmia. Yritä uudelleen.',
  ringtoneAdded: 'Soittoääni lisätty',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
// @key: @#@"ringtoneAdded"@#@ @source: @#@"Ringtone added"@#@
