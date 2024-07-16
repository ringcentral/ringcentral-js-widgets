import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';
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

import { trackEvents } from '../../enums/trackEvents';
import type {
  Call,
  NormalizedCall,
  NormalizedCalls,
} from '../../interfaces/Call.interface';
import type { ActiveCall } from '../../interfaces/Presence.model';
import type { NormalizedSession } from '../../interfaces/Webphone.interface';
import {
  hasRingingCalls,
  isInbound,
  isOnHold as isRingOutOnHold,
  isRinging,
  isRingingInboundCall,
  sortByStartTime,
} from '../../lib/callLogHelpers';
import { Module } from '../../lib/di';
import { normalizeNumber } from '../../lib/normalizeNumber';
import {
  isForwardedToVoiceMail,
  isHolding,
  isOnSetupStage,
  isRinging as isProceeding,
  mapTelephonyStatus,
  isFaxSession,
} from '../ActiveCallControl';
import type { ToNumberMatched } from '../Call';
import {
  isConferenceSession,
  isOnHold,
  isRing,
  sortByLastActiveTimeDesc,
} from '../Webphone/webphoneHelper';

import type { CallEventCallback, Deps } from './CallMonitor.interface';
import { callEvents } from './callEvents';
import {
  isCurrentDeviceEndCall,
  matchWebphoneSessionWithActiveCall,
} from './callMonitorHelper';

