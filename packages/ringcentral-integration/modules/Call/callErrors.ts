import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  [
    'noToNumber',
    'noAreaCode',
    'connectFailed',
    'internalError',
    'notAnExtension',
    'networkError',
    'noRingoutEnable',
    'noInternational',
    'emergencyNumber',
  ],
  'callErrors',
);
