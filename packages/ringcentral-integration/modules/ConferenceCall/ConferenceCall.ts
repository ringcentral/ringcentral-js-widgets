import { EventEmitter } from 'events';
import { filter, find, is, map, values } from 'ramda';

import {
  action,
  computed,
  RcModuleV2,
  state,
  track,
} from '@ringcentral-integration/core';

import callDirections from '../../enums/callDirections';
import calleeTypes from '../../enums/calleeTypes';
import { permissionsMessages } from '../../enums/permissionsMessages';
import {
  NormalizedSession,
  WebphoneSession,
} from '../../interfaces/Webphone.interface';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { trackEvents } from '../../enums/trackEvents';
import { callingModes } from '../CallingSettings';
import sessionStatusEnum from '../Webphone/sessionStatus';
import { isConferenceSession, isRecording } from '../Webphone/webphoneHelper';
import {
  Conference,
  ConferencesState,
  ConferenceState,
  Deps,
  LastCallInfo,
  MergingPair,
  Party,
  PartyState,
} from './ConferenceCall.interface';
import { conferenceCallErrors } from './conferenceCallErrors';
import {
  ascendSortParties,
  conferenceCallStatus,
  DEFAULT_TIMEOUT,
  DEFAULT_TTL,
  MAXIMUM_CAPACITY,
  mergeEvents,
  mergeParty,
  partyStatusCode,
} from './lib';

@Module({
  name: 'ConferenceCall',
  deps: [
    'Auth',
    'Alert',
    'Call',
    'CallingSettings',
    'ConnectivityMonitor',
    'Client',
    'AppFeatures',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'ConferenceCallOptions', optional: true },
  ],
})
export class ConferenceCall extends RcModuleV2<Deps> {
  private _eventEmitter = new EventEmitter();
  private _timers: {
    [key: string]: number;
  } = {};

  // @ts-expect-error
  private _fromSessionId: string;
  private _ttl: number = DEFAULT_TTL;
  private _timeout: number =
    this._deps.conferenceCallOptions?.timeout ?? DEFAULT_TIMEOUT;
  private _capacity: number =
    this._deps.conferenceCallOptions?.capacity ?? MAXIMUM_CAPACITY;
  protected _pulling: boolean =
    this._deps.conferenceCallOptions?.pulling ?? true;
  // @ts-expect-error
  private _lastCallInfo: {
    calleeType: string;
    extraNum: number;
    phoneNumber?: string;
    status: string;
    lastCallContact?: any;
    avatarUrl?: string;
    name?: string;
  };

  @state
  conferences: ConferencesState = {};

  @state
  conferenceCallStatus = conferenceCallStatus.idle;

  @state
  mergingPair: MergingPair = {};

  @state
  // @ts-expect-error
  currentConferenceId: string = null;

  @state
  isMerging = false;

  constructor(deps: Deps) {
    super({ deps });
  }

  @action
  setIsMerging(state: boolean) {
    this.isMerging = state;
  }

  @action
  setCurrentConferenceId(id: string) {
    this.currentConferenceId = id;
  }

  @action
  setMergingPair(val: MergingPair) {
    this.mergingPair = val;
  }

  @action
  setConferencesState(val: ConferencesState) {
    this.conferences = val;
  }

  @action
  toggleConferenceCallStatus() {
    if (this.conferenceCallStatus === conferenceCallStatus.idle) {
      this.conferenceCallStatus = conferenceCallStatus.requesting as any;
      return;
    }
    this.conferenceCallStatus = conferenceCallStatus.idle as any;
  }

  @action
  setConferenceCallStatus(val: conferenceCallStatus) {
    this.conferenceCallStatus = val;
  }

  @proxify
  async updateAConference(conference: Conference, sessionId: string) {
    this.setConferencesState({
      ...this.conferences,
      [conference.id]: {
        conference,
        sessionId,
        profiles:
          (this.conferences[conference.id] &&
            this.conferences[conference.id].profiles) ||
          [],
      } as ConferenceState,
    });
  }

