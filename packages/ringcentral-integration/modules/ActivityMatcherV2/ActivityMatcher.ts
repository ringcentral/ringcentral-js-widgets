import { Module } from '../../lib/di';
import { DataMatcher } from '../../lib/DataMatcherV2';
import { Deps } from './ActivityMatcher.interface';

@Module({
  name: 'ActivityMatcher',
  deps: [{ dep: 'ActivityMatcherOptions', optional: true }],
})
class ActivityMatcher extends DataMatcher<string, Deps> {
  constructor(deps: Deps) {
    super(deps, 'ActivityMatcher', deps.activityMatcherOptions?.disableCache);
  }

  get dataMatcherOptions() {
    return this._deps.activityMatcherOptions;
  }
}

export { ActivityMatcher };
