import { presenceStatus } from 'ringcentral-integration/enums/presenceStatus.enum';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import phoneTypes from '../../../enums/phoneTypes';

export default {
  [phoneTypes.extension]: 'Ext.',
  [phoneTypes.direct]: 'Direct',
  [phoneTypes.mobile]: 'Mobile',
  [phoneTypes.home]: 'Home',
  [phoneTypes.business]: 'Business',
  [phoneTypes.fax]: 'Fax',
  [phoneTypes.company]: 'Company',
  [phoneTypes.other]: 'Other',
  emailLabel: 'Email',
  call: 'Call',
  text: 'Text',
  [presenceStatus.available]: 'Available',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy]: 'Busy',
  [dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
  notActivated: 'Inactive',
  company: 'Company',
  jobTitle: 'Title',
  site: 'Site'
};
