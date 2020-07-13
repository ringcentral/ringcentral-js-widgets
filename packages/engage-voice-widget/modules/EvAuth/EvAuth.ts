import {
  action,
  createSelector,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import format from '@ringcentral-integration/phone-number/lib/format';
import EventEmitter from 'events';
import { Module } from 'ringcentral-integration/lib/di';

import { authStatus, messageTypes, tabManagerEvents } from '../../enums';
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
    'Block',
    'Alert',
    'Locale',
    'RouterInteraction',
    'EvSubscription',
    'TabManager',
    { dep: 'EvAuthOptions', optional: true },
  ],
})
class EvAuth extends RcModuleV2<DepsModules, EvAuthState> implements Auth {
  public connecting?: boolean;

  private _eventEmitter = new EventEmitter();

  public canUserLogoutFn: () => Promise<boolean> = async () => true;

  private _logout = () => {
    return this._modules.auth.logout({ dismissAllAlert: false });
  };

  private _logoutByOtherTab = false;

  get tabManagerEnabled() {
    return this._modules.tabManager?._tabbie.enabled;
  }

  constructor({
    auth,
    alert,
    block,
    locale,
    storage,
    evClient,
    tabManager,
    evSubscription,
    routerInteraction,
    enableCache = true,
  }) {
    super({
      modules: {
        auth,
        alert,
        block,
        locale,
        storage,
        evClient,
        tabManager,
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

  get availableQueues() {
    return this.getAvailableQueues();
  }

  getAvailableQueues = createSelector(
    () => this.inboundSettings.availableQueues,
    (availableQueues) => [
      {
        gateId: '-1',
        gateName: i18n.getString('default', this._modules.locale.currentLocale),
      },
      ...sortByName(availableQueues, 'gateName'),
    ],
  );

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
    this.agent = agent;
    this.connected = connected;
  }

  _shouldInit() {
    return super._shouldInit() && this._modules.auth.loggedIn && this.connected;
  }

  onInitOnce() {
    this._modules.evSubscription.subscribe(EvCallbackTypes.LOGOUT, async () => {
      this._emitLogout();

      // if that is logout by same browser that will only trigger emit
      // if there is logout by other browser, that need redirect to home page,
      if (!this._logoutByOtherTab) {
        this._modules.alert.info({
          message: messageTypes.FORCE_LOGOUT,
        });

        this._logoutByOtherTab = false;

        this.newReconnect();
      }
    });
  }

  async onStateChange() {
    if (
      this.ready &&
      this.tabManagerEnabled &&
      this._modules.tabManager.ready
    ) {
      this._checkTabManagerEvent();
    }

    if (this._modules.auth.loggedIn && !this.connected && !this.connecting) {
      this.connecting = true;
      // when login make sure the _logoutByOtherTab is false
      this._logoutByOtherTab = false;

      await this._loginAgent();
      this.connecting = false;
    }
  }

  async logout() {
    if (!(await this.canUserLogoutFn())) {
      return;
    }

    this._emitLogout();

    const agentId = this.agentId;

    if (this.tabManagerEnabled) {
      this._modules.tabManager.send(tabManagerEvents.LOGOUT);
    }

    await this._modules.block.next(this._logout);

    const logoutAgentResponse = await this.logoutAgent(agentId);

    // TODO: error handle when logout fail
    // TODO: when failed need tell other tab not logout => this._modules.tabManager.send(tabManagerEvents.LOGOUT);
    if (!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK') {
      console.log('logoutAgent failed');
      return;
    }

    this.setConnectionData({ connected: false, agent: {} });
  }

  logoutAgent(agentId: string = this.agentId) {
    return this._modules.evClient.logoutAgent(agentId);
  }

  beforeAgentLogout(callback: () => void) {
    this._eventEmitter.on(authStatus.LOGOUT_BEFORE, callback);
  }

  newReconnect(isBlock: boolean = true) {
    this._modules.evClient.closeSocket();
    if (isBlock) {
      this._modules.routerInteraction.push('/sessionConfig');
      return this._modules.block.next(this._loginAgent);
    }

    return this._loginAgent();
  }

  private _loginAgent = async () => {
    try {
      this._modules.evClient.initSDK();

      const agent = await this._modules.evClient.loginAgent(
        this._modules.auth.accessToken,
        'Bearer',
      );
      this.setConnectionData({
        connected: true,
        agent,
      });

      this._eventEmitter.emit(authStatus.LOGIN_SUCCESS, agent);
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
      await this._logout();
    }
  };

  onLoginSuccess(callback: (agent: EvAgentInfo) => void) {
    this._eventEmitter.on(authStatus.LOGIN_SUCCESS, callback);
  }

  private _checkTabManagerEvent() {
    const { event } = this._modules.tabManager;
    if (event) {
      // const data = event.args[0];
      switch (event.name) {
        case tabManagerEvents.LOGOUT:
          this._logoutByOtherTab = true;
          break;
        default:
          break;
      }
    }
  }

  private _emitLogout() {
    this._eventEmitter.emit(authStatus.LOGOUT_BEFORE);
  }
}

export { EvAuth };
