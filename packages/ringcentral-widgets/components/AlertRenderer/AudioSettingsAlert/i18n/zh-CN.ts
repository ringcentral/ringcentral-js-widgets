/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    '请授予 {application} 访问您音频的权限。',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    '您尝试上传的文件太大。请尝试上传小于 5MB 的文件。',
  [audioSettingsErrors.duplicateRingtone]: '您尝试添加的铃声已存在。',
  [audioSettingsErrors.uploadRingtoneFailed]:
    '添加您的铃声时发生错误。请重试。',
  [audioSettingsErrors.deleteRingtoneFailed]:
    '删除您的铃声时发生错误。请重试。',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
