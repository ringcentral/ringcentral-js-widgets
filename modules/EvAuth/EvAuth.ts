import {
  action,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
  createSelector,
} from '@ringcentral-integration/core';
import format from '@ringcentral-integration/phone-number/lib/format';
import { Module } from 'ringcentral-integration/lib/di';
import EventEmitter from 'events';
import { messageTypes, authStatus } from '../../enums';
import { EvAgentInfo } from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums';
import { sortByName } from '../../lib/sortByName';
import { Auth, DepsModules, EvAuthData, State } from './EvAuth.interface';
import i18n from './i18n';

const DEFAULT_COUNTRIES = ['USA', 'CAN'];
type EvAuthState = RcModuleState<EvAuth, State>;

@Module({
  name: 'EvAuth',
  deps: [
    'EvClient',
    'Auth',
    'Storage',
    'Alert',
    'Locale',
    'RouterInteraction',
    'EvSubscription',
    { dep: 'EvAuthOptions', optional: true },
  ],
})
class EvAuth extends RcModuleV2<DepsModules, EvAuthState> implements Auth {
  public connecting?: boolean;

  public disconnecting?: boolean;

  private _eventEmitter = new EventEmitter();

  constructor({
    auth,
    alert,
    locale,
    storage,
    evClient,
    evSubscription,
    routerInteraction,
    enableCache = true,
  }) {
    super({
      modules: {
        auth,
        alert,
        locale,
        storage,
        evClient,
        evSubscription,
        routerInteraction,
      },
      enableCache,
      storageKey: 'EvAuth',
    });
  }

  @storage
  @state
  connected = false;

  @storage
  @state
  agent: EvAuthData = {};

  get agentId() {
    return this.agent.data?.agents[0]?.agentId || '';
  }

  get isFreshLogin() {
    return this._modules.auth.isFreshLogin;
  }

  get outboundManualDefaultRingtime() {
    return this.agentSettings.outboundManualDefaultRingtime;
  }

  get assignedQueue() {
    return this.inboundSettings.queues;
  }

  get agentPermissions() {
    return this.agentConfig.agentPermissions;
  }

  get agentConfig() {
    return this.agent.agentConfig;
  }

  get inboundSettings() {
    return this.agentConfig.inboundSettings;
  }

  get agentSettings() {
    return this.agentConfig.agentSettings;
  }

  get autoAnswerCalls() {
    return this.agentSettings.autoAnswerCalls;
  }

  private _getAvailableQueues = createSelector(
    () => this.inboundSettings.availableQueues,
    (availableQueues) => [
      {
        gateId: '-1',
        gateName: i18n.getString('default', this._modules.locale.currentLocale),
      },
      ...sortByName(availableQueues, 'gateName'),
    ],
  );

  get availableQueues() {
    return this._getAvailableQueues();
  }

  getAvailableRequeueQueues = createSelector(
    () => this.inboundSettings.availableRequeueQueues,
    (availableRequeueQueues) => {
      return sortByName(availableRequeueQueues, 'groupName');
    },
  );

  getCallerIds = createSelector(
    () => this.agentSettings.callerIds,
    (callerIds) => [
      {
        description: i18n.getString(
          'default',
          this._modules.locale.currentLocale,
        ),
        number: '-1',
      },
      ...callerIds.map((callerId) => {
        const number =
          format({
            phoneNumber: callerId.number,
            countryCode: 'US',
          }) || callerId.number;
        return {
          ...callerId,
          number,
        };
      }),
    ],
  );

  getAvailableCountries = createSelector(
    () => this.agentConfig.applicationSettings.availableCountries,
    (availableCountries = []) => {
      // The default Engage Voice service area is `USA` and `CAN` with `+1` international code.
      const countriesUsaCan = availableCountries.filter(({ countryId }) =>
        DEFAULT_COUNTRIES.includes(countryId),
      );
      return countriesUsaCan.length > 0
        ? countriesUsaCan
        : [
            {
              countryId: 'USA',
              countryName: i18n.getString(
                'us',
                this._modules.locale.currentLocale,
              ),
            },
          ];
    },
  );

  @action
  setConnectionData({ connected, agent }: State) {
    this.state.agent = agent;
    this.state.connected = connected;
  }

  onInitOnce() {
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.LOGOUT,
      async (data) => {
        // TODO: check it about `data.message === 'OK'`?
        // wait for fixing `LOGOUT` event missing issue about EV multiple socket
        this._modules.auth.logout();
      },
    );
  }

  onLogout(callback: () => void) {
    this._eventEmitter.on(authStatus.LOGOUT_BEFORE, callback);
  }

  private _onLogout() {
    this._eventEmitter.emit(authStatus.LOGOUT_BEFORE);
  }

  async disconnect(agentId: string) {
    this._onLogout();
    // ensure that multi-tabs update state effect.
    if (!agentId) {
      console.log('agentId does not exist');
      return;
    }
    try {
      const logoutAgentResponse = await this._modules.evClient.logoutAgent(
        agentId,
      );
      if (
        !logoutAgentResponse.message ||
        logoutAgentResponse.message !== 'OK'
      ) {
        // TODO: error handle
        console.log('logoutAgent failed');
        return;
      }
      this.setConnectionData({ connected: false, agent: {} });
      // create a new AgentSDK instance
      this._modules.evClient.onInit();
    } catch (error) {
      // TODO: error handle
      console.error('disconnect failed');
    }
  }

  async loginAgent() {
    const agent = await this._modules.evClient.loginAgent(
      this._modules.auth.accessToken,
      'Bearer',
    );

    this.setConnectionData({
      connected: true,
      agent,
    });

    this._onLoginSuccess(agent);
  }

  onLoginSuccess(callback: (agent: EvAgentInfo) => void) {
    this._eventEmitter.on(authStatus.LOGIN_SUCCESS, callback);
  }

  private _onLoginSuccess(agent: EvAgentInfo) {
    this._eventEmitter.emit(authStatus.LOGIN_SUCCESS, agent);
  }

  async connect() {
    try {
      await this.loginAgent();
    } catch (error) {
      switch (error.type) {
        case messageTypes.NO_AGENT:
          this._modules.alert.warning({
            message: error.type,
          });
          break;
        case messageTypes.CONNECT_TIMEOUT:
        case messageTypes.UNEXPECTED_AGENT:
        case messageTypes.INVALID_BROWSER:
        case messageTypes.OPEN_SOCKET_ERROR:
          this._modules.alert.danger({
            message: error.type,
          });
          break;
        default:
          this._modules.alert.danger({
            message: messageTypes.CONNECT_ERROR,
          });
      }
      await this._modules.auth.logout({ dismissAllAlert: false });
    }
  }

  _shouldInit() {
    return super._shouldInit() && this._modules.auth.loggedIn && this.connected;
  }

  async onStateChange() {
    if (this._modules.auth.loggedIn && !this.connected && !this.connecting) {
      this.connecting = true;
      try {
        await this.connect();
      } catch (e) {
        console.error(e);
      }
      this.connecting = false;
    }
    if (!this._modules.auth.loggedIn && this.connected && !this.disconnecting) {
      this.disconnecting = true;
      await this.disconnect(this.agentId);
      this.disconnecting = false;
    }
  }
}

export { EvAuth };
