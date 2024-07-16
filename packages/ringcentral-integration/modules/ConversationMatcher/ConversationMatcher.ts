import type { Entity } from '../../interfaces/Entity.interface';
import type { DataMatcherOptions } from '../../lib/DataMatcherV2';
import { DataMatcher } from '../../lib/DataMatcherV2';
import { Module } from '../../lib/di';

import type { Deps } from './ConversationMatcher.interface';

@Module({
  name: 'ConversationMatcher',
  deps: [{ dep: 'ConversationMatcherOptions', optional: true }],
})
class ConversationMatcher<
  T = Entity,
  D extends Deps = Deps,
> extends DataMatcher<T, D> {
  constructor(deps: Deps) {
    super(
      // @ts-expect-error TS(2345): Argument of type 'Deps' is not assignable to param... Remove this comment to see the full error message
      deps,
      'ConversationMatcher',
      deps.conversationMatcherOptions?.disableCache,
    );
  }

  get dataMatcherOptions(): DataMatcherOptions {
    // @ts-expect-error TS(2322): Type 'ConversationMatcherOptions | undefined' is n... Remove this comment to see the full error message
    return this._deps.conversationMatcherOptions;
  }
}

export { ConversationMatcher };
