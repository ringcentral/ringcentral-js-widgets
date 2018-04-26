import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'search',
  'nextPage',
  'previousPage',
  'setPage',
  'setPerPage',
  'updateSearchInput',
  'updateTypeFilter',
], 'messages');
