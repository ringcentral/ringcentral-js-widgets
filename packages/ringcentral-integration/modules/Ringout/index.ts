import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import sleep from '../../lib/sleep';
import actionTypes from './actionTypes';
import getRingoutReducer from './getRingoutReducer';
import ringoutErrors from './ringoutErrors';

const DEFAULT_MONITOR_INTERVAL = 2500;
const DEFAULT_TIME_BETWEEN_CALLS = 10000;

/**
 * @class
 * @description Ringout managing module
 */
@Module({
  deps: [
    'Auth',
    'Client',
    { dep: 'ContactMatcher', optional: true },
    { dep: 'RingoutOptions', optional: true },
  ],
})
export default class Ringout extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {Number} params.monitorInterval - monitor interval, default 2500
   * @param {Number} params.timeBetweenCalls - time between calls, default 10000
   * @param {MontactMatcher} param.contactMatcher - contactMatcher module instance, optional
   */
  constructor({
    auth,
    client,
    contactMatcher,
    monitorInterval = DEFAULT_MONITOR_INTERVAL,
    timeBetweenCalls = DEFAULT_TIME_BETWEEN_CALLS,
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = auth;
    this._client = client;
    this._contactMatcher = contactMatcher;
    this._reducer = getRingoutReducer(this.actionTypes);
    this._monitorInterval = monitorInterval;
    this._timeBetweenCalls = timeBetweenCalls;
  }

  initialize() {
    this.store.subscribe(() => {
      if (this._auth.loggedIn && !this.ready) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess,
        });
      } else if (!this._auth.loggedIn && this.ready) {
        this.store.dispatch({
          type: this.actionTypes.resetSuccess,
        });
      }
    });
  }

  @proxify
  async makeCall({ fromNumber, toNumber, prompt }) {
    if (this.status === moduleStatuses.ready) {
      this.store.dispatch({
        type: this.actionTypes.startToConnect,
      });
      try {
        const resp = await this._client
          .account()
          .extension()
          .ringOut()
          .post({
            from: { phoneNumber: fromNumber },
            to: { phoneNumber: toNumber },
            playPrompt: prompt,
          });

        if (this._contactMatcher) {
          await this._contactMatcher.forceMatchBatchNumbers({
            phoneNumbers: [fromNumber, toNumber],
          });
        }

        const startTime = Date.now();
        await this._monitorRingout(resp.id, startTime);

        this.store.dispatch({
          type: this.actionTypes.connectSuccess,
        });
      } catch (e) {
        this.store.dispatch({
          type: this.actionTypes.connectError,
        });
        if (e.message !== ringoutErrors.pollingCancelled) {
          throw e;
        }
      }
    } else {
      // TODO: Need to dispatch a generic error action
    }
  }

  @proxify
  async _monitorRingout(ringoutId, startTime) {
    let callerStatus = await this._fetchRingoutStatus(ringoutId);
    while (callerStatus === 'InProgress') {
      if (Date.now() - startTime > this._timeBetweenCalls) {
        throw new Error(ringoutErrors.pollingCancelled);
      }
      await sleep(this._monitorInterval);
      callerStatus = await this._fetchRingoutStatus(ringoutId);
    }
    if (callerStatus !== 'Success' && callerStatus !== 'NoAnswer') {
      throw new Error(ringoutErrors.firstLegConnectFailed);
    }
  }

  @proxify
  async _fetchRingoutStatus(ringoutId) {
    try {
      let callStatus;
      const resp = await this._client
        .account()
        .extension()
        .ringOut(ringoutId)
        .get()
        .catch((error) => {
          if (error && error.response && error.response.status === 404) {
            callStatus = 'Success';
          }
        });
      return callStatus || resp.status.callerStatus;
    } catch (e) {
      const exception = new Error(ringoutErrors.pollingFailed);
      exception.error = e;
      throw exception;
    }
  }

  get status() {
    return this.state.status;
  }

  get ringoutStatus() {
    return this.state.ringoutStatus;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }
}
