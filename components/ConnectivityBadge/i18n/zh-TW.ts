import { connectivityTypes } from '../../../modules/ConnectivityManager';
export default {
  [connectivityTypes.webphoneUnavailable]: "網路電話不可用",
  [connectivityTypes.offline]: "離線",
  [connectivityTypes.voipOnly]: "僅 VoIP",
  [connectivityTypes.survival]: "限制模式",
  [connectivityTypes.connecting]: "連線中"
};

// @key: @#@"[connectivityTypes.webphoneUnavailable]"@#@ @source: @#@"Web Phone Unavailable"@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Offline"@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"VoIP Only"@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Limited Mode"@#@
// @key: @#@"[connectivityTypes.connecting]"@#@ @source: @#@"Connecting"@#@
