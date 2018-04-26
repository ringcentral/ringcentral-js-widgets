import Enum from '../../lib/Enum';

export default new Enum([
  'noToNumber',
  'noAreaCode',
  'specialNumber',
  'connectFailed',
  'internalError',
  'notAnExtension',
  'networkError',
  'noRingoutEnable',
  'noInternational',
], 'callErrors');
