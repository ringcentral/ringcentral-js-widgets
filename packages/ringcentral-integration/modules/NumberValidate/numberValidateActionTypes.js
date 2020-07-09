import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const numberValidateActionTypes = ObjectMap.prefixKeys(
  [...ObjectMap.keys(moduleActionTypes)],
  'numberValidate',
);

export default numberValidateActionTypes;
