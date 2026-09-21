import type CallerIdByFeature from '@rc-ex/core/lib/definitions/CallerIdByFeature';
import type ExtensionCallerIdInfo from '@rc-ex/core/lib/definitions/ExtensionCallerIdInfo';
import {
  Client,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
  ExtensionFeatures,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  computed,
  delegate,
  injectable,
  optional,
} from '@ringcentral-integration/next-core';
import { find } from 'ramda';

import type { CallerIdOptions } from './CallerId.interface';

type CallerIdFeature = NonNullable<CallerIdByFeature['feature']>;
type CallerIdData = CallerIdByFeature['callerId'];
type DefaultCallerIdOptions = {
  features?: CallerIdFeature[];
  includeBlocked?: boolean;
};

export const DEFAULT_CALLER_ID_FEATURES: CallerIdFeature[] = [
  // for backward compatibility, still use RingOut if available
  'RingOut',
  'AdditionalSoftphone',
  'MobileApp',
  'RingMe',
  'Alternate',
];

@injectable({
  name: 'CallerId',
})
export class CallerId extends DataFetcherConsumer<ExtensionCallerIdInfo> {
  constructor(
    protected _client: Client,
    protected _extensionFeatures: ExtensionFeatures,
    protected override _dataFetcher: DataFetcher,
    @optional('CallerIdOptions') protected _callerIdOptions?: CallerIdOptions,
  ) {
    super(_dataFetcher);

    this._source = new DataSource({
      ...this._callerIdOptions,
      key: 'callerId',
      cleanOnReset: true,
      fetchFunction: async (): Promise<ExtensionCallerIdInfo> => {
        const response = await this._client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/caller-id');
        return response.json();
      },
      readyCheckFunction: () => this._extensionFeatures.ready,
      permissionCheckFunction: () => this.hasReadAccess,
    });
    this._dataFetcher.register(this._source);
  }

  get hasReadAccess() {
    return (
      this._extensionFeatures.features?.ReadOutboundCallerId?.available ?? false
    );
  }

  get hasWriteAccess() {
    return (
      this._extensionFeatures.features?.EditOutboundCallerId?.available ?? false
    );
  }

  @computed(({ data }: CallerId) => [data])
  get byDevice() {
    return this.data?.byDevice ?? [];
  }

  @computed(({ data }: CallerId) => [data])
  get byFeature() {
    return this.data?.byFeature ?? [];
  }

  @computed(({ byFeature }: CallerId) => [byFeature])
  get ringOut() {
    return this.getCallerIdByFeature('RingOut');
  }

  @computed(({ byFeature }: CallerId) => [byFeature])
  get faxNumber() {
    return find((item) => item.feature === 'FaxNumber', this.byFeature)
      ?.callerId?.phoneInfo?.phoneNumber;
  }

  /**
   * Caller ID feature fallback for cases where user cannot choose caller ID.
   */
  @computed(({ byFeature }: CallerId) => [byFeature])
  get defaultCallerId() {
    return this.getDefaultCallerId();
  }

  getCallerIdByFeature(feature: CallerIdFeature) {
    return find((item) => item.feature === feature, this.byFeature)?.callerId;
  }

  getDefaultCallerId(options: DefaultCallerIdOptions = {}) {
    return this.getDefaultCallerIdWithFeature(options)?.callerId;
  }

  getDefaultCallerIdWithFeature(options: DefaultCallerIdOptions = {}) {
    const { features = DEFAULT_CALLER_ID_FEATURES } = options;

    for (const feature of features) {
      const callerIdByFeature = find(
        (item) => item.feature === feature,
        this.byFeature,
      );
      if (this._hasCallerIdValue(callerIdByFeature?.callerId, options)) {
        return callerIdByFeature;
      }
    }

    return find(
      (item) => this._hasCallerIdValue(item.callerId, options),
      this.byFeature,
    );
  }

  private _hasCallerIdValue(
    callerId?: CallerIdData,
    { includeBlocked = true }: DefaultCallerIdOptions = {},
  ) {
    return !!(
      (includeBlocked && callerId?.type === 'Blocked') ||
      callerId?.phoneInfo?.id ||
      callerId?.phoneInfo?.uri ||
      callerId?.phoneInfo?.phoneNumber
    );
  }

  @delegate('server')
  async setDefaultCallerId(newCallerId: string, feature: CallerIdFeature) {
    if (!this.hasWriteAccess) {
      throw new Error('No permission to edit outbound caller ID');
    }

    const payload = {
      byFeature: [
        {
          feature,
          callerId:
            newCallerId === '0'
              ? { type: 'Blocked' }
              : { phoneInfo: { id: newCallerId } },
        },
      ],
    };
    const res = await this._client.service
      .platform()
      .put('/restapi/v1.0/account/~/extension/~/caller-id', payload);

    const result: ExtensionCallerIdInfo = await res.json();

    this.updateData(result);
  }
}
