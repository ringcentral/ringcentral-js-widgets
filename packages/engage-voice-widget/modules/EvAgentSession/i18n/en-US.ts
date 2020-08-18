import { dropDownOptions, loginTypes } from '../../../enums';

export default {
  [loginTypes.RC_PHONE]: 'RingCentral Office phone',
  [loginTypes.externalPhone]: 'Use external phone',
  [loginTypes.integratedSoftphone]: 'Integrated softphone',
  [dropDownOptions.None]: 'None',
  multipleLoginsConfirm: 'Continue',
  multipleLoginsCancel: 'Cancel',
  multipleLoginsTitle: 'Multiple logins',
  multipleLoginsContent:
    'This username is still logged in. Press continue to end the existing session and start a new one.',
};
