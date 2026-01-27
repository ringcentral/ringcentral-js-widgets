import type ActiveCallInfoWithoutSIP from '@rc-ex/core/lib/definitions/ActiveCallInfoWithoutSIP';
import type DetailedExtensionPresenceEvent from '@rc-ex/core/lib/definitions/DetailedExtensionPresenceEvent';
import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';
import { presenceStatus } from '@ringcentral-integration/commons/enums/presenceStatus.enum';
import { subscriptionFilters } from '@ringcentral-integration/commons/enums/subscriptionFilters';
import type {
  ActiveCall,
  PresenceInfoModel,
} from '@ringcentral-integration/commons/interfaces/Presence.model';
import {
  isEnded,
  normalizeFromTo,
  normalizeStartTime,
  removeInboundRingOutLegs,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import type { DebouncedFunction } from '@ringcentral-integration/commons/lib/debounce-throttle';
import { debounce } from '@ringcentral-integration/commons/lib/debounce-throttle';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  action,
  computed,
  inject,
  injectable,
  optional,
  delegate,
  state,
  userStorage,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { filter, map } from 'ramda';
import type { Unsubscribe } from 'redux';
import { interval, share } from 'rxjs';

import { Auth } from '../Auth';
import { Client } from '../Client';
import { ConnectivityMonitor } from '../ConnectivityMonitor';
import { DataFetcher, DataFetcherConsumer, DataSource } from '../DataFetcher';
import { ExtensionFeatures } from '../ExtensionFeatures';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import type {
  PresenceOptions,
  UpdatePresenceParams,
} from './Presence.interface';
import { dndStatus } from './dndStatus';
import { removeIntermediateCall } from './removeIntermediateCall';

const DEFAULT_TTL = 62 * 1000;
const DEFAULT_POLLING_INTERVAL = 3 * 60 * 1000;
const DEFAULT_FETCH_DELAY = 2 * 1000;
const DEFAULT_MAX_FETCH_DELAY = 4 * 1000;

export const presenceRegExp = /.*\/presence(\?.*)?/;
export const detailedPresenceRegExp =
  /.*\/presence\?detailedTelephonyState=true&sipData=true/;

const acceptCallQueueToggles = [
  dndStatus.takeAllCalls,
  dndStatus.doNotAcceptDepartmentCalls,
];

export const DEFAULT_PRESENCE_UPDATE_INTERVAL = 10 * 1000;

@injectable({
  name: 'Presence',
})
export class Presence extends DataFetcherConsumer<PresenceInfoModel> {
  updateInterval$ = interval(
    this._presenceOptions?.updateInterval || DEFAULT_PRESENCE_UPDATE_INTERVAL,
  ).pipe(share());

  protected _debouncedFetchData: DebouncedFunction<Presence['fetchData']>;

  protected _stopWatchingConnectivity: Unsubscribe | null = null;
  protected _stopWatchingSubscription: Unsubscribe | null = null;

  constructor(
    protected _auth: Auth,
    protected _client: Client,
    protected _connectivityMonitor: ConnectivityMonitor,
    protected override _dataFetcher: DataFetcher,
    protected _extensionFeatures: ExtensionFeatures,
    @inject('Subscription') protected _subscription: Subscription,
    protected _storage: StoragePlugin,
    @optional('TabManager') protected _tabManager?: any,
    @optional('PresenceOptions') protected _presenceOptions?: PresenceOptions,
  ) {
    super(_dataFetcher);

    this._storage.enable(this);

    const presenceOptions = this._presenceOptions ?? {};
    const { ttl = DEFAULT_TTL, pollingInterval = DEFAULT_POLLING_INTERVAL } =
      presenceOptions;
    this._source = new DataSource({
      ...presenceOptions,
      key: 'presence',
      cleanOnReset: true,
      ttl,
      pollingInterval,
      fetchFunction: async (): Promise<PresenceInfoModel> => {
        const response = await this._client.service
          .platform()
          .get(this._endPoint);
        const data = await response.json();
        const {
          dndStatus = this.dndStatus,
          meetingStatus = this.meetingStatus,
          presenceStatus = this.presenceStatus,
          telephonyStatus = this.telephonyStatus,
          userStatus = this.userStatus,
        } = data;
        const activeCalls = this._processRawActiveCalls(
          data.activeCalls,
          data.totalActiveCalls,
          Date.now(),
        );
        return {
          sequence: this._sequence,
          activeCalls,
          dndStatus,
          meetingStatus,
          presenceStatus,
          telephonyStatus,
          userStatus,
        };
      },
      readyCheckFunction: () =>
        this._auth.ready &&
        this._auth.loggedIn &&
        this._subscription.ready &&
        this._extensionFeatures.ready &&
        this._connectivityMonitor.ready &&
        this._dataFetcher.ready,
      permissionCheckFunction: () => this._checkPermission(),
    });
    this._dataFetcher.register(this._source);
    this._debouncedFetchData = debounce({
      fn: this.fetchData,
      threshold: this._fetchDelay,
      maxThreshold: this._maxFetchDelay,
    });

    this._subscription.register(this, {
      filters: [this._endPoint],
    });
  }

  @userStorage
  @state
  lastDndStatus: PresenceInfoModel['dndStatus'] | null = null;

  @action
  _setLastDndStatus(dndStatus: PresenceInfoModel['dndStatus'] | null) {
    this.lastDndStatus = dndStatus;
  }

  get _endPoint() {
    return subscriptionFilters.detailedPresence;
  }

  get _fetchDelay() {
    return Math.max(
      0,
      this._presenceOptions?.fetchDelay ?? DEFAULT_FETCH_DELAY,
    );
  }

  get _maxFetchDelay() {
    return Math.max(
      this._fetchDelay,
      this._presenceOptions?.maxFetchDelay ?? DEFAULT_MAX_FETCH_DELAY,
    );
  }

  protected _checkPermission() {
    return (
      this._extensionFeatures.features?.ReadPresenceStatus?.available ?? false
    );
  }

  _processRawActiveCalls(
    activeCalls: ActiveCallInfoWithoutSIP[] = [],
    totalActiveCalls = 0,
    timestamp: number,
  ) {
    if (activeCalls.length < totalActiveCalls) {
      return this.activeCalls;
    }
    return map((activeCall) => {
      const existingCall = this.activeCalls.find(
        (call) => call.sessionId === activeCall.sessionId,
      );
      if (!existingCall) {
        const normalizedCall = normalizeStartTime(normalizeFromTo(activeCall));
        const startTime = Number(normalizedCall.startTime || timestamp);
        const offset = Math.min(timestamp - startTime, 0);
        return {
          ...normalizedCall,
          startTime,
          offset,
        };
      }
      return {
        ...existingCall,
        ...normalizeStartTime(normalizeFromTo(activeCall)),
      };
    }, removeIntermediateCall([], activeCalls)) as ActiveCall[];
  }

  protected _handleSubscription(message?: DetailedExtensionPresenceEvent) {
    const regExp = detailedPresenceRegExp;
    if (
      this.ready &&
      (this._source.disableCache || (this._tabManager?.active ?? true)) &&
      message?.event &&
      regExp.test(message.event) &&
      message.body
    ) {
      if (message.body.sequence && message.body.sequence < this._sequence) {
        return;
      }
      const timestamp = Date.now();
      const {
        sequence = this._sequence,
        dndStatus = this.dndStatus,
        meetingStatus = this.meetingStatus,
        presenceStatus = this.presenceStatus,
        telephonyStatus = this.telephonyStatus,
        userStatus = this.userStatus,
      } = message.body;
      this._setLastDndStatus(this._calculateLastDndStatus(dndStatus));
      const activeCalls = this._processRawActiveCalls(
        message.body.activeCalls,
        message.body.totalActiveCalls,
        timestamp,
      );
      this._updateData(
        {
          sequence,
          activeCalls,
          dndStatus,
          meetingStatus,
          presenceStatus,
          telephonyStatus,
          userStatus,
        },
        timestamp,
      );
      /**
       * as pointed out by Igor in https://jira_domain/browse/PLA-33391,
       * when the real calls count larger than the active calls returned by the pubnub,
       * we need to pulling the calls manually.
       */
      const activeCallsLength = message.body.activeCalls?.length ?? 0;
      const totalActiveCalls = message.body.totalActiveCalls ?? 0;
      if (activeCallsLength < totalActiveCalls) {
        this._debouncedFetchData();
      }
    }
  }

  override onInit() {
    this._stopWatchingConnectivity = watch(
      this,
      () => this._connectivityMonitor.connectivity,
      (connectivity) => this._handleConnectivity(connectivity),
    );
    this._stopWatchingSubscription = watch(
      this,
      () =>
        this._subscription.message as
          | DetailedExtensionPresenceEvent
          | undefined,
      (message) => this._handleSubscription(message),
    );
  }

  protected _handleConnectivity(connectivity: boolean) {
    if (
      this.ready &&
      (this._source.disableCache || (this._tabManager?.active ?? true)) &&
      connectivity &&
      this._checkPermission()
    ) {
      this.fetchData();
    }
  }

  override onReset() {
    this._stopWatchingConnectivity?.();
    this._stopWatchingConnectivity = null;
    this._stopWatchingSubscription?.();
    this._stopWatchingSubscription = null;
    this._debouncedFetchData.cancel();
  }

  get _sequence() {
    return this.data?.sequence ?? 0;
  }

  @computed(({ data }: Presence) => [data])
  get activeCalls() {
    return this.data?.activeCalls ?? [];
  }

  @computed(({ activeCalls }: Presence) => [activeCalls])
  get calls() {
    return filter(
      (call) => !isEnded(call),
      removeInboundRingOutLegs(this.activeCalls),
    );
  }

  _calculateLastDndStatus(
    newDndStatus: PresenceInfoModel['dndStatus'] | null,
  ): PresenceInfoModel['dndStatus'] | null {
    return newDndStatus !== this.dndStatus &&
      newDndStatus !== dndStatus.doNotAcceptAnyCalls
      ? newDndStatus
      : this.lastDndStatus;
  }

  @delegate('server')
  async _update(params: UpdatePresenceParams) {
    try {
      if (!this._extensionFeatures.features?.EditPresenceStatus?.available) {
        return;
      }
      const ownerId = this._auth.ownerId;
      const response = await this._client.service
        .platform()
        .put('/restapi/v1.0/account/~/extension/~/presence', params);
      const data: PresenceInfoResponse = await response.json();

      if (ownerId === this._auth.ownerId) {
        const newDndStatus = ((data.dndStatus !== 'Unknown' &&
          data.dndStatus) ??
          this.data!.dndStatus) as ObjectMapValue<typeof dndStatus>;
        this._setLastDndStatus(this._calculateLastDndStatus(newDndStatus));
        this._updateData({
          presenceStatus: data.presenceStatus,
          userStatus: data.userStatus,
          telephonyStatus: data.telephonyStatus,
          dndStatus: newDndStatus,
          meetingStatus: data.meetingStatus,
        });
      }
    } catch (error) {
      console.error('put presence failed', error);
    }
  }

  @delegate('server')
  async _updateData(data: PresenceInfoModel, timestamp = Date.now()) {
    this._dataFetcher.updateData(
      this._source,
      {
        ...this.data,
        ...data,
      },
      timestamp,
    );
  }

  _getUpdateStatusParams(userStatus: GetPresenceInfo['userStatus']) {
    const params: UpdatePresenceParams = {
      dndStatus: this.dndStatus!,
      userStatus,
    };
    if (
      params.dndStatus !== dndStatus.takeAllCalls &&
      params.dndStatus !== dndStatus.doNotAcceptDepartmentCalls
    ) {
      params.dndStatus = this.lastDndStatus ?? dndStatus.takeAllCalls;
    }
    return params;
  }

  @delegate('server')
  async setAvailable() {
    if (
      this.userStatus === presenceStatus.available &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.available);
    await this._update(params);
  }

  @delegate('server')
  async setBusy() {
    if (
      this.userStatus === presenceStatus.busy &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.busy);
    await this._update(params);
  }

  @delegate('server')
  async setDoNotDisturb() {
    if (this.dndStatus === dndStatus.doNotAcceptAnyCalls) {
      return;
    }
    const params = {
      dndStatus: dndStatus.doNotAcceptAnyCalls,
    };
    await this._update(params);
  }

  @delegate('server')
  async setInvisible() {
    if (
      this.userStatus === presenceStatus.offline &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.offline);
    await this._update(params);
  }

  async setPresence(
    presenceData:
      | ObjectMapValue<typeof presenceStatus>
      | ObjectMapValue<typeof dndStatus>,
  ) {
    switch (presenceData) {
      case presenceStatus.available:
        await this.setAvailable();
        break;
      case presenceStatus.busy:
        await this.setBusy();
        break;
      case dndStatus.doNotAcceptAnyCalls:
        await this.setDoNotDisturb();
        break;
      case presenceStatus.offline:
        await this.setInvisible();
        break;
      default:
        await this.setAvailable();
        break;
    }
  }

  async toggleAcceptCallQueueCalls() {
    const index = acceptCallQueueToggles.findIndex(
      (queueStatus) => this.dndStatus === queueStatus,
    );

    if (index > -1) {
      return this._update({ dndStatus: acceptCallQueueToggles[+!index] });
    }
  }

  @computed(({ calls }: Presence) => [calls])
  get sessionIdList() {
    return map((call) => call.sessionId, this.calls);
  }

  get telephonyStatus() {
    return this.data?.telephonyStatus;
  }

  get dndStatus() {
    return this.data?.dndStatus;
  }

  get userStatus() {
    // for displaying the presence, we should use presenceStatus instead
    // TODO: remove this after spring-ui migration
    return this.data?.presenceStatus;
  }

  get presenceStatus() {
    return this.data?.presenceStatus;
  }

  get meetingStatus() {
    return this.data?.meetingStatus;
  }

  override async fetchData() {
    this._debouncedFetchData.cancel();
    return this._dataFetcher.fetchData(this._source);
  }
}
