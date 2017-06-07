import callingSettingsMessages from
  'ringcentral-integration/modules/CallingSettings/callingSettingsMessages';

export default {
  [callingSettingsMessages.saveSuccess]: 'Settings saved successfully.',
  [callingSettingsMessages.saveSuccessWithSoftphone]: 'Settings saved successfully. Please make sure you have {brand} for Desktop installed on your computer.',
  [callingSettingsMessages.firstLogin]: 'Please select in the Calling section how you want to make your call. If you let us know your location by specifying the country and area code (if available) in the Region section, you can do local dialling with the app.',
  [callingSettingsMessages.firstLoginOther]: 'Please select in the Calling section how you want to make your call.',
  [callingSettingsMessages.permissionChanged]: 'Your permissions have been changed recently. Please go to {link} to check your Calling options.',
  [callingSettingsMessages.phoneNumberChanged]: 'Your phone number information has been changed recently. Please go to {link} to check your Calling options.',
  link: 'Settings > Calling',
  [callingSettingsMessages.webphonePermissionRemoved]: 'Your permissions have been changed and you cannot make calls with your browser. For details, please contact your account administrator.',
  [callingSettingsMessages.emergencyCallingNotAvailable]: 'Dialling emergency or special service numbers is not supported. In an emergency, use your traditional wireline or wireless phone to call an emergency number.',
};
