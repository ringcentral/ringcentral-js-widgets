import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';
import { moduleActionTypes } from 'ringcentral-integration/enums/moduleActionTypes';
import { proxyActionTypes } from 'ringcentral-integration/enums/proxyActionTypes';

export const baseActionTypes = ObjectMap.prefixKeys(
  [
    ...ObjectMap.keys(moduleActionTypes),
    ...ObjectMap.keys(proxyActionTypes),
    'syncClosed',
    'syncMinimized',
    'syncSize',
    'syncFocus',
    'syncPosition',
    'showAdapter',
  ],
  'adapterModuleCore',
);

export default baseActionTypes;
