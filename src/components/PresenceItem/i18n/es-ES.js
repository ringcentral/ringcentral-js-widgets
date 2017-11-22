import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Disponible',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy + dndStatus.takeAllCalls]: 'Ocupado',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: 'Ocupado',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: 'No molestar',
};
