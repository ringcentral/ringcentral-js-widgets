import Enum from '../../lib/Enum';
import baseActionTypes from '../../lib/DataFetcher/baseActionTypes';

export default new Enum([
  ...Object.keys(baseActionTypes),
  'fetch',
  'fetchSuccess',
  'fetchError',
  'delete',
  'add',
], 'accountExtension');

