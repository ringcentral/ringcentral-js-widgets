/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Autorize o {application} a aceder ao áudio.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'O ficheiro que está a tentar carregar é demasiado grande. Experimente carregar um com menos de 5 MB.',
  [audioSettingsErrors.duplicateRingtone]:
    'O toque que está a tentar adicionar já existe.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'Estamos a ter problemas a adicionar o seu toque. Tente novamente.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'Estamos a ter problemas a eliminar o seu toque. Tente novamente.',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
