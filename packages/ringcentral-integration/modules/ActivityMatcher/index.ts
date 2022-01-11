import DataMatcher from '../../lib/DataMatcher';
import { Module } from '../../lib/di';

/**
 * @class
 * @description Active matcher manaing module
 */
@Module()
export default class ActivityMatcher extends DataMatcher {
  constructor({ ...options }) {
    super({
      name: 'activityMatcher',
      ...options,
    });
  }
}
