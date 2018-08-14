import 'core-js/fn/array/find';
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import moduleStatuses from '../../enums/moduleStatuses';
import actionTypes from './actionTypes';
import calleeTypes from '../../enums/calleeTypes';
import sessionStatus from '../Webphone/sessionStatus';
import getCallMonitorReducer, { getCallMatchedReducer } from './getCallMonitorReducer';
import ensureExist from '../../lib/ensureExist';
import normalizeNumber from '../../lib/normalizeNumber';
import { matchWephoneSessionWithAcitveCall } from './callMonitorHelper';
import {
  isRinging,
  hasRingingCalls,
  sortByStartTime,
} from '../../lib/callLogHelpers';
import {
  isRing,
  isOnHold,
  isConferenceSession,
  sortByLastActiveTimeDesc,
} from '../Webphone/webphoneHelper';

/**
 * @class
 * @description active calls monitor module
 */
@Module({
  deps: [
    'AccountInfo',
    'Storage',
    'DetailedPresence',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'ActivityMatcher', optional: true },
    { dep: 'CallMonitorOptions', optional: true },
    { dep: 'TabManager', optional: true },
  ]
})
export default class CallMonitor extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Call} params.call - call module instance
   * @param {ConferenceCall} params.conferenceCall - conference call module instance
   * @param {AccountInfo} params.accountInfo - accountInfo module instance
   * @param {DetailedPresence} params.detailedPresence - detailedPresence module instance
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
    detailedPresence,
    activityMatcher,
    contactMatcher,
    tabManager,
    webphone,
    onRinging,
    onNewCall,
    onCallUpdated,
    onCallEnded,
    storage,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._call = call;
    this._conferenceCall = conferenceCall;
    this._accountInfo = this::ensureExist(accountInfo, 'accountInfo');
    this._detailedPresence = this::ensureExist(detailedPresence, 'detailedPresence');
    this._contactMatcher = contactMatcher;
    this._activityMatcher = activityMatcher;
    this._tabManager = tabManager;
    this._webphone = webphone;
    this._onRinging = onRinging;
    this._onNewCall = onNewCall;
    this._onCallUpdated = onCallUpdated;
    this._onCallEnded = onCallEnded;
    this._storage = this::ensureExist(storage, 'storage');
    this._callMatchedKey = 'callMatched';

    this._reducer = getCallMonitorReducer(this.actionTypes);

    this._storage.registerReducer({
      key: this._callMatchedKey,
      reducer: getCallMatchedReducer(this.actionTypes),
    });

    let _normalizedCalls;
    this.addSelector('normalizedCalls',
      () => this._detailedPresence.calls,
      () => this._accountInfo.countryCode,
      () => this._webphone && this._webphone.sessions,
      () => this._webphone && this._webphone.cachedSessions,
      (callsFromPresence, countryCode, sessions, cachedSessions) => {
        // match cached calls
        let cachedCalls = [];
        if (_normalizedCalls && cachedSessions && cachedSessions.length) {
          cachedCalls = _normalizedCalls.filter(x =>
            x.webphoneSession &&
            cachedSessions.find(i => i.id === x.webphoneSession.id)
          );
        }

        // combine
        const combinedCalls = [...callsFromPresence]; // clone
        cachedCalls.forEach((cachedCall) => {
          if (!callsFromPresence.find(x => x.id === cachedCall.id)) {
            combinedCalls.push(cachedCall);
          }
        });

        // mapping and sort
        let theSessions = sessions || [];
        _normalizedCalls = combinedCalls.map((callItem) => {
          // use account countryCode to normalize number due to API issues [RCINT-3419]
          const fromNumber = normalizeNumber({
            phoneNumber: callItem.from && callItem.from.phoneNumber,
            countryCode,
          });
          const toNumber = normalizeNumber({
            phoneNumber: callItem.to && callItem.to.phoneNumber,
            countryCode,
          });
          const webphoneSession = matchWephoneSessionWithAcitveCall(theSessions, callItem);
          theSessions = theSessions.filter(x => x !== webphoneSession);
          return {
            ...callItem,
            from: {
              phoneNumber: fromNumber,
            },
            to: {
              phoneNumber: toNumber,
            },
            startTime: (
              (webphoneSession && webphoneSession.startTime) ||
              callItem.startTime
            ),
            webphoneSession,
          };
        }).sort((l, r) => (
          sortByLastActiveTimeDesc(l.webphoneSession, r.webphoneSession)
        ));

        return _normalizedCalls;
      },
    );

    this.addSelector('allCalls',
      this._selectors.normalizedCalls,
      () => (this._contactMatcher && this._contactMatcher.dataMapping),
      () => (this._activityMatcher && this._activityMatcher.dataMapping),
      () => (this.callMatched),
      (normalizedCalls, contactMapping = {}, activityMapping = {}, callMatched) => {
        const calls = normalizedCalls.map((callItem) => {
          const fromNumber = callItem.from && callItem.from.phoneNumber;
          const toNumber = callItem.to && callItem.to.phoneNumber;
          const fromMatches = (fromNumber && contactMapping[fromNumber]) || [];
          const toMatches = (toNumber && contactMapping[toNumber]) || [];
          const toNumberEntity = callMatched[callItem.sessionId];
          return {
            ...callItem,
            fromMatches,
            toMatches,
            activityMatches: (activityMapping[callItem.sessionId]) || [],
            toNumberEntity,
          };
        });
        return calls;
      }
    );

    this.addSelector('calls',
      this._selectors.allCalls,
      () => this._conferenceCall && this._conferenceCall.isMerging,
      (calls, isMerging) => (
        calls.filter((callItem) => {
          // filtering out the conferece during merging
          if (isMerging) {
            return !isConferenceSession(callItem.webphoneSession);
          }
          return true;
        })
      ),
    );


    this.addSelector('activeRingCalls',
      this._selectors.calls,
      calls => calls.filter(callItem =>
        callItem.webphoneSession &&
        isRing(callItem.webphoneSession)
      )
    );

    this.addSelector('_activeOnHoldCalls',
      this._selectors.calls,
      calls => calls.filter(callItem =>
        callItem.webphoneSession &&
        isOnHold(callItem.webphoneSession)
      )
    );

    this.addSelector('_activeCurrentCalls',
      this._selectors.calls,
      calls => calls.filter(callItem =>
        callItem.webphoneSession &&
        !isOnHold(callItem.webphoneSession) &&
        !isRing(callItem.webphoneSession)
      )
    );

    this.addSelector('activeOnHoldCalls',
      this._selectors._activeOnHoldCalls,
      this._selectors._activeCurrentCalls,
      (_activeOnHoldCalls, _activeCurrentCalls) => (
        (_activeOnHoldCalls.length && !_activeCurrentCalls.length) ?
          _activeOnHoldCalls.slice(1) :
          _activeOnHoldCalls
      ),
    );

    this.addSelector('activeCurrentCalls',
      this._selectors._activeCurrentCalls,
      this._selectors._activeOnHoldCalls,
      (_activeCurrentCalls, _activeOnHoldCalls) => (
        (!_activeCurrentCalls.length && _activeOnHoldCalls.length) ?
          _activeOnHoldCalls.slice(0, 1) :
          _activeCurrentCalls
      )
    );

    this.addSelector('otherDeviceCalls',
      this._selectors.calls,
      () => this._webphone && this._webphone.lastEndedSessions,
      (calls, lastEndedSessions) => {
        let sessionsCache = lastEndedSessions;
        return calls.filter((callItem) => {
          if (callItem.webphoneSession) {
            return false;
          }
          if (!sessionsCache) {
            return true;
          }
          const endCall = matchWephoneSessionWithAcitveCall(sessionsCache, callItem);
          sessionsCache = sessionsCache.filter(x => x !== endCall);
          return !endCall;
        });
      },
    );

    this.addSelector('uniqueNumbers',
      this._selectors.normalizedCalls,
      (normalizedCalls) => {
        const output = [];
        const numberMap = {};
        function addIfNotExist(number) {
          if (!numberMap[number]) {
            output.push(number);
            numberMap[number] = true;
          }
        }
        normalizedCalls.forEach((callItem) => {
          if (callItem.from && callItem.from.phoneNumber) {
            addIfNotExist(callItem.from.phoneNumber);
          }
          if (callItem.to && callItem.to.phoneNumber) {
            addIfNotExist(callItem.to.phoneNumber);
          }
        });
        return output;
      }
    );

    if (this._contactMatcher) {
      this._contactMatcher.addQuerySource({
        getQueriesFn: this._selectors.uniqueNumbers,
        readyCheckFn: () => (
          this._accountInfo.ready &&
          this._detailedPresence.ready
        ),
      });
    }

    this.addSelector('sessionIds',
      () => this._detailedPresence.calls,
      calls => calls.map(callItem => callItem.sessionId)
    );

    let _fromSessionId;
    let _lastCallInfo;
    this.addSelector('lastCallInfo',
      this._selectors.allCalls,
      () => this._conferenceCall && this._conferenceCall.mergingPair.fromSessionId,
      () => this._conferenceCall && this._conferenceCall.partyProfiles,
      (calls, fromSessionId, partyProfiles) => {
        if (!fromSessionId) {
          _lastCallInfo = null;
          return _lastCallInfo;
        }

        const lastCall = calls.find(
          call => call.webphoneSession && call.webphoneSession.id === fromSessionId
        );

        let lastCalleeType;
        if (lastCall) {
          if (lastCall.toMatches.length) {
            lastCalleeType = calleeTypes.contacts;
          } else if (isConferenceSession(lastCall.webphoneSession)) {
            lastCalleeType = calleeTypes.conference;
          } else {
            lastCalleeType = calleeTypes.unknow;
          }
        } else if (
          _fromSessionId === fromSessionId
          && _lastCallInfo && _lastCallInfo.calleeType
        ) {
          _lastCallInfo = {
            ..._lastCallInfo,
            status: sessionStatus.finished,
          };
          return _lastCallInfo;
        } else {
          return {
            calleeType: calleeTypes.unknow,
          };
        }

        let partiesAvatarUrls = null;
        if (lastCalleeType === calleeTypes.conference) {
          partiesAvatarUrls = (partyProfiles || []).map(profile => profile.avatarUrl);
        }
        switch (lastCalleeType) {
          case calleeTypes.conference:
            _lastCallInfo = {
              calleeType: calleeTypes.conference,
              avatarUrl: partiesAvatarUrls[0],
              extraNum: partiesAvatarUrls.length - 1,
              name: null,
              phoneNumber: null,
              status: lastCall.webphoneSession.callStatus,
              lastCallContact: null,
            };
            break;
          case calleeTypes.contacts:
            _lastCallInfo = {
              calleeType: calleeTypes.contacts,
              avatarUrl: lastCall.toMatches[0].profileImageUrl,
              name: lastCall.toMatches[0].name,
              status: lastCall.webphoneSession.callStatus,
              phoneNumber: lastCall.to.phoneNumber,
              extraNum: 0,
              lastCallContact: lastCall.toMatches[0],
            };
            break;
          default:
            _lastCallInfo = {
              calleeType: calleeTypes.unknow,
              avatarUrl: null,
              name: null,
              status: lastCall.webphoneSession ? lastCall.webphoneSession.callStatus : null,
              phoneNumber: lastCall.to.phoneNumber,
              extraNum: 0,
              lastCallContact: null,
            };
        }

        _fromSessionId = fromSessionId;
        return _lastCallInfo;
      },
    );

    if (this._activityMatcher) {
      this._activityMatcher.addQuerySource({
        getQueriesFn: this._selectors.sessionIds,
        readyCheckFn: () => this._detailedPresence.ready,
      });
    }

    this._lastProcessedNumbers = null;
    this._lastProcessedCalls = null;
    this._lastProcessedIds = null;
  }

  async _onStateChange() {
    if (
      (!this._call || this._call.ready) &&
      (!this._conferenceCall || this._conferenceCall.ready) &&
      this._accountInfo.ready &&
      this._detailedPresence.ready &&
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
      (
        (this._call && !this._call.ready) ||
        (this._conferenceCall && !this._conferenceCall.ready) ||
        !this._accountInfo.ready ||
        !this._detailedPresence.ready ||
        (this._contactMatcher && !this._contactMatcher.ready) ||
        (this._activityMatcher && !this._activityMatcher.ready) ||
        (this._tabManager && !this._tabManager.ready) ||
        !this._storage.ready
      ) &&
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
    } else if (
      this.ready
    ) {
      const uniqueNumbers = this._selectors.uniqueNumbers();
      if (
        this._lastProcessedNumbers !== uniqueNumbers &&
        (!this._tabManager || this._tabManager.active)
      ) {
        this._lastProcessedNumbers = uniqueNumbers;
        if (this._contactMatcher && this._contactMatcher.ready) {
          this._contactMatcher.triggerMatch();
        }
      }
      const sessionIds = this._selectors.sessionIds();
      if (
        this._lastProcessedIds !== sessionIds &&
        (!this._tabManager || this._tabManager.active)
      ) {
        this._lastProcessedIds = sessionIds;
        if (this._activityMatcher && this._activityMatcher.ready) {
          this._activityMatcher.triggerMatch();
        }
      }

      if (
        this._lastProcessedCalls !== this.calls
      ) {
        const oldCalls = (
          this._lastProcessedCalls &&
          this._lastProcessedCalls.slice()
        ) || [];

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

        let entities = this._call ? this._call.toNumberEntities.sort(sortByStartTime) : [];
        // const matchedMap = {};
        this.calls.forEach((call) => {
          const oldCallIndex = oldCalls.findIndex(item => item.sessionId === call.sessionId);
          if (oldCallIndex === -1) {
            if (typeof this._onNewCall === 'function') {
              this._onNewCall(call);
            }
            if (typeof this._onRinging === 'function' && isRinging(call)) {
              this._onRinging(call);
            }
          } else {
            const oldCall = oldCalls[oldCallIndex];
            oldCalls.splice(oldCallIndex, 1);
            if (
              call.telephonyStatus !== oldCall.telephonyStatus &&
              typeof this._onCallUpdated === 'function'
            ) {
              this._onCallUpdated(call);
            }
          }
          entities.find((entity, index) => {
            const toEntity = call.toMatches.find(toMatch =>
              toMatch.id === entity.entityId
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
          });
        });

        oldCalls.forEach((call) => {
          if (typeof this._onCallEnded === 'function') {
            this._onCallEnded(call);
          }
        });
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

  get calls() {
    return this._selectors.calls();
  }

  get callMatched() {
    return this._storage.getItem(this._callMatchedKey);
  }

  get activeRingCalls() {
    return this._selectors.activeRingCalls();
  }

  get activeOnHoldCalls() {
    return this._selectors.activeOnHoldCalls();
  }

  get activeCurrentCalls() {
    return this._selectors.activeCurrentCalls();
  }

  get otherDeviceCalls() {
    return this._selectors.otherDeviceCalls();
  }

  get lastCallInfo() {
    return this._selectors.lastCallInfo();
  }
}
