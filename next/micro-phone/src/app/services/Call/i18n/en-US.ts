export default {
  emergencyNumber:
    'Emergency calling is not available. Please use another phone to contact emergency services',
  noToNumber: 'Please enter a valid phone number.',
  connectFailed: 'Connection failed. Please try again later.',
  internalError:
    'Cannot connect due to internal errors. Please try again later.',
  notAnExtension: 'The extension number does not exist.',
  networkError: 'Cannot connect due to network issues. Please try again later.',
  noInternational:
    "You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade.",
  noRingoutEnable:
    'Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade.',
  numberParseError:
    'Sorry, there was a problem on our end. Please try again later.',
  fromAndToNumberIsSame:
    "The RingOut number and destination number can't be the same. Please update the number and try again.",
} as const;
