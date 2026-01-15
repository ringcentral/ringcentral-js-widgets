/* eslint-disable */
import { connectivityTypes } from '../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.webphoneUnavailable]: 'Webtelefon nicht verfügbar',
  [connectivityTypes.offline]: 'Offline',
  [connectivityTypes.voipOnly]: 'Nur VoIP',
  [connectivityTypes.survival]: 'Eingeschränkter Modus',
  [connectivityTypes.connecting]: 'Wird verbunden',
} as const;

// @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@
