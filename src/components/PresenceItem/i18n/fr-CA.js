import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Disponible',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy + dndStatus.takeAllCalls]: 'Occupé',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: 'Occupé',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: 'Ne pas déranger',
};
