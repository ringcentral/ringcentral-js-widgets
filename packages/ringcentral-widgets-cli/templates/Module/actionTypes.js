import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from 'ringcentral-integration/enums/moduleActionTypes';

export const actionTypes = ObjectMap.prefixKeys(
  [...ObjectMap.keys(moduleActionTypes)],
  // eslint-disable-next-line no-template-curly-in-string
  '<%- `${name.charAt(0).toLowerCase()}${name.slice(1)}` %>',
);

export default actionTypes;
