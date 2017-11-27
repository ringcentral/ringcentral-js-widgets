import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.avalible]: 'Disponible',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy + dndStatus.takeAllCalls]: 'Occupé(e)',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: 'Occupé(e)',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: 'Ne pas déranger',
};
