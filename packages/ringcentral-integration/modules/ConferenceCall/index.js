import { find } from 'ramda';
import EventEmitter from 'events';
import { Module } from '../../lib/di';
import RcModule from '../../lib/RcModule';
import proxify from '../../lib/proxy/proxify';
import ensureExist from '../../lib/ensureExist';
import calleeTypes from '../../enums/calleeTypes';
import callDirections from '../../enums/callDirections';
import { selector } from '../../lib/selector';

import callingModes from '../CallingSettings/callingModes';
import permissionsMessages from '../RolesAndPermissions/permissionsMessages';
import { isConferenceSession, isRecording } from '../Webphone/webphoneHelper';
import sessionStatusEnum from '../Webphone/sessionStatus';

import actionTypes from './actionTypes';
import conferenceRole from './conferenceRole';
import partyStatusCode from './partyStatusCode';
import conferenceCallErrors from './conferenceCallErrors';
import getConferenceCallReducer from './getConferenceCallReducer';

const DEFAULT_TIMEOUT = 30000; // time out for conferencing session being accepted.
const DEFAULT_TTL = 5000; // timer to update the conference information
const MAXIMUM_CAPACITY = 10;

let _fromSessionId;
let _lastCallInfo;

function ascendSortParties(parties) {
  return parties
    .filter(
      (party) => party.conferenceRole.toLowerCase() !== conferenceRole.host,
    )
    .sort((last, next) => +last.id.split('-')[1] - +next.id.split('-')[1]);
}

/**
 * @class
 * @description ConferenceCall managing module
 */
