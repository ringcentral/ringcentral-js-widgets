import { Module } from '../../lib/di';
import { selector } from '../../lib/selector';
import DataFetcher from '../../lib/DataFetcher';
import sleep from '../../lib/sleep';
import fetchList from '../../lib/fetchList';
import subscriptionFilters from '../../enums/subscriptionFilters';
import { getDataReducer } from './getActiveCallsReducer';

const presenceRegExp = /\/presence\?detailedTelephonyState=true/;
const FETCH_DELAY = 1000;
const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * @deprecated Presence module with detailed mode also maintains an active calls list
 * @class
 * @description Active calls list managing module
 */
@Module({
  deps: [
    'Client',
    'RolesAndPermissions',
    { dep: 'TabManager', optional: true },
    { dep: 'ActiveCallsOptions', optional: true },
  ],
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
      client,
      ttl,
      getDataReducer,
      subscriptionFilters: [subscriptionFilters.detailedPresence],
      subscriptionHandler: async (message) => {
        if (presenceRegExp.test(message.event)) {
          const { ownerId } = this._auth;
          await sleep(this._fetchDelay);
          if (ownerId === this._auth.ownerId) {
            await this.fetchData();
          }
        }
      },
      fetchFunction: async () =>
        fetchList((params) =>
          this._client
            .account()
            .extension()
            .activeCalls()
            .list(params),
        ),
    });
    console.warn(
      'ActiveCalls module is deprecated, please use Presence module with detailed mode',
    );
    this._fetchDelay = fetchDelay;
    this._rolesAndPermissions = rolesAndPermissions;
  }

  get _name() {
    return 'activeCalls';
  }

  _shouldInit() {
    return super._shouldInit() && this._rolesAndPermissions.ready;
  }

  get _hasPermission() {
    return this._rolesAndPermissions.permissions.ReadCallLog;
  }

  @selector
  calls = [() => this.data, (data) => data || []];
}
