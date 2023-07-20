import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';
export default {
  [presenceStatus.available]: "有空",
  [presenceStatus.offline]: "隱藏",
  [presenceStatus.busy]: "忙碌中",
  [dndStatus.doNotAcceptAnyCalls]: "請勿打擾"
};

// @key: @#@"[presenceStatus.available]"@#@ @source: @#@"Available"@#@
// @key: @#@"[presenceStatus.offline]"@#@ @source: @#@"Invisible"@#@
// @key: @#@"[presenceStatus.busy]"@#@ @source: @#@"Busy"@#@
// @key: @#@"[dndStatus.doNotAcceptAnyCalls]"@#@ @source: @#@"Do not Disturb"@#@
