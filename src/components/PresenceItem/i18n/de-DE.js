import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Verfügbar',
  [presenceStatus.offline]: 'Unsichtbar',
  [presenceStatus.busy + dndStatus.takeAllCalls]: 'Belegt',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: 'Belegt',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: 'Nicht stören',
};
