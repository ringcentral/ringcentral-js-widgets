import Enum from '../../lib/Enum';

export default new Enum([
  'saveSuccess',
  'saveSuccessWithSoftphone',
  'permissionChanged',
  'phoneNumberChanged',
  'webphonePermissionRemoved',
  'emergencyCallingNotAvailable',
], 'callingSettingsMessages');
