import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';

export default {
  [audioSettingsErrors.userMediaPermission]:
    'Please grant {application} to access your audio.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    "The file you're trying to upload is too large. Try one that's smaller than 5MB.",
  [audioSettingsErrors.duplicateRingtone]:
    "The ringtone you're trying to add already exists.",
  [audioSettingsErrors.uploadRingtoneFailed]:
    "We're having trouble adding your ringtone. Please try again.",
  [audioSettingsErrors.deleteRingtoneFailed]:
    "We're having trouble deleting your ringtone. Please try again.",
} as const;
