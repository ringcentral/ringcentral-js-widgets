import { DataMatcher } from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  optional,
  delegate,
  StoragePlugin,
} from '@ringcentral-integration/next-core';

import type { ActivityMatcherOptions } from './ActivityMatcher.interface';

@injectable({
  name: 'ActivityMatcher',
})
class ActivityMatcher<T = string> extends DataMatcher<T> {
  constructor(
    @optional('ActivityMatcherOptions')
    protected _activityMatcherOptions?: ActivityMatcherOptions,
    @optional() protected override _storage?: StoragePlugin,
  ) {
    super(_storage);
  }

  @delegate('server')
  async triggerForceMatch() {
    await this.triggerMatch({
      ignoreCache: true,
      ignoreQueue: true,
    });
  }

  get dataMatcherOptions() {
    return this._activityMatcherOptions ?? {};
  }
}

export { ActivityMatcher };
