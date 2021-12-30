import { EventEmitter } from 'events';
import {
  difference,
  filter,
  find,
  findIndex,
  forEach,
  map,
  reduce,
  sort,
} from 'ramda';

import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';

import {
  Call,
  NormalizedCall,
  NormalizedCalls,
} from '../../interfaces/Call.interface';
import { ActiveCall } from '../../interfaces/Presence.model';
import { NormalizedSession } from '../../interfaces/Webphone.interface';
import {
  hasRingingCalls,
  isInbound,
  isOnHold as isRingOutOnHold,
  isRinging,
  isRingingInboundCall,
  sortByStartTime,
} from '../../lib/callLogHelpers';
import { Module } from '../../lib/di';
import normalizeNumber from '../../lib/normalizeNumber';
import {
  isForwardedToVoiceMail,
  isHolding,
  isOnSetupStage,
  isRinging as isProceeding,
} from '../ActiveCallControlV2/helpers';
import { trackEvents } from '../Analytics';
import { ToNumberMatched } from '../CallV2';
import {
  isConferenceSession,
  isOnHold,
  isRing,
  sortByLastActiveTimeDesc,
} from '../WebphoneV2/webphoneHelper';
import { callEvents } from './callEvents';
import { CallEventCallback, Deps } from './CallMonitor.interface';
import {
  isCurrentDeviceEndCall,
  mapTelephonyStatus,
  matchWephoneSessionWithAcitveCall,
} from './callMonitorHelper';

@Module({
  name: 'CallMonitor',
  deps: [
    'AccountInfo',
    'Storage',
    'Presence',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'ActiveCallControl', optional: true },
    { dep: 'CallMonitorOptions', optional: true },
  ],
})
export class CallMonitor extends RcModuleV2<Deps> {
  private _eventEmitter = new EventEmitter();

  protected _useTelephonySession =
    this._deps.callMonitorOptions?.useTelephonySession ?? false;

