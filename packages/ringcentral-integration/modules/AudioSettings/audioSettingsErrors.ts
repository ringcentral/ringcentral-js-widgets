import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const audioSettingsErrors = ObjectMap.prefixKeys(
  [
    'userMediaPermission',
    'ringtoneSizeOverLimit',
    'duplicateRingtone',
    'uploadRingtoneFailed',
    'deleteRingtoneFailed',
    'checkMediaPermission',
  ],
  'audioSettings',
);