  bringInParty(
    conference: Conference,
    sessionId: string,
    partyProfile: PartyState,
  ) {
    this.setConferencesState({
      ...this.conferences,
      [conference.id]: {
        conference,
        sessionId,
        profiles: [...this.conferences[conference.id].profiles, partyProfile],
      },
    });
  }

  @action
  removeConference(id: string) {
    delete this.conferences[id];
  }

  isConferenceSession(sessionId: string) {
    // only can be used after webphone._onCallStartFunc
    let res = !!this.findConferenceWithSession(sessionId);

    if (this.isMerging && !res) {
      const session = find(
        (session) => session.id === sessionId,
        // @ts-expect-error
        this._deps.webphone.sessions,
      );
      // @ts-expect-error
      res = isConferenceSession(session);
    }

    return res;
  }

  findConferenceWithSession(sessionId: string) {
    return find((c) => c.sessionId === sessionId, values(this.conferences));
  }

  @proxify
  async updateConferenceStatus(id: string) {
    this.setConferenceCallStatus(conferenceCallStatus.requesting);
    try {
      const rawResponse = await this._deps.client.service
        .platform()
        .get(`/restapi/v1.0/account/~/telephony/sessions/${id}`);
      const response = await rawResponse.json();
      const storedConference = this.conferences[response.id];
      const conference = { ...storedConference.conference };
      conference.parties =
        // if BE session hasn't been updated
        conference.parties.length > response.parties.length
          ? mergeParty(response.parties, conference.parties)
          : response.parties;
      const { sessionId } = storedConference;
      this.updateAConference(conference, sessionId);
    } finally {
      this.setConferenceCallStatus(conferenceCallStatus.idle);
      // eslint-disable-next-line no-unsafe-finally
      return this.conferences[id];
    }
  }

