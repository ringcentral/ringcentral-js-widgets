import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'addFilters',
  'notification',
  'remove',
  'removeError',
  'removeFilters',
  'removeSuccess',
  'renewError',
  'renewSuccess',
  'setFilters',
  'subscribe',
  'subscribeError',
  'subscribeSuccess',
], 'subscription');
