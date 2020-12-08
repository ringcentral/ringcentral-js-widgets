import { Module } from '../../lib/di';
import { DataMatcher, Deps } from '../../lib/DataMatcherV2';
import proxify from '../../lib/proxy/proxify';
import {
  HasMatchNumberOptions,
  ForceMatchBatchNumbersOptions,
  ForceMatchNumberOptions,
} from './ContactMatcher.interface';
import { Entity } from '../../interfaces/Entity.interface';

@Module({
  name: 'ContactMatcher',
})
export class ContactMatcher extends DataMatcher<Entity> {
  constructor(deps: Deps) {
    super(deps, 'ContactMatcher');
  }

  @proxify
  async hasMatchNumber({
    phoneNumber,
    ignoreCache = false,
  }: HasMatchNumberOptions) {
    await this.match({
      queries: [phoneNumber],
      ignoreCache,
    });
    return this.dataMapping[phoneNumber]?.length > 0;
  }

  @proxify
  async forceMatchBatchNumbers({
    phoneNumbers,
  }: ForceMatchBatchNumbersOptions) {
    await this.match({
      queries: phoneNumbers,
      ignoreCache: true,
      ignoreQueue: true,
    });
  }

  @proxify
  async forceMatchNumber({ phoneNumber }: ForceMatchNumberOptions) {
    await this.forceMatchBatchNumbers({
      phoneNumbers: [phoneNumber],
    });
  }
}