  protected _normalizedCalls: NormalizedCalls = null;
  private _enableContactMatchWhenNewCall: boolean =
    this._deps.callMonitorOptions?.enableContactMatchWhenNewCall ?? true;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'CallMonitor',
    });
    if (this._deps.contactMatcher && this._enableContactMatchWhenNewCall) {
      this._deps.contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () =>
          this._deps.accountInfo.ready && this._deps.presence.ready,
      });
    }

    if (this._deps.activityMatcher) {
      this._deps.activityMatcher.addQuerySource({
        getQueriesFn: () => this.sessionIds,
        readyCheckFn: () => this._deps.presence.ready,
      });
    }
    if (this._useTelephonySession && !this._deps.activeCallControl) {
      console.warn(
        'Use telephonySession at CallMonitor module requires ActiveCallControlV2 module',
      );
      this._useTelephonySession = false;
    }
  }

  @storage
  @state
  callMatched: Record<string, string> = {};

  @action
  setMatchedData({
    sessionId,
    toEntityId,
  }: {
    sessionId: string;
    toEntityId: string;
  }) {
    this.callMatched[sessionId] = toEntityId;
  }

  onNewCall(callback: CallEventCallback) {
    this._eventEmitter.on(callEvents.newCall, callback);
    return this;
  }

  onCallRinging(callback: CallEventCallback) {
    this._eventEmitter.on(callEvents.callRinging, callback);
    return this;
  }

  onCallEnded(callback: CallEventCallback) {
    this._eventEmitter.on(callEvents.callEnded, callback);
    return this;
  }

  onCallUpdated(callback: CallEventCallback) {
    this._eventEmitter.on(callEvents.callUpdated, callback);
    return this;
  }

  onInitOnce() {
    watch(
      this,
      () => this.uniqueNumbers,
      (uniqueNumbers, lastProcessedNumbers) => {
        if (!this.ready || !this._deps.tabManager?.active) return;
        const newNumbers = difference(
          uniqueNumbers,
          lastProcessedNumbers || [],
        );
        if (
          this._deps.contactMatcher &&
          this._deps.contactMatcher.ready &&
          this._enableContactMatchWhenNewCall
        ) {
          this._deps.contactMatcher.match({
            queries: newNumbers,
            ignoreQueue: true,
          });
        }
      },
    );

    watch(
      this,
      () => this.sessionIds,
      (sessionIds, lastProcessedIds) => {
        if (!this.ready || !this._deps.tabManager?.active) return;
        const newSessions = difference(sessionIds, lastProcessedIds || []);
        if (this._deps.activityMatcher && this._deps.activityMatcher.ready) {
          this._deps.activityMatcher.match({
            queries: newSessions,
            ignoreQueue: true,
          });
        }
      },
    );

    watch(
      this,
      () => this.calls,
      (_, lastProcessedCalls) => {
        if (!this.ready) return;
        this.handleCalls(lastProcessedCalls?.slice() ?? []);
      },
    );

    watch(
      this,
      () => this.ready,
      () => {
        if (this.ready) {
          // It is possible that `this.calls` may have changed before the `CallMonitor` module status becomes `true`.
          // So make sure that in this case, `this.calls` handling must be forced
          this.handleCalls([]);
        }
      },
    );
  }

  handleCalls(oldCalls: Call[]) {
    // no ringing calls
    if (
      this._deps.call &&
      oldCalls.length &&
      !this.calls.length &&
      this._deps.call.toNumberEntities?.length
    ) {
      this._deps.call.cleanToNumberEntities();
    }

    const entities: ToNumberMatched[] = this._deps.call
      ? sort(sortByStartTime, this._deps.call.toNumberEntities)
      : [];
    forEach((call) => {
      const oldCallIndex = findIndex(
        (item) => item.sessionId === call.sessionId,
        oldCalls,
      );
      if (oldCallIndex === -1) {
        this._eventEmitter.emit(callEvents.newCall, call);
        // loop to execut the onRinging handlers
        if (isRinging(call)) {
          this._eventEmitter.emit(callEvents.callRinging, call);
        }
      } else {
        const oldCall = oldCalls[oldCallIndex];
        oldCalls.splice(oldCallIndex, 1);
        if (
          call.telephonyStatus !== oldCall.telephonyStatus ||
          (oldCall.from && oldCall.from.phoneNumber) !==
            (call.from && call.from.phoneNumber)
        ) {
          this._eventEmitter.emit(callEvents.callUpdated, call);
          if (call.telephonyStatus === 'CallConnected') {
            if (isInbound(call)) {
              this.inboundCallConnectedTrack();
            } else {
              this.outboundCallConnectedTrack();
            }
          }
        }
      }
      forEach((entity) => {
        const index = entities.indexOf(entity);
        const toEntity = find(
          (toMatch) => toMatch.id === entity.entityId,
          call.toMatches,
        );
        if (toEntity !== undefined) {
          this._removeMatched(index, entities);
          this.setMatchedData({
            sessionId: call.sessionId,
            toEntityId: toEntity.id,
          });
        }
      }, entities);
    }, this.calls);

    forEach((call) => {
      this._eventEmitter.emit(callEvents.callEnded, call);
    }, oldCalls);
  }

  _removeMatched(index: number, entities: ToNumberMatched[]) {
    console.log('removeMatched:', index);
    entities.splice(index, 1);
    console.log('entities after splice:', entities);
    return entities;
  }

  @track(trackEvents.callInboundCallConnected)
  inboundCallConnectedTrack() {}

  @track(trackEvents.callOutboundRingOutCallConnected)
  outboundCallConnectedTrack() {}

  @track(trackEvents.clickCallItem)
  callItemClickTrack() {}

  @track(trackEvents.clickHoldAllCalls)
  allCallsClickHoldTrack() {}

  @track(trackEvents.clickHangupAllCalls)
  allCallsClickHangupTrack() {}

  @track(trackEvents.clickRejectAllCalls)
  allCallsClickRejectTrack() {}

  @track(trackEvents.clickAddCallControl)
  callControlClickAddTrack() {}

  @track(trackEvents.clickHangupMergeCallControl)
  mergeControlClickHangupTrack() {}

  @track((that: CallMonitor) => [
    Object.values(that._deps.conferenceCall?.state.mergingPair ?? {}).length
      ? trackEvents.clickMergeCallControl
      : trackEvents.clickMergeMergeCallControl,
  ])
  callControlClickMergeTrack() {}

  @track(trackEvents.clickCloseConfirmMergeModal)
  confirmMergeClickCloseTrack() {}

  @track(trackEvents.clickMergeConfirmMergeModal)
  confirmMergeClickMergeTrack() {}

  @track(trackEvents.clickAddCallsOnHold)
  callsOnHoldClickAddTrack() {}

  @track(trackEvents.clickMergeCallsOnHold)
  callsOnHoldClickMergeTrack() {}

  @track(trackEvents.clickHangupCallsOnHold)
  callsOnHoldClickHangupTrack() {}

  @track(trackEvents.clickParticipantAreaCallControl)
  callControlClickParticipantAreaTrack() {}

  get hasRingingCalls() {
    return hasRingingCalls(this.calls);
  }

  get useTelephonySession() {
    return this._useTelephonySession;
  }

  @computed((that: CallMonitor) => [
    that.normalizedCalls,
    that._deps.contactMatcher?.dataMapping,
    that._deps.activityMatcher?.dataMapping,
    that.callMatched,
  ])
  get allCalls(): Call[] {
    const contactMapping = this._deps.contactMatcher?.dataMapping ?? {};
    const activityMapping = this._deps.activityMatcher?.dataMapping ?? {};
    const calls = map((callItem) => {
      const fromNumber = callItem.from && callItem.from.phoneNumber;
      const toNumber = callItem.to && callItem.to.phoneNumber;
      const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
      const toMatches = (toNumber && contactMapping[toNumber]) || [];
      const toNumberEntity = this.callMatched[callItem.sessionId];
      return {
        ...callItem,
        fromMatches,
        toMatches,
        activityMatches: activityMapping[callItem.sessionId] || [],
        toNumberEntity,
      };
    }, this.normalizedCalls);
    return calls;
  }

  @computed((that: CallMonitor) => [
    that.normalizedCallsFromPresence,
    that.normalizedCallsFromTelephonySessions,
    that.useTelephonySession,
  ])
  get normalizedCalls() {
    if (this.useTelephonySession) {
      return this.normalizedCallsFromTelephonySessions;
    }
    return this.normalizedCallsFromPresence;
  }

  @computed((that: CallMonitor) => [
    that._deps.presence.calls,
    that._deps.accountInfo.countryCode,
    that._deps.webphone?.sessions,
    that._deps.webphone?.cachedSessions,
  ])
  get normalizedCallsFromPresence() {
    // match cached calls
    let cachedCalls: NormalizedCalls = [];
    if (this._normalizedCalls && this._deps.webphone?.cachedSessions?.length) {
      cachedCalls = filter(
        (x) =>
          !!(
            x.webphoneSession &&
            find(
              (i) => i.id === x.webphoneSession.id,
              this._deps.webphone?.cachedSessions,
            )
          ),
        this._normalizedCalls,
      );
    }

    // combine
    const combinedCalls: (NormalizedCall | ActiveCall)[] = [
      ...this._deps.presence.calls,
    ]; // clone
    forEach((cachedCall) => {
      if (!find((x) => x.id === cachedCall.id, this._deps.presence.calls)) {
        combinedCalls.push(cachedCall);
      }
    }, cachedCalls);

    // mapping and sort
    let theSessions = this._deps.webphone?.sessions ?? [];
    this._normalizedCalls = sort(
      (l, r) => sortByLastActiveTimeDesc(l.webphoneSession, r.webphoneSession),
      map((callItem) => {
        // use account countryCode to normalize number due to API issues [RCINT-3419]
        const fromNumber = normalizeNumber({
          phoneNumber: callItem.from && callItem.from.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
        });
        const toNumber = normalizeNumber({
          phoneNumber: callItem.to && callItem.to.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
        });
        const webphoneSession = matchWephoneSessionWithAcitveCall(
          theSessions,
          callItem,
        );
        theSessions = filter((x) => x !== webphoneSession, theSessions);
        return {
          ...callItem,
          from: {
            phoneNumber: fromNumber,
          },
          to: {
            phoneNumber: toNumber,
          },
          startTime:
            (webphoneSession && webphoneSession.startTime) ||
            callItem.startTime,
          webphoneSession,
        };
      }, combinedCalls),
    );
    return this._normalizedCalls;
  }

  @computed((that: CallMonitor) => [
    that._deps.activeCallControl?.sessions,
    that._deps.activeCallControl?.currentDeviceCallsMap,
    that._deps.accountInfo.countryCode,
    that._deps.presence.calls,
  ])
  get normalizedCallsFromTelephonySessions() {
    // TODO match cached calls when there are conference merging calls, refer to `normalizedCallsFromPresence` function
    if (!this._deps.activeCallControl?.sessions) return [];
    const combinedCalls = [...this._deps.activeCallControl?.sessions]; // clone
    const currentDeviceCallsMap =
      this._deps.activeCallControl.currentDeviceCallsMap;
    // mapping and sort
    this._normalizedCalls = sort(
      (l, r) => sortByLastActiveTimeDesc(l.webphoneSession, r.webphoneSession),
      map((callItem) => {
        // sessionId arrives when telephony session event push and it's a required
        // reference https://github.com/ringcentral/ringcentral-call-js/blob/master/src/Session.ts
        if (
          !callItem ||
          !callItem.sessionId ||
          isForwardedToVoiceMail(callItem) ||
          (isInbound(callItem) && isOnSetupStage(callItem))
        ) {
          return null;
        }
        const {
          to,
          from,
          direction,
          party,
          telephonySessionId,
          sessionId,
          startTime,
        } = callItem;
        let { activeCallId: id } = callItem;
        // find id from presence call one time, due to telephony session event not push call id back
        // with ringout call
        if (!id) {
          const presenceCall = this._deps.presence.calls.find(
            (presenceCall) => presenceCall.telephonySessionId === callItem.id,
          );
          id = presenceCall?.id;
        }
        const fromNumber = normalizeNumber({
          phoneNumber: from?.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
        });
        const toNumber = normalizeNumber({
          phoneNumber: to?.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
        });
        const toName = to?.name;
        const fromName = from?.name;
        const partyId = party?.id;
        const telephonyStatus = mapTelephonyStatus(party?.status?.code);

        // TODO: add sipData here
        // const sipData = {};
        return {
          id,
          partyId,
          direction,
          telephonySession: callItem,
          telephonySessionId,
          toName,
          fromName,
          from: {
            phoneNumber: fromNumber,
          },
          to: {
            phoneNumber: toNumber,
          },
          startTime,
          sessionId,
          webphoneSession: currentDeviceCallsMap[telephonySessionId],
          telephonyStatus,
        };
      }, combinedCalls).filter((x) => !!x),
    );
    return this._normalizedCalls;
  }

  @computed((that: CallMonitor) => [
    that.allCalls,
    that._deps.conferenceCall?.isMerging,
  ])
  get calls() {
    return filter((callItem) => {
      // filtering out the conferece during merging
      if (this._deps.conferenceCall?.isMerging) {
        return !isConferenceSession(callItem.webphoneSession);
      }
      return true;
    }, this.allCalls);
  }

  @computed((that: CallMonitor) => [that.calls, that.useTelephonySession])
  get activeRingCalls() {
    return filter((callItem) => {
      if (this.useTelephonySession) {
        return (
          callItem.webphoneSession &&
          callItem.telephonySession &&
          isProceeding(callItem.telephonySession)
        );
      }
      return callItem.webphoneSession && isRing(callItem.webphoneSession);
    }, this.calls);
  }

  @computed((that: CallMonitor) => [that.calls, that.useTelephonySession])
  get _activeOnHoldCalls() {
    if (this.useTelephonySession) {
      return filter(
        (callItem) =>
          callItem.webphoneSession &&
          callItem.telephonySession &&
          isHolding(callItem.telephonySession),
        this.calls,
      );
    }
    return filter(
      (callItem) =>
        callItem.webphoneSession && isOnHold(callItem.webphoneSession),
      this.calls,
    );
  }

  @computed((that: CallMonitor) => [that.calls, that.useTelephonySession])
  get _activeCurrentCalls() {
    return filter((callItem) => {
      if (this.useTelephonySession) {
        return (
          callItem.webphoneSession &&
          callItem.telephonySession &&
          !isProceeding(callItem.telephonySession) &&
          !isHolding(callItem.telephonySession)
        );
      }
      return (
        callItem.webphoneSession &&
        !isOnHold(callItem.webphoneSession) &&
        !isRing(callItem.webphoneSession)
      );
    }, this.calls);
  }

  @computed((that: CallMonitor) => [
    that._activeOnHoldCalls,
    that._activeCurrentCalls,
  ])
  get activeOnHoldCalls() {
    if (this._activeOnHoldCalls.length && !this._activeCurrentCalls.length) {
      return this._activeOnHoldCalls.slice(1);
    }
    return this._activeOnHoldCalls;
  }

  @computed((that: CallMonitor) => [
    that._activeCurrentCalls,
    that._activeOnHoldCalls,
  ])
  get activeCurrentCalls() {
    return !this._activeCurrentCalls.length && this._activeOnHoldCalls.length
      ? this._activeOnHoldCalls.slice(0, 1)
      : this._activeCurrentCalls;
  }

  @computed((that: CallMonitor) => [
    that.calls,
    that._deps.webphone?.lastEndedSessions,
    that.useTelephonySession,
    that._deps.activeCallControl?.lastEndedSessionIds,
  ])
  get otherDeviceCalls() {
    return reduce(
      ({ sessionsCache, res }, callItem) => {
        if (callItem.webphoneSession) {
          return {
            sessionsCache,
            res,
          };
        }

        if (!sessionsCache || !sessionsCache.length) {
          return {
            sessionsCache,
            res: [...res, callItem],
          };
        }
        // TODO: refactor
        let endCall: boolean | NormalizedSession = null;
        if (this.useTelephonySession) {
          endCall = isCurrentDeviceEndCall(sessionsCache as string[], callItem);
        } else {
          endCall = matchWephoneSessionWithAcitveCall(
            sessionsCache as NormalizedSession[],
            callItem,
          );
        }

        return {
          sessionsCache: filter(
            (x) => x !== endCall,
            sessionsCache as NormalizedSession[],
          ),
          res: endCall ? res : [...res, callItem],
        };
      },
      {
        sessionsCache: this.useTelephonySession
          ? this._deps.activeCallControl?.lastEndedSessionIds
          : this._deps.webphone?.lastEndedSessions,
        res: [] as Call[],
      },
      this.calls,
    ).res;
  }

  @computed((that: CallMonitor) => [that.normalizedCalls])
  get uniqueNumbers() {
    const output: string[] = [];
    const numberMap: Record<string, boolean> = {};
    function addIfNotExist(number: string) {
      if (!numberMap[number]) {
        output.push(number);
        numberMap[number] = true;
      }
    }
    forEach((callItem) => {
      if (callItem.from && callItem.from.phoneNumber) {
        addIfNotExist(callItem.from.phoneNumber);
      }
      if (callItem.to && callItem.to.phoneNumber) {
        addIfNotExist(callItem.to.phoneNumber);
      }
    }, this.normalizedCalls);
    return output;
  }

  @computed((that: CallMonitor) => [that.normalizedCalls])
  get sessionIds() {
    return map((callItem) => callItem.sessionId, this.normalizedCalls);
  }

  @computed((that: CallMonitor) => [that.otherDeviceCalls])
  get ringoutRingCalls() {
    return filter(
      (callItem) => isRingingInboundCall(callItem),
      this.otherDeviceCalls,
    );
  }

  @computed((that: CallMonitor) => [that.otherDeviceCalls])
  get ringoutCurrentCalls() {
    return filter(
      (callItem) =>
        !isRingingInboundCall(callItem) && !isRingOutOnHold(callItem),
      this.otherDeviceCalls,
    );
  }

  @computed((that: CallMonitor) => [that.otherDeviceCalls])
  get ringoutOnHoldCalls() {
    return filter(
      (callItem) => isRingOutOnHold(callItem),
      this.otherDeviceCalls,
    );
  }

  /**
   * @deprecated
   */
  onRingings(callback: CallEventCallback) {
    this.onCallRinging(callback);
    console.warn('"onRingings" is deprecated. Use "onCallRinging" instead.');
  }

  /**
   * @deprecated
   */
  set _onNewCall(callback: CallEventCallback) {
    this.onNewCall(callback);
    console.warn('"_onNewCall" is deprecated. Use "onNewCall" instead.');
  }

  /**
   * @deprecated
   */
  set _onCallUpdated(callback: CallEventCallback) {
    this.onCallUpdated(callback);
    console.warn(
      '"_onCallUpdated" is deprecated. Use "onCallUpdated" instead.',
    );
  }

  /**
   * @deprecated
   */
  set _onCallEnded(callback: CallEventCallback) {
    this.onCallEnded(callback);
    console.warn('"_onCallEnded" is deprecated. Use "onCallEnded" instead.');
  }

  /**
   * @deprecated
   */
  set _onRinging(callback: CallEventCallback) {
    this.onCallRinging(callback);
    console.warn('"_onRinging" is deprecated. Use "onCallRinging" instead.');
  }
}