@Module({
  deps: [
    'Auth',
    'Alert',
    'Call',
    'CallingSettings',
    'ConnectivityMonitor',
    'Client',
    'Webphone',
    'RolesAndPermissions',
    {
      dep: 'ContactMatcher',
      optional: true,
    },
    {
      dep: 'Webphone',
      optional: true,
    },
    {
      dep: 'AvailabilityMonitor',
      optional: true,
    },
    {
      dep: 'ConferenceCallOptions',
      optional: true,
    },
  ],
})
export default class ConferenceCall extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   * @param {Client} params.client - client module instance
   */
  constructor({
    auth,
    alert,
    call,
    callingSettings,
    client,
    rolesAndPermissions,
    contactMatcher,
    webphone,
    availabilityMonitor,
    connectivityMonitor,
    pulling = true,
    capacity = MAXIMUM_CAPACITY,
    timeout = DEFAULT_TIMEOUT,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._eventEmitter = new EventEmitter();
    this._auth = this::ensureExist(auth, 'auth');
    this._alert = this::ensureExist(alert, 'alert');
    this._call = this::ensureExist(call, 'call');
    this._availabilityMonitor = availabilityMonitor;
    this._callingSettings = this::ensureExist(
      callingSettings,
      'callingSettings',
    );
    this._client = this::ensureExist(client, 'client');
    // in order to run the integeration test, we need it to be optional
    this._webphone = webphone;
    this._connectivityMonitor = connectivityMonitor;
    this._contactMatcher = contactMatcher;
    this._rolesAndPermissions = this::ensureExist(
      rolesAndPermissions,
      'rolesAndPermissions',
    );
    // we need the constructed actions
    this._reducer = getConferenceCallReducer(this.actionTypes);
    this._ttl = DEFAULT_TTL;
    this._timout = timeout;
    this._timers = {};
    this._pulling = pulling;
    this.capacity = capacity;
  }

  isConferenceSession(sessionId) {
    // only can be used after webphone._onCallStartFunc
    let res = !!this.findConferenceWithSession(sessionId);

    if (this.isMerging && !res) {
      const session = this._webphone.sessions.find(
        (session) => session.id === sessionId,
      );
      res = isConferenceSession(session);
    }

    return res;
  }

  findConferenceWithSession(sessionId) {
    return Object.values(this.conferences).find(
      (c) => c.sessionId === sessionId,
    );
  }

  /**
   *
   * @param {string} id: conference id
   */
  @proxify
  async updateConferenceStatus(id) {
    this.store.dispatch({
      type: this.actionTypes.updateConference,
      conference: this.state.conferences[id],
    });
    try {
      const rawResponse = await this._client.service
        .platform()
        .get(`/account/~/telephony/sessions/${id}`);
      const response = rawResponse.json();
      const storedconference = this.state.conferences[response.id];
      const conference = Object.assign({}, storedconference.conference);
      conference.parties = response.parties;
      const { sessionId } = storedconference;
      this.store.dispatch({
        type: this.actionTypes.updateConferenceSucceeded,
        conference,
        sessionId,
      });
    } catch (e) {
      // TODO: alert
      this.store.dispatch({
        type: this.actionTypes.updateConferenceFailed,
        conference: this.state.conferences[id],
        message: e.toString(),
      });
      // need to propagate to out side try...catch block
      throw e;
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return this.state.conferences[id];
    }
  }

  /**
   * terminate a conference.
   * @param {string} id: conference id
   */
  @proxify
  async terminateConference(id) {
    this.store.dispatch({
      type: this.actionTypes.terminateConference,
      conference: this.state.conferences[id],
    });
    const conferenceData = this.conferences[id];

    try {
      if (this._webphone) {
        if (conferenceData) {
          this._webphone.hangup(conferenceData.sessionId);
          // Help server to do the GC, and we don't care the whether it's successful or not
          this._client.service
            .platform()
            .delete(`/account/~/telephony/sessions/${id}`);
          this.store.dispatch({
            type: this.actionTypes.terminateConferenceSucceeded,
            conference: conferenceData.conference,
          });
        } else {
          this.store.dispatch({
            type: this.actionTypes.terminateConferenceFailed,
          });
        }
      } else {
        await this._client.service
          .platform()
          .delete(`/account/~/telephony/sessions/${id}`);
        this.store.dispatch({
          type: this.actionTypes.terminateConferenceSucceeded,
          conference: conferenceData.conference,
        });
      }
    } catch (e) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(e)
      ) {
        this._alert.warning({
          message: conferenceCallErrors.terminateConferenceFailed,
        });
      }

      this.store.dispatch({
        type: this.actionTypes.terminateConferenceFailed,
        message: e.toString(),
      });
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return conferenceData;
    }
  }

  /**
   * Bring-in an outbound call into conference.
   * @param {string} id: conference id
   * @param {webphone.session} webphoneSession: get it from callMonitor.\w+Calls[\d+]
   * interface SessionData{
   *  "party-id": String,
   *  "session-id": String
   * }
   */
  @proxify
  async bringInToConference(id, webphoneSession, propagete = false) {
    const conferenceState = this.state.conferences[id];
    if (
      !conferenceState ||
      !this.ready ||
      !webphoneSession ||
      this.isOverload(id) ||
      !this._connectivityMonitor.connectivity
    ) {
      this._alert.danger({
        message: conferenceCallErrors.modeError,
        ttl: 0,
      });
      return null;
    }
    const { sessionId } = conferenceState;
    let { conference } = conferenceState;

    this.store.dispatch({
      type: this.actionTypes.bringInConference,
      conference,
      sessionId,
    });

    try {
      const partyProfile = this._getProfile(webphoneSession.id);
      await this._client.service
        .platform()
        .post(
          `/account/~/telephony/sessions/${id}/parties/bring-in`,
          webphoneSession.partyData,
        );
      const newConference = await this.updateConferenceStatus(id);
      conference = newConference.conference;

      if (partyProfile) {
        const conferenceState = this.state.conferences[id];
        const newParties = ascendSortParties(
          conferenceState.conference.parties,
        );
        partyProfile.id = newParties[newParties.length - 1].id;
      }

      this.store.dispatch({
        type: this.actionTypes.bringInConferenceSucceeded,
        conference,
        sessionId,
        partyProfile,
      });

      return id;
    } catch (e) {
      this.store.dispatch({
        type: this.actionTypes.bringInConferenceFailed,
        message: e.toString(),
      });
      if (!propagete) {
        return null;
      }
      throw e;
    }
  }

  /**
   * remove a participant from conference.
   * @param {string} id: conference id
   * @param {SessionData} partyId: one participant's id of an conference's `parties` list
   */
  @proxify
  async removeFromConference(id, partyId) {
    this.store.dispatch({
      type: this.actionTypes.removeFromConference,
      conference: this.state.conferences[id],
    });

    try {
      await this._client.service
        .platform()
        .delete(`/account/~/telephony/sessions/${id}/parties/${partyId}`);
      await this.updateConferenceStatus(id);
      this.store.dispatch({
        type: this.actionTypes.removeFromConferenceSucceeded,
        conference: this.state.conferences[id],
      });
    } catch (e) {
      if (
        !this._availabilityMonitor ||
        !this._availabilityMonitor.checkIfHAError(e)
      ) {
        this._alert.warning({
          message: conferenceCallErrors.removeFromConferenceFailed,
        });
      }

      this.store.dispatch({
        type: this.actionTypes.removeFromConferenceFailed,
        message: e.toString(),
      });
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return this.state.conferences[id];
    }
  }

  /**
   * start a conference call, return the session
   */
  @proxify
  async makeConference(propagate = false) {
    if (!this.ready || !this._connectivityMonitor.connectivity) {
      this._alert.danger({
        message: conferenceCallErrors.modeError,
        ttl: 0,
      });
      return null;
    }
    if (!this._checkPermission()) {
      if (!propagate) {
        this._alert.danger({
          message: permissionsMessages.insufficientPrivilege,
          ttl: 0,
        });
      }

      return null;
    }
    if (!this._callingSettings.callingMode === callingModes.webphone) {
      if (!propagate) {
        this._alert.danger({
          message: conferenceCallErrors.modeError,
          ttl: 0,
        });
      }

      return null;
    }
    const conference = await this._makeConference(propagate);
    return conference;
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  /**
   * Merge calls to (or create) a conference.
   * @param {webphone.sessions} webphoneSessions
   * FIXME: dynamically construct this function during the construction
   * to avoid `this._webphone` criterias to improve performance ahead of time
   */
  @proxify
  async mergeToConference(webphoneSessions = []) {
    webphoneSessions = webphoneSessions
      .filter((session) => !!session)
      .filter((session) => !this.isConferenceSession(session.id));

    if (!webphoneSessions.length) {
      this._alert.warning({
        message: conferenceCallErrors.bringInFailed,
      });
      return;
    }

    this.store.dispatch({
      type: this.actionTypes.mergeStart,
    });
    let sipInstances;
    let conferenceId = null;

    if (this._webphone) {
      /**
       * Because the concurrency behaviour of the server,
       * we cannot sure the merging process is over when
       * the function's procedure has finshed.
       */
      sipInstances = webphoneSessions.map((webphoneSession) =>
        this._webphone._sessions.get(webphoneSession.id),
      );
      /**
       * HACK: we need to preserve the merging session in prevent the glitch of
       * the call control page.
       */
      const sessionIds = webphoneSessions.map((x) => x.id);
      this._webphone.setSessionCaching(sessionIds);

      const pSips = sipInstances.map((instance) => {
        const p = new Promise((resolve) => {
          instance.on('terminated', () => {
            resolve();
          });
        });
        return p;
      });

      await Promise.all([
        this._mergeToConference(webphoneSessions),
        ...pSips,
      ]).then(
        () => {
          this.store.dispatch({
            type: this.actionTypes.mergeSucceeded,
          });
          const conferenceState = Object.values(this.conferences)[0];

          this._eventEmitter.emit(
            this.actionTypes.mergeSucceeded,
            conferenceState,
          );
        },
        () => {
          const conferenceState = Object.values(this.conferences)[0];

          /**
           * if create conference successfully but failed to bring-in,
           *  then terminate the conference.
           */
          if (conferenceState && conferenceState.profiles.length < 1) {
            this.terminateConference(conferenceState.conference.id);
          }
          this._alert.warning({
            message: conferenceCallErrors.bringInFailed,
          });
          this.store.dispatch({
            type: this.actionTypes.mergeFailed,
          });
        },
      );
      this._webphone.clearSessionCaching();
    } else {
      try {
        conferenceId = await this._mergeToConference(webphoneSessions);

        this.store.dispatch({
          type: this.actionTypes.mergeSucceeded,
        });
        this._eventEmitter.emit(this.actionTypes.mergeSucceeded);
      } catch (e) {
        const conferenceState = Object.values(this.conferences)[0];
        /**
         * if create conference successfully but failed to bring-in,
         *  then terminate the conference.
         */
        if (conferenceState && conferenceState.conference.parties.length < 1) {
          this.terminateConference(conferenceState.conference.id);
        }

        if (
          !this._availabilityMonitor ||
          !this._availabilityMonitor.checkIfHAError(e)
        ) {
          this._alert.warning({
            message: conferenceCallErrors.bringInFailed,
          });
        }
      }

      if (!sipInstances || conferenceId === null) {
        this.store.dispatch({
          type: this.actionTypes.mergeFailed,
        });
      }
    }
  }

  @proxify
  setMergeParty({ fromSessionId, toSessionId }) {
    if (fromSessionId) {
      this.store.dispatch({
        type: this.actionTypes.updateFromSession,
        fromSessionId,
      });
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.updateToSession,
      toSessionId,
    });
  }

  /**
   * we need to remove the fromSessionId in mergingPair when the outbound call is hang-up
   */
  @proxify
  closeMergingPair() {
    if (this.mergingPair.fromSessionId) {
      return this.store.dispatch({
        type: this.actionTypes.closeMergingPair,
      });
    }

    return null;
  }

  getOnlinePartyProfiles(id) {
    const conferenceData = this.conferences[id];

    if (conferenceData) {
      return ascendSortParties(conferenceData.conference.parties)
        .reduce((accum, party, idx) => {
          if (
            party.status.code.toLowerCase() !== partyStatusCode.disconnected
          ) {
            // 0 position is the host
            accum.push({ idx, party });
          }
          return accum;
        }, [])
        .map(({ idx, party }) => ({
          ...party,
          ...conferenceData.profiles[idx],
        }))
        .filter((i) => !!i);
    }
    return null;
  }

  getOnlineParties(id) {
    const conferenceData = this.conferences[id];
    if (conferenceData) {
      return conferenceData.conference.parties.filter(
        (p) => p.status.code.toLowerCase() !== partyStatusCode.disconnected,
      );
    }
    return null;
  }

  countOnlineParties(id) {
    const res = this.getOnlineParties(id);
    return Array.isArray(res) ? res.length : null;
  }

  isOverload(id) {
    return this.countOnlineParties(id) >= this.capacity;
  }

  @proxify
  async startPollingConferenceStatus(id) {
    if (this._timers[id] || !this._pulling) {
      return;
    }

    await this.updateConferenceStatus(id);
    this._timers[id] = setTimeout(async () => {
      await this.updateConferenceStatus(id);
      this.stopPollingConferenceStatus(id);
      if (this.conferences[id]) {
        this.startPollingConferenceStatus(id);
      }
    }, this._ttl);
  }

  stopPollingConferenceStatus(id) {
    clearTimeout(this._timers[id]);
    delete this._timers[id];
  }

  openPulling() {
    this._pulling = true;
  }

  closePulling() {
    this._pulling = false;
  }

  togglePulling() {
    this._pulling = !this.pulling;
  }

  setCapatity(capacity = MAXIMUM_CAPACITY) {
    if (typeof capacity !== 'number') {
      throw new Error('The capcity must be a number');
    }
    this.capacity = capacity;
    return capacity;
  }

  setTimeout(timeout = DEFAULT_TIMEOUT) {
    if (typeof timeout !== 'number') {
      throw new Error('The timeout must be a number');
    }
    this._timout = timeout;
    return timeout;
  }

  onMergeSuccess(func, isOnce) {
    if (isOnce) {
      this._eventEmitter.once(this.actionTypes.mergeSucceeded, func);
      return;
    }
    this._eventEmitter.on(this.actionTypes.mergeSucceeded, func);
  }

  removeMergeSuccess(func) {
    this.off(this.actionTypes.mergeSucceeded, func);
  }

  @proxify
  loadConference(conferenceId) {
    return this.store.dispatch({
      type: this.actionTypes.updateCurrentConferenceId,
      conferenceId,
    });
  }

  _init() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this._init();
    } else if (this._shouldReset()) {
      this._reset();
    }
  }

  _reset() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      this._auth.ready &&
      this._alert.ready &&
      this._callingSettings.ready &&
      this._call.ready &&
      this._rolesAndPermissions.ready &&
      this._connectivityMonitor.ready &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._auth.loggedIn ||
        !this._auth.ready ||
        !this._alert.ready ||
        !this._callingSettings.ready ||
        !this._call.ready ||
        !this._rolesAndPermissions.ready ||
        !this._connectivityMonitor.ready ||
        (!!this._availabilityMonitor && !this._availabilityMonitor.ready)) &&
      this.ready
    );
  }

  _checkPermission() {
    if (!this._rolesAndPermissions.hasConferenceCallPermission) {
      this._alert.danger({
        message: permissionsMessages.insufficientPrivilege,
        ttl: 0,
      });
      return false;
    }
    return true;
  }

  @proxify
  _hookConference(conference, session) {
    ['accepted'].forEach((evt) =>
      session.on(evt, () => this.startPollingConferenceStatus(conference.id)),
    );
    ['terminated', 'failed', 'rejected'].forEach((evt) =>
      session.on(evt, () => {
        this.store.dispatch({
          type: this.actionTypes.terminateConferenceSucceeded,
          conference,
        });
        this.stopPollingConferenceStatus(conference.id);
      }),
    );
  }

  @proxify
  async _mergeToConference(webphoneSessions = []) {
    const conferenceState = Object.values(this.conferences)[0];
    if (conferenceState) {
      const conferenceId = conferenceState.conference.id;
      this.stopPollingConferenceStatus(conferenceId);
      // for the sake of participants ordering, we can't concurrently bring in the participants
      for (const webphoneSession of webphoneSessions) {
        await this.bringInToConference(conferenceId, webphoneSession, true);
      }
      if (!this.conferences[conferenceId].profiles.length) {
        throw new Error(
          'bring-in operations failed, not all intended parties were brought in',
        );
      }
      this.startPollingConferenceStatus(conferenceId);
      return conferenceId;
    }
    const { id } = await this.makeConference(true);
    let confereceAccepted = false;
    await Promise.race([
      new Promise((resolve, reject) => {
        const sipSession = this._webphone._sessions.get(
          this.conferences[id].sessionId,
        );
        sipSession.on('accepted', () => {
          confereceAccepted = true;
          resolve();
        });
        sipSession.on('cancel', () => reject(new Error('conferecing cancel')));
        sipSession.on('failed', () => reject(new Error('conferecing failed')));
        sipSession.on('rejected', () =>
          reject(new Error('conferecing rejected')),
        );
        sipSession.on('terminated', () =>
          reject(new Error('conferecing terminated')),
        );
      }),
      new Promise((resolve, reject) => {
        setTimeout(
          () =>
            confereceAccepted
              ? resolve()
              : reject(new Error('conferecing timeout')),
          this._timout,
        );
      }),
    ]);
    await this._mergeToConference(webphoneSessions);
    return id;
  }

  @proxify
  async _makeConference(propagate = false) {
    try {
      this.store.dispatch({
        type: this.actionTypes.makeConference,
      });

      // TODO: replace with SDK function chaining calls
      const rawResponse = await this._client.service
        .platform()
        .post('/account/~/telephony/conference', {});
      const response = rawResponse.json();
      const conference = response.session;
      const phoneNumber = conference.voiceCallToken;
      // whether to mutate the session to mark the conference?
      const session = await this._call.call({
        phoneNumber,
        isConference: true,
      });
      if (
        typeof session === 'object' &&
        Object.prototype.toString.call(session.on).toLowerCase() ===
          '[object function]'
      ) {
        this._hookConference(conference, session);

        this.store.dispatch({
          type: this.actionTypes.makeConferenceSucceeded,
          conference,
          sessionId: session.id,
          parties: [],
        });
      } else {
        this.store.dispatch({
          type: this.actionTypes.makeConferenceFailed,
        });
      }
      return conference;
    } catch (e) {
      this.store.dispatch({
        type: this.actionTypes.makeConferenceFailed,
        message: e.toString(),
      });

      if (
        !propagate ||
        (!this._availabilityMonitor ||
          !this._availabilityMonitor.checkIfHAError(e))
      ) {
        this._alert.warning({
          message: conferenceCallErrors.makeConferenceFailed,
        });
        return null;
      }
      // need to propagate to out side try...catch block
      throw e;
    }
  }

  _getProfile(sessionId) {
    const session = this._webphone.sessions.find(
      (session) => session.id === sessionId,
    );

    let rcId;
    let avatarUrl;
    let calleeType = calleeTypes.unknown;
    let partyName =
      session.direction === callDirections.outbound
        ? session.toUserName
        : session.fromUserName;
    const partyNumber =
      session.direction === callDirections.outbound ? session.to : session.from;

    let matchedContact = session.contactMatch;
    if (!matchedContact && this._contactMatcher) {
      const nameMatches = this._contactMatcher.dataMapping[partyNumber];
      if (nameMatches && nameMatches.length) {
        matchedContact = nameMatches[0];
      }
    }

    if (matchedContact) {
      rcId = matchedContact.id;
      avatarUrl = matchedContact.profileImageUrl;
      partyName = matchedContact.name;
      calleeType = calleeTypes.contacts;
    }

    return {
      rcId,
      avatarUrl,
      partyName,
      partyNumber,
      calleeType,
    };
  }

  @proxify
  async parseMergingSessions({ sessionId, sessionIdToMergeWith }) {
    const session = find((x) => x.id === sessionId, this._webphone.sessions);

    const sessionToMergeWith = find(
      (x) => x.id === (sessionIdToMergeWith || this.mergingPair.fromSessionId),
      this._webphone.sessions,
    );

    const webphoneSessions = sessionToMergeWith
      ? [sessionToMergeWith, session]
      : [session];

    for (const session of webphoneSessions) {
      if (!this.validateCallRecording(session)) {
        return null;
      }
    }

    const conferenceState = Object.values(this.conferences)[0];
    if (conferenceState) {
      const conferenceSession = find(
        (x) => x.id === conferenceState.sessionId,
        this._webphone.sessions,
      );
      if (!this.validateCallRecording(conferenceSession)) {
        return null;
      }
    }

    return {
      session,
      sessionToMergeWith,
    };
  }

  @proxify
  async mergeSessions({ session, sessionToMergeWith }) {
    this.setMergeParty({
      toSessionId: session.id,
    });

    const webphoneSessions = sessionToMergeWith
      ? [sessionToMergeWith, session]
      : [session];
    await this.mergeToConference(webphoneSessions);

    const conferenceData = Object.values(this.conferences)[0];
    if (!conferenceData) {
      await this._webphone.resume(session.id);
      return null;
    }
    const currentConferenceSession = find(
      (x) => x.id === conferenceData.sessionId,
      this._webphone.sessions,
    );
    const isCurrentConferenceOnhold = currentConferenceSession.isOnHold;

    if (isCurrentConferenceOnhold) {
      this._webphone.resume(conferenceData.sessionId);
    }

    return conferenceData;
  }

  validateCallRecording(session) {
    if (isRecording(session)) {
      this._alert.warning({
        message: conferenceCallErrors.callIsRecording,
      });
      return false;
    }
    return true;
  }

  /*
   * User action track dispatchs
   * */

  participantListClickHangupTrack() {
    this.store.dispatch({
      type: this.actionTypes.participantListClickHangupTrack,
    });
  }

  removeParticipantClickCancelTrack() {
    this.store.dispatch({
      type: this.actionTypes.removeParticipantClickCancelTrack,
    });
  }

  removeParticipantClickRemoveTrack() {
    this.store.dispatch({
      type: this.actionTypes.removeParticipantClickRemoveTrack,
    });
  }

  get status() {
    return this.state.status;
  }

  get conferences() {
    return this.state.conferences;
  }

  get conferenceCallStatus() {
    return this.state.conferenceCallStatus;
  }

  get isMerging() {
    return this.state.isMerging;
  }

  get mergingPair() {
    return this.state.mergingPair;
  }

  get currentConferenceId() {
    return this.state.currentConferenceId;
  }

  @selector
  lastCallInfo = [
    () => this._webphone.sessions,
    () => this.mergingPair.fromSessionId,
    () => this.partyProfiles,
    (sessions, fromSessionId, partyProfiles) => {
      if (!fromSessionId) {
        _lastCallInfo = null;
        return _lastCallInfo;
      }

      let sessionName;
      let sessionNumber;
      let sessionStatus;
      let matchedContact;
      const fromSession = sessions.find(
        (session) => session.id === fromSessionId,
      );
      if (fromSession) {
        sessionName =
          fromSession.direction === callDirections.outbound
            ? fromSession.toUserName
            : fromSession.fromUserName;
        sessionNumber =
          fromSession.direction === callDirections.outbound
            ? fromSession.to
            : fromSession.from;
        sessionStatus = fromSession.callStatus;
        matchedContact = fromSession.contactMatch;
        if (!matchedContact && this._contactMatcher) {
          const nameMatches = this._contactMatcher.dataMapping[sessionNumber];
          if (nameMatches && nameMatches.length) {
            matchedContact = nameMatches[0];
          }
        }
      }

      let lastCalleeType;
      if (fromSession) {
        if (matchedContact) {
          lastCalleeType = calleeTypes.contacts;
        } else if (this.isConferenceSession(fromSession.id)) {
          lastCalleeType = calleeTypes.conference;
        } else {
          lastCalleeType = calleeTypes.unknown;
        }
      } else if (
        _fromSessionId === fromSessionId &&
        _lastCallInfo &&
        _lastCallInfo.calleeType
      ) {
        _lastCallInfo = {
          ..._lastCallInfo,
          status: sessionStatusEnum.finished,
        };
        return _lastCallInfo;
      } else {
        return {
          calleeType: calleeTypes.unknown,
        };
      }

      let partiesAvatarUrls = null;
      if (lastCalleeType === calleeTypes.conference) {
        partiesAvatarUrls = (partyProfiles || []).map(
          (profile) => profile.avatarUrl,
        );
      }
      switch (lastCalleeType) {
        case calleeTypes.conference:
          _lastCallInfo = {
            calleeType: calleeTypes.conference,
            avatarUrl: partiesAvatarUrls[0],
            extraNum: partiesAvatarUrls.length - 1,
            name: null,
            phoneNumber: null,
            status: sessionStatus,
            lastCallContact: null,
          };
          break;
        case calleeTypes.contacts:
          _lastCallInfo = {
            calleeType: calleeTypes.contacts,
            avatarUrl: matchedContact.profileImageUrl,
            name: matchedContact.name,
            status: sessionStatus,
            phoneNumber: sessionNumber,
            extraNum: 0,
            lastCallContact: matchedContact,
          };
          break;
        default:
          _lastCallInfo = {
            calleeType: calleeTypes.unknown,
            avatarUrl: null,
            name: sessionName,
            status: sessionStatus,
            phoneNumber: sessionNumber,
            extraNum: 0,
            lastCallContact: null,
          };
      }

      _fromSessionId = fromSessionId;
      return _lastCallInfo;
    },
  ];

  @selector
  partyProfiles = [
    () => this.currentConferenceId,
    () => this.conferences,
    (currentConferenceId, conferences) => {
      const conferenceData = conferences && conferences[currentConferenceId];
      if (!conferenceData) {
        return [];
      }
      return this.getOnlinePartyProfiles(currentConferenceId);
    },
  ];
}
