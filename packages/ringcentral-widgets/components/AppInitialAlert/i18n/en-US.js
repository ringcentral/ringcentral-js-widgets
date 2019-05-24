import errorMessages from 'ringcentral-integration/modules/AvailabilityMonitor/errorMessages';

export default {
  // TODO: Need a good one
  [errorMessages.appInitialError]: 'Server error, connecting...',
  [errorMessages.serviceLimited]: 'Something goes wrong in server make your App limited. App will recover automatically when available.',
};
