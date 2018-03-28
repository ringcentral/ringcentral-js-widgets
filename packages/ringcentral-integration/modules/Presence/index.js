import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import getPresenceReducer, {
  getLastNotDisturbDndStatusReducer
} from './getPresenceReducer';
import presenceActionTypes from './actionTypes';
import moduleStatuses from '../../enums/moduleStatuses';
import subscriptionFilters from '../../enums/subscriptionFilters';
import dndStatus from './dndStatus';
import presenceStatus from './presenceStatus';
import proxify from '../../lib/proxy/proxify';
import ensureExist from '../../lib/ensureExist';

const presenceEndPoint = /.*\/presence(\?.*)?/;

/**
 * @class
 * @description Presence info module
 */
@Module({
  deps: [
    'Auth', 'Client', 'Subscription', 'RolesAndPermissions',
    { dep: 'Storage', optional: true },
    { dep: 'ConnectivityMonitor', optional: true },
    { dep: 'PresenceOptions', optional: true }
  ]
})
export default class Presence extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Auth} params.auth - auth module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {Subscription} params.subscription - subscription module instance
   * @param {Object} params.actionTypes - actionTypes enums
   */
  constructor({
    auth,
    client,
    storage,
    subscription,
    rolesAndPermissions,
    connectivityMonitor,
    actionTypes = presenceActionTypes,
    getReducer = getPresenceReducer,
    subscriptionFilter = subscriptionFilters.presence,
    lastNotDisturbDndStatusStorageKey = 'lastNotDisturbDndStatus',
    ...options
  }) {
    super({
      ...options,
      actionTypes,
    });
    this._auth = this::ensureExist(auth, 'auth');
    this._client = this::ensureExist(client, 'client');
    this._subscription = this::ensureExist(subscription, 'subscription');
    this._rolesAndPermissions =
      this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');
    this._storage = storage;
    this._connectivityMonitor = connectivityMonitor;

    this._subscriptionFilter = subscriptionFilter;

    this._lastMessage = null;

    this._delayTimeoutId = null;
    this._lastNotDisturbDndStatusStorageKey = lastNotDisturbDndStatusStorageKey;
    if (this._storage) {
      this._reducer = getReducer(this.actionTypes);
      this._storage.registerReducer({
        key: this._lastNotDisturbDndStatusStorageKey,
        reducer: getLastNotDisturbDndStatusReducer(this.actionTypes)
      });
    } else {
      this._reducer = getPresenceReducer(this.actionTypes, {
        lastNotDisturbDndStatus: getLastNotDisturbDndStatusReducer(this.actionTypes),
      });
    }
    this._lastSequence = 0;
  }

  _onStateChange = async () => {
    if (this._shouldInit()) {
      await this._init();
    } else if (this._shouldReset()) {
      this._reset();
    } else if (
      this.ready &&
      this._subscription.ready &&
      this._subscription.message &&
      this._subscription.message !== this._lastMessage
    ) {
      this._lastMessage = this._subscription.message;
      this._subscriptionHandler(this._lastMessage);
    } else if (
      this.ready &&
      this._connectivityMonitor &&
      this._connectivityMonitor.ready &&
      this._connectivity !== this._connectivityMonitor.connectivity
    ) {
      this._connectivity = this._connectivityMonitor.connectivity;
      // fetch data on regain connectivity
      if (this._connectivity) {
        if (this._rolesAndPermissions.hasPresencePermission) {
          this._fetch();
        }
      }
    }
  }

  _subscriptionHandler = (message) => {
    if (message && presenceEndPoint.test(message.event) && message.body) {
      if (message.body.sequence) {
        if (message.body.sequence <= this._lastSequence) {
          return;
        }
        this._lastSequence = message.body.sequence;
      }
      this.store.dispatch({
        type: this.actionTypes.notification,
        ...message.body,
      });
    }
  }

  initialize() {
    this.store.subscribe(this._onStateChange);
  }

  _shouldInit() {
    return (
      this._auth.loggedIn &&
      (!this._storage || this._storage.ready) &&
      (!this._connectivityMonitor || this._connectivityMonitor.ready) &&
      this._subscription.ready &&
      this._rolesAndPermissions.ready &&
      this.status === moduleStatuses.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._auth.loggedIn ||
        (!!this._storage && !this._storage.ready) ||
        !this._rolesAndPermissions.ready ||
        (this._connectivityMonitor && !this._connectivityMonitor.ready) ||
        !this._subscription.ready
      ) &&
      this.ready
    );
  }

  async _init() {
    this.store.dispatch({
      type: this.actionTypes.init,
    });
    if (this._connectivityMonitor) {
      this._connectivity = this._connectivityMonitor.connectivity;
    }
    if (this._rolesAndPermissions.hasPresencePermission) {
      await this.fetch();
      this._subscription.subscribe(this._subscriptionFilter);
    }
    this.store.dispatch({
      type: this.actionTypes.initSuccess,
    });
  }

  _reset() {
    this.store.dispatch({
      type: this.actionTypes.reset,
    });
    this._lastSequence = 0;
    this._lastMessage = null;
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
  }

  @proxify
  async _fetch() {
    this.store.dispatch({
      type: this.actionTypes.fetch,
    });
    try {
      const { ownerId } = this._auth;
      const data = await this._client.account().extension().presence().get();
      if (ownerId === this._auth.ownerId) {
        this.store.dispatch({
          type: this.actionTypes.fetchSuccess,
          ...data,
          lastDndStatus: this.dndStatus,
        });
      }
      this._promise = null;
    } catch (error) {
      this._promise = null;
      this.store.dispatch({
        type: this.actionTypes.fetchError,
        error,
      });
      throw error;
    }
  }

  @proxify
  async fetch() {
    if (!this._promise) {
      this._promise = this._fetch();
    }
    return this._promise;
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
          ...data,
          lastDndStatus: this.dndStatus,
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
    if (this.presenceStatus === presenceStatus.available &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.available);
    await this._update(params);
  }
  async setBusy() {
    if (
      this.presenceStatus === presenceStatus.busy &&
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
      userStatus: presenceStatus.busy,
    };
    await this._update(params);
  }

  async setInvisible() {
    if (
      this.presenceStatus === presenceStatus.offline &&
      this.dndStatus !== dndStatus.doNotAcceptAnyCalls
    ) {
      return;
    }
    const params = this._getUpdateStatusParams(presenceStatus.offline);
    await this._update(params);
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

  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get dndStatus() {
    return this.state.dndStatus;
  }

  get lastNotDisturbDndStatus() {
    if (this._storage) {
      return this._storage.getItem(this._lastNotDisturbDndStatusStorageKey);
    }
    return this.state.lastNotDisturbDndStatus;
  }

  get userStatus() {
    return this.state.userStatus;
  }

  get message() {
    return this.state.message;
  }

  get presenceStatus() {
    return this.state.presenceStatus;
  }
}
