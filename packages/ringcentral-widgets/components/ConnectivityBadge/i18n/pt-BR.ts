/* eslint-disable */
import { connectivityTypes } from '../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.webphoneUnavailable]: 'Telefone da Web indisponível',
  [connectivityTypes.offline]: 'Offline',
  [connectivityTypes.voipOnly]: 'Somente VoIP',
  [connectivityTypes.survival]: 'Modo limitado',
  [connectivityTypes.connecting]: 'Conectando',
} as const;

// @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@
