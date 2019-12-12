import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

export default {
  [presenceStatus.available]: 'Available',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy]: 'Busy',
  [dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
};
