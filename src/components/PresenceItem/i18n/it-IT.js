import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Disponibile',
  [presenceStatus.offline]: 'Invisibile',
  [presenceStatus.busy + dndStatus.takeAllCalls]: 'Occupato',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: 'Occupato',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: 'Non disturbare',
};
