import { phoneTypes } from '@ringcentral-integration/commons/enums/phoneTypes';
import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { dndStatus } from '@ringcentral-integration/commons/modules/Presence';

export default {
  [phoneTypes.extension]: 'Ext.',
  [phoneTypes.direct]: 'Direct',
  [phoneTypes.mobile]: 'Mobile',
  [phoneTypes.contact]: 'Contact phone',
  [phoneTypes.home]: 'Home',
  [phoneTypes.business]: 'Business',
  [phoneTypes.fax]: 'Fax',
  // @ts-expect-error TS(2718): Duplicate property 'company'.
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
  // @ts-expect-error TS(2733): Property 'company' was also declared here.
  company: 'Company',
  jobTitle: 'Title',
  site: 'Site',
};
