import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.available]: '利用可能',
  [presenceStatus.offline]: '非表示',
  [presenceStatus.busy + dndStatus.takeAllCalls]: '取り込み中',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: '取り込み中',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: '応答不可',
};

// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.takeAllCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptDepartmentCalls]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[presenceStatus.busy+dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
