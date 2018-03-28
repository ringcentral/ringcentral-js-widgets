import background from '../../lib/background';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import actionTypes from './actionTypes';
import callStatus from './callStatus';
import getRecentCallsReducer from './getRecentCallsReducer';
import getDateFrom from '../../lib/getDateFrom';
import ensureExist from '../../lib/ensureExist';
import concurrentExecute from '../../lib/concurrentExecute';

/**
 * @class
 * @description Retrieve all recent calls related to a specified contact.
 */
@Module({
  deps: ['Client', 'CallHistory']
})
export default class RecentCalls extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {CallHistory} params.callHistory - callHistory module instance
   * @param {Client} params.client - client module instance
   */
  constructor({
    client,
    callHistory,
    ...options
  }) {
    super({
      actionTypes,
      ...options
    });
    this._client = this::ensureExist(client, 'client');
    this._callHistory = this::ensureExist(callHistory, 'callHistory');
    this._reducer = getRecentCallsReducer(this.actionTypes);
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (
      this.pending &&
      this._callHistory.ready
    ) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (
      this.ready &&
      !this._callHistory.ready
    ) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }

  get calls() {
    return this.state.calls;
  }

  get isCallsLoaded() {
    return this.state.callStatus === callStatus.loaded;
  }

  @background
  async getCalls({ currentContact, sessionId = null }) {
    // No need to calculate recent calls of the same contact repeatly
    if (!currentContact) {
      return;
    }
    const contactId = String(currentContact && currentContact.id);
    // if (this.calls[currentContact.id]) {
    if (this.calls[sessionId ? `${contactId}-${sessionId}` : contactId]) {
      return;
    }
    this.store.dispatch({
      type: this.actionTypes.initLoad
    });
    const calls = await this._getRecentCalls(
      currentContact,
      this._callHistory.calls
    );
    this.store.dispatch({
      type: this.actionTypes.loadSuccess,
      calls,
      contact: currentContact,
      sessionId
    });
  }

  cleanUpCalls({ contact, sessionId = null }) {
    this.store.dispatch({
      type: this.actionTypes.loadReset,
      contact,
      sessionId,
    });
  }

  get status() {
    return this.state.status;
  }

  /**
   * Searching for recent calls of specific contact.
   * @param {Object} currentContact Current contact
   * @param {Array} calls Calls in callHistory
   * @param {Number} daySpan Find calls within certain days
   * @param {Number} length Maximum length of recent calls
   * @return {Array}
   * @private
   */
  async _getRecentCalls(currentContact, calls = [], daySpan = 60, length = 5) {
    const dateFrom = getDateFrom(daySpan);
    let recentCalls = this._getLocalRecentCalls(
      currentContact,
      calls,
      dateFrom
    );

    // If we could not find enough recent calls,
    // we need to search for calls on server.
    if (recentCalls.length < length) {
      recentCalls = await this._fetchRemoteRecentCalls(
        currentContact,
        dateFrom.toISOString(),
        length
      );
    }

    recentCalls.sort(this._sortByTime);
    recentCalls = this._dedup(recentCalls);
    return recentCalls.length > length
      ? recentCalls.slice(0, length)
      : recentCalls;
  }

  /**
   * Get recent calls from callHistory.
   * @param {Object} currentContact
   * @param {Array} calls
   * @param {Date} dateFrom
   */
  _getLocalRecentCalls({ phoneNumbers }, calls, dateFrom) {
    // Get all calls related to this contact
    return calls.reduce((acc, call) => {
      if (call && call.to && call.from) {
        const matches = phoneNumbers.find(this._filterPhoneNumber(call));

        // Check if calls is within certain days
        if (!!matches && new Date(call.startTime) > dateFrom) {
          return acc.concat(call);
        }
      }
      return acc;
    }, []);
  }

  _filterPhoneNumber(call) {
    return ({ phoneNumber }) => (
      phoneNumber === call.from.phoneNumber ||
      phoneNumber === call.to.phoneNumber ||
      phoneNumber === call.from.extensionNumber ||
      phoneNumber === call.to.extensionNumber
    );
  }

  /**
   * Fetch recent calls from server by given current contact.
   * @param {Object} currentContact
   * @param {String} dateFrom
   * @param {String} dateTo
   * @param {Number} length The number of calls
   * @return {Array}
   */
  _fetchRemoteRecentCalls(
    { phoneNumbers },
    dateFrom,
    length
  ) {
    const params = {
      dateFrom,
      perPage: length,
      type: 'Voice'
    };

    // CallLog API doesn't support plus sign in phoneNumber
    const recentCallsPromises = phoneNumbers.reduce((acc, { phoneType, phoneNumber }) => {
      phoneNumber = phoneNumber.replace('+', '');
      if (phoneType === 'extension') {
        const promise = this._fetchCallLogList(
          Object.assign({}, params, {
            extensionNumber: phoneNumber
          })
        );
        return acc.concat(promise);
      }
      const promise = this._fetchCallLogList(
        Object.assign({}, params, {
          phoneNumber
        })
      );
      return acc.concat(promise);
    }, []);

    return concurrentExecute(recentCallsPromises, 5, 500)
      .then(this._flattenToRecords);
  }

  _fetchCallLogList(params) {
    return () => this._client.account().extension().callLog().list(params);
  }

  _flattenToRecords(items) {
    return items.reduce((acc, { records }) => acc.concat(records), []);
  }

  // Sort by time in descending order
  _sortByTime(a, b) {
    return new Date(b.startTime) - new Date(a.startTime);
  }

  _dedup(calls) {
    const hash = {};
    return calls.reduce((acc, cur) => {
      if (hash[cur.id]) return acc;
      hash[cur.id] = true;
      return acc.concat(cur);
    }, []);
  }
}
