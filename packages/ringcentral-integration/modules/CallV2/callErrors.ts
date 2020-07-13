import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
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
