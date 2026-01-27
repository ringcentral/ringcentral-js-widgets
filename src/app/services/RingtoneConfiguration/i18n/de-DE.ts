/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Lassen Sie zu, dass {application} auf Ihre Audiofunktionen zugreift.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'Die Datei, die Sie hochladen möchten, ist zu groß. Versuchen Sie es mit einer Datei, die kleiner als 5 MB ist.',
  [audioSettingsErrors.duplicateRingtone]:
    'Der Rufton, den Sie hinzufügen möchten, ist bereits vorhanden.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'Ihr Rufton kann nicht hinzugefügt werden. Versuchen Sie es erneut.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'Ihr Rufton kann nicht gelöscht werden. Versuchen Sie es erneut.',
  ringtoneAdded: 'Rufton hinzugefügt',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
// @key: @#@"ringtoneAdded"@#@ @source: @#@"Ringtone added"@#@
