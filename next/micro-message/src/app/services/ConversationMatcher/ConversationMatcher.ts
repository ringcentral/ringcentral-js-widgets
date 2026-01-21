import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import {
  DataMatcher,
  DataMatcherOptions,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  optional,
  StoragePlugin,
} from '@ringcentral-integration/next-core';

import type { ConversationMatcherOptions } from './ConversationMatcher.interface';

@injectable({
  name: 'ConversationMatcher',
})
class ConversationMatcher<T = Entity> extends DataMatcher<T> {
  constructor(
    @optional('ConversationMatcherOptions')
    protected _conversationMatcherOptions?: ConversationMatcherOptions,
    @optional() protected override _storage?: StoragePlugin,
  ) {
    super(_storage);
  }

  get dataMatcherOptions(): DataMatcherOptions {
    return this._conversationMatcherOptions ?? {};
  }
}

export { ConversationMatcher };
