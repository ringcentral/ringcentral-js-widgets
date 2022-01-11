import { DataMatcher } from '../../lib/DataMatcherV2';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { Deps } from './ActivityMatcher.interface';

@Module({
  name: 'ActivityMatcher',
  deps: [{ dep: 'ActivityMatcherOptions', optional: true }],
})
class ActivityMatcher<T = string> extends DataMatcher<T, Deps> {
  constructor(deps: Deps) {
    super(deps, 'ActivityMatcher', deps.activityMatcherOptions?.disableCache);
  }

  @proxify
  async triggerForceMatch() {
    await this.triggerMatch({
      ignoreCache: true,
      ignoreQueue: true,
    });
  }

  get dataMatcherOptions() {
    return this._deps.activityMatcherOptions;
  }
}

export { ActivityMatcher };
