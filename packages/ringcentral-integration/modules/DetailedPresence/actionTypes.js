import Enum from '../../lib/Enum';
import presenceActionTypes from '../Presence/actionTypes';

export default new Enum([
  ...Object.keys(presenceActionTypes),
  'updateActiveCalls',
], 'detailedPresence');
