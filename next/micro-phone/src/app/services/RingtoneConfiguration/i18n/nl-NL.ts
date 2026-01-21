/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Verleen {application} toegang tot uw audio.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'Het bestand dat u wilt uploaden, is te groot. Gebruik een bestand dat kleiner is dan 5 MB.',
  [audioSettingsErrors.duplicateRingtone]:
    'De beltoon die u wilt toevoegen, bestaat al.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'We ondervinden problemen bij het toevoegen van uw beltoon. Probeer het opnieuw.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'We ondervinden problemen bij het verwijderen van uw beltoon. Probeer het opnieuw.',
  ringtoneAdded: 'Beltoon toegevoegd',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
// @key: @#@"ringtoneAdded"@#@ @source: @#@"Ringtone added"@#@
