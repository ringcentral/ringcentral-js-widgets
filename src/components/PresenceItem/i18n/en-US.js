import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Available',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy + dndStatus.takeAllCalls]: 'Busy',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: 'Busy',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
};
