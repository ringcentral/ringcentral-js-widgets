import DataMatcher from '../../lib/DataMatcher';
import { Module } from '../../lib/di';

@Module({
  deps: [{ dep: 'ConversationMatcherOptions', optional: true }],
})
export default class ConversationMatcher extends DataMatcher {
  constructor({ ...options }) {
    super({
      name: 'conversationMatcher',
      ...options,
    });
  }
}
