import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { baseActionTypes } from '../../lib/DataFetcher/baseActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(baseActionTypes),
    'delete',
    'upsert',
    'setShowDisabled',
    'setShowNotActivated',
    'setExtensionTypeFilters',
  ],
  'companyContacts',
);

export default actionTypes;
