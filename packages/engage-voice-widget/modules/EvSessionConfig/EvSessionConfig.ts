import {
  action,
  createSelector,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { format, parse } from '@ringcentral-integration/phone-number';
import { Module } from 'ringcentral-integration/lib/di';

import {
  dropDownOptions,
  LoginTypes,
  loginTypes,
  messageTypes,
  tabManagerEvents,
} from '../../enums';
import {
  EvAvailableSkillProfile,
  EvConfigureAgentOptions,
} from '../../lib/EvClient';
import { HeartBeat } from '../../lib/heartBeat';
import { DepsModules, SessionConfig, State } from './EvSessionConfig.interface';
import i18n from './i18n';

const ACCEPTABLE_LOGIN_TYPES = [
  loginTypes.integratedSoftphone,
  loginTypes.RC_PHONE,
  loginTypes.externalPhone,
];
const DEFAULT_LOGIN_TYPE = loginTypes.integratedSoftphone;

const NONE = dropDownOptions.None;

type EvSessionConfigState = RcModuleState<EvSessionConfig, State>;

@Module({
  name: 'EvSessionConfig',
  deps: [
    'EvClient',
    'Auth',
    'EvAuth',
    'Storage',
    'Alert',
    'Auth',
    'Locale',
    'RegionSettings',
    'Modal',
    { dep: 'TabManager', optional: true },
    { dep: 'SessionConfigOptions', optional: true },
  ],
})
class EvSessionConfig extends RcModuleV2<DepsModules, EvSessionConfigState>
  implements SessionConfig {
  isForceLogin = false;

  onConfigSuccess: Function[] = [];

  onTriggerConfig: Function[] = [];

  clearCalls?: () => void;

  private _heartBeat: HeartBeat;

  get isConfigTab() {
    return !this.tabManagerEnabled || this._heartBeat?.isSuccessByLocal;
  }

  get shouldBlockBrowser() {
    // when there is not integrated softphone and not has multiple tabs
    return !this.isIntegratedSoftphone && !this.hasMultipleTabs;
  }

  constructor({
    evClient,
    evAuth,
    storage,
    alert,
    auth,
    locale,
    modal,
    regionSettings,
    tabManager,
    heartBeatInterval = 1000,
    enableCache = true,
  }) {
    super({
      modules: {
        evClient,
        evAuth,
        storage,
        auth,
        alert,
        locale,
        modal,
        regionSettings,
        tabManager,
      },
      enableCache,
      storageKey: 'EvSessionConfig',
    });

    this._modules.evAuth.beforeAgentLogout(() => {
      this.resetAllConfig();
    });

    if (this.tabManagerEnabled) {
      this._heartBeat = new HeartBeat(
        `${this._modules.tabManager._tabbie.prefix}sessionConfig`,
        heartBeatInterval,
      );
    }
  }

  @storage
  @state
  selectedSkillProfileId: string = NONE;

  @storage
  @state
  selectedInboundQueueIds: string[] = [];

  @storage
  @state
  loginType: LoginTypes = DEFAULT_LOGIN_TYPE;

  @storage
  @state
  extensionNumber = '';

  @storage
  @state
  takingCall = true;

  @storage
  @state
  autoAnswer = false;

  @storage
  @state
  configured = false;

  @state
  configSuccess = false;

  get isExternalPhone() {
    return this.loginType === loginTypes.externalPhone;
  }

  get isIntegratedSoftphone() {
    return this.loginType === loginTypes.integratedSoftphone;
  }

  get localStorage() {
    return window?.localStorage;
  }

  get tabManagerEnabled() {
    return this._modules.tabManager?._tabbie.enabled;
  }

  get hasMultipleTabs() {
    return this._modules.tabManager?.hasMultipleTabs;
  }

  getLoginTypeList = createSelector(
    () => this._modules.locale.currentLocale,
    (currentLocale) => {
      return ACCEPTABLE_LOGIN_TYPES.map((type) => ({
        id: type,
        label: i18n.getString(type, currentLocale),
      }));
    },
  );

  getInboundQueues = createSelector(
    () => this._modules.evAuth.agent.agentConfig,
    (agentConfig) => {
      if (!agentConfig || !agentConfig.inboundSettings) {
        return [];
      }
      const {
        inboundSettings: { availableQueues = [] },
      } = agentConfig;

      const { isFreshLogin } = this._modules.auth;

      return availableQueues.map((queue) => ({
        gateId: queue.gateId,
        gateName: queue.gateName,
        checked: isFreshLogin,
      }));
    },
  );

  getDefaultSkillProfile = createSelector(
    () => this.getSkillProfileList(),
    (skillProfileList) => {
      const defaultSkill = this._pickSkillProfile(skillProfileList);
      return defaultSkill ? defaultSkill.profileId : NONE;
    },
  );

  getSkillProfileList = createSelector(
    () => this._modules.evAuth.agent.agentConfig,
    (agentConfig) => {
      if (!agentConfig || !agentConfig.inboundSettings) {
        return [];
      }
      const {
        inboundSettings: { availableSkillProfiles = [] },
      } = agentConfig;

      const defaultSkill = this._pickSkillProfile(availableSkillProfiles);

      if (!defaultSkill && availableSkillProfiles.length > 0) {
        availableSkillProfiles.unshift({
          profileId: NONE,
          profileName: i18n.getString(NONE, this._modules.locale.currentLocale),
        });
      }

      return availableSkillProfiles;
    },
  );

  @action
  resetAllConfig() {
    this.selectedInboundQueueIds = [];
    this.selectedSkillProfileId = NONE;
    this.loginType = DEFAULT_LOGIN_TYPE;
    this.extensionNumber = '';
    this.takingCall = true;
    this.autoAnswer = false;
    this.configSuccess = false;
    this.configured = false;
  }

  @action
  setConfigSuccess(status: boolean) {
    if (status) {
      this._onConfigureAgentSuccess();
    }

    this.configSuccess = status;
    this.configured = status;
  }

  @action
  setLoginType(type: LoginTypes) {
    this.loginType = type;
  }

  @action
  setSkillProfileId(skillProfileId: string) {
    this.selectedSkillProfileId = skillProfileId;
  }

  @action
  setInboundQueueIds(ids: string[]) {
    this.selectedInboundQueueIds = ids;
  }

  @action
  setExtensionNumber(extensionNumber: string) {
    this.extensionNumber = extensionNumber;
  }

  @action
  setTakingCall(takingCall: boolean) {
    this.takingCall = takingCall;
  }

  @action
  setAutoAnswer(autoAnswer: boolean) {
    this.autoAnswer = autoAnswer;
  }

  @action
  setConfig({
    selectedSkillProfileId,
    selectedInboundQueueIds,
  }: Pick<
    EvSessionConfigState,
    'selectedSkillProfileId' | 'selectedInboundQueueIds'
  >) {
    this.loginType = DEFAULT_LOGIN_TYPE;
    this.extensionNumber = '';
    this.takingCall = true;
    this.autoAnswer = false;
    this.configSuccess = false;
    this.configured = false;

    this.selectedSkillProfileId = selectedSkillProfileId;
    this.selectedInboundQueueIds = selectedInboundQueueIds;
  }

  _shouldInit() {
    return (
      super._shouldInit() &&
      this._modules.auth.loggedIn &&
      this._modules.evAuth.connected
    );
  }

  onInitOnce() {
    this._modules.evAuth.beforeAgentLogout(() => {
      this.setConfigSuccess(false);
      this._heartBeat?.destroy();
    });
  }

  async onStateChange() {
    if (
      this.ready &&
      this.tabManagerEnabled &&
      this._modules.tabManager.ready
    ) {
      await this._checkTabManagerEvent();
    }
  }

  private async _checkTabManagerEvent() {
    const { event } = this._modules.tabManager;
    if (event) {
      // const data = event.args[0];
      switch (event.name) {
        case tabManagerEvents.AGENT_CONFIG_SUCCESS:
          await this._multiLoginRequest();
          break;
        default:
          break;
      }
    }
  }

  _shouldReset() {
    return super._shouldReset() && !this._modules.auth.loggedIn;
  }

  setFreshConfig() {
    this._clearCalls();

    this.setConfig({
      selectedSkillProfileId: this.getDefaultSkillProfile(),
      selectedInboundQueueIds: this.getInboundQueues().map(
        (inboundQueue) => inboundQueue.gateId,
      ),
    });
  }

  afterLogin() {
    // if that is not first login set SessionConfig data again
    if (!this._modules.auth.isFreshLogin) {
      const checkSelectIsInList = this.getSkillProfileList().some(
        (profile) => profile.profileId === this.selectedSkillProfileId,
      );
      if (!checkSelectIsInList) {
        this.setSkillProfileId(this.getDefaultSkillProfile());
      }

      // check all selected queue is in inboundQueue list
      const checkedInboundQueues = this.selectedInboundQueueIds.reduce(
        (result, inboundQueueId) => {
          if (
            this.getInboundQueues().some(
              (inboundQueue) => inboundQueue.gateId === inboundQueueId,
            )
          ) {
            result.push(inboundQueueId);
          }
          return result;
        },
        [],
      );
      this.setInboundQueueIds(checkedInboundQueues);
    }
  }

  /**
   * config agent in session config page
   * @param triggerEvent is that should trigger event, default is true
   */
  async configureAgent(triggerEvent: boolean = true) {
    const config = this._checkFieldsResult();

    this._clearCalls();

    let result = await this._connectEvServer(config);

    if (result) {
      // Session timeout
      // this will occur when stay in session config page for long time
      if (result.data.status !== 'SUCCESS') {
        await this._modules.evAuth.newReconnect(false);

        result = await this._connectEvServer(config);
      }

      const {
        data: { message, status },
      } = result;

      if (status !== 'SUCCESS') {
        if (typeof message === 'string') {
          this._modules.alert.danger({
            message: messageTypes.AGENT_CONFIG_DETAIL_ERROR,
            ttl: 0,
            payload: message,
          });
        } else {
          this._modules.alert.danger({
            message: messageTypes.AGENT_CONFIG_ERROR,
            ttl: 0,
          });
        }
        throw new Error(message);
      }

      if (triggerEvent) {
        this._onTriggerAgentConfig();
        this._sendTabManager(tabManagerEvents.AGENT_CONFIG_SUCCESS);
      }
    }
    if (triggerEvent) {
      this.setConfigSuccess(true);
    }

    if (this.tabManagerEnabled) {
      this._heartBeat.heartBeatOnSuccess();
    }
  }

  async autoConfigureAgent() {
    if (this.tabManagerEnabled) {
      const isConfiguringByLocal = this._heartBeat.isWorkingByLocal;

      if (!isConfiguringByLocal) {
        this._heartBeat.heartBeatOnWorking();
      }

      if (this._heartBeat.isSuccessByLocal) {
        await this._multiLoginRequest();
      } else if (!isConfiguringByLocal) {
        await this.configureAgent();
      }
    } else {
      await this.configureAgent();
    }
  }

  private async _multiLoginRequest() {
    if (this.configSuccess) {
      return;
    }
    try {
      await this._modules.evClient.multiLoginRequest();

      this.setConfigSuccess(true);

      this._heartBeat.heartBeatOnSuccess();
      return;
    } catch (e) {
      console.log(e);
    }
  }

  private _pickSkillProfile(skillProfileList: EvAvailableSkillProfile[]) {
    return skillProfileList.find((item) => item.isDefault === '1');
  }

  private _onConfigureAgentSuccess() {
    this.onConfigSuccess.forEach((hook) => {
      try {
        hook();
      } catch (e) {
        console.error(e);
      }
    });
  }

  private _onTriggerAgentConfig() {
    this.onTriggerConfig.forEach((hook) => {
      try {
        hook();
      } catch (e) {
        console.error(e);
      }
    });
  }

  private async _connectEvServer(config: EvConfigureAgentOptions) {
    let result = await this._modules.evClient.configureAgent(config);

    const { status } = result.data;

    if (status === messageTypes.EXISTING_LOGIN_FOUND) {
      const { currentLocale } = this._modules.locale;

      // TODO: think about sync up in all tabs?
      const modalId = await this._modules.modal.confirmSync({
        title: i18n.getString('multipleLoginsTitle', currentLocale),
        content: i18n.getString('multipleLoginsContent', currentLocale),
        okText: i18n.getString('multipleLoginsConfirm', currentLocale),
        cancelText: i18n.getString('multipleLoginsCancel', currentLocale),
        onOK: async () => {
          result = await this._modules.evClient.configureAgent({
            ...config,
            isForce: true,
          });
          this.isForceLogin = true;
        },
      });

      if (!modalId) {
        this.isForceLogin = false;
        throw new Error(status);
      }
    } else if (status === messageTypes.EXISTING_LOGIN_ENGAGED) {
      this._modules.alert.danger({
        message: messageTypes.EXISTING_LOGIN_ENGAGED,
        ttl: 0,
      });

      throw new Error(messageTypes.EXISTING_LOGIN_ENGAGED);
    }

    return result;
  }

  private _checkFieldsResult(): EvConfigureAgentOptions {
    if (this.selectedInboundQueueIds.length === 0) {
      this._modules.alert.danger({
        message: messageTypes.NO_AGENT_SELECTED,
        ttl: 0,
      });
      throw new Error(`'queueIds' is an empty array.`);
    }

    return {
      dialDest: this._getDialDest(),
      queueIds: this.selectedInboundQueueIds,
      skillProfileId:
        this.selectedSkillProfileId === NONE ? '' : this.selectedSkillProfileId,
    };
  }

  private _getDialDest() {
    // Only external phone has number input
    switch (this.loginType) {
      case loginTypes.externalPhone: {
        if (!this.extensionNumber) {
          this._modules.alert.danger({
            message: messageTypes.EMPTY_PHONE_NUMBER,
            ttl: 0,
          });
          throw new Error(`'extensionNumber' is an empty number.`);
        }
        const formattedNumber = format({
          phoneNumber: this.extensionNumber,
          areaCode: this._modules.regionSettings.areaCode,
        });
        const { parsedNumber, isValid } = parse({
          input: formattedNumber,
        });
        if (!isValid || !parsedNumber || parsedNumber === '') {
          this._modules.alert.danger({
            message: messageTypes.INVALID_PHONE_NUMBER,
            ttl: 0,
          });
          throw new Error(`'extensionNumber' is not a valid number.`);
        }
        this.setExtensionNumber(parsedNumber);
        return this.extensionNumber;
      }
      case loginTypes.integratedSoftphone:
        return 'integrated';
      case loginTypes.RC_PHONE:
      default:
        return 'RC_PHONE';
    }
  }

  private _sendTabManager(event: string, value?: any) {
    this._modules.tabManager?.send(event, value);
  }

  private _clearCalls() {
    if (typeof this.clearCalls === 'function') {
      this.clearCalls();
    }
  }
}

export { EvSessionConfig };
