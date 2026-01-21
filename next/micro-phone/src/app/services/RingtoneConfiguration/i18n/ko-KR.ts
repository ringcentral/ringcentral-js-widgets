/* eslint-disable */
import { audioSettingsErrors } from '@ringcentral-integration/commons/modules/AudioSettings';
export default {
  [audioSettingsErrors.userMediaPermission]:
    '오디오에 액세스할 수 있도록 {application}에 권한을 부여하세요.',
  [audioSettingsErrors.ringtoneSizeOverLimit]:
    '업로드하려는 파일이 너무 큽니다. 5MB 미만의 파일을 사용해 보세요.',
  [audioSettingsErrors.duplicateRingtone]: '이미 추가하려는 벨소리가 있습니다.',
  [audioSettingsErrors.uploadRingtoneFailed]:
    '벨소리를 추가하는 데 문제가 발생했습니다. 다시 시도하세요.',
  [audioSettingsErrors.deleteRingtoneFailed]:
    '벨소리를 삭제하는 데 문제가 발생했습니다. 다시 시도하세요.',
  ringtoneAdded: '벨소리 추가됨',
} as const;

// @key: @#@"[audioSettingsErrors.userMediaPermission]"@#@ @source: @#@"Please grant {application} to access your audio."@#@
// @key: @#@"[audioSettingsErrors.ringtoneSizeOverLimit]"@#@ @source: @#@"The file you're trying to upload is too large. Try one that's smaller than 5MB."@#@
// @key: @#@"[audioSettingsErrors.duplicateRingtone]"@#@ @source: @#@"The ringtone you're trying to add already exists."@#@
// @key: @#@"[audioSettingsErrors.uploadRingtoneFailed]"@#@ @source: @#@"We're having trouble adding your ringtone. Please try again."@#@
// @key: @#@"[audioSettingsErrors.deleteRingtoneFailed]"@#@ @source: @#@"We're having trouble deleting your ringtone. Please try again."@#@
// @key: @#@"ringtoneAdded"@#@ @source: @#@"Ringtone added"@#@
