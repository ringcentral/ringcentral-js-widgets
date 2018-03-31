import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.available]: 'Available',
  [presenceStatus.busy]: 'Busy',
  [presenceStatus.offline]: 'Invisible',
  [dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
};
