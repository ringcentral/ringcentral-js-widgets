import presenceStatus from 'ringcentral-integration/modules/Presence/presenceStatus';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';
import phoneTypes from '../../enums/phoneTypes';

export default {
  [phoneTypes.phone]: 'Phone',
  [phoneTypes.unknown]: 'Other',
  [phoneTypes.company]: 'Business',
  [phoneTypes.other]: 'Other',
  [phoneTypes.ext]: 'Ext.',
  [phoneTypes.extension]: 'Extension',
  [phoneTypes.direct]: 'Direct',
  [phoneTypes.mobile]: 'Mobile',
  [phoneTypes.home]: 'Home',
  [phoneTypes.business]: 'Business',
  [phoneTypes.fax]: 'Fax',
  emailLabel: 'Email',
  call: 'Call',
  text: 'Text',
  [presenceStatus.available]: 'Available',
  [presenceStatus.offline]: 'Invisible',
  [presenceStatus.busy]: 'Busy',
  [dndStatus.doNotAcceptAnyCalls]: 'Do not Disturb',
  notActivated: 'Inactive',
};
