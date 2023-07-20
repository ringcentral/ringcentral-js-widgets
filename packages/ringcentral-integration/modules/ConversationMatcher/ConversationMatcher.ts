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
      deps,
      'ConversationMatcher',
      deps.conversationMatcherOptions?.disableCache,
    );
  }

  get dataMatcherOptions(): DataMatcherOptions {
    return this._deps.conversationMatcherOptions;
  }
}

export { ConversationMatcher };
