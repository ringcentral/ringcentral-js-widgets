/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Permita a {application} acceder al audio.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'El archivo que intenta cargar es demasiado grande. Pruebe con uno que tenga menos de 5 MB.',
  [audioSettingsErrors.duplicateRingtone]:
    'El tono de llamada que intenta agregar ya existe.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'Estamos teniendo problemas para agregar su tono de llamada. Vuelva a intentarlo.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'Estamos teniendo problemas para eliminar su tono de llamada. Vuelva a intentarlo.',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
