/* eslint-disable */
import { connectivityTypes } from '../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.webphoneUnavailable]: 'Téléphone Web non disponible',
  [connectivityTypes.offline]: 'Hors ligne',
  [connectivityTypes.voipOnly]: 'VoIP uniquement',
  [connectivityTypes.survival]: 'Mode limité',
  [connectivityTypes.connecting]: 'Connexion',
} as const;

// @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@
