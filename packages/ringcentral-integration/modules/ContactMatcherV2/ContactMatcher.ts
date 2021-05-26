import { Module } from '../../lib/di';
import { DataMatcher, DataMatcherOptions } from '../../lib/DataMatcherV2';
import { proxify } from '../../lib/proxy/proxify';
import {
  HasMatchNumberOptions,
  ForceMatchBatchNumbersOptions,
  ForceMatchNumberOptions,
  Deps,
} from './ContactMatcher.interface';
import { Entity } from '../../interfaces/Entity.interface';

@Module({
  name: 'ContactMatcher',
  deps: [{ dep: 'ContactMatcherOptions', optional: true }],
})
class ContactMatcher extends DataMatcher<Entity, Deps> {
  constructor(deps: Deps) {
    super(deps, 'ContactMatcher', deps.contactMatcherOptions?.disableCache);
  }

  get dataMatcherOptions() {
    return this._deps.contactMatcherOptions;
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

export { ContactMatcher };
