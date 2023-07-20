import type {
  DataMatcherOptions,
  Deps as BaseDeps,
} from '../../lib/DataMatcherV2';

export interface Deps extends BaseDeps {
  conversationMatcherOptions?: ConversationMatcherOptions;
}

export interface ConversationMatcherOptions extends DataMatcherOptions {
  //
}
