/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Autorizza {application} ad accedere al tuo audio.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'Il file che stai tentando di caricare è troppo grande. Provane uno più piccolo di 5 MB.',
  [audioSettingsErrors.duplicateRingtone]:
    'La suoneria che stai tentando di aggiungere esiste già.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'Non è stato possibile ottenere la suoneria. Riprova.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'Non è stato possibile eliminare la suoneria. Riprova.',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
