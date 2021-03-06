import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import dndStatus from '@ringcentral-integration/commons/modules/Presence/dndStatus';

export default {
  [presenceStatus.available]: 'Available',
  [presenceStatus.busy]: 'Busy',
  [presenceStatus.offline]: 'Invisible',
  [dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
};
