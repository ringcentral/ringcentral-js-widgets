import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'fetch',
  'fetchError',
  'fetchSuccess',
  'create',
  'createSuccess',
  'createError',
  'updatePostInput',
], 'glipPosts');
