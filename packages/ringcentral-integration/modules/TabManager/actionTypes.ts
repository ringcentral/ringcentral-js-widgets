import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from '../../enums/moduleActionTypes';

export default ObjectMap.prefixKeys(
  [...ObjectMap.keys(moduleActionTypes), 'mainTabIdChanged', 'event'],
  'tabManager',
);