  @proxify
  async terminateConference(id: string) {
    if (this.conferenceCallStatus === conferenceCallStatus.requesting) {
      return;
    }
    this.setConferenceCallStatus(conferenceCallStatus.requesting);
    const conferenceData = this.conferences[id];
    try {
      if (!conferenceData) {
        return;
      }
      if (this._deps.webphone) {
        this._deps.webphone.hangup(conferenceData.sessionId);
      }
      await this._deps.client.service
        .platform()
        .delete(`/restapi/v1.0/account/~/telephony/sessions/${id}`);
      this.removeConference(id);
    } catch (e: any /** TODO: confirm with instanceof */) {
      if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(e))
      ) {
        this._deps.alert.warning({
          message: conferenceCallErrors.terminateConferenceFailed,
        });
      }
    } finally {
      this.setConferenceCallStatus(conferenceCallStatus.idle);
      // eslint-disable-next-line no-unsafe-finally
      return conferenceData;
    }
  }

  @proxify
  async bringInToConference(
    id: string,
    webphoneSession: NormalizedSession,
    propagate: boolean = false,
  ) {
    const conferenceState = this.conferences[id];
    if (
      !conferenceState ||
      !this.ready ||
      !webphoneSession ||
      this.isOverload(id) ||
      !this._deps.connectivityMonitor.connectivity
    ) {
      this._deps.alert.danger({
        message: conferenceCallErrors.modeError,
        ttl: 0,
      });
      return null;
    }
    const { sessionId } = conferenceState;
    let { conference } = conferenceState;
    this.setConferenceCallStatus(conferenceCallStatus.requesting);

    try {
      const partyProfile = this._getProfile(webphoneSession.id);
      await this._deps.client.service
        .platform()
        .post(
          `/restapi/v1.0/account/~/telephony/sessions/${id}/parties/bring-in`,
          webphoneSession.partyData,
        );
      const newConference = await this.updateConferenceStatus(id);
      conference = newConference.conference;

      if (partyProfile) {
        const conferenceState = this.conferences[id];
        const newParties = ascendSortParties(
          conferenceState.conference.parties,
        );
        // @ts-expect-error
        (partyProfile as PartyState).id = newParties[newParties.length - 1].id;
        this.bringInParty(conference, sessionId, partyProfile as PartyState);
      }
      // else using BE push notification to get the new party data
      return id;
    } catch (e: any /** TODO: confirm with instanceof */) {
      if (!propagate) {
        return;
      }
      throw e;
    } finally {
      this.setConferenceCallStatus(conferenceCallStatus.idle);
    }
  }

  @proxify
  async removeFromConference(id: string, partyId: string) {
    this.setConferenceCallStatus(conferenceCallStatus.requesting);
    try {
      await this._deps.client.service
        .platform()
        .delete(
          `/restapi/v1.0/account/~/telephony/sessions/${id}/parties/${partyId}`,
        );
      await this.updateConferenceStatus(id);
    } catch (e: any /** TODO: confirm with instanceof */) {
      if (
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(e))
      ) {
        this._deps.alert.warning({
          message: conferenceCallErrors.removeFromConferenceFailed,
        });
      }
    } finally {
      this.setConferenceCallStatus(conferenceCallStatus.idle);
      // eslint-disable-next-line no-unsafe-finally
      return this.conferences[id];
    }
  }

  @proxify
  async makeConference(propagate = false) {
    if (!this.ready || !this._deps.connectivityMonitor.connectivity) {
      this._deps.alert.danger({
        message: conferenceCallErrors.modeError,
        ttl: 0,
      });

      return null;
    }
    if (!this._checkPermission()) {
      // TODO: investigate whether this could potentially show 2 notifications at once
      if (!propagate) {
        this._deps.alert.danger({
          message: permissionsMessages.insufficientPrivilege,
          ttl: 0,
        });
      }

      return null;
    }
    if (!(this._deps.callingSettings.callingMode === callingModes.webphone)) {
      if (!propagate) {
        this._deps.alert.danger({
          message: conferenceCallErrors.modeError,
          ttl: 0,
        });
      }

      return null;
    }
    const conference = await this._makeConference(propagate);
    return conference;
  }

  /**
   * Merge calls to (or create) a conference.
   * @param {webphone.sessions} webphoneSessions
   * FIXME: dynamically construct this function during the construction
   * to avoid `webphone` criterias to improve performance ahead of time
   */
  @proxify
  async mergeToConference(webphoneSessions: NormalizedSession[] = []) {
    webphoneSessions = filter(
      (session) => !this.isConferenceSession(session.id),
      filter((session) => !!session, webphoneSessions),
    );

    if (!webphoneSessions.length) {
      this._deps.alert.warning({
        message: conferenceCallErrors.bringInFailed,
      });
      return;
    }
    this.setIsMerging(true);
    let sipInstances;
    let conferenceId = null;

    if (this._deps.webphone) {
      /**
       * Because the concurrency behaviour of the server,
       * we cannot sure the merging process is over when
       * the function's procedure has finshed.
       */
      sipInstances = map(
        (webphoneSession) =>
          // @ts-expect-error
          this._deps.webphone._sessions.get(webphoneSession.id),
        webphoneSessions,
      );
      /**
       * HACK: we need to preserve the merging session in prevent the glitch of
       * the call control page.
       */
      const sessionIds = map((x) => x.id, webphoneSessions);
      this._deps.webphone.setSessionCaching(sessionIds);

      const pSips = map((instance) => {
        const p = new Promise((resolve) => {
          // @ts-expect-error
          instance.on('terminated', () => {
            resolve(null);
          });
        });
        return p;
      }, sipInstances);

      await Promise.all([
        this._mergeToConference(webphoneSessions),
        ...pSips,
      ]).then(
        () => {
          this.setIsMerging(false);
          this.setMergingPair({});
          const conferenceState = Object.values(this.conferences)[0];

          this._eventEmitter.emit(mergeEvents.mergeSucceeded, conferenceState);
        },
        (e) => {
          console.error(e);
          const conferenceState = Object.values(this.conferences)[0];

          /**
           * if create conference successfully but failed to bring-in,
           *  then terminate the conference.
           */
          if (conferenceState && conferenceState.profiles.length < 1) {
            this.terminateConference(conferenceState.conference.id);
          }
          this._deps.alert.warning({
            message: conferenceCallErrors.bringInFailed,
          });
          this.setIsMerging(false);
        },
      );
      this._deps.webphone.clearSessionCaching();
    } else {
      try {
        conferenceId = await this._mergeToConference(webphoneSessions);

        this.setIsMerging(false);
        this.setMergingPair({});
        this._eventEmitter.emit(mergeEvents.mergeSucceeded);
      } catch (e: any /** TODO: confirm with instanceof */) {
        const conferenceState = Object.values(this.conferences)[0];
        /**
         * if create conference successfully but failed to bring-in,
         *  then terminate the conference.
         */
        if (
          conferenceState &&
          conferenceState?.conference?.parties?.length < 1
        ) {
          this.terminateConference(conferenceState.conference.id);
        }

        if (
          !this._deps.availabilityMonitor ||
          !(await this._deps.availabilityMonitor.checkIfHAError(e))
        ) {
          this._deps.alert.warning({
            message: conferenceCallErrors.bringInFailed,
          });
        }
      }

      if (!sipInstances || conferenceId === null) {
        this.setIsMerging(false);
      }
    }
  }

  @proxify
  async setMergeParty({
    fromSessionId,
    toSessionId,
  }: {
    fromSessionId?: string;
    toSessionId?: string;
  }) {
    if (fromSessionId) {
      this.setMergingPair({ fromSessionId });
      return;
    }
    this.setMergingPair({
      ...this.mergingPair,
      ...(toSessionId && { toSessionId }),
    });
  }

  @proxify
  async closeMergingPair() {
    if (!this.mergingPair.fromSessionId) {
      return;
    }
    this.setMergingPair({});
  }

  getOnlinePartyProfiles(id: string): (Party & PartyState)[] {
    const conferenceData = this.conferences[id];

    if (!conferenceData) {
      // @ts-expect-error
      return null;
    }

    return ascendSortParties(conferenceData.conference.parties)
      .reduce((accum, party, idx) => {
        if (
          party?.status?.code.toLowerCase() !== partyStatusCode.disconnected
        ) {
          // 0 position is the host
          // @ts-expect-error
          accum.push({ idx, party });
        }
        return accum;
      }, [])
      .map(({ idx, party }) => ({
        // @ts-expect-error
        ...party,
        ...conferenceData.profiles[idx],
      }))
      .filter((i) => !!i);
  }

  getOnlineParties(id: string) {
    const conferenceData = this.conferences[id];
    if (!conferenceData) {
      return null;
    }
    return filter(
      (p) => p?.status?.code?.toLowerCase() !== partyStatusCode.disconnected,
      conferenceData.conference.parties,
    );
  }

  countOnlineParties(id: string) {
    const res = this.getOnlineParties(id);
    // @ts-expect-error
    return is(Array, res) ? res.length : null;
  }

  isOverload(id: string) {
    // @ts-expect-error
    return this.countOnlineParties(id) >= this._capacity;
  }

  @proxify
  async startPollingConferenceStatus(id: string) {
    if (this._timers[id] || !this._pulling) {
      return;
    }

    await this.updateConferenceStatus(id);
    this._timers[id] = window.setTimeout(async () => {
      await this.updateConferenceStatus(id);
      this.stopPollingConferenceStatus(id);
      if (this.conferences[id]) {
        this.startPollingConferenceStatus(id);
      }
    }, this._ttl);
  }

  stopPollingConferenceStatus(id: string) {
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
    this._pulling = !this._pulling;
  }

  setCapacity(capacity = MAXIMUM_CAPACITY) {
    if (typeof capacity !== 'number') {
      throw new Error('The capcity must be a number');
    }
    this._capacity = capacity;
    return capacity;
  }

  setTimeout(timeout: number = DEFAULT_TIMEOUT) {
    if (typeof timeout !== 'number') {
      throw new Error('The timeout must be a number');
    }
    this._timeout = timeout;
    return timeout;
  }

  onMergeSuccess(func: (...args: any[]) => void, isOnce?: boolean) {
    if (isOnce) {
      this._eventEmitter.once(mergeEvents.mergeSucceeded, func);
      return;
    }
    this._eventEmitter.on(mergeEvents.mergeSucceeded, func);
  }

  removeMergeSuccess(func: (...args: any[]) => void) {
    this._eventEmitter.off(mergeEvents.mergeSucceeded, func);
  }

  @proxify
  async loadConference(conferenceId: string) {
    this.setCurrentConferenceId(conferenceId);
  }

  override onReset() {
    this.resetSuccess();
  }

  get hasPermission() {
    return this._deps.appFeatures.hasConferenceCall;
  }

  private _checkPermission() {
    if (!this.hasPermission) {
      this._deps.alert.danger({
        message: permissionsMessages.insufficientPrivilege,
        ttl: 0,
      });
      return false;
    }
    return true;
  }

  @proxify
  private async _hookConference(
    conference: Conference,
    session: WebphoneSession,
  ) {
    ['accepted'].forEach((evt) =>
      session.on(evt as any, () =>
        this.startPollingConferenceStatus(conference.id),
      ),
    );
    ['terminated', 'failed', 'rejected'].forEach((evt) =>
      session.on(evt as any, () => {
        this.setConferenceCallStatus(conferenceCallStatus.idle);
        this.removeConference(conference.id);
        this.stopPollingConferenceStatus(conference.id);
      }),
    );
  }

  @proxify
  private async _mergeToConference(webphoneSessions: NormalizedSession[] = []) {
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
    // @ts-expect-error
    const { id } = await this.makeConference(true);
    let conferenceAccepted = false;
    await Promise.race([
      new Promise((resolve, reject) => {
        // @ts-expect-error
        const sipSession = this._deps.webphone._sessions.get(
          this.conferences[id].sessionId,
        );
        // @ts-expect-error
        sipSession.on('accepted', () => {
          conferenceAccepted = true;
          resolve(null);
        });
        // @ts-expect-error
        sipSession.on('cancel', () => reject(new Error('conferencing cancel')));
        // @ts-expect-error
        sipSession.on('failed', () => reject(new Error('conferencing failed')));
        // @ts-expect-error
        sipSession.on('rejected', () =>
          reject(new Error('conferencing rejected')),
        );
        // @ts-expect-error
        sipSession.on('terminated', () =>
          reject(new Error('conferencing terminated')),
        );
      }),
      new Promise((resolve, reject) => {
        setTimeout(
          () =>
            conferenceAccepted
              ? resolve(null)
              : reject(new Error('conferencing timeout')),
          this._timeout,
        );
      }),
    ]);
    await this._mergeToConference(webphoneSessions);
    return id;
  }

  @proxify
  private async _makeConference(propagate = false) {
    this.setConferenceCallStatus(conferenceCallStatus.requesting);
    try {
      // TODO: replace with SDK function chaining calls
      const rawResponse = await this._deps.client.service
        .platform()
        .post('/restapi/v1.0/account/~/telephony/conference', {});
      const response = await rawResponse.json();
      const conference = response.session as Conference;
      const phoneNumber = conference.voiceCallToken;
      // whether to mutate the session to mark the conference?
      const session = await this._deps.call.call({
        phoneNumber,
        isConference: true,
      } as any);
      if (
        typeof session === 'object' &&
        Object.prototype.toString.call(session.on).toLowerCase() ===
          '[object function]'
      ) {
        this._hookConference(conference, session);
        this.updateAConference(conference, session.id);
      }
      return conference;
    } catch (e: any /** TODO: confirm with instanceof */) {
      console.error(e);
      if (
        !propagate ||
        !this._deps.availabilityMonitor ||
        !(await this._deps.availabilityMonitor.checkIfHAError(e))
      ) {
        this._deps.alert.warning({
          message: conferenceCallErrors.makeConferenceFailed,
        });

        return null;
      }
      // need to propagate to out side try...catch block
      throw e;
    } finally {
      this.setConferenceCallStatus(conferenceCallStatus.idle);
    }
  }

  // get profile the a webphone session
  private _getProfile(sessionId: string) {
    const session = find(
      (session) => session.id === sessionId,
      // @ts-expect-error
      this._deps.webphone.sessions,
    );

    let rcId;
    let avatarUrl;
    let calleeType = calleeTypes.unknown;
    let partyName =
      // @ts-expect-error
      session.direction === callDirections.outbound
        ? // @ts-expect-error
          session.toUserName
        : // @ts-expect-error
          session.fromUserName;
    const partyNumber =
      // @ts-expect-error
      session.direction === callDirections.outbound ? session.to : session.from;

    // @ts-expect-error
    let matchedContact = session.contactMatch;
    if (!matchedContact && this._deps.contactMatcher) {
      const nameMatches = this._deps.contactMatcher.dataMapping[partyNumber];
      if (nameMatches && nameMatches.length) {
        matchedContact = nameMatches[0];
      }
    }

    if (matchedContact) {
      rcId = matchedContact.id;
      avatarUrl = (matchedContact as any).profileImageUrl;
      partyName = (matchedContact as any).name;
      calleeType = calleeTypes.contacts;
    }

    return {
      rcId,
      avatarUrl,
      partyName,
      partyNumber,
      calleeType,
    } as Omit<PartyState, 'id'>;
  }

  @proxify
  async parseMergingSessions({
    sessionId,
    sessionIdToMergeWith,
  }: {
    sessionId: string;
    sessionIdToMergeWith?: string;
  }) {
    const session = find(
      (x) => x.id === sessionId,
      // @ts-expect-error
      this._deps.webphone.sessions,
    );

    const sessionToMergeWith = find(
      (x) => x.id === (sessionIdToMergeWith || this.mergingPair.fromSessionId),
      // @ts-expect-error
      this._deps.webphone.sessions,
    );

    const webphoneSessions = sessionToMergeWith
      ? [sessionToMergeWith, session]
      : [session];

    for (const session of webphoneSessions) {
      // @ts-expect-error
      if (!this.validateCallRecording(session)) {
        return null;
      }
    }

    const conferenceState = Object.values(this.conferences)[0];
    if (conferenceState) {
      const conferenceSession = find(
        (x) => x.id === conferenceState.sessionId,
        // @ts-expect-error
        this._deps.webphone.sessions,
      );
      // @ts-expect-error
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
  async mergeSessions({
    session,
    sessionToMergeWith,
  }: {
    session: NormalizedSession;
    sessionToMergeWith: NormalizedSession;
  }) {
    this.setMergeParty({
      toSessionId: session.id,
    });
    const webphoneSessions = sessionToMergeWith
      ? [sessionToMergeWith, session]
      : [session];
    await this.mergeToConference(webphoneSessions);

    const conferenceData = Object.values(this.conferences)[0];
    if (!conferenceData) {
      // @ts-expect-error
      await this._deps.webphone.resume(session.id);
      return null;
    }
    const currentConferenceSession = find(
      (x) => x.id === conferenceData.sessionId,
      // @ts-expect-error
      this._deps.webphone.sessions,
    );
    // @ts-expect-error
    const isCurrentConferenceOnHold = currentConferenceSession.isOnHold;

    if (isCurrentConferenceOnHold) {
      // @ts-expect-error
      this._deps.webphone.resume(conferenceData.sessionId);
    }

    return conferenceData;
  }

  validateCallRecording(session: NormalizedSession) {
    if (isRecording(session)) {
      this._deps.alert.warning({
        message: conferenceCallErrors.callIsRecording,
      });
      return false;
    }
    return true;
  }

  @action
  resetSuccess() {
    this.setIsMerging(false);
    this.setMergingPair({});
    // @ts-expect-error
    this.setCurrentConferenceId(null);
    this.conferenceCallStatus = conferenceCallStatus.idle as any;
    this.conferences = {};
  }

  /*
   * User action track dispatchs
   * */
  @track(trackEvents.clickHangupParticipantList)
  participantListClickHangupTrack() {}

  @track(trackEvents.cancelRemoveRemoveParticipantsModal)
  removeParticipantClickCancelTrack() {}

  @track(trackEvents.clickRemoveRemoveParticipantsModal)
  removeParticipantClickRemoveTrack() {}

  override _shouldInit() {
    return this._deps.auth.loggedIn && super._shouldInit();
  }

  override _shouldReset() {
    return super._shouldReset() || (this.ready && !this._deps.auth.loggedIn);
  }

  @computed((that: ConferenceCall) => [
    // @ts-expect-error
    that._deps.webphone.sessions,
    that.mergingPair.fromSessionId,
    that.partyProfiles,
  ])
  get lastCallInfo(): LastCallInfo {
    // @ts-expect-error
    const { sessions } = this._deps.webphone;
    const {
      partyProfiles,
      mergingPair: { fromSessionId },
    } = this;
    if (!fromSessionId) {
      // @ts-expect-error
      this._lastCallInfo = null;
      return this._lastCallInfo;
    }

    let sessionName;
    let sessionNumber;
    let sessionStatus;
    let matchedContact;
    const fromSession = sessions.find(
      // @ts-expect-error
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
      if (!matchedContact && this._deps.contactMatcher) {
        const nameMatches =
          this._deps.contactMatcher.dataMapping[sessionNumber];
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
      this._fromSessionId === fromSessionId &&
      this._lastCallInfo &&
      this._lastCallInfo.calleeType
    ) {
      this._lastCallInfo = {
        ...this._lastCallInfo,
        status: sessionStatusEnum.finished,
      };
      return this._lastCallInfo;
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
        this._lastCallInfo = {
          calleeType: calleeTypes.conference,
          // @ts-expect-error
          avatarUrl: partiesAvatarUrls[0],
          // @ts-expect-error
          extraNum: partiesAvatarUrls.length - 1,
          // @ts-expect-error
          name: null,
          // @ts-expect-error
          phoneNumber: null,
          status: sessionStatus,
          lastCallContact: null,
        };
        break;
      case calleeTypes.contacts:
        this._lastCallInfo = {
          calleeType: calleeTypes.contacts,
          avatarUrl: (matchedContact as any).profileImageUrl,
          name: (matchedContact as any).name,
          status: sessionStatus,
          phoneNumber: sessionNumber,
          extraNum: 0,
          lastCallContact: matchedContact,
        };
        break;
      default:
        this._lastCallInfo = {
          calleeType: calleeTypes.unknown,
          // @ts-expect-error
          avatarUrl: null,
          name: sessionName,
          status: sessionStatus,
          phoneNumber: sessionNumber,
          extraNum: 0,
          lastCallContact: null,
        };
    }

    this._fromSessionId = fromSessionId;
    return this._lastCallInfo;
  }

  @computed((that: ConferenceCall) => [
    that.currentConferenceId,
    that.conferences,
  ])
  get partyProfiles() {
    const { currentConferenceId, conferences } = this;
    const conferenceData = conferences && conferences[currentConferenceId];
    if (!conferenceData) {
      return [];
    }
    return this.getOnlinePartyProfiles(currentConferenceId);
  }
}
