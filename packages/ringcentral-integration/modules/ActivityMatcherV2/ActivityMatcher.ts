import { Module } from '../../lib/di';
import { DataMatcher, Deps } from '../../lib/DataMatcherV2';

@Module({
  name: 'ActivityMatcher',
})
export class ActivityMatcher extends DataMatcher<string> {
  constructor(deps: Deps) {
    super(deps, 'ActivityMatcher');
  }
}
