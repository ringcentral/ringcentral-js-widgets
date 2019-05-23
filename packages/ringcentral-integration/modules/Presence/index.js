import DataFetcher from '../../lib/DataFetcher';
import { Module } from '../../lib/di';
import { selector } from '../../lib/selector';
import Enum from '../../lib/Enum';
import { actionTypeGenerator } from '../../lib/actionTypeGenerator';
import {
  isEnded,
  removeInboundRingOutLegs,
} from '../../lib/callLogHelpers';
import debounce from '../../lib/debounce';


import { getDataReducer } from './getPresenceReducer';
import subscriptionFilters from '../../enums/subscriptionFilters';
import dndStatus from './dndStatus';
import presenceStatus from './presenceStatus';
import proxify from '../../lib/proxy/proxify';
import ensureExist from '../../lib/ensureExist';

const presenceRegExp = /.*\/presence(\?.*)?/;
const detailedPresenceRegExp = /.*\/presence\?detailedTelephonyState=true&sipData=true/;

@Module({
  deps: [
    'RolesAndPermissions',
    'ConnectivityMonitor',
    { dep: 'Storage', optional: true },
    { dep: 'PresenceOptions', optional: true }
  ]
})
export default class Presence extends DataFetcher {
  constructor({
    detailed = true,
    fetchRemainingDelay = 2000,
    ttl = 62 * 1000,
    polling = false,
    pollingInterval = 3 * 60 * 1000,
    connectivityMonitor,
    rolesAndPermissions,
    ...options
  }) {
    super({
      ...options,
      polling,
      ttl,
      pollingInterval,
      getDataReducer,
      fetchFunction: async () => {
        const endpoint = this._detailed ?
          subscriptionFilters.detailedPresence :
          subscriptionFilters.presence;
        const data = (await this._client.service.platform()
          .get(endpoint)).json();
        return data;
      },
      subscriptionFilters: [
        detailed ?
          subscriptionFilters.detailedPresence :
          subscriptionFilters.presence
      ],
      subscriptionHandler: (message) => {
        const regExp = this._detailed ?
          detailedPresenceRegExp :
          presenceRegExp;
        if (regExp.test(message.event) && message.body) {
          if (message.body.sequence) {
            if (message.body.sequence < this.sequence) {
              return;
            }
          }
          const { body } = message;
          this.store.dispatch({
            data: body,
            type: this.actionTypes.notification,
            lastDndStatus: this.dndStatus,
            timestamp: Date.now(),
          });

          /**
           * as pointed out by Igor in https://jira.ringcentral.com/browse/PLA-33391,
           * when the real calls count larger than the active calls returned by the pubnub,
           * we need to pulling the calls manually.
           */
          const { activeCalls = [], totalActiveCalls = 0 } = body;
          if (activeCalls.length !== totalActiveCalls) {
            this._fetchRemainingCalls();
          }
        }
      },
      readyCheckFn: () => (
        this._rolesAndPermissions.ready &&
        this._connectivityMonitor.ready
      ),
    });
    this._detailed = true;
    this._connectivityMonitor = this::ensureExist(connectivityMonitor, 'connectivityMonitor');
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._fetchRemainingCalls = debounce(() => this.fetchData(), fetchRemainingDelay);
  }

  get _name() {
    return 'presence';
  }

