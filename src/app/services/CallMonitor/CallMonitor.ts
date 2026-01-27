import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';
import {
  isInbound,
  isRinging,
  sortByStartTime,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import {
  AccountInfo,
  ExtensionInfo,
  NumberFormatter,
  Presence,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  ActivityMatcher,
  ContactMatcher,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  action,
  computed,
  fromWatchValue,
  injectable,
  optional,
  RcModule,
  state,
  storage,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { EventEmitter } from 'events';
import { difference, sort } from 'ramda';
import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  pairwise,
  share,
} from 'rxjs';

import {
  ActiveCallControl,
  isFaxSession,
  isForwardedToVoiceMail,
  isHoldingCall,
  isOnSetupStage,
  isOtherDeviceCall,
  isRingingCall,
  mapTelephonyStatus,
} from '../ActiveCallControl';
import type { ToNumberMatched } from '../Call';
import { Call } from '../Call';
import { PreinsertCall } from '../PreinsertCall';
import { Webphone } from '../Webphone';

import type {
  CallEventCallback,
  CallMonitorOptions,
  DeviceCallsMap,
  DeviceCallsMapInfo,
} from './CallMonitor.interface';
import { type CallEvent, callEvents } from './callEvents';

@injectable({
  name: 'CallMonitor',
})
export class CallMonitor extends RcModule {
  private _eventEmitter = new EventEmitter();

  private _enableContactMatchWhenNewCall: boolean =
    this._callMonitorOptions?.enableContactMatchWhenNewCall ?? true;

  /**
   * use state to trigger event, so the event can trigger in every clients and server, alway use when you want to listen the event in component
   */
  onNewCall$ = fromWatchValue(this, () => this.allCalls.length).pipe(
    pairwise(),
    map(([prev, next]) => prev < next),
    distinctUntilChanged(),
    filter(Boolean),
    share(),
  );

  constructor(
    protected _accountInfo: AccountInfo,
    protected _storage: StoragePlugin,
    protected _presence: Presence,
    protected _extensionInfo: ExtensionInfo,
    protected _numberFormatter: NumberFormatter,
    protected _activeCallControl: ActiveCallControl,
    protected _preInsertCall: PreinsertCall,
    protected _webphone: Webphone,
    @optional() protected _contactMatcher?: ContactMatcher,
    @optional() protected _call?: Call,
    @optional() protected _activityMatcher?: ActivityMatcher,
    @optional('CallMonitorOptions')
    protected _callMonitorOptions?: CallMonitorOptions,
  ) {
    super();
    this._storage.enable(this);

    if (this._enableContactMatchWhenNewCall) {
      this._contactMatcher?.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () => this._accountInfo.ready && this._presence.ready,
      });
    }

    this._activityMatcher?.addQuerySource({
      getQueriesFn: () => this.sessionIds,
      readyCheckFn: () => this._presence.ready,
    });
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

  /**
   * observable of all events
   *
   * # remember those event only trigger inside server port in worker mode
   */
  addListener(eventName: CallEvent) {
    return fromEvent(this._eventEmitter, eventName) as Observable<ICall>;
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
        if (!this.ready) return;

        const newNumbers = difference(
          uniqueNumbers,
          lastProcessedNumbers || [],
        );
        if (
          this._contactMatcher &&
          this._contactMatcher.ready &&
          this._enableContactMatchWhenNewCall
        ) {
          this._contactMatcher.match({
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
        if (!this.ready) return;

        const newSessions = difference(sessionIds, lastProcessedIds || []);
        if (this._activityMatcher && this._activityMatcher.ready) {
          this._activityMatcher.match({
            queries: newSessions,
            ignoreQueue: true,
          });
        }
      },
    );

    watch(
      this,
      () => this.allCalls,
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

  handleCalls(oldCalls: ICall[]) {
    // no ringing calls
    if (
      this._call &&
      oldCalls.length &&
      !this.allCalls.length &&
      this._call.toNumberEntities?.length
    ) {
      this._call.cleanToNumberEntities();
    }

    const entities: ToNumberMatched[] = this._call
      ? sort(sortByStartTime, this._call.toNumberEntities)
      : [];
    this.allCalls.forEach((call) => {
      const oldCallIndex = oldCalls.findIndex(
        (item) => item.sessionId === call.sessionId,
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
      entities.forEach((entity) => {
        const index = entities.indexOf(entity);
        const toEntity =
          entity &&
          call.toMatches?.find((toMatch) => toMatch.id === entity.entityId);
        if (toEntity !== undefined) {
          this._removeMatched(index, entities);
          this.setMatchedData({
            sessionId: call.sessionId,
            toEntityId: toEntity.id,
          });
        }
      });
    });

    if (oldCalls.length > 0) {
      oldCalls.forEach((call) => {
        this._eventEmitter.emit(callEvents.callEnded, call);
      });

      // in old project, never clean current warm transfer data, but should clean when some call be ended, but some bad logic base on that to test, due to we will deprecated the old project, so just use flag to control here, will be remove in the future
      if (process.env.THEME_SYSTEM === 'spring-ui') {
        this._activeCallControl.cleanCurrentWarmTransferData(oldCalls);
      }
    }
  }

  _removeMatched(index: number, entities: ToNumberMatched[]) {
    entities.splice(index, 1);
    return entities;
  }

  @track(trackEvents.callInboundCallConnected)
  inboundCallConnectedTrack() {
    //
  }

  @track(trackEvents.callOutboundRingOutCallConnected)
  outboundCallConnectedTrack() {
    //
  }

  @track(trackEvents.clickCallItem)
  callItemClickTrack() {
    //
  }

  @track(trackEvents.clickHoldAllCalls)
  allCallsClickHoldTrack() {
    //
  }

  @track(trackEvents.clickHangupAllCalls)
  allCallsClickHangupTrack() {
    //
  }

  @track(trackEvents.clickRejectAllCalls)
  allCallsClickRejectTrack() {
    //
  }

  @track(trackEvents.clickAddCallControl)
  callControlClickAddTrack() {
    //
  }

  @track(trackEvents.clickHangupMergeCallControl)
  mergeControlClickHangupTrack() {
    //
  }

  @track(() => [trackEvents.clickMergeMergeCallControl])
  callControlClickMergeTrack() {
    //
  }

  @track(trackEvents.clickCloseConfirmMergeModal)
  confirmMergeClickCloseTrack() {
    //
  }

  @track(trackEvents.clickMergeConfirmMergeModal)
  confirmMergeClickMergeTrack() {
    //
  }

  @track(trackEvents.clickAddCallsOnHold)
  callsOnHoldClickAddTrack() {
    //
  }

  @track(trackEvents.clickMergeCallsOnHold)
  callsOnHoldClickMergeTrack() {
    //
  }

  @track(trackEvents.clickHangupCallsOnHold)
  callsOnHoldClickHangupTrack() {
    //
  }

  @track(trackEvents.clickParticipantAreaCallControl)
  callControlClickParticipantAreaTrack() {
    //
  }

  @computed
  get callsInfo() {
    // mapping and sort
    const result = this._activeCallControl.sessions.reduce(
      (acc, curr) => {
        // sessionId arrives when telephony session event push and it's a required
        // reference https://github.com/ringcentral/ringcentral-call-js/blob/master/src/Session.ts

        const { telephonySessionId } = curr;

        if (
          !curr ||
          this._preInsertCall.isPreinsertStatusEnd(telephonySessionId) ||
          this._preInsertCall.isPreinsertStatusIgnored(telephonySessionId) ||
          (!curr.isConferenceCall && !curr.sessionId) ||
          isForwardedToVoiceMail(curr) ||
          (isInbound(curr) && isOnSetupStage(curr)) ||
          isFaxSession(curr)
        ) {
          return acc;
        }

        const {
          to,
          from,
          direction,
          party,
          sessionId,
          startTime,
          isRecording,
          isConferenceCall,
          conferenceParticipants,
        } = curr;
        const telephonyStatus = mapTelephonyStatus(party?.status?.code!);

        const webphoneSession = this._activeCallControl._findWebphoneSession(
          curr.telephonySessionId,
        );

        let { activeCallId: id } = curr;
        // find id from presence call one time, due to telephony session event not push call id back
        // with ringout call
        if (!id) {
          const presenceCall = this._presence.calls.find(
            (presenceCall) => presenceCall.telephonySessionId === curr.id,
          );
          id = presenceCall?.id!;
        }
        // normalize number for ensure the number is matcher mapping with same key
        const fromNumber = this._numberFormatter.normalizeNumber(
          from?.phoneNumber,
        );
        const toNumber = this._numberFormatter.normalizeNumber(to?.phoneNumber);
        const toName = to?.name;
        const fromName = from?.name;
        const partyId = party?.id;

        const contactMapping = this._contactMatcher?.dataMapping ?? {};
        const activityMapping = this._activityMatcher?.dataMapping ?? {};

        const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
        const toMatches = (toNumber && contactMapping[toNumber]) || [];

        const toNumberEntity = this.callMatched[sessionId];

        const activityMatches = activityMapping[sessionId] || [];

        const conferenceParticipantsMatchesList =
          process.env.THEME_SYSTEM === 'spring-ui'
            ? conferenceParticipants.map((curr) => {
                return (
                  (curr.info.phoneNumber &&
                    contactMapping[
                      // normalize number for ensure the number is matcher mapping with same key
                      this._numberFormatter.normalizeNumber(
                        curr.info.phoneNumber,
                      )
                    ]) ||
                  (curr.info.extensionNumber &&
                    contactMapping[curr.info.extensionNumber]) ||
                  []
                );
              })
            : [];
        const callItem: ICall = {
          id,
          partyId,
          direction,
          telephonySession: curr as any,
          telephonySessionId,
          toName,
          fromName,
          from: {
            ...(from ?? {}),
            phoneNumber: fromNumber,
          },
          to: {
            ...(to ?? {}),
            phoneNumber: toNumber,
          },
          startTime,
          sessionId,
          webphoneSession,
          telephonyStatus,
          warmTransferInfo:
            this._activeCallControl.transferCallMapping[telephonySessionId],
          isRecording,
          isConferenceCall,
          conferenceParticipants,
          conferenceParticipantsMatchesList,
          callQueueName: curr.callQueueName || webphoneSession?.callQueueName,
          fromMatches,
          toMatches,
          activityMatches,
          toNumberEntity,
        };

        acc.calls.push(callItem);
        acc.sessionIds.push(sessionId);
        acc.telephonySessionIds.push(telephonySessionId);
        acc.map[sessionId] = callItem;
        acc.telephonySessionIdCallMap[telephonySessionId] = callItem;

        return acc;
      },
      {
        calls: [] as ICall[],
        sessionIds: [] as string[],
        telephonySessionIds: [] as string[],
        map: {} as Record<string, ICall>,
        telephonySessionIdCallMap: {} as Record<string, ICall>,
      },
    );

    return result;
  }

  get allCalls() {
    return this.callsInfo.calls;
  }

  get sessionIds() {
    return this.callsInfo.sessionIds;
  }

  get telephonySessionIds() {
    return this.callsInfo.telephonySessionIds;
  }

  getCallBySessionId(sessionId: string): ICall | undefined {
    return this.callsInfo.map[sessionId];
  }

  @computed
  get activeOnHoldCalls() {
    // in spring-ui, data just data
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      return this._activeOnHoldCalls;
    }
    // TODO: remove those logic after all project migrate to spring-ui
    if (this._activeOnHoldCalls.length && !this._activeCurrentCalls.length) {
      return this._activeOnHoldCalls.slice(1);
    }
    return this._activeOnHoldCalls;
  }

  @computed
  get activeCurrentCalls() {
    // in spring-ui, data just data
    if (process.env.THEME_SYSTEM === 'spring-ui') {
      return this._activeCurrentCalls;
    }

    // TODO: remove those logic after all project migrate to spring-ui
    return !this._activeCurrentCalls.length && this._activeOnHoldCalls.length
      ? this._activeOnHoldCalls.slice(0, 1)
      : this._activeCurrentCalls;
  }

  get currDeviceHasActiveCalls() {
    return this.activeCurrentCalls.length > 0;
  }

  get activeCurrentCallTelephonySessionId() {
    return this.activeCurrentCalls[0]?.telephonySessionId;
  }

  @computed
  get deviceCallsMap() {
    return this.allCalls.reduce<DeviceCallsMapInfo>(
      (acc, call) => {
        if (!call.telephonySession) return acc;

        const otherDevice = isOtherDeviceCall(call);

        const targetDevice = otherDevice ? acc.otherDevice : acc.currentDevice;

        addIntoTargetDevice(targetDevice, call);

        if (process.env.THEME_SYSTEM === 'spring-ui') {
          addIntoTargetDevice(acc.allDevices, call);
        }

        return acc;
      },
      {
        allDevices: {
          all: [],
          active: [],
          ringing: [],
          holding: [],
        },
        currentDevice: {
          all: [],
          active: [],
          ringing: [],
          holding: [],
        },
        otherDevice: {
          all: [],
          active: [],
          ringing: [],
          holding: [],
        },
      },
    );
  }

  get activeRingCalls() {
    return this.deviceCallsMap.currentDevice.ringing;
  }

  private get _activeOnHoldCalls() {
    return this.deviceCallsMap.currentDevice.holding;
  }

  private get _activeCurrentCalls() {
    return this.deviceCallsMap.currentDevice.active;
  }

  get otherDeviceCalls() {
    return this.deviceCallsMap.otherDevice.all;
  }

  get ringoutRingCalls() {
    return this.deviceCallsMap.otherDevice.ringing;
  }

  get ringoutCurrentCalls() {
    return this.deviceCallsMap.otherDevice.active;
  }

  get ringoutOnHoldCalls() {
    return this.deviceCallsMap.otherDevice.holding;
  }

  getDeviceCallsMaps(device: keyof typeof this.deviceCallsMap) {
    return this.deviceCallsMap[device];
  }

  @computed
  get uniqueNumbers() {
    const uniqueNumbersSet = new Set<string>();
    this.allCalls.forEach((callItem) => {
      if (callItem.from?.phoneNumber) {
        uniqueNumbersSet.add(
          // normalize number for ensure the number is matcher mapping with same key
          this._numberFormatter.normalizeNumber(callItem.from.phoneNumber),
        );
      }
      if (callItem.to?.phoneNumber) {
        uniqueNumbersSet.add(
          this._numberFormatter.normalizeNumber(callItem.to.phoneNumber),
        );
      }

      if (process.env.THEME_SYSTEM === 'spring-ui') {
        callItem.conferenceParticipants?.forEach((curr) => {
          if (curr.info.phoneNumber) {
            uniqueNumbersSet.add(
              this._numberFormatter.normalizeNumber(curr.info.phoneNumber),
            );
          }
          if (curr.info.extensionNumber) {
            uniqueNumbersSet.add(curr.info.extensionNumber);
          }
        });
      }
    });
    return Array.from(uniqueNumbersSet);
  }

  fromCallAnsweredElsewhere = this._activeCallControl.fromCallAnsweredElsewhere;
  fromMissedCalls = this._activeCallControl.fromMissedCalls;
}

const addIntoTargetDevice = (targetDevice: DeviceCallsMap, call: ICall) => {
  targetDevice.all.push(call);

  const ringing = isRingingCall(call);
  const holding = isHoldingCall(call);

  if (ringing) {
    targetDevice.ringing.push(call);
  } else if (holding) {
    targetDevice.holding.push(call);
  } else {
    targetDevice.active.push(call);
  }
};
