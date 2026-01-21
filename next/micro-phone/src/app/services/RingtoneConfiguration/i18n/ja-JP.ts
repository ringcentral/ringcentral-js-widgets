/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    'オーディオへのアクセスを{application}に許可してください。',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    'アップロードしようとしているファイルは大きすぎます。5MBより小さいサイズのファイルを試してください。',
  [audioSettingsErrors.duplicateRingtone]:
    '追加しようとしている着信音は既に存在します。',
  [audioSettingsErrors.uploadRingtoneFailed]:
    '問題が発生したため、着信音を追加できません。もう一度やり直してください。',
  [audioSettingsErrors.deleteRingtoneFailed]:
    '問題が発生したため、着信音を削除できません。もう一度やり直してください。',
  ringtoneAdded: '着信音が追加されました',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
// @key: @#@"ringtoneAdded"@#@ @source: @#@"Ringtone added"@#@
