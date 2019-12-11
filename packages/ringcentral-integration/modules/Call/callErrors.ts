import { createEnum } from '../../lib/Enum';

export default createEnum(
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
