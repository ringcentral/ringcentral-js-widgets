import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import { directionlessMessageIsUnread } from '@ringcentral-integration/commons/lib/messageHelper';
import {
  AppFeatures,
  Auth,
  AvailabilityMonitor,
  Client,
  ConnectivityMonitor,
  DataFetcher,
  type WebSocketSubscription as Subscription,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { Toast } from '@ringcentral-integration/micro-core/src/app/services';
import {
  CallQueues,
  Grant,
} from '@ringcentral-integration/micro-phone/src/app/services';
import {
  computed,
  delegate,
  fromWatch,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import {
  distinctUntilChanged,
  EMPTY,
  map,
  merge,
  pairwise,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { MessageStoreBase } from '../MessageStore/MessageStoreBase';
import { MessageStoreEventSubscriber } from '../MessageStoreEventSubscriber';

import type {
  QueueConversationsOptions,
  QueueMessageStoreOptions,
} from './QueueConversations.interface';

@injectable({
  name: 'QueueMessageStore',
})
export class QueueMessageStore extends MessageStoreBase {
  constructor(
    protected override _toast: Toast,
    protected override _auth: Auth,
    protected override _client: Client,
    protected override _dataFetcher: DataFetcher,
    protected override _connectivityMonitor: ConnectivityMonitor,
    protected override _messageEventSubscriber: MessageStoreEventSubscriber,
    protected override _appFeatures: AppFeatures,
    private _grant: Grant,
    private _callQueues: CallQueues,
    private _portManager: PortManager,
    @optional('Subscription') private _subscription?: Subscription,
    @optional()
    protected override _availabilityMonitor?: AvailabilityMonitor,
    @optional('TabManager') protected override _tabManager?: any,
    @optional('QueueMessageStoreOptions')
    protected override _messageStoreOptions?: QueueMessageStoreOptions,
    @optional('QueueConversationsOptions')
    private _queueConversationsOptions?: QueueConversationsOptions,
  ) {
    super(
      _toast,
      _auth,
      _client,
      _dataFetcher,
      _connectivityMonitor,
      _appFeatures,
      _messageEventSubscriber,
      _availabilityMonitor,
      _tabManager,
      {
        ..._messageStoreOptions,
        messageType: ['SMS'],
        messageStoreKey: 'queueMessageStore',
        limitDateFrom: false,
        fSyncRequestParams: {
          owner: 'Shared',
          messageType: 'SMS',
        },
      },
    );
    this._messageIsUnreadFunc = directionlessMessageIsUnread;

    this._subscription?.register(this, {
      filters: [subscriptionFilters.sharedSms],
    });

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.initListener();
      });
    } else {
      this.initListener();
    }
  }

  protected override get _readyCheck() {
    return super._readyCheck && this._grant.ready && this._callQueues.ready;
  }

  protected override get _shouldHandleInstantMessageEvent() {
    // Instant-message payloads do not carry the scoped Message Sync token.
    return false;
  }

  protected override get _shouldHandleMessageStoreEvent() {
    return false;
  }

  private get _enable() {
    return (
      (this._messageStoreOptions?.enable ?? true) &&
      (this._queueConversationsOptions?.enable ?? true)
    );
  }

  override get _hasPermission() {
    return Boolean(
      this._enable &&
      this._appFeatures.hasReadTextPermission &&
      this.eligibleGrantIds.length > 0,
    );
  }

  @computed
  get eligibleGrantIds() {
    return this._grant.grants
      .filter(
        ({ extension, callQueueSmsRecipient }) =>
          extension.type === 'Department' && callQueueSmsRecipient,
      )
      .map(({ extension }) => extension.id)
      .sort();
  }

  @computed
  private get _eligibilitySignature() {
    return `${this.eligibleGrantIds.join(',')}`;
  }

  private initListener() {
    const subscription = this._subscription;
    if (!subscription) return;

    const permission$ = fromWatchValue(this, () => this._hasPermission).pipe(
      startWith(false),
      pairwise(),
      tap(([prev, current]) => {
        if (prev && !current) {
          this.logger.log(
            'from permission become no permission, reset queue message data',
          );
          void this._updateData(null);
        }
      }),
      distinctUntilChanged(),
      map(([, current]) => {
        this.logger.log('current permission:', current);
        return current;
      }),
    );

    // when eligibleGrantIds change, need to reset the data and fetch new data
    const eligibleGrantIdsChange$ = fromWatch(
      this,
      () => this._eligibilitySignature,
    ).pipe(
      switchMap(async () => {
        this.logger.log('eligibleGrantIds changed, reset queue message data');
        await this._resetForEligibleGrantChange();
      }),
    );

    const sharedSmsEvent$ = subscription.fromMessage$(/\/shared-sms$/).pipe(
      switchMap(async () => {
        try {
          await this.fetchData({ passive: true });
        } catch (error) {
          this.logger.error('Shared SMS incremental sync failed', error);
        }
      }),
    );

    this.rehydrated$
      .pipe(
        switchMap(() => subscription.readyState$),
        switchMap((ready) => (ready ? permission$ : EMPTY)),
        switchMap((hasPermission) =>
          hasPermission
            ? merge(sharedSmsEvent$, eligibleGrantIdsChange$)
            : EMPTY,
        ),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  @delegate('server')
  async _resetForEligibleGrantChange() {
    if (this.data !== null) {
      await this._updateData(null);
    }

    if (this._hasPermission) {
      this.logger.log('eligibleGrantIds changed, fetch new queue message data');
      await this.fetchData({ passive: true });
    }
  }
}
