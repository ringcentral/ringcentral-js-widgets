import { Module } from '../../lib/di';
import DataFetcher from '../../lib/DataFetcher';
import sleep from '../../lib/sleep';
import fetchList from '../../lib/fetchList';
import subscriptionFilters from '../../enums/subscriptionFilters';
import {
  getDataReducer
} from './getActiveCallsReducer';

const presenceRegExp = /\/presence\?detailedTelephonyState=true/;
const FETCH_DELAY = 1000;
const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * @class
 * @description Active calls list manaing module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'TabManager', optional: true },
    { dep: 'ActiveCallsOptions', optional: true }
  ]
})
export default class ActiveCalls extends DataFetcher {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 5 mins.
   */
  constructor({
    client,
    rolesAndPermissions,
    tabManager, // do not pass tabManager to DataFetcher as data is not shared in localStorage
    fetchDelay = FETCH_DELAY,
    ttl = DEFAULT_TTL,
    ...options
  }) {
    super({
      ...options,
      name: 'activeCalls',
      client,
      ttl,
      getDataReducer,
      subscriptionFilters: [subscriptionFilters.detailedPresenceWithSip],
      subscriptionHandler: async (message) => {
        if (presenceRegExp.test(message.event)) {
          const { ownerId } = this._auth;
          await sleep(this._fetchDelay);
          if (ownerId === this._auth.ownerId) {
            await this.fetchData();
          }
        }
      },
      fetchFunction: async () => fetchList(params =>
        this._client.account().extension().activeCalls().list(params)
      )
    });
    this._fetchDelay = fetchDelay;
    this._rolesAndPermissions = rolesAndPermissions;
    this.addSelector(
      'calls',
      () => this.data,
      data => data || [],
    );
  }

  _shouldInit() {
    return super._shouldInit() && this._rolesAndPermissions.ready;
  }

  get _hasPermission() {
    return this._rolesAndPermissions.permissions.ReadCallLog;
  }

  get calls() {
    return this._selectors.calls();
  }
}
