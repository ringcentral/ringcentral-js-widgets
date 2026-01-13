/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'Veuillez autoriser {application} à accéder à votre audio.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'Le fichier que vous essayez d’importer est trop volumineux. Essayez avec un fichier de moins de 5 Mo.',
  [audioSettingsErrors.duplicateRingtone]:
    'La sonnerie que vous essayez d’ajouter existe déjà.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    'Nous rencontrons des difficultés pour ajouter votre sonnerie. Merci de réessayer.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    'Nous rencontrons des difficultés pour supprimer votre sonnerie. Merci de réessayer.',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
