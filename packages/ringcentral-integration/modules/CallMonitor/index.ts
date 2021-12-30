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

import moduleStatuses from '../../enums/moduleStatuses';
import {
  hasRingingCalls,
  isInbound,
  isOnHold as isRingOutOnHold,
  isRinging,
  isRingingInboundCall,
  sortByStartTime,
} from '../../lib/callLogHelpers';
import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import normalizeNumber from '../../lib/normalizeNumber';
import RcModule from '../../lib/RcModule';
import { selector } from '../../lib/selector';
import {
  isForwardedToVoiceMail,
  isHolding,
  isOnSetupStage,
  isRinging as isProceeding,
} from '../ActiveCallControlV2/helpers';
import { normalizeTelephonySession } from '../CallMonitorV2/callMonitorHelper';
import {
  isConferenceSession,
  isOnHold,
  isRing,
  sortByLastActiveTimeDesc,
} from '../Webphone/webphoneHelper';
import actionTypes from './actionTypes';
import {
  isCurrentDeviceEndCall,
  mapTelephonyStatus,
  matchWephoneSessionWithAcitveCall,
} from './callMonitorHelper';
import getCallMonitorReducer, {
  getCallMatchedReducer,
} from './getCallMonitorReducer';

/**
 * @class
 * @description active calls monitor module
 */
