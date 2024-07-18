import { callingSettingsMessages } from '@ringcentral-integration/commons/modules/CallingSettings';

export default {
  [callingSettingsMessages.saveSuccess]: 'Settings saved successfully.',
  [callingSettingsMessages.saveSuccessWithSoftphone]:
    'Settings saved successfully. Please make sure you have {brand} installed in your computer.',
  [callingSettingsMessages.permissionChanged]:
    'Your permissions have been changed recently. Please go to {link} to check your Calling options.',
  [callingSettingsMessages.phoneNumberChanged]:
    'Your phone number information has been changed recently. Please go to {link} to check your Calling options.',
  link: 'Settings > Calling',
  [callingSettingsMessages.webphonePermissionRemoved]:
    'Your permissions have been changed and you cannot make calls with Browser. For details please contact your account administrator.',
  [callingSettingsMessages.emergencyCallingNotAvailable]:
    'Dialing emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number.',
  [callingSettingsMessages.saveSuccessWithJupiter]:
    'Settings saved successfully. Please make sure you have {brand} installed in your computer.',
  [callingSettingsMessages.disableEmergencyInJapan]:
    'Emergency service is not available in Japan.',
} as const;
