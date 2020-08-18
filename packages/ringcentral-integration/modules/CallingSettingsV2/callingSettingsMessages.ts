import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callingSettingsMessages = ObjectMap.prefixKeys(
  [
    'saveSuccess',
    'saveSuccessWithSoftphone',
    'permissionChanged',
    'phoneNumberChanged',
    'webphonePermissionRemoved',
    'emergencyCallingNotAvailable',
    'saveSuccessWithJupiter',
  ],
  'callingSettingsMessages',
);