@Module({
  deps: [
    'AccountInfo',
    'Storage',
    'Presence',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'CallMonitorOptions', optional: true },
    { dep: 'TabManager', optional: true },
    { dep: 'ActiveCallControl', optional: true },
  ],
})
export default class CallMonitor extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Call} params.call - call module instance
   * @param {ConferenceCall} params.conferenceCall - conference call module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   * @param {Presence} params.presence - presence module instance
   * @param {ActivityMatcher} params.activityMatcher - activityMatcher module instance
   * @param {ContactMatcher} params.contactMatcher - contactMatcher module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Function} params.onRinging - function on ring
   * @param {Function} params.onNewCall - function on new call
   * @param {Function} params.onCallUpdated - function on call updated
   * @param {Function} params.onCallEnded - function on call ended
   */
  constructor({
    call,
    conferenceCall,
    accountInfo,
    presence,
    activityMatcher,
    contactMatcher,
    tabManager,
    webphone,
    onRinging,
    onNewCall,
    onCallUpdated,
    onCallEnded,
    storage,
    activeCallControl,
    // this feature requires to enable ActiveCallControlV2
    useTelephonySession = false,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._call = call;
    this._conferenceCall = conferenceCall;
    this._accountInfo = ensureExist.call(this, accountInfo, 'accountInfo');
    this._presence = ensureExist.call(this, presence, 'presence');
    this._contactMatcher = contactMatcher;
    this._activityMatcher = activityMatcher;
    this._tabManager = tabManager;
    this._webphone = webphone;
    this._activeCallControl = activeCallControl;
    this._onNewCall = onNewCall;
    this._onCallUpdated = onCallUpdated;
    this._onCallEnded = onCallEnded;
    this._storage = ensureExist.call(this, storage, 'storage');
    this._callMatchedKey = 'callMatched';
    this._onRinging = onRinging;
    // change _onRinging hook to array lsit
    this._onRingingFuncs = [];

    this._reducer = getCallMonitorReducer(this.actionTypes);

    this._storage.registerReducer({
      key: this._callMatchedKey,
      reducer: getCallMatchedReducer(this.actionTypes),
    });

    this._normalizedCalls = null;

    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: () => this.uniqueNumbers,
        readyCheckFn: () => this._accountInfo.ready && this._presence.ready,
      });
    }

    if (this._activityMatcher) {
      this._activityMatcher.addQuerySource({
        getQueriesFn: () => this.sessionIds,
        readyCheckFn: () => this._presence.ready,
      });
    }

    this._lastProcessedNumbers = null;
    this._lastProcessedCalls = null;
    this._lastProcessedIds = null;
    this._useTelephonySession = useTelephonySession;
    if (this._useTelephonySession && !this._activeCallControl) {
      console.warn(
        'Use telephonySession at CallMonitor module requires ActiveCallControlV2 module',
      );
      this._useTelephonySession = false;
    }
  }

  async _onStateChange() {
    if (
      (!this._call || this._call.ready) &&
      (!this._conferenceCall || this._conferenceCall.ready) &&
      this._accountInfo.ready &&
      this._presence.ready &&
      (!this._contactMatcher || this._contactMatcher.ready) &&
      (!this._activityMatcher || this._activityMatcher.ready) &&
      (!this._tabManager || this._tabManager.ready) &&
      this._storage.ready &&
      this.pending
    ) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (
      ((this._call && !this._call.ready) ||
        (this._conferenceCall && !this._conferenceCall.ready) ||
        !this._accountInfo.ready ||
        !this._presence.ready ||
        (this._contactMatcher && !this._contactMatcher.ready) ||
        (this._activityMatcher && !this._activityMatcher.ready) ||
        (this._tabManager && !this._tabManager.ready) ||
        !this._storage.ready) &&
      this.ready
    ) {
      this.store.dispatch({
        type: this.actionTypes.reset,
      });
      this._lastProcessedCalls = null;
      this._lastProcessedIds = null;
      this._lastProcessedNumbers = null;
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    } else if (this.ready) {
      const uniqueNumbers = this.uniqueNumbers;
      if (
        this._lastProcessedNumbers !== uniqueNumbers &&
        (!this._tabManager || this._tabManager.active)
      ) {
        const newNumbers = difference(
          uniqueNumbers,
          this._lastProcessedNumbers || [],
        );
        this._lastProcessedNumbers = uniqueNumbers;
        if (this._contactMatcher && this._contactMatcher.ready) {
          this._contactMatcher.match({
            queries: newNumbers,
            ignoreQueue: true,
          });
        }
      }
      const sessionIds = this.sessionIds;
      if (
        this._lastProcessedIds !== sessionIds &&
        (!this._tabManager || this._tabManager.active)
      ) {
        const newSessions = difference(
          sessionIds,
          this._lastProcessedIds || [],
        );
        this._lastProcessedIds = sessionIds;
        if (this._activityMatcher && this._activityMatcher.ready) {
          this._activityMatcher.match({
            queries: newSessions,
            ignoreQueue: true,
          });
        }
      }

      if (this._lastProcessedCalls !== this.calls) {
        const oldCalls =
          (this._lastProcessedCalls && this._lastProcessedCalls.slice()) || [];

        this._lastProcessedCalls = this.calls;

        // no ringing calls
        if (
          this._call &&
          oldCalls.length !== 0 &&
          this.calls.length === 0 &&
          this._call.toNumberEntities &&
          this._call.toNumberEntities.length !== 0
        ) {
          // console.log('no calls clean to number:');
          this._call.cleanToNumberEntities();
        }

        let entities = this._call
          ? sort(sortByStartTime, this._call.toNumberEntities)
          : [];
        // const matchedMap = {};
        forEach((call) => {
          const oldCallIndex = findIndex(
            (item) => item.sessionId === call.sessionId,
            oldCalls,
          );
          if (oldCallIndex === -1) {
            if (typeof this._onNewCall === 'function') {
              this._onNewCall(call);
            }
            // loop to execut the onRinging handlers
            if (isRinging(call)) {
              if (this._onRinging && typeof this._onRinging === 'function') {
                this._onRinging(call);
              }
              if (
                Array.isArray(this._onRingingFuncs) &&
                this._onRingingFuncs.length
              ) {
                this._onRingingFuncs.forEach((func) => {
                  if (func && typeof func === 'function') {
                    func(call);
                  }
                });
              }
            }
          } else {
            const oldCall = oldCalls[oldCallIndex];
            oldCalls.splice(oldCallIndex, 1);
            if (
              call.telephonyStatus !== oldCall.telephonyStatus ||
              (oldCall.from && oldCall.from.phoneNumber) !==
                (call.from && call.from.phoneNumber)
            ) {
              if (typeof this._onCallUpdated === 'function') {
                this._onCallUpdated(call);
              }
              if (call.telephonyStatus === 'CallConnected') {
                if (isInbound(call)) {
                  this.store.dispatch({
                    type: this.actionTypes.inboundCallConnectedTrack,
                  });
                } else {
                  this.store.dispatch({
                    type: this.actionTypes.outboundCallConnectedTrack,
                  });
                }
              }
            }
          }
          find((entity, index) => {
            const toEntity = find(
              (toMatch) => toMatch.id === entity.entityId,
              call.toMatches,
            );
            if (toEntity !== undefined) {
              entities = this._removeMatched(index, entities);
              this._setMatchedData({
                sessionId: call.sessionId,
                toEntityId: toEntity.id,
              });
              return true;
            }
            return false;
          }, entities);
        }, this.calls);

        forEach((call) => {
          if (typeof this._onCallEnded === 'function') {
            this._onCallEnded(call);
          }
        }, oldCalls);
      }
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _removeMatched(index, entities) {
    console.log('removeMatched:', index);
    entities.splice(index, 1);
    console.log('entities after splice:', entities);
    return entities;
  }

  _setMatchedData(matched) {
    this.store.dispatch({
      type: this.actionTypes.setData,
      ...matched,
    });
  }

  // user action track funtions
  callItemClickTrack() {
    this.store.dispatch({
      type: this.actionTypes.callItemClickTrack,
    });
  }

  allCallsClickHoldTrack() {
    this.store.dispatch({
      type: this.actionTypes.allCallsClickHoldTrack,
    });
  }

  allCallsClickHangupTrack() {
    this.store.dispatch({
      type: this.actionTypes.allCallsClickHangupTrack,
    });
  }

  allCallsClickRejectTrack() {
    this.store.dispatch({
      type: this.actionTypes.allCallsClickRejectTrack,
    });
  }

  callControlClickAddTrack() {
    this.store.dispatch({
      type: this.actionTypes.callControlClickAddTrack,
    });
  }

  mergeControlClickHangupTrack() {
    this.store.dispatch({
      type: this.actionTypes.mergeControlClickHangupTrack,
    });
  }

  callControlClickMergeTrack() {
    this.store.dispatch({
      type: this.actionTypes.callControlClickMergeTrack,
    });
  }

  confirmMergeClickCloseTrack() {
    this.store.dispatch({
      type: this.actionTypes.confirmMergeClickCloseTrack,
    });
  }

  confirmMergeClickMergeTrack() {
    this.store.dispatch({
      type: this.actionTypes.confirmMergeClickMergeTrack,
    });
  }

  callsOnHoldClickAddTrack() {
    this.store.dispatch({
      type: this.actionTypes.callsOnHoldClickAddTrack,
    });
  }

  callsOnHoldClickMergeTrack() {
    this.store.dispatch({
      type: this.actionTypes.callsOnHoldClickMergeTrack,
    });
  }

  callsOnHoldClickHangupTrack() {
    this.store.dispatch({
      type: this.actionTypes.callsOnHoldClickHangupTrack,
    });
  }

  callControlClickParticipantAreaTrack() {
    this.store.dispatch({
      type: this.actionTypes.callControlClickParticipantAreaClickTrack,
    });
  }

  onRingings(func) {
    this._onRingingFuncs.push(func);
  }

  get hasRingingCalls() {
    return hasRingingCalls(this.calls);
  }

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  get callMatched() {
    return this._storage.getItem(this._callMatchedKey);
  }

  get useTelephonySession() {
    return this._useTelephonySession;
  }

  @selector
  allCalls = [
    () => this.normalizedCalls,
    () => this._contactMatcher && this._contactMatcher.dataMapping,
    () => this._activityMatcher && this._activityMatcher.dataMapping,
    () => this.callMatched,
    (
      normalizedCalls,
      contactMapping = {},
      activityMapping = {},
      callMatched,
    ) => {
      const calls = map((callItem) => {
        const fromNumber = callItem.from && callItem.from.phoneNumber;
        const toNumber = callItem.to && callItem.to.phoneNumber;
        const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
        const toMatches = (toNumber && contactMapping[toNumber]) || [];
        const toNumberEntity = callMatched[callItem.sessionId];
        return {
          ...callItem,
          fromMatches,
          toMatches,
          activityMatches: activityMapping[callItem.sessionId] || [],
          toNumberEntity,
        };
      }, normalizedCalls);
      return calls;
    },
  ];

  @selector
  normalizedCalls = [
    () => this.normalizedCallsFromPresence,
    () => this.normalizedCallsFromTelephonySessions,
    () => this.useTelephonySession,
    (
      normalizedCallsFromPresence,
      normalizedCallsFromTelephonySessions,
      useTelephonySession,
    ) => {
      if (useTelephonySession) {
        return normalizedCallsFromTelephonySessions;
      }
      return normalizedCallsFromPresence;
    },
  ];

  @selector
  normalizedCallsFromPresence = [
    () => this._presence.calls,
    () => this._accountInfo.countryCode,
    () => this._webphone && this._webphone.sessions,
    () => this._webphone && this._webphone.cachedSessions,
    (callsFromPresence, countryCode, sessions, cachedSessions) => {
      // match cached calls
      let cachedCalls = [];
      if (this._normalizedCalls && cachedSessions && cachedSessions.length) {
        cachedCalls = filter(
          (x) =>
            x.webphoneSession &&
            find((i) => i.id === x.webphoneSession.id, cachedSessions),
          this._normalizedCalls,
        );
      }

      // combine
      const combinedCalls = [...callsFromPresence]; // clone
      forEach((cachedCall) => {
        if (!find((x) => x.id === cachedCall.id, callsFromPresence)) {
          combinedCalls.push(cachedCall);
        }
      }, cachedCalls);

      // mapping and sort
      let theSessions = sessions || [];
      this._normalizedCalls = sort(
        (l, r) =>
          sortByLastActiveTimeDesc(l.webphoneSession, r.webphoneSession),
        map((callItem) => {
          // use account countryCode to normalize number due to API issues [RCINT-3419]
          const fromNumber = normalizeNumber({
            phoneNumber: callItem.from && callItem.from.phoneNumber,
            countryCode,
          });
          const toNumber = normalizeNumber({
            phoneNumber: callItem.to && callItem.to.phoneNumber,
            countryCode,
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
    },
  ];

  @selector
  normalizedCallsFromTelephonySessions = [
    () => this._activeCallControl?.sessions,
    () => this._activeCallControl?.currentDeviceCallsMap,
    () => this._accountInfo.countryCode,
    () => this._activeCallControl?.cachedSessions,
    () => this._presence.calls,
    (
      telephonySessions,
      currentDeviceCallsMap,
      countryCode,
      cachedSessions,
      presenceCalls,
    ) => {
      // TODO match cached calls when there are conference merging calls, refer to `normalizedCallsFromPresence` function
      if (!telephonySessions) return [];
      const combinedCalls = [...telephonySessions]; // clone

      // mapping and sort
      this._normalizedCalls = sort(
        (l, r) =>
          sortByLastActiveTimeDesc(l.webphoneSession, r.webphoneSession),
        map((callItem) => {
          const currentRcCallSession =
            this._activeCallControl.rcCallSessions?.find(
              (x) => x.id === callItem.id,
            );
          // sessionId arrives when telephony session event push and it's a required
          // reference https://github.com/ringcentral/ringcentral-call-js/blob/master/src/Session.ts
          if (
            !currentRcCallSession ||
            !currentRcCallSession.sessionId ||
            isForwardedToVoiceMail(currentRcCallSession) ||
            (isInbound(currentRcCallSession) &&
              isOnSetupStage(currentRcCallSession))
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
          } = currentRcCallSession;
          let { _activeCallId: id } = currentRcCallSession;
          // find id from presence call one time, due to telephony session event not push call id back
          // with ringout call
          if (!id) {
            const presenceCall = presenceCalls.find(
              (presenceCall) => presenceCall.telephonySessionId === callItem.id,
            );
            id = presenceCall?.id;
          }
          const fromNumber = normalizeNumber({
            phoneNumber: from?.phoneNumber,
            countryCode,
          });
          const toNumber = normalizeNumber({
            phoneNumber: to?.phoneNumber,
            countryCode,
          });
          const toName = to?.name;
          const fromName = from?.name;
          const partyId = party?.id;
          const telephonySession =
            normalizeTelephonySession(currentRcCallSession);
          const telephonyStatus = mapTelephonyStatus(party?.status?.code);

          // TODO: add sipData here
          // const sipData = {};
          return {
            id,
            partyId,
            direction,
            telephonySession,
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
    },
  ];

  @selector
  calls = [
    () => this.allCalls,
    () => this._conferenceCall && this._conferenceCall.isMerging,
    (calls, isMerging) =>
      filter((callItem) => {
        // filtering out the conferece during merging
        if (isMerging) {
          return !isConferenceSession(callItem.webphoneSession);
        }
        return true;
      }, calls),
  ];

  @selector
  activeRingCalls = [
    () => this.calls,
    () => this.useTelephonySession,
    (calls, useTelephonySession) =>
      filter((callItem) => {
        if (useTelephonySession) {
          return (
            callItem.webphoneSession &&
            callItem.telephonySession &&
            isProceeding(callItem.telephonySession)
          );
        }
        return callItem.webphoneSession && isRing(callItem.webphoneSession);
      }, calls),
  ];

  @selector
  _activeOnHoldCalls = [
    () => this.calls,
    () => this.useTelephonySession,
    (calls, useTelephonySession) => {
      if (useTelephonySession) {
        return filter(
          (callItem) =>
            callItem.webphoneSession &&
            callItem.telephonySession &&
            isHolding(callItem.telephonySession),
          calls,
        );
      }
      return filter(
        (callItem) =>
          callItem.webphoneSession && isOnHold(callItem.webphoneSession),
        calls,
      );
    },
  ];

  @selector
  _activeCurrentCalls = [
    () => this.calls,
    () => this.useTelephonySession,
    (calls, useTelephonySession) =>
      filter((callItem) => {
        if (useTelephonySession) {
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
      }, calls),
  ];

  @selector
  activeOnHoldCalls = [
    () => this._activeOnHoldCalls,
    () => this._activeCurrentCalls,
    (_activeOnHoldCalls, _activeCurrentCalls) => {
      if (_activeOnHoldCalls.length && !_activeCurrentCalls.length) {
        return _activeOnHoldCalls.slice(1);
      }
      return _activeOnHoldCalls;
    },
  ];

  @selector
  activeCurrentCalls = [
    () => this._activeCurrentCalls,
    () => this._activeOnHoldCalls,
    (_activeCurrentCalls, _activeOnHoldCalls) =>
      !_activeCurrentCalls.length && _activeOnHoldCalls.length
        ? _activeOnHoldCalls.slice(0, 1)
        : _activeCurrentCalls,
  ];

  @selector
  otherDeviceCalls = [
    () => this.calls,
    () => this._webphone && this._webphone.lastEndedSessions,
    () => this.useTelephonySession,
    () => this._activeCallControl?.lastEndedSessionIds,
    (
      calls,
      lastEndedSessions,
      useTelephonySession,
      callControlLastEndedSessions,
    ) =>
      reduce(
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
          let endCall = null;
          if (useTelephonySession) {
            endCall = isCurrentDeviceEndCall(sessionsCache, callItem);
          } else {
            endCall = matchWephoneSessionWithAcitveCall(
              sessionsCache,
              callItem,
            );
          }

          return {
            sessionsCache: filter((x) => x !== endCall, sessionsCache),
            res: endCall ? res : [...res, callItem],
          };
        },
        {
          sessionsCache: useTelephonySession
            ? callControlLastEndedSessions
            : lastEndedSessions,
          res: [],
        },
        calls,
      ).res,
  ];

  @selector
  uniqueNumbers = [
    () => this.normalizedCalls,
    (normalizedCalls) => {
      const output = [];
      const numberMap = {};
      function addIfNotExist(number) {
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
      }, normalizedCalls);
      return output;
    },
  ];

  @selector
  sessionIds = [
    () => this._presence.calls,
    (calls) => map((callItem) => callItem.sessionId, calls),
  ];

  @selector
  ringoutRingCalls = [
    () => this.otherDeviceCalls,
    (otherDeviceCalls) =>
      filter((callItem) => isRingingInboundCall(callItem), otherDeviceCalls),
  ];

  @selector
  ringoutCurrentCalls = [
    () => this.otherDeviceCalls,
    (otherDeviceCalls) =>
      filter(
        (callItem) =>
          !isRingingInboundCall(callItem) && !isRingOutOnHold(callItem),
        otherDeviceCalls,
      ),
  ];

  @selector
  ringoutOnHoldCalls = [
    () => this.otherDeviceCalls,
    (otherDeviceCalls) =>
      filter((callItem) => isRingOutOnHold(callItem), otherDeviceCalls),
  ];
}