  get _actionTypes() {
    return new Enum([
      ...Object.keys(super._actionTypes),
      ...actionTypeGenerator('update'),
      'notification',
    ], this._name);
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this._connectivity = this._connectivityMonitor.connectivity;
    }
    super._onStateChange();
    if (
      this.ready &&
      this._connectivityMonitor &&
      this._connectivityMonitor.ready &&
      this._connectivity !== this._connectivityMonitor.connectivity
    ) {
      this._connectivity = this._connectivityMonitor.connectivity;
      // fetch data on regain connectivity
      if (this._connectivity && this._hasPermission) {
        this.fetchData();
      }
    }
  }

  @proxify
  async _update(params) {
    if (!this._rolesAndPermissions.hasEditPresencePermission) {
      return;
    }
    try {
      const { ownerId } = this._auth;
      const platform = this._client.service.platform();
      const response = await platform.put(
        '/account/~/extension/~/presence',
        params
      );
      const data = response.json();
      if (ownerId === this._auth.ownerId) {
        this.store.dispatch({
          type: this.actionTypes.updateSuccess,
          data,
          lastDndStatus: this.dndStatus
        });
      }
    } catch (error) {
      this.store.dispatch({
        type: this.actionTypes.updateError,
        error,
      });
      throw error;
    }
  }

  _getUpdateStatusParams(userStatusParams) {
    const params = {
      dndStatus: this.dndStatus,
      userStatus: userStatusParams,
    };
    if (
      params.dndStatus !== dndStatus.takeAllCalls &&
      params.dndStatus !== dndStatus.doNotAcceptDepartmentCalls
    ) {
      params.dndStatus = this.lastNotDisturbDndStatus || dndStatus.takeAllCalls;
    }
    return params;
  }

  async setAvailable() {
    if (this.userStatus === presenceStatus.available &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.available);
    await this._update(params);
  }

  async setBusy() {
    if (
      this.userStatus === presenceStatus.busy &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.busy);
    await this._update(params);
  }

  async setDoNotDisturb() {
    if (
      this.dndStatus === dndStatus.doNotAcceptAnyCalls
    ) {
      return;
    }
    const params = {
      dndStatus: dndStatus.doNotAcceptAnyCalls,
      userStatus: presenceStatus.busy
    };
    await this._update(params);
  }

  async setInvisible() {
    if (
      this.userStatus === presenceStatus.offline &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.offline);
    await this._update(params);
  }

  async setPresence(presenceData) {
    switch (presenceData) {
      case presenceStatus.available:
        await this.setAvailable();
        break;
      case presenceStatus.busy:
        await this.setBusy();
        break;
      case dndStatus.doNotAcceptAnyCalls:
        await this.setDoNotDisturb();
        break;
      case presenceStatus.offline:
        await this.setInvisible();
        break;
      default:
        await this.setAvailable();
        break;
    }
  }

  async toggleAcceptCallQueueCalls() {
    const params = {
      userStatus: this.userStatus,
    };
    if (this.dndStatus === dndStatus.takeAllCalls) {
      params.dndStatus = dndStatus.doNotAcceptDepartmentCalls;
    } else if (this.dndStatus === dndStatus.doNotAcceptDepartmentCalls) {
      params.dndStatus = dndStatus.takeAllCalls;
    }
    if (params.dndStatus) {
      await this._update(params);
    }
  }

  /**
   * @override
   * @description make sure data returns object so that the property getters
   *  will not fail.
   * @returns {Object}
   */
  get data() {
    return super.data || {};
  }

  get sequence() {
    return this.data.sequence;
  }

  @selector
  activeCalls = [
    () => this.data.activeCalls,
    calls => calls || [],
  ]

  @selector
  calls = [
    () => this.activeCalls,
    activeCalls => (
      removeInboundRingOutLegs(activeCalls)
        .filter(call => !isEnded(call))
    ),
  ]

  @selector
  sessionIdList = [
    () => this.calls,
    calls => calls.map(call => call.sessionId),
  ]

  get telephonyStatus() {
    return this.data.telephonyStatus;
  }

  get dndStatus() {
    return this.data.dndStatus;
  }

  get lastNotDisturbDndStatus() {
    return this.data.lastNotDisturbDndStatus;
  }


  get userStatus() {
    return this.data.userStatus;
  }

  get presenceStatus() {
    return this.data.presenceStatus;
  }

  get meetingStatus() {
    return this.data.meetingStatus;
  }

  get presenceOption() {
    // available
    if (
      this.data.userStatus === presenceStatus.available &&
      this.data.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return presenceStatus.available;
    }

    // busy
    if (
      this.data.userStatus === presenceStatus.busy &&
      this.data.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return presenceStatus.busy;
    }

    // doNotDisturb
    if (this.data.dndStatus === dndStatus.doNotAcceptAnyCalls) {
      return dndStatus.doNotAcceptAnyCalls;
    }

    // invisible
    if (
      this.data.userStatus === presenceStatus.offline &&
      this.data.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return presenceStatus.offline;
    }

    return presenceStatus.available;
  }

  get _hasPermission() {
    return this._rolesAndPermissions.hasPresencePermission;
  }
}
