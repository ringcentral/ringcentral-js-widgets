import type DetailedExtensionPresenceEvent from '@rc-ex/core/lib/definitions/DetailedExtensionPresenceEvent';
import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import type PresenceInfoResponse from '@rc-ex/core/lib/definitions/PresenceInfoResponse';
import {
  computed,
  state,
  action,
  watch,
  storage,
} from '@ringcentral-integration/core';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';
import { filter, map } from 'ramda';
import type { Unsubscribe } from 'redux';

import { presenceStatus } from '../../enums/presenceStatus.enum';
import { subscriptionFilters } from '../../enums/subscriptionFilters';
import type { PresenceInfoModel } from '../../interfaces/Presence.model';
import {
  isEnded,
  normalizeFromTo,
  normalizeStartTime,
  removeInboundRingOutLegs,
} from '../../lib/callLogHelpers';
import type { DebouncedFunction } from '../../lib/debounce-throttle';
import { debounce } from '../../lib/debounce-throttle';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { DataFetcherV2Consumer, DataSource } from '../DataFetcherV2';

import type { Deps, UpdatePresenceParams } from './Presence.interface';
import { dndStatus } from './dndStatus';
import { removeIntermediateCall } from './removeIntermediateCall';

export const DEFAULT_TTL = 62 * 1000;
export const DEFAULT_POLLING_INTERVAL = 3 * 60 * 1000;
export const DEFAULT_FETCH_DELAY = 2 * 1000;
export const DEFAULT_MAX_FETCH_DELAY = 4 * 1000;

export const presenceRegExp = /.*\/presence(\?.*)?/;
export const detailedPresenceRegExp =
  /.*\/presence\?detailedTelephonyState=true&sipData=true/;

const acceptCallQueueToggles = [
  dndStatus.takeAllCalls,
  dndStatus.doNotAcceptDepartmentCalls,
];

