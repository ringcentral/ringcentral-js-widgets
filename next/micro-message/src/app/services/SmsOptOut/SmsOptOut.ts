import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import {
  Auth,
  Client,
  DataFetcher,
  DataFetcherConsumer,
  DataSource,
  NumberFormatter,
  type WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  computed,
  delegate,
  injectable,
  optional,
  state,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import { tap } from 'rxjs';

import type { FilteredConversation } from '../Conversations';

import type {
  GetOptOutsOptions,
  OptOutListResponse,
  OptOutResponse,
} from './SmsOptOut.interface';
import { t } from './i18n';

const DEFAULT_TTL = 5 * 60 * 1000; // 5 min

@injectable({
  name: 'SmsOptOut',
})
export class SmsOptOut extends DataFetcherConsumer<OptOutResponse[]> {
  protected override _source = new DataSource<OptOutResponse[]>({
    key: 'smsOptOuts',
    polling: false,
    disableCache: false,
    cleanOnReset: true,
    ttl: DEFAULT_TTL,
    fetchFunction: () => this.getOptOuts(),
    readyCheckFunction: () => this.readyCheckFunction(),
    permissionCheckFunction: () => this.permissionCheckFunction(),
  });

  @computed
  get optOutMap() {
    const result: Record<string, OptOutResponse> = {};
    for (const optOut of this.data || []) {
      result[this.getOptOutKey(optOut)] = optOut;
    }
    return result;
  }

  /**
   * the user conversation opt out status map
   *
   * use for display on the conversation panel
   */
  @state
  inputOptOutMap: Record<string, boolean> = {};

  constructor(
    private _client: Client,
    private _auth: Auth,
    private _numberFormatter: NumberFormatter,
    protected override _dataFetcher: DataFetcher,
    @optional('Subscription') protected _subscription?: Subscription,
  ) {
    super(_dataFetcher);

    this._dataFetcher.register(this._source);
    this._subscription?.register(this, {
      filters: [subscriptionFilters.optOuts],
    });
  }

  private getOptOutKey({ from, to }: { from: string; to: string }) {
    // use sort to ignore the order of from and to
    const [a, b] = [
      this._numberFormatter.formatNumber(from),
      this._numberFormatter.formatNumber(to),
    ].sort();
    return `${a}__${b}`;
  }

  override onInitOnce() {
    super.onInitOnce();

    this._subscription
      ?.fromMessage$(/\/account\/.*\/a2p-sms\/opt-outs/)
      .pipe(
        tap(async () => {
          try {
            await this.refetchOptOuts();
          } catch (error) {
            this.logger.error('opt-outs update error', error);
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  /**
   * Get opt-outs list with optional filters
   */
  @delegate('server')
  async getOptOuts(options: GetOptOutsOptions = {}): Promise<OptOutResponse[]> {
    const { from, to, status = 'optout', pageToken, perPage = 1000 } = options;

    const params: Record<string, any> = {};
    if (from) {
      params.from = from;
    }
    if (to) {
      params.to = to;
    }
    if (status) {
      params.status = status;
    }
    if (pageToken) {
      params.pageToken = pageToken;
    }
    if (perPage) {
      params.perPage = perPage;
    }

    try {
      const response = await this._client.service
        .platform()
        .get('/restapi/v1.0/account/~/a2p-sms/opt-outs', params);
      const data: OptOutListResponse = await response.json();
      return data.records || [];
    } catch (error) {
      this.logger.error('getOptOuts error', error);
      return [];
    }
  }

  /**
   * Refetch opt-outs from server
   */
  refetchOptOuts() {
    return this.fetchData();
  }

  private readyCheckFunction() {
    return this._auth.loggedIn;
  }

  private permissionCheckFunction() {
    return this._auth.loggedIn;
  }

  @action
  private _setOptOut(conversationId: string, enabled: boolean) {
    this.inputOptOutMap[conversationId] = enabled;
  }

  @delegate('server')
  async setOptOut(conversationId: string, enabled: boolean) {
    this._setOptOut(conversationId, enabled);
  }

  getOptOut(conversationId: string): boolean {
    return this.inputOptOutMap[conversationId] ?? false;
  }

  /**
   * Attach opt-out hint to message text if opt-out is enabled for the conversation
   */
  attachOptOutHint(conversationId: string, text: string): string {
    if (this.getOptOut(conversationId)) {
      return `${text}\n\n${this.getStopHint()}`;
    }
    return text;
  }

  getStopHint() {
    return t('replyStopToOptOut', { stop: 'STOP' });
  }

  getIsOptOutConversation(conversation?: FilteredConversation) {
    if (!conversation) {
      return false;
    }

    const fromNumber = conversation.from?.phoneNumber;
    const toNumber = conversation.to?.[0]?.phoneNumber;
    const isOptOut = Boolean(
      conversation.to?.length === 1 && this.isOptOut(fromNumber, toNumber),
    );
    return isOptOut;
  }

  /**
   * Check if a conversation is opted out based on from and to phone numbers
   */
  isOptOut(from: string | undefined, to: string | undefined): boolean {
    if (!from || !to) {
      return false;
    }
    const key = this.getOptOutKey({ from, to });
    const optOut = this.optOutMap[key];
    return optOut?.status === 'OptOut';
  }

  isOptOutWithFormat(
    from: string | undefined,
    to: string | undefined,
  ): boolean {
    if (!from || !to) {
      return false;
    }
    const key = this.getOptOutKey({ from, to });
    const optOut = this.optOutMap[key];
    return optOut?.status === 'OptOut';
  }

  @action
  resetOptOut(conversationId: string) {
    delete this.inputOptOutMap[conversationId];
  }

  @action
  private resetData() {
    this.inputOptOutMap = {};
  }

  override onReset() {
    this.resetData();
  }
}
