/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    '請向 {application} 授予存取音訊的權限。',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    '您嘗試上傳的檔案太大。請嘗試小於 5MB 的檔案。',
  [audioSettingsErrors.duplicateRingtone]: '您嘗試新增的鈴聲已存在。',
  [audioSettingsErrors.uploadRingtoneFailed]:
    '新增您的鈴聲時發生錯誤。請再試一次。',
  [audioSettingsErrors.deleteRingtoneFailed]:
    '刪除您的鈴聲時發生錯誤。請再試一次。',
  ringtoneAdded: '已新增鈴聲',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
// @key: @#@"ringtoneAdded"@#@ @source: @#@"Ringtone added"@#@
