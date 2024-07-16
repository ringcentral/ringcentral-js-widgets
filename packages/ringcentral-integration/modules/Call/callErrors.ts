import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

export const callErrors = ObjectMap.prefixKeys(
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
    'numberParseError',
    'fromAndToNumberIsSame',
  ],
  'callErrors',
);
