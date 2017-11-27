import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: '利用可能',
  [presenceStatus.offline]: '非表示',
  [presenceStatus.busy + dndStatus.takeAllCalls]: '取り込み中',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: '取り込み中',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: '応答不可',
};
