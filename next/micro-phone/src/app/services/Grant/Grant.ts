import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import fetchList from '@ringcentral-integration/commons/lib/fetchList';
import type { WebSocketSubscription as Subscription } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Client,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
  ExtensionFeatures,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  computed,
  injectable,
  optional,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { tap } from 'rxjs';

import type { ExtensionGrantRecord } from './Grant.interface';

const DEFAULT_TTL = 5 * 60 * 1000; // 5 min

@injectable({
  name: 'Grant',
})
export class Grant extends DataFetcherConsumer<ExtensionGrantRecord[]> {
  protected override _source = new DataSource({
    key: 'extensionGrants',
    polling: false,
    disableCache: false,
    cleanOnReset: true,
    ttl: DEFAULT_TTL,
    fetchFunction: async () => {
      const data = (await fetchList(async (params: any) => {
        const response = await this._client.service
          .platform()
          .get('/restapi/v1.0/account/~/extension/~/grant', params);
        return response.json();
      })) as ExtensionGrantRecord[];

      return data;
    },
    readyCheckFunction: () => this.readyCheckFunction(),
    permissionCheckFunction: () => this.permissionCheckFunction(),
  });

  constructor(
    private _client: Client,
    private _extensionFeatures: ExtensionFeatures,
    protected override _dataFetcher: DataFetcher,
    @optional('Subscription') protected _subscription?: Subscription,
  ) {
    super(_dataFetcher);

    this._dataFetcher.register(this._source);

    this._subscription?.register(this, {
      filters: [subscriptionFilters.extensionGrants],
    });
  }

  override onInitOnce() {
    super.onInitOnce();

    this._subscription
      ?.fromMessage$(/\/extension\/.*.\/grant/)
      .pipe(
        tap(async () => {
          try {
            await this.refetchGrants();
          } catch (error) {
            this.logger.error('grant update error', error);
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  get grants() {
    return this.data || [];
  }

  @computed
  get grantsMap() {
    const result: Record<string, ExtensionGrantRecord> = {};
    for (const grant of this.grants) {
      result[grant.extension.id] = grant;
    }
    return result;
  }

  @computed
  get hasCompanyExtensionGrant() {
    return this.grants.some(
      (grant) =>
        grant.extension.type === 'CompanyExtension' && grant.smsRecipient,
    );
  }

  isSharedSmsRecipientGrant(extensionId: string) {
    const grant = this.grantsMap[extensionId];
    return !!(
      grant &&
      // be site number
      (grant.extension.type === 'Site' ||
        grant.extension.type === 'Department') &&
      // have recipient permission
      grant.smsRecipient
    );
  }

  isCallQueueExtensionById(extensionId: string) {
    const grant = this.grantsMap[extensionId];
    return !!(
      grant &&
      grant.extension.type === 'Department' &&
      grant.callQueueSmsRecipient
    );
  }

  /**
   * Fetch function for DataSource
   */
  refetchGrants() {
    return this.fetchData();
  }

  private readyCheckFunction() {
    return this._extensionFeatures.ready;
  }

  private permissionCheckFunction() {
    return !!(
      this._extensionFeatures.features?.CallQueuePickup?.available ||
      this._extensionFeatures.features?.CallQueueSmsRecipient?.available ||
      this._extensionFeatures.features?.MessageThreads?.available
    );
  }
}
