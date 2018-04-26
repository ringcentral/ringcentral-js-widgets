import { Module } from '../../lib/di';
import DataMatcher from '../../lib/DataMatcher';
import proxify from '../../lib/proxy/proxify';

/**
 * @class
 * @description Contact matcher managing module
 */
@Module({
  deps: [{ dep: 'ContactMatcherOptions', optional: true }]
})
export default class ContactMatcher extends DataMatcher {
  /**
   * @constructor
   */
  constructor({
    ...options
  }) {
    super({
      name: 'contactMatcher',
      ...options
    });
  }

  @proxify
  async hasMatchNumber({ phoneNumber, ignoreCache = false }) {
    await this.match({
      queries: [phoneNumber],
      ignoreCache
    });
    return !!this.dataMapping[phoneNumber] && this.dataMapping[phoneNumber].length > 0;
  }

  @proxify
  async forceMatchNumber({ phoneNumber }) {
    await this.match({
      queries: [phoneNumber],
      ignoreCache: true
    });
  }
}
