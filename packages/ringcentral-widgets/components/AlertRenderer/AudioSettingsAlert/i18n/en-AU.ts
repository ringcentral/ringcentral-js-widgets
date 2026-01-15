/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Please grant {application} access to your audio.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'The file you’re trying to upload is too large. Try one that’s smaller than 5 MB.',
  [audioSettingsErrors.duplicateRingtone]:
    'The ring tone you’re trying to add already exists.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'We’re having trouble adding your ring tone. Please try again.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'We’re having trouble deleting your ring tone. Please try again.',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
