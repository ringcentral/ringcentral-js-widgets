import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export const messageSenderActionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    'send',
    'sendOver',
    'sendError',
    'validate',
    'validateOver',
    'validateError',
  ],
  'messageSender',
);

export default messageSenderActionTypes;
