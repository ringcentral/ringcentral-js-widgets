import connectivityTypes from
  'ringcentral-widgets/modules/ConnectivityManager/connectivityTypes';

export default {
  [connectivityTypes.networkLoss]: 'Sorry, something went wrong, check your network connection and try again.',
  [connectivityTypes.offline]: 'Cannot connect to the server. Please retry later.',
  [connectivityTypes.serverUnavailable]: 'Sorry, something went wrong on our end. Try again later.',
  [connectivityTypes.voipOnly]: 'Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited.',
  [connectivityTypes.survival]: 'Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available.',
};
