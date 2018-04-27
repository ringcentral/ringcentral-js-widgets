import { Module } from '../../lib/di';
import DataMatcher from '../../lib/DataMatcher';
/**
 * @class
 * @description Active matcher manaing module
 */
@Module()
export default class ActivityMatcher extends DataMatcher {
  constructor({
    ...options
  }) {
    super({
      name: 'activityMatcher',
      ...options
    });
  }
}
