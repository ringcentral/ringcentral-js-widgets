import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  extensionLabel: 'Ext.',
  directLabel: 'Direct',
  emailLabel: 'Email',
  call: 'Call',
  text: 'Text',
  [presenceStatus.avalible]: 'Available',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy + dndStatus.takeAllCalls]: 'Busy',
  [presenceStatus.busy + dndStatus.doNotAcceptDepartmentCalls]: 'Busy',
  [presenceStatus.busy + dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
};
