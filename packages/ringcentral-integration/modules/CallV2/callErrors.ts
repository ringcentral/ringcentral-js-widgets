import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callErrors = ObjectMap.prefixKeys(
  [
    'noToNumber',
    'noAreaCode',
    'specialNumber',
    'connectFailed',
    'internalError',
    'notAnExtension',
    'networkError',
    'noRingoutEnable',
    'noInternational',
  ],
  'callErrors',
);
