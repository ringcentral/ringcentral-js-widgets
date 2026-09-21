import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { NumberFormatter } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  DataMatcher,
  TriggerMatchOptions,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  injectable,
  optional,
  delegate,
  StoragePlugin,
} from '@ringcentral-integration/next-core';

import type {
  ContactMatcherOptions,
  ForceMatchBatchNumbersOptions,
  ForceMatchNumberOptions,
  HasMatchNumberOptions,
} from './ContactMatcher.interface';

@injectable({
  name: 'ContactMatcher',
})
export class ContactMatcher<T = Entity> extends DataMatcher<T> {
  constructor(
    protected _numberFormatter: NumberFormatter,
    @optional('ContactMatcherOptions')
    protected _contactMatcherOptions?: ContactMatcherOptions,
    @optional() protected override _storage?: StoragePlugin,
  ) {
    super(_storage);
  }

  /**
   * async function to get queries
   */
  asyncGetQueries?: () => Promise<string[]>;

  get dataMatcherOptions() {
    return this._contactMatcherOptions ?? {};
  }

  @delegate('server')
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

  @delegate('server')
  async forceMatchBatchNumbers({
    phoneNumbers,
  }: ForceMatchBatchNumbersOptions) {
    await this.match({
      queries: phoneNumbers,
      ignoreCache: true,
      ignoreQueue: true,
    });
  }

  @delegate('server')
  async forceMatchNumber({ phoneNumber }: ForceMatchNumberOptions) {
    await this.forceMatchBatchNumbers({
      phoneNumbers: [phoneNumber],
    });
  }

  @delegate('server')
  override async triggerMatch({
    ignoreCache = false,
    ignoreQueue = false,
    queries,
  }: TriggerMatchOptions & { queries?: string[] } = {}) {
    if (this.ready) {
      const _queries =
        queries ??
        (this.asyncGetQueries
          ? await this.asyncGetQueries()
          : this._getQueries());
      this._cleanUp();
      await this.match({
        queries: _queries,
        ignoreCache,
        ignoreQueue,
      });
    }
  }

  findMatchesFromNumber(
    phoneNumber: string | undefined,
    extensionNumber: string | undefined,
  ) {
    const contactMapping = this.dataMapping ?? {};
    const toNumber =
      (phoneNumber &&
        // normalize number for ensure the number is matcher mapping with same key
        this._numberFormatter.normalizeNumber(phoneNumber)) ||
      extensionNumber;
    const matches = (toNumber && contactMapping[toNumber]) || [];
    return matches;
  }

  findMatchesFromCall(call: ICall) {
    const fromMatches = this.findMatchesFromNumber(
      call.from?.phoneNumber,
      call.from?.extensionNumber,
    );
    const toMatches = this.findMatchesFromNumber(
      call.to?.phoneNumber,
      call.to?.extensionNumber,
    );

    return {
      fromMatches,
      toMatches,
    };
  }
}
