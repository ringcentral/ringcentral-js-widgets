import { Entity } from '../../interfaces/Entity.interface';
import { DataMatcher, DataMatcherOptions } from '../../lib/DataMatcherV2';
import { Module } from '../../lib/di';
import { Deps } from './ConversationMatcher.interface';

@Module({
  name: 'ConversationMatcher',
  deps: [{ dep: 'ConversationMatcherOptions', optional: true }],
})
class ConversationMatcher extends DataMatcher<Entity, Deps> {
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
