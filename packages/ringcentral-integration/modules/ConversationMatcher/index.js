import { Module } from '../../lib/di';
import DataMatcher from '../../lib/DataMatcher';

@Module({
  deps: [{ dep: 'ConversationMatcherOptions', optional: true }]
})
export default class ConversationMatcher extends DataMatcher {
  constructor({
    ...options
  }) {
    super({
      name: 'conversationMatcher',
      ...options
    });
  }
}