@Module({
  name: 'Presence',
  deps: [
    'Auth',
    'Client',
    'ConnectivityMonitor',
    'DataFetcherV2',
    'ExtensionFeatures',
    'Subscription',
    'Storage',
    { dep: 'TabManager', optional: true },
    { dep: 'PresenceOptions', optional: true },
  ],
})
export class Presence extends DataFetcherV2Consumer<Deps, PresenceInfoModel> {
  protected _debouncedFetchData: DebouncedFunction<Presence['fetchData']>;

  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
  protected _stopWatchingConnectivity: Unsubscribe = null;
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
  protected _stopWatchingSubscription: Unsubscribe = null;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'Presence',
    });
    const presenceOptions = deps.presenceOptions ?? {};
    const { ttl = DEFAULT_TTL, pollingInterval = DEFAULT_POLLING_INTERVAL } =
      presenceOptions;
    this._source = new DataSource({
      ...presenceOptions,
      key: 'presence',
      cleanOnReset: true,
      ttl,
      pollingInterval,
      fetchFunction: async (): Promise<PresenceInfoModel> => {
        const response = await this._deps.client.service
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
          // @ts-expect-error TS(2322): Type 'unknown[]' is not assignable to type 'Active... Remove this comment to see the full error message
          activeCalls,
          dndStatus,
          meetingStatus,
          presenceStatus,
          telephonyStatus,
          userStatus,
        };
      },
      readyCheckFunction: () =>
        this._deps.auth.ready &&
        this._deps.auth.loggedIn &&
        this._deps.subscription.ready &&
        this._deps.extensionFeatures.ready &&
        this._deps.connectivityMonitor.ready &&
        this._deps.dataFetcherV2.ready,
      permissionCheckFunction: () => this._checkPermission(),
    });
    this._deps.dataFetcherV2.register(this._source);
    this._debouncedFetchData = debounce({
      fn: this.fetchData,
      threshold: this._fetchDelay,
      maxThreshold: this._maxFetchDelay,
    });
  }

  @storage
  @state
  lastDndStatus: PresenceInfoModel['dndStatus'] | null = null;

  @action
  _setLastDndStatus(dndStatus: PresenceInfoModel['dndStatus'] | null) {
    this.lastDndStatus = dndStatus;
  }

  get _endPoint() {
    return this._detailed
      ? subscriptionFilters.detailedPresence
      : subscriptionFilters.presence;
  }

  get _detailed() {
    return !!(this._deps.presenceOptions?.detailed ?? true);
  }

  get _fetchDelay() {
    return Math.max(
      0,
      this._deps.presenceOptions?.fetchDelay ?? DEFAULT_FETCH_DELAY,
    );
  }

  get _maxFetchDelay() {
    return Math.max(
      this._fetchDelay,
      this._deps.presenceOptions?.maxFetchDelay ?? DEFAULT_MAX_FETCH_DELAY,
    );
  }

  protected _checkPermission() {
    return (
      this._deps.extensionFeatures.features?.ReadPresenceStatus?.available ??
      false
    );
  }

  _processRawActiveCalls(
    activeCalls: GetPresenceInfo['activeCalls'] = [],
    totalActiveCalls = 0,
    timestamp: number,
  ) {
    if (activeCalls.length < totalActiveCalls) {
      return this.activeCalls;
    }
    // @ts-expect-error TS(2769): No overload matches this call.
    return map((activeCall) => {
      const existingCall = this.activeCalls.find(
        // @ts-expect-error TS(2339): Property 'sessionId' does not exist on type 'never... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2345): Argument of type 'ActiveCallInfo[]' is not assigna... Remove this comment to see the full error message
    }, removeIntermediateCall([], activeCalls));
  }

  protected _handleSubscription(message: DetailedExtensionPresenceEvent) {
    const regExp = this._detailed ? detailedPresenceRegExp : presenceRegExp;
    if (
      this.ready &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true)) &&
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2322): Type 'unknown[]' is not assignable to type 'Active... Remove this comment to see the full error message
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
      if (this._detailed && activeCallsLength < totalActiveCalls) {
        this._debouncedFetchData();
      }
    }
  }

  override onInit() {
    this._deps.subscription.subscribe([this._endPoint]);
    this._stopWatchingConnectivity = watch(
      this,
      () => this._deps.connectivityMonitor.connectivity,
      (connectivity) => this._handleConnectivity(connectivity),
    );
    this._stopWatchingSubscription = watch(
      this,
      () => this._deps.subscription.message,
      (message) => this._handleSubscription(message),
    );
  }

  protected _handleConnectivity(connectivity: boolean) {
    if (
      this.ready &&
      (this._source.disableCache || (this._deps.tabManager?.active ?? true)) &&
      connectivity &&
      this._checkPermission()
    ) {
      this.fetchData();
    }
  }

  override onReset() {
    this._stopWatchingConnectivity?.();
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
    this._stopWatchingConnectivity = null;
    this._stopWatchingSubscription?.();
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Unsubscribe... Remove this comment to see the full error message
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

  @proxify
  async _update(params: UpdatePresenceParams) {
    try {
      if (
        !this._deps.extensionFeatures.features?.EditPresenceStatus?.available
      ) {
        return;
      }
      const ownerId = this._deps.auth.ownerId;
      const response = await this._deps.client.service
        .platform()
        .put('/restapi/v1.0/account/~/extension/~/presence', params);
      const data: PresenceInfoResponse = await response?.json();

      if (ownerId === this._deps.auth.ownerId) {
        const newDndStatus = ((data.dndStatus !== 'Unknown' &&
          data.dndStatus) ??
          this.data.dndStatus) as ObjectMapValue<typeof dndStatus>;
        this._setLastDndStatus(this._calculateLastDndStatus(newDndStatus));
        this._updateData({
          presenceStatus: data.presenceStatus,
          userStatus: data.userStatus,
          telephonyStatus: data.telephonyStatus,
          dndStatus: newDndStatus,
          meetingStatus: data.meetingStatus,
        });
      }
    } catch (e) {
      console.error('put presence failed', e);
    }
  }

  @proxify
  async _updateData(data: PresenceInfoModel, timestamp = Date.now()) {
    this._deps.dataFetcherV2.updateData(
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
      dndStatus: this.dndStatus,
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

  async setDoNotDisturb() {
    if (this.dndStatus === dndStatus.doNotAcceptAnyCalls) {
      return;
    }
    const params = {
      dndStatus: dndStatus.doNotAcceptAnyCalls,
    };
    await this._update(params);
  }

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
    return this.data?.userStatus;
  }

  get presenceStatus() {
    return this.data?.presenceStatus;
  }

  get meetingStatus() {
    return this.data?.meetingStatus;
  }

  get presenceOption() {
    // doNotDisturb
    if (this.dndStatus === dndStatus.doNotAcceptAnyCalls) {
      return dndStatus.doNotAcceptAnyCalls;
    }

    // busy
    if (this.userStatus === presenceStatus.busy) {
      return presenceStatus.busy;
    }

    // invisible
    if (this.userStatus === presenceStatus.offline) {
      return presenceStatus.offline;
    }

    // available
    return presenceStatus.available;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  async fetchData() {
    this._debouncedFetchData.cancel();
    return this._deps.dataFetcherV2.fetchData(this._source);
  }
}
