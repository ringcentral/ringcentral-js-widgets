import Enum from 'ringcentral-integration/lib/Enum';
import dialerUIActionTypes from '../DialerUI/actionTypes';

export default new Enum([
  ...Object.keys(dialerUIActionTypes),
  'setLastSessionId',
], 'conferenceDialerUI');
