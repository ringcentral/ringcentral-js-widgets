import {
  action,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
  createSelector,
} from '@ringcentral-integration/core';
import { format, parse } from '@ringcentral-integration/phone-number';
import { Module } from 'ringcentral-integration/lib/di';

import { dropDownOptions, loginTypes, messageTypes } from '../../enums';
import {
  EvAvailableSkillProfile,
  EvConfigureAgentOptions,
  EvMessageRes,
} from '../../lib/EvClient';
import { DepsModules, SessionConfig, State } from './EvSessionConfig.interface';
import i18n from './i18n';

const ACCEPTABLE_LOGIN_TYPES = [
  loginTypes.RC_PHONE,
  loginTypes.externalPhone,
  // TODO: Temporarily remove
  // loginTypes.integratedSoftphone,
];
const DEFAULT_LOGIN_TYPE = loginTypes.RC_PHONE;

const NONE = dropDownOptions.None;
const AGENT_CONFIG_SUCCESS_EVENT = 'AgentConfigSuccess';

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
  public onConfigSuccess: Function[] = [];

  public onTriggerConfig: Function[] = [];

  private _lastConfigSuccess = false;

  private _configSuccessKey?: string;

  private _configuringKey?: string;

  private _heartBeatIntervalTime?: number;

  private _heartBeatIntervalId = {
    success: null,
    configuring: null,
  };

  // for multiple tab using
  private _configureAgentPromise: Promise<EvMessageRes>;

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
    this._modules.auth.addBeforeLogoutHandler(() => {
      this.resetAllConfig();
    });
    if (this.tabManagerEnabled) {
      this._configSuccessKey = `${this._modules.tabManager._tabbie._prefix}configSuccess`;
      this._configuringKey = `${this._modules.tabManager._tabbie._prefix}configuring`;
      this._heartBeatIntervalTime = heartBeatInterval;
    }
  }

  @storage
  @state
  selectedSkillProfileId = NONE;

  @storage
  @state
  selectedInboundQueueIds: string[] = [];

  @storage
  @state
  loginType = DEFAULT_LOGIN_TYPE;

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

  get isIntegrated() {
    return this.loginType === loginTypes.integratedSoftphone;
  }

  get isConfigSuccessByLocal() {
    return this._getConfigStatusByLocal(this._configSuccessKey);
  }

  get isConfiguringByLocal() {
    return this._getConfigStatusByLocal(this._configuringKey);
  }

  get localStorage() {
    return window?.localStorage;
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
      const defaultSkill = this.pickSkillProfile(skillProfileList);
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

      const defaultSkill = this.pickSkillProfile(availableSkillProfiles);

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
    this.state.selectedInboundQueueIds = [];
    this.state.selectedSkillProfileId = NONE;
    this.state.loginType = DEFAULT_LOGIN_TYPE;
    this.state.extensionNumber = '';
    this.state.takingCall = true;
    this.state.autoAnswer = false;
    this.state.configSuccess = false;
    this.state.configured = false;
    this._lastConfigSuccess = false;
  }

  @action
  setConfigSuccess(status: boolean) {
    this.state.configSuccess = status;
    this.state.configured = status;
  }

  @action
  setLoginType(type: string) {
    this.state.loginType = type;
  }

  @action
  setSkillProfileId(skillProfileId: string) {
    this.state.selectedSkillProfileId = skillProfileId;
  }

  @action
  setInboundQueueIds(ids: string[]) {
    this.state.selectedInboundQueueIds = ids;
  }

  @action
  setExtensionNumber(extensionNumber: string) {
    this.state.extensionNumber = extensionNumber;
  }

  @action
  setTakingCall(takingCall: boolean) {
    this.state.takingCall = takingCall;
  }

  @action
  setAutoAnswer(autoAnswer) {
    this.state.autoAnswer = autoAnswer;
  }

  @action
  setConfig(skillProfileId: string, selectedInboundQueueIds: string[]) {
    this.state.loginType = DEFAULT_LOGIN_TYPE;
    this.state.extensionNumber = '';
    this.state.takingCall = true;
    this.state.autoAnswer = false;
    this.state.configSuccess = false;
    this.state.configured = false;
    this._lastConfigSuccess = false;

    this.state.selectedSkillProfileId = skillProfileId;
    this.state.selectedInboundQueueIds = selectedInboundQueueIds;
  }

  setFreshConfig() {
    this.setConfig(
      this.getDefaultSkillProfile(),
      this.getInboundQueues().map((inboundQueue) => inboundQueue.gateId)
    );
  }

  afterLogin() {
    // handle setting
    if (this._modules.auth.isFreshLogin) {
      this.setFreshConfig();
    } else {
      // check current skill is in list of skillList
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

  _shouldInit() {
    return (
      super._shouldInit() &&
      this._modules.auth.loggedIn &&
      this._modules.evAuth.connected
    );
  }

  _shouldReset() {
    return super._shouldReset() && !this._modules.auth.loggedIn;
  }

  async getSessionConfig() {
    await this._modules.evClient.getAgentConfig();
  }

  pickSkillProfile(skillProfileList: EvAvailableSkillProfile[]) {
    return skillProfileList.find((item) => item.isDefault === '1');
  }

  async autoConfigureAgent() {
    const isConfiguringByLocal = this.isConfiguringByLocal;
    if (this.tabManagerEnabled && !isConfiguringByLocal) {
      this._heartBeatOnConfiguring();
    }
    if (this.isConfigSuccessByLocal) {
      try {
        await this._modules.evClient.multiLoginRequest();
        this.setConfigSuccess(true);
        if (this.tabManagerEnabled) {
          this._heartBeatOnConfigSuccess();
        }
        return;
      } catch (e) {
        console.log(e);
      }
    } else if (!this.tabManagerEnabled || !isConfiguringByLocal) {
      await this.configureAgent();
    }
  }

  async configureAgent() {
    const config = this._checkFieldsResult();

    let result = await this._connectEvServer(config);

    if (result) {
      // Session timeout
      // this will occur when stay in session config page for long time
      if (result.data.status !== 'SUCCESS') {
        this._modules.evClient.closeSocket();
        this._modules.evClient.onInit();
        await this._modules.evAuth.loginAgent();
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

      this._onTriggerAgentConfig();

      if (this.hasMultipleTabs) {
        this._modules.tabManager.send(AGENT_CONFIG_SUCCESS_EVENT, true);
      }
    }
    this.setConfigSuccess(true);

    if (this.tabManagerEnabled) {
      this._heartBeatOnConfigSuccess();
    }
  }

  private _heartBeatOnConfigSuccess() {
    if (typeof this._heartBeatIntervalId.success === 'number') return;

    this._heartBeatIntervalId.success = setInterval(() => {
      this.localStorage.setItem(this._configSuccessKey, Date.now().toString());
    }, this._heartBeatIntervalTime);
  }

  private _heartBeatOnConfiguring() {
    if (typeof this._heartBeatIntervalId.configuring === 'number') return;

    this.localStorage.setItem(this._configuringKey, Date.now().toString());

    this._heartBeatIntervalId.configuring = setInterval(() => {
      this.localStorage.setItem(this._configuringKey, Date.now().toString());
    }, this._heartBeatIntervalTime);
  }

  private _getConfigStatusByLocal(statusKey: string) {
    return (
      this.localStorage &&
      Date.now() - Number(this.localStorage.getItem(statusKey)) <
        this._heartBeatIntervalTime * 2 - 100
    );
  }

  onReset() {
    this._lastConfigSuccess = false;
    this.setConfigSuccess(false);
    clearInterval(this._heartBeatIntervalId.success);
    this._heartBeatIntervalId.success = null;
    clearInterval(this._heartBeatIntervalId.configuring);
    this._heartBeatIntervalId.configuring = null;
  }

  async onStateChange() {
    if (this.configSuccess && this._lastConfigSuccess !== this.configSuccess) {
      this._lastConfigSuccess = this.configSuccess;
      this._onConfigureAgentSuccess();
    }
    if (
      this.ready &&
      this.tabManagerEnabled &&
      this._modules.tabManager.ready &&
      this._modules.tabManager.event &&
      this._modules.tabManager.event.name === AGENT_CONFIG_SUCCESS_EVENT &&
      this._modules.tabManager.event.args[0]
    ) {
      await this._configureAgentPromise;
      await this._modules.evClient.multiLoginRequest();
      this.setConfigSuccess(true);
      this._heartBeatOnConfigSuccess();
      this._closeModal();
    }
  }

  private _closeModal() {
    this._modules.modal.modalIds.forEach((id) => {
      this._modules.modal.close(id);
    });
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
    this._configureAgentPromise = this._modules.evClient.configureAgent(config);
    let result = await this._configureAgentPromise;
    if (result.data.status === messageTypes.EXISTING_LOGIN_FOUND) {
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
        },
      });

      if (!modalId) {
        throw new Error(result.data.status);
      }
    } else if (result.data.status === messageTypes.EXISTING_LOGIN_ENGAGED) {
      this._modules.alert.danger({
        message: messageTypes.EXISTING_LOGIN_ENGAGED,
        ttl: 0,
      });

      throw new Error(messageTypes.EXISTING_LOGIN_ENGAGED);
    }

    return result;
  }

  get hasMultipleTabs() {
    return this.tabManagerEnabled && this._modules.tabManager.hasMultipleTabs;
  }

  get tabManagerEnabled() {
    return this._modules.tabManager?._tabbie.enabled;
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
}

export { EvSessionConfig };
