import { Entity } from '../../interfaces/Entity.interface';
import { DataMatcher } from '../../lib/DataMatcherV2';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import {
  Deps,
  ForceMatchBatchNumbersOptions,
  ForceMatchNumberOptions,
  HasMatchNumberOptions,
} from './ContactMatcher.interface';

@Module({
  name: 'ContactMatcher',
  deps: [{ dep: 'ContactMatcherOptions', optional: true }],
})
class ContactMatcher<T = Entity, D extends Deps = Deps> extends DataMatcher<
  T,
  D
> {
  constructor(deps: D) {
    super(deps, 'ContactMatcher', deps.contactMatcherOptions?.disableCache);
  }

  // @ts-expect-error
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
