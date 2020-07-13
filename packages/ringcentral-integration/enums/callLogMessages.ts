import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export default ObjectMap.prefixKeys(
  ['logCallLogFailed', 'logFailed', 'fieldRequired'],
  'callLogMessages',
);
