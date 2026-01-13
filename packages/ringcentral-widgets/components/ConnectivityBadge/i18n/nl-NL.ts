/* eslint-disable */
import { connectivityTypes } from '../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.webphoneUnavailable]: 'Webtelefoon niet beschikbaar',
  [connectivityTypes.offline]: 'Offline',
  [connectivityTypes.voipOnly]: 'Alleen VoIP',
  [connectivityTypes.survival]: 'Beperkte modus',
  [connectivityTypes.connecting]: 'Verbinding maken',
} as const;

// @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@
