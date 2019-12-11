import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.available]: 'Available',
  [presenceStatus.busy]: 'Busy',
  [presenceStatus.offline]: 'Invisible',
  [dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
};
