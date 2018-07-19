import { Module } from '../../lib/di';
import Presence from '../Presence';
import actionTypes from './actionTypes';
import getDetailedPresenceReducer from './getDetailedPresenceReducer';
import subscriptionFilters from '../../enums/subscriptionFilters';
import throttle from '../../lib/throttle';
import {
  isEnded,
  removeInboundRingOutLegs,
} from '../../lib/callLogHelpers';
import proxify from '../../lib/proxy/proxify';

const presenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;
const FETCH_THRESHOLD = 2000;

/**
 * @class
 * @description Presence detail info managing module
 */
@Module({
  deps: [
    { dep: 'DetailedPresenceOptions', optional: true }
  ]
})
export default class DetailedPresence extends Presence {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {ConnectivityMonitor} params.connectivityMonitor - connectivityMonitor module instance
   */
  constructor(options) {
    super({
      getReducer: getDetailedPresenceReducer,
      subscriptionFilter: subscriptionFilters.detailedPresenceWithSip,
      actionTypes,
      lastNotDisturbDndStatusStorageKey: 'lastNotDisturbDndStatusDetailPresence',
      ...options
    });

    this.addSelector('sessionIdList',
      () => this.state.calls,
      calls => calls.map(call => call.sessionId),
    );

    this.addSelector('calls',
      () => this.state.data,
      data => (
        removeInboundRingOutLegs(data)
          .filter(call => !isEnded(call))
      ),
    );
  }

  _subscriptionHandler = (message) => {
    if (presenceRegExp.test(message.event) && message.body) {
      if (message.body.sequence) {
        if (message.body.sequence <= this._lastSequence) {
          return;
        }
        this._lastSequence = message.body.sequence;
      }
      const {
        activeCalls,
        dndStatus,
        telephonyStatus,
        presenceStatus,
        userStatus,
        totalActiveCalls,
      } = message.body;

      this.store.dispatch({
        type: this.actionTypes.notification,
        activeCalls,
        dndStatus,
        telephonyStatus,
        presenceStatus,
        userStatus,
        message: message.body.message,
        lastDndStatus: this.dndStatus,
        timestamp: Date.now(),
      });

      /**
       * as pointed out by Igor in https://jira.ringcentral.com/browse/PLA-33391,
       * when the real calls count larger than the active calls returned by the pubnub,
       * we need to pulling the calls manually.
       */
      if (
        activeCalls &&
        Array.isArray(activeCalls) &&
        activeCalls.length < totalActiveCalls
      ) {
        this.fetchRemainingCalls();
      }
    }
  }

  get data() {
    return this.state.data;
  }

  get calls() {
    return this._selectors.calls();
  }

  get telephonyStatus() {
    return this.state.telephonyStatus;
  }

  get sessionIdList() {
    return this._selectors.sessionIdList();
  }

  @proxify
  async _fetch() {
    this.store.dispatch({
      type: this.actionTypes.fetch,
    });
    const { ownerId } = this._auth;
    try {
      const {
        activeCalls,
        dndStatus,
        telephonyStatus,
        presenceStatus,
        userStatus,
        message,
      } = (await this._client.service.platform()
        .get(subscriptionFilters.detailedPresenceWithSip)).json();
      if (this._auth.ownerId === ownerId) {
        this.store.dispatch({
          type: this.actionTypes.fetchSuccess,
          activeCalls,
          dndStatus,
          telephonyStatus,
          presenceStatus,
          userStatus,
          message,
          timestamp: Date.now(),
        });
        this._promise = null;
      }
    } catch (error) {
      if (this._auth.ownerId === ownerId) {
        this.store.dispatch({
          type: this.actionTypes.fetchError,
          error,
        });
        this._promise = null;
      }
    }
  }

  async fetchRemainingCalls() {
    return throttle(this::this._fetch(), FETCH_THRESHOLD);
  }
}
