import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Please enter a valid phone number.',
  [callErrors.noAreaCode]: 'Please set {areaCodeLink} to use 7-digit local phone numbers.',
  [callErrors.specialNumber]: 'Dialing emergency or special service numbers is not supported.',
  [callErrors.connectFailed]: 'Connection failed. Please try again later.',
  [callErrors.internalError]: 'Cannot connect due to internal errors. Please try again later.',
  [callErrors.notAnExtension]: 'The extension number does not exist.',
  [callErrors.networkError]: 'Cannot connect due to network issues. Please try again later.',
  [callErrors.noRingoutEnable]: 'Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade.',
  areaCode: 'area code',
  telus911: 'Emergency dialing is not supported.'
};