@Module({
  name: 'CallMonitor',
  deps: [
    'AccountInfo',
    'Storage',
    'Presence',
    'ExtensionInfo',
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

  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'NormalizedC... Remove this comment to see the full error message
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
        'Use telephonySession at CallMonitor module requires ActiveCallControl module',
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

  override onInitOnce() {
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
        // loop to execute the onRinging handlers
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
        const toEntity =
          entity &&
          // @ts-expect-error TS(2345): Argument of type 'Entity[] | undefined' is not ass... Remove this comment to see the full error message
          find((toMatch) => toMatch.id === entity.entityId, call.toMatches);
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
    entities.splice(index, 1);
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
    // @ts-expect-error TS(2341): Property 'state' is private and only accessible wi... Remove this comment to see the full error message
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
    // Use "null" to avoid triggering get property unnecessarily that may cause issues
    that.useTelephonySession ? null : that.normalizedCallsFromPresence,
    that.useTelephonySession ? that.normalizedCallsFromTelephonySessions : null,
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
              (i) => i.id === x.webphoneSession?.id,
              this._deps.webphone?.cachedSessions || [],
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
    // @ts-expect-error TS(2322): Type '({ from: { phoneNumber: string; }; to: { pho... Remove this comment to see the full error message
    this._normalizedCalls = sort(
      // @ts-expect-error TS(2345): Argument of type 'NormalizedSession | undefined' i... Remove this comment to see the full error message
      (l, r) => sortByLastActiveTimeDesc(l.webphoneSession, r.webphoneSession),
      // @ts-expect-error TS(2345): Argument of type '({ from: { phoneNumber: string; ... Remove this comment to see the full error message
      map((callItem) => {
        // use account countryCode to normalize number due to API issues [RCINT-3419]
        const fromNumber = normalizeNumber({
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneNumber: callItem.from && callItem.from.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        });
        const toNumber = normalizeNumber({
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneNumber: callItem.to && callItem.to.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        });
        const webphoneSession = matchWebphoneSessionWithActiveCall(
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
    that._deps.activeCallControl?.transferCallMapping,
    that._deps.accountInfo.countryCode,
    that._deps.presence.calls,
  ])
  get normalizedCallsFromTelephonySessions() {
    if (!this._deps.activeCallControl?.sessions) {
      return [];
    }

    // Match cached calls at the very beginning
    let cachedCalls: NormalizedCalls = [];
    if (this._normalizedCalls && this._deps.webphone?.cachedSessions?.length) {
      cachedCalls = this._normalizedCalls.filter((x) =>
        this._deps.webphone?.cachedSessions.some(
          (i) => i.partyData?.sessionId === x.telephonySessionId,
        ),
      );
    }

    const combinedCalls = [...this._deps.activeCallControl!.sessions]; // clone
    const { currentDeviceCallsMap, transferCallMapping } =
      this._deps.activeCallControl;

    // mapping and sort
    // @ts-ignore
    this._normalizedCalls = sort(
      (l, r) =>
        sortByLastActiveTimeDesc(l!.webphoneSession, r!.webphoneSession),
      map((callItem) => {
        // sessionId arrives when telephony session event push and it's a required
        // reference https://github.com/ringcentral/ringcentral-call-js/blob/master/src/Session.ts
        if (
          !callItem ||
          !callItem.sessionId ||
          isForwardedToVoiceMail(callItem) ||
          (isInbound(callItem) && isOnSetupStage(callItem)) ||
          isFaxSession(callItem)
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
          isRecording,
        } = callItem;
        let { activeCallId: id } = callItem;
        // find id from presence call one time, due to telephony session event not push call id back
        // with ringout call
        if (!id) {
          const presenceCall = this._deps.presence.calls.find(
            (presenceCall) => presenceCall.telephonySessionId === callItem.id,
          );
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          id = presenceCall?.id;
        }
        const fromNumber = normalizeNumber({
          phoneNumber: from?.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        });
        const toNumber = normalizeNumber({
          phoneNumber: to?.phoneNumber,
          countryCode: this._deps.accountInfo.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        });
        const toName = to?.name;
        const fromName = from?.name;
        const partyId = party?.id;
        // @ts-expect-error TS(2345): Argument of type 'PartyStatusCode | undefined' is ... Remove this comment to see the full error message
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
            ...from,
            phoneNumber: fromNumber,
          },
          to: {
            ...to,
            phoneNumber: toNumber,
          },
          startTime,
          sessionId,
          webphoneSession: currentDeviceCallsMap[telephonySessionId],
          telephonyStatus,
          warmTransferInfo: transferCallMapping[telephonySessionId],
          isRecording,
        };
      }, combinedCalls).filter((x) => !!x),
    );

    // Keep the cached calls in the list
    if (this._normalizedCalls) {
      cachedCalls.forEach((cachedCall) => {
        if (!this._normalizedCalls!.find((x) => x.id === cachedCall.id)) {
          this._normalizedCalls!.push(cachedCall);
        }
      });
    }

    return this._normalizedCalls;
  }

  @computed((that: CallMonitor) => [
    that.allCalls,
    that._deps.conferenceCall?.isMerging,
  ])
  get calls() {
    return filter((callItem) => {
      // filtering out the conference during merging
      if (this._deps.conferenceCall?.isMerging) {
        return !isConferenceSession(callItem.webphoneSession);
      }
      return true;
    }, this.allCalls);
  }

  @computed((that: CallMonitor) => [that.calls, that.useTelephonySession])
  get activeRingCalls() {
    // @ts-expect-error TS(2769): No overload matches this call.
    return filter((callItem) => {
      if (this.useTelephonySession) {
        return (
          callItem.webphoneSession &&
          callItem.telephonySession &&
          // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2769): No overload matches this call.
          callItem.webphoneSession &&
          callItem.telephonySession &&
          // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
          isHolding(callItem.telephonySession),
        this.calls,
      );
    }
    return filter(
      (callItem) =>
        // @ts-expect-error TS(2769): No overload matches this call.
        callItem.webphoneSession && isOnHold(callItem.webphoneSession),
      this.calls,
    );
  }

  @computed((that: CallMonitor) => [that.calls, that.useTelephonySession])
  get _activeCurrentCalls() {
    // @ts-expect-error TS(2769): No overload matches this call.
    return filter((callItem) => {
      if (this.useTelephonySession) {
        return (
          callItem.webphoneSession &&
          callItem.telephonySession &&
          // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
          !isProceeding(callItem.telephonySession) &&
          // @ts-expect-error TS(2345): Argument of type '{ status: string; id: string; di... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'boolean | N... Remove this comment to see the full error message
        let endCall: boolean | NormalizedSession = null;
        if (this.useTelephonySession) {
          endCall = isCurrentDeviceEndCall(sessionsCache as string[], callItem);
        } else {
          // @ts-expect-error TS(2322): Type 'NormalizedSession | undefined' is not assign... Remove this comment to see the full error message
          endCall = matchWebphoneSessionWithActiveCall(
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
}
