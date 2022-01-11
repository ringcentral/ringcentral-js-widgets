import { connectivityTypes } from '../../../modules/ConnectivityManager';

export default {
  [connectivityTypes.webphoneUnavailable]: 'Web Phone Unavailable',
  [connectivityTypes.offline]: 'Offline',
  [connectivityTypes.voipOnly]: 'VoIP Only',
  [connectivityTypes.survival]: 'Limited Mode',
  [connectivityTypes.connecting]: 'Connecting',
};
