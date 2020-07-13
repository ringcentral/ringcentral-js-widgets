import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const audioSettingsErrors = ObjectMap.prefixKeys(
  ['userMediaPermission'],
  'audioSettings',
);

export default audioSettingsErrors;
