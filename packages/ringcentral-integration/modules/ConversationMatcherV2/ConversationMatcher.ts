import { Module } from '../../lib/di';
import { DataMatcher, Deps } from '../../lib/DataMatcherV2';
import { Entity } from '../../interfaces/Entity.interface';

@Module({
  name: 'ConversationMatcher',
})
export class ConversationMatcher extends DataMatcher<Entity> {
  constructor(deps: Deps) {
    super(deps, 'ConversationMatcher');
  }
}
