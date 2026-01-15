/* eslint-disable */
import { connectivityTypes } from '../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.webphoneUnavailable]: 'WebPhone을 사용할 수 없음',
  [connectivityTypes.offline]: '오프라인',
  [connectivityTypes.voipOnly]: 'VoIP만',
  [connectivityTypes.survival]: '제한 모드',
  [connectivityTypes.connecting]: '연결 중',
} as const;

// @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@
