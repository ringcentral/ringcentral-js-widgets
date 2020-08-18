import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
} from '@ringcentral-integration/core';
import format from '@ringcentral-integration/phone-number/lib/format';
import EventEmitter from 'events';
import { Module } from 'ringcentral-integration/lib/di';

import { authStatus, messageTypes, tabManagerEvents } from '../../enums';
import { EvAgentData, EvAgentInfo } from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums';
import { sortByName } from '../../lib/sortByName';
import { trackEvents } from '../../lib/trackEvents';
import { Auth, Deps, State } from './EvAuth.interface';
import i18n from './i18n';

const DEFAULT_COUNTRIES = ['USA', 'CAN'];

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
class EvAuth extends RcModuleV2<Deps> implements Auth {
  public connecting?: boolean;

  private _eventEmitter = new EventEmitter();

  public canUserLogoutFn: () => Promise<boolean> = async () => true;

  private _logout = () => {
    return this._deps.auth.logout({ dismissAllAlert: false });
  };

  private _logoutByOtherTab = false;

  get tabManagerEnabled() {
    return this._deps.tabManager?._tabbie.enabled;
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvAuth',
    });
  }

  @storage
  @state
  connected = false;

  @storage
  @state
  agent: EvAgentData = null;

  get agentId() {
    return this.agent?.authenticateResponse?.agents[0]?.agentId || '';
  }

  get isFreshLogin() {
    return this._deps.auth.isFreshLogin;
  }

  get agentConfig() {
    return this.agent?.agentConfig || null;
  }

  get agentSettings() {
    return this.agentConfig.agentSettings;
  }

  get outboundManualDefaultRingtime() {
    return this.agentSettings.outboundManualDefaultRingtime;
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
    return this.agentConfig.agentPermissions;
  }

  get autoAnswerCalls() {
    return this.agentConfig.agentPermissions.defaultAutoAnswerOn;
  }

  @computed((that: EvAuth) => [that.inboundSettings.availableQueues])
  get availableQueues() {
    return [
      {
        gateId: '-1',
        gateName: i18n.getString('default', this._deps.locale.currentLocale),
      },
      ...sortByName(this.inboundSettings.availableQueues, 'gateName'),
    ];
  }

  @computed((that: EvAuth) => [that.inboundSettings.availableRequeueQueues])
  get availableRequeueQueues() {
    return sortByName(this.inboundSettings.availableRequeueQueues, 'groupName');
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
    const { availableCountries } = this.agentConfig.applicationSettings;
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
    this.agent = agent;
    this.connected = connected;
  }

  @action
  setAgent(agent: EvAgentData) {
    this.agent = agent;
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

        this.newReconnect();
      }
    });
  }

  async onStateChange() {
    if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
      this._checkTabManagerEvent();
    }

    if (this._deps.auth.loggedIn && !this.connected && !this.connecting) {
      this.connecting = true;
      // when login make sure the _logoutByOtherTab is false
      this._logoutByOtherTab = false;

      await this.loginAgent();
      this.connecting = false;
    }
  }

  onceLogout(cb: () => any) {
    return this._deps.evSubscription.once(EvCallbackTypes.LOGOUT, cb);
  }

  async logout() {
    if (!(await this.canUserLogoutFn())) {
      return;
    }

    const agentId = this.agentId;

    this.sendLogoutTabEvent();

    await this._deps.block.next(this._logout);

    const logoutAgentResponse = await this.logoutAgent(agentId);

    // TODO: error handle when logout fail
    // TODO: when failed need tell other tab not logout => this._deps.tabManager.send(tabManagerEvents.LOGOUT);
    if (!logoutAgentResponse.message || logoutAgentResponse.message !== 'OK') {
      console.log('logoutAgent failed');
      return;
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
    this._eventEmitter.on(authStatus.LOGOUT_BEFORE, callback);
  }

  newReconnect(isBlock: boolean = true) {
    this._deps.evClient.closeSocket();

    const fn = this.loginAgent;

    return isBlock ? this._deps.block.next(fn) : fn();
  }

  loginAgent = async () => {
    try {
      this._deps.evClient.initSDK();

      const agent = await this._deps.evClient.loginAgent(
        this._deps.auth.accessToken,
        'Bearer',
      );
      this.setConnectionData({
        connected: true,
        agent: agent.data,
      });

      this._eventEmitter.emit(authStatus.LOGIN_SUCCESS, agent);
    } catch (error) {
      switch (error.type) {
        case messageTypes.NO_AGENT:
          this._deps.alert.warning({
            message: error.type,
          });
          break;
        case messageTypes.CONNECT_TIMEOUT:
        case messageTypes.UNEXPECTED_AGENT:
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
  };

  onLoginSuccess(callback: (agent: EvAgentInfo) => void) {
    this._eventEmitter.on(authStatus.LOGIN_SUCCESS, callback);
  }

  private _emitLogoutBefore() {
    this._eventEmitter.emit(authStatus.LOGOUT_BEFORE);
  }

  private _checkTabManagerEvent() {
    const { event } = this._deps.tabManager;
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
}

export { EvAuth };
