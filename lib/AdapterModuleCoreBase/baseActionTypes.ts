import { moduleActionTypes } from '@ringcentral-integration/commons/enums/moduleActionTypes';
import { proxyActionTypes } from '@ringcentral-integration/commons/enums/proxyActionTypes';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

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
