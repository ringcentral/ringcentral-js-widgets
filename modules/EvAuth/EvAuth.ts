import {
  action,
  computed,
  RcModuleV2,
  state,
  track,
  globalStorage,
  watch,
} from '@ringcentral-integration/core';
import format from '@ringcentral-integration/phone-number/lib/format';
import { EventEmitter } from 'events';
import { Unsubscribe } from 'redux';
import { Module } from 'ringcentral-integration/lib/di';
import sleep from 'ringcentral-integration/lib/sleep';

import { loginStatus, messageTypes, tabManagerEvents } from '../../enums';
import { EvAgentConfig, EvAgentData } from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums';
import { EvTypeError } from '../../lib/EvTypeError';
import { sortByName } from '../../lib/sortByName';
import { trackEvents } from '../../lib/trackEvents';
import {
  Auth,
  Deps,
  State,
  AuthenticateWithTokenType,
} from './EvAuth.interface';
import i18n from './i18n';

const DEFAULT_COUNTRIES = ['USA', 'CAN'];

@Module({
  name: 'EvAuth',
  deps: [
    'EvClient',
    'Auth',
    'Block',
    'Alert',
    'Locale',
    'RouterInteraction',
    'EvSubscription',
    'TabManager',
    'GlobalStorage',
    { dep: 'EvAuthOptions', optional: true },
  ],
})
class EvAuth extends RcModuleV2<Deps> implements Auth {
  public connecting?: boolean;

  private _eventEmitter = new EventEmitter();

  public canUserLogoutFn: () => Promise<boolean> = async () => true;

  private _logout = async () => {
    await this._deps.auth.logout({ dismissAllAlert: false });
    this.setNotAuth(true);
  };

  private _logoutByOtherTab = false;

  private _authenticateResponseWatcher: Unsubscribe = null;
  private _agentConfigWatcher: Unsubscribe = null;

  get tabManagerEnabled() {
    return this._deps.tabManager?.enable;
  }

