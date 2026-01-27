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
  action,
  computed,
  delegate,
  injectable,
  optional,
  state,
  storage,
  StoragePlugin,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { tap } from 'rxjs';

import type {
  CallQueueInfo,
  ExtensionGrantRecord,
  SmsRecipient,
  SmsRecipientsCacheEntry,
} from './CallQueues.interface';

const DEFAULT_TTL = 5 * 60 * 1000; // 5 min

type CallQueueMetadata = {
  queueId: string;
  queueInfo: CallQueueInfo;
  smsRecipients?: SmsRecipientsCacheEntry;
  grant?: ExtensionGrantRecord;
};

type CallQueuesMap = Record<string, CallQueueMetadata>;

@injectable({
  name: 'CallQueues',
})
export class CallQueues extends DataFetcherConsumer<CallQueueInfo[]> {
  protected override _source = new DataSource({
    key: 'callQueues',
    polling: false,
    disableCache: false,
    cleanOnReset: true,
    ttl: DEFAULT_TTL,
    fetchFunction: async () => {
      const data = (await fetchList(async (params: any) => {
        const response = await this._client.service
          .platform()
          .get('/restapi/v1.0/account/~/call-queues', params);
        return response.json();
      })) as CallQueueInfo[];
      return data;
    },
    readyCheckFunction: () => this.readyCheckFunction(),
    permissionCheckFunction: () => this.permissionCheckFunction(),
  });

  private _grantSource = new DataSource({
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

  @storage
  @state
  smsRecipientsCache: Record<string, SmsRecipientsCacheEntry> = {};

  get grants() {
    return this._dataFetcher.getData(this._grantSource) || [];
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
  private get map(): CallQueuesMap {
    if (!this.data) {
      return {};
    }
    const result: CallQueuesMap = {};
    for (const queue of this.data) {
      result[queue.id] = {
        queueId: queue.id,
        queueInfo: queue,
        smsRecipients: this.smsRecipientsCache[queue.id],
        grant: this.grantsMap[queue.id],
      };
    }
    return result;
  }

  getQueueMetadata(queueId: string): CallQueueMetadata | undefined {
    return this.map[queueId];
  }

  constructor(
    private _client: Client,
    private _extensionFeatures: ExtensionFeatures,
    private _storage: StoragePlugin,
    protected override _dataFetcher: DataFetcher,
    @optional('Subscription') protected _subscription?: Subscription,
  ) {
    super(_dataFetcher);
    this._storage.enable(this);

    this._dataFetcher.register(this._source);
    this._dataFetcher.register(this._grantSource);

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

  @action
  resetData() {
    this.smsRecipientsCache = {};
  }

  /**
   * Check if cache entry is expired
   */
  private isCacheExpired(queueId: string): boolean {
    const map = this.map[queueId];
    const cacheEntry = map?.smsRecipients;
    if (!cacheEntry) {
      return true;
    }
    const now = Date.now();
    return now - cacheEntry.timestamp > DEFAULT_TTL;
  }

  /**
   * Get loading state for SMS recipients
   */
  getSmsRecipientsLoading(queueId: string): boolean {
    const map = this.map[queueId];
    const cacheEntry = map?.smsRecipients;
    return cacheEntry?.loading || false;
  }

  @action
  private setSmsRecipientsLoading(queueId: string, loading: boolean) {
    if (!this.smsRecipientsCache[queueId]) {
      this.smsRecipientsCache[queueId] = {
        data: [],
        timestamp: 0,
        loading,
      };
    } else {
      this.smsRecipientsCache[queueId].loading = loading;
    }
  }

  @action
  private setSmsRecipients(queueId: string, recipients: SmsRecipient[]) {
    this.smsRecipientsCache[queueId] = {
      data: recipients.sort((a, b) =>
        a.extensionNumber.localeCompare(b.extensionNumber),
      ),
      timestamp: Date.now(),
      loading: false,
    };
  }

  /**
   * Fetch SMS recipients (with caching)
   * Re-fetches if cache is expired or forced
   */
  @delegate('server')
  async loadSmsRecipients(
    queueId: string,
    force = false,
  ): Promise<SmsRecipient[]> {
    const ableToFetchSmsRecipients =
      !this._extensionFeatures.features?.CallQueueSmsRecipient?.available;

    // Check if we need to fetch
    if (ableToFetchSmsRecipients || (!force && !this.isCacheExpired(queueId))) {
      return this.getSmsRecipients(queueId);
    }

    // Set loading state
    this.setSmsRecipientsLoading(queueId, true);

    try {
      const recipients = await this._getCallQueuesSmsRecipients(queueId);
      // Update cache
      this.setSmsRecipients(queueId, recipients);
      return recipients;
    } catch (error) {
      // Set loading to false on error
      this.setSmsRecipientsLoading(queueId, false);
      this.logger.error('loadSmsRecipients error', error);
      return [];
    }
  }

  /**
   * Get SMS recipients with caching
   */
  getSmsRecipients(queueId: string): SmsRecipient[] {
    const map = this.map[queueId];
    const cacheEntry = map?.smsRecipients;
    return cacheEntry?.data || [];
  }

  /**
   * Fetch function for DataSource
   */
  refetchCallQueues() {
    return this.fetchData();
  }

  /**
   * Fetch function for DataSource
   */
  refetchGrants() {
    return this._dataFetcher.fetchData(this._grantSource);
  }

  private readyCheckFunction() {
    return this._extensionFeatures.ready;
  }

  private permissionCheckFunction() {
    return (
      this._extensionFeatures.features?.CallQueuePickup?.available ?? false
    );
  }

  /**
   * Get SMS recipients for a call queue (internal fetch method)
   */
  private async _getCallQueuesSmsRecipients(
    queueId: string,
  ): Promise<SmsRecipient[]> {
    try {
      const res = await this._client.service
        .platform()
        .get(`/restapi/v1.0/account/~/call-queues/${queueId}/sms-recipients`);

      const data = await res.json();
      return data.smsRecipients || [];
    } catch (error: any) {
      this.logger.error('getCallQueuesSmsRecipients error', error);
      return [];
    }
  }
}
