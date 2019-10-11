import Enum from '../../lib/Enum';
import baseActionTypes from '../../lib/DataFetcher/baseActionTypes';

export default new Enum(
  [
    ...Object.keys(baseActionTypes),
    'updateDialInNumber',
    'updateAdditionalNumbers',
    'updateSaveCurrentSettings',
    'inviteWithText',
    'joinAsHost',
  ],
  'conference',
);