  get isOnlyOneAgent() {
    return this.agent?.authenticateResponse.agents.length === 1;
  }

  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'EvAuth',
      enableGlobalCache: true,
    });
    this._deps.auth.addAfterLoggedInHandler(() => {
      console.log('addAfterLoggedInHandler~~');
      this.clearAgentId();
    });

    this._deps.auth.addBeforeLogoutHandler(() => {
      console.log('addBeforeLogoutHandler~~');
      this.clearAgentId();
    });
  }

  @globalStorage
  @state
  connected = false;

  @globalStorage
  @state
  agent: EvAgentData = null;

  @globalStorage
  @state
  agentId = '';

  @action
  setAgentId(agentId: string) {
    this.agentId = agentId;
  }

  get isFreshLogin() {
    return this._deps.auth.isFreshLogin;
  }

  get agentConfig() {
    return this.agent?.agentConfig || null;
  }

  get authenticateResponse() {
    return this.agent?.authenticateResponse || null;
  }

  get agentSettings() {
    return this.agentConfig?.agentSettings;
  }

  get outboundManualDefaultRingtime() {
    return this.agentSettings?.outboundManualDefaultRingtime;
  }

  get inboundSettings() {
    return (
      this.agentConfig.inboundSettings || {
        availableQueues: [] as Array<undefined>,
        availableSkillProfiles: [] as Array<undefined>,
        queues: [] as Array<undefined>,
        skillProfile: {} as any,
        availableRequeueQueues: [] as Array<undefined>,
      }
    );
  }

  get assignedQueue() {
    return this.inboundSettings.queues;
  }

  get agentPermissions() {
    return this.agentConfig?.agentPermissions;
  }

  @computed((that: EvAuth) => [that.inboundSettings.availableQueues])
  get availableQueues() {
    return [
      {
        gateId: '-1',
        gateName: i18n.getString('default', this._deps.locale.currentLocale),
      },
      ...sortByName([...this.inboundSettings.availableQueues], 'gateName'),
    ];
  }

  @computed((that: EvAuth) => [that.inboundSettings.availableRequeueQueues])
  get availableRequeueQueues() {
    return sortByName(
      [...this.inboundSettings.availableRequeueQueues],
      'groupName',
    );
  }

  @computed((that: EvAuth) => [that.agentSettings.callerIds])
  get callerIds() {
    return [
      {
        description: i18n.getString('default', this._deps.locale.currentLocale),
        number: '-1',
      },
      ...this.agentSettings.callerIds.map((callerId) => {
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
    ];
  }

  @computed((that: EvAuth) => [
    that.agentConfig.applicationSettings.availableCountries,
    that._deps.locale.currentLocale,
  ])
  get availableCountries() {
    const { availableCountries } = this.agentConfig?.applicationSettings;
    // The default Engage Voice service area is `USA` and `CAN` with `+1` international code.
    const countriesUsaCan = availableCountries.filter(({ countryId }) =>
      DEFAULT_COUNTRIES.includes(countryId),
    );
    return countriesUsaCan.length > 0
      ? countriesUsaCan
      : [
          {
            countryId: 'USA',
            countryName: i18n.getString('us', this._deps.locale.currentLocale),
          },
        ];
  }

  @track((_: EvAuth, { connected, agent }: State) => {
    return [
      trackEvents.loginAgent,
      connected
        ? {
            'agentId(s)': agent.authenticateResponse?.agents?.map(
              (agent) => agent.agentId,
            ),
            'userId(s)': agent.authenticateResponse?.agents?.map(
              (agent) => agent.rcUserId,
            ),
          }
        : undefined,
    ];
  })
  @action
  setConnectionData({ connected, agent }: State) {
    // ! agent must be set before connected
    this.agent = agent;
    this.connected = connected;
  }

  @action
  setAgent(agent: EvAgentData) {
    this.agent = agent;
  }

  @action
  clearAgentId() {
    this.agentId = '';
  }

  @state
  loginStatus: string = null;

  @action
  setAuthSuccess() {
    this.loginStatus = loginStatus.AUTH_SUCCESS;
  }

  @action
  setLoginSuccess() {
    this.loginStatus = loginStatus.LOGIN_SUCCESS;
  }

  get isEvLogged() {
    return this.loginStatus === loginStatus.LOGIN_SUCCESS;
  }

  @action
  setNotAuth(asyncAllTabs = false) {
    this.loginStatus = loginStatus.NOT_AUTH;
    if (asyncAllTabs && this.tabManagerEnabled) {
      this._deps.tabManager.send(tabManagerEvents.LOGGED_OUT);
    }
  }

  _shouldInit() {
    return super._shouldInit() && this._deps.auth.loggedIn && this.connected;
  }

  onInitOnce() {
    this._deps.evSubscription.subscribe(EvCallbackTypes.LOGOUT, async () => {
      this._emitLogoutBefore();

      // if that is logout by same browser that will only trigger emit
      // if there is logout by other browser, that need redirect to home page,
      if (!this._logoutByOtherTab) {
        this._deps.alert.info({
          message: messageTypes.FORCE_LOGOUT,
        });

        this._logoutByOtherTab = false;

        await this.newReconnect();
      }
    });
  }

  async onStateChange() {
    // here not need check this.ready, because that should work when not login
    if (this.tabManagerEnabled && this._deps.tabManager.ready) {
      await this._checkTabManagerEvent();
    }

    if (
      this._deps.auth.loggedIn &&
      this.loginStatus !== loginStatus.AUTH_SUCCESS &&
      this.loginStatus !== loginStatus.LOGIN_SUCCESS &&
      !this.connecting
    ) {
      this.connecting = true;
      // when login make sure the logoutByOtherTab is false
      this._logoutByOtherTab = false;
      await this._deps.block.next(async () => {
        if (this.agentId) {
          await this.loginAgent();
        } else {
          await this.authenticateWithToken();
        }
      });
    }
  }

  onceLogout(cb: () => any) {
    return this._deps.evSubscription.once(EvCallbackTypes.LOGOUT, cb);
  }

  async logout() {
    if (!(await this.canUserLogoutFn())) {
      return;
    }
    console.log('logout~~');

    const agentId = this.agentId;

    this.sendLogoutTabEvent();

    await this._deps.block.next(this._logout);

    const logoutAgentResponse = await this.logoutAgent(agentId);

    // TODO: error handle when logout fail
    // TODO: when failed need tell other tab not logout => this._deps.tabManager.send(tabManagerEvents.LOGOUT);
    if (!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK') {
      console.log('logoutAgent failed');
    }
    this.setConnectionData({ connected: false, agent: null });
  }

  sendLogoutTabEvent() {
    this._emitLogoutBefore();
    if (this.tabManagerEnabled) {
      this._deps.tabManager.send(tabManagerEvents.LOGOUT);
    }
  }

  logoutAgent(agentId: string = this.agentId) {
    return this._deps.evClient.logoutAgent(agentId);
  }

  beforeAgentLogout(callback: () => void) {
    this._eventEmitter.on(loginStatus.LOGOUT_BEFORE, callback);
  }

  newReconnect(isBlock: boolean = true) {
    this._deps.evClient.closeSocket();

    const fn = this.loginAgent;

    return isBlock ? this._deps.block.next(fn) : fn();
  }

  async authenticateWithToken({
    rcAccessToken = this._deps.auth.accessToken,
    tokenType = 'Bearer',
    shouldEmitAuthSuccess = true,
  }: AuthenticateWithTokenType = {}) {
    console.log('authenticateWithToken', shouldEmitAuthSuccess);
    try {
      this._deps.evClient.initSDK();

      const authenticateResponse = await this._deps.evClient.getAndHandleAuthenticateResponse(
        rcAccessToken,
        tokenType,
      );
      const agent = { ...this.agent, authenticateResponse };
      // if (shouldEmitAuthSuccess && !this._authenticateResponseWatcher) {
      //   this._authenticateResponseWatcher = watch(
      //     this,
      //     () => this.agent?.authenticateResponse,
      //     (authenticateResponse) => {
      //       if (authenticateResponse) {
      //         this._emitAuthSuccess();
      //         this._authenticateResponseWatcher();
      //         this._authenticateResponseWatcher = null;
      //       }
      //     },
      //   );
      // }
      this.setAgent(agent);
      this.setAuthSuccess();
      if (shouldEmitAuthSuccess) {
        this._emitAuthSuccess();
      }
      return authenticateResponse;
    } catch (error) {
      switch (error.type) {
        case messageTypes.NO_AGENT:
          this._deps.alert.warning({
            message: error.type,
          });
          break;
        case messageTypes.CONNECT_TIMEOUT:
        case messageTypes.UNEXPECTED_AGENT:
          this._deps.alert.danger({
            message: error.type,
          });
          break;
        default:
          this._deps.alert.danger({
            message: messageTypes.CONNECT_ERROR,
          });
      }
      await this._logout();
    }
  }

  async openSocketWithSelectedAgentId({
    syncOtherTabs = false,
    retryOpenSocket = false,
  } = {}) {
    console.log(
      'openSocketWithSelectedAgentId',
      syncOtherTabs,
      retryOpenSocket,
    );
    try {
      // TODO: here need check time when no message come back, that will block app.
      const getAgentConfig = new Promise<EvAgentConfig>((resolve) => {
        this._deps.evClient.on(EvCallbackTypes.LOGIN_PHASE_1, resolve);
      });

      const selectedAgentId = this.agentId;
      if (!selectedAgentId) {
        throw new EvTypeError({
          type: messageTypes.NO_AGENT,
        });
      }
      const openSocketResult = await this._deps.evClient.openSocket(
        selectedAgentId,
      );
      // wait for socketOpened
      // Because instance.socket Opened(); was performed after callback.
      await sleep(0);
      if (openSocketResult.error) {
        console.log('retryOpenSocket~~', retryOpenSocket);
        if (retryOpenSocket) {
          const { access_token } = await this._deps.auth.refreshToken();
          const authenticateRes = await this.authenticateWithToken({
            rcAccessToken: access_token,
            shouldEmitAuthSuccess: false,
          });
          if (!authenticateRes) return;
          const openSocketRes: any = await this.openSocketWithSelectedAgentId({
            syncOtherTabs,
          });
          return openSocketRes;
        }
        throw new EvTypeError({
          type: messageTypes.OPEN_SOCKET_ERROR,
        });
      }

      // TODO： implement multiple sync back drop
      if (syncOtherTabs && this.tabManagerEnabled) {
        this._deps.tabManager.send(tabManagerEvents.OPEN_SOCKET);
      }

      const agentConfig = await getAgentConfig;

      const agent = { ...this.agent, agentConfig };

      // if (!this._agentConfigWatcher) {
      //   this._agentConfigWatcher = watch(
      //     this,
      //     () => this.agent?.agentConfig,
      //     (agentConfig) => {
      //       if (agentConfig) {
      //         this._emitLoginSuccess();
      //         this._agentConfigWatcher();
      //         this._agentConfigWatcher = null;
      //       }
      //     },
      //   );
      // }

      this.setConnectionData({ agent, connected: true });

      this.connecting = false;

      this.setLoginSuccess();

      this._emitLoginSuccess();

      return agentConfig;
    } catch (error) {
      switch (error.type) {
        case messageTypes.NO_AGENT:
          this._deps.alert.warning({
            message: error.type,
          });
          break;
        case messageTypes.INVALID_BROWSER:
        case messageTypes.OPEN_SOCKET_ERROR:
          this._deps.alert.danger({
            message: error.type,
          });
          break;
        default:
          this._deps.alert.danger({
            message: messageTypes.CONNECT_ERROR,
          });
      }

      await this._logout();
    }
  }

  loginAgent = async (token: string = this._deps.auth.accessToken) => {
    const authenticateRes = await this.authenticateWithToken({
      rcAccessToken: token,
      shouldEmitAuthSuccess: false,
    });
    if (!authenticateRes) return;
    await this.openSocketWithSelectedAgentId();
  };

  onceLoginSuccess(callback: () => void) {
    this._eventEmitter.once(loginStatus.LOGIN_SUCCESS, callback);
  }

  onAuthSuccess(callback: () => void) {
    this._eventEmitter.on(loginStatus.AUTH_SUCCESS, callback);
  }

  private _emitLogoutBefore() {
    this._eventEmitter.emit(loginStatus.LOGOUT_BEFORE);
  }

  private _emitLoginSuccess() {
    this._eventEmitter.emit(loginStatus.LOGIN_SUCCESS);
  }

  private _emitAuthSuccess() {
    this._eventEmitter.emit(loginStatus.AUTH_SUCCESS);
  }

  private async _checkTabManagerEvent() {
    const { event } = this._deps.tabManager;
    if (event) {
      switch (event.name) {
        case tabManagerEvents.LOGOUT:
          this._logoutByOtherTab = true;
          break;
        case tabManagerEvents.OPEN_SOCKET:
          await this._deps.block.next(async () => {
            await this.openSocketWithSelectedAgentId({
              retryOpenSocket: true,
            });
          });
          break;
        case tabManagerEvents.LOGGED_OUT:
          this.setNotAuth();
          break;
        default:
          break;
      }
    }
  }
}

export { EvAuth };
