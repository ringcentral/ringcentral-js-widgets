import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
} from '@ringcentral-integration/core';
import { format, parse } from '@ringcentral-integration/phone-number';
import { equals } from 'ramda';
import { Module } from 'ringcentral-integration/lib/di';
import sleep from 'ringcentral-integration/lib/sleep';

import {
  dropDownOptions,
  LoginTypes,
  loginTypes,
  messageTypes,
  tabManagerEvents,
} from '../../enums';
import { LoginType } from '../../interfaces/EvAgentSessionUI.interface';
import {
  EvAgentConfig,
  EvAvailableSkillProfile,
  EvConfigureAgentOptions,
} from '../../lib/EvClient';
import { HeartBeat } from '../../lib/heartBeat';
import { trackEvents } from '../../lib/trackEvents';
import { AgentSession, Deps, FormGroup } from './EvAgentSession.interface';
import i18n from './i18n';

const ACCEPTABLE_LOGIN_TYPES = [
  loginTypes.integratedSoftphone,
  loginTypes.RC_PHONE,
  loginTypes.externalPhone,
];
const DEFAULT_LOGIN_TYPE = loginTypes.integratedSoftphone;

const NONE = dropDownOptions.None;

// wait all tab is logout complete, server has some delay after logout
const WAIT_EV_SERVER_ROLLBACK_DELAY = 2000;

const DEFAULT_FORM_GROUP = {
  selectedInboundQueueIds: [] as any,
  loginType: DEFAULT_LOGIN_TYPE,
  selectedSkillProfileId: NONE,
  extensionNumber: '',
};

@Module({
  name: 'EvAgentSession',
  deps: [
    'EvClient',
    'Auth',
    'EvAuth',
    'Storage',
    'Alert',
    'Auth',
    'Locale',
    'RegionSettings',
    'RouterInteraction',
    'Modal',
    'Block',
    { dep: 'TabManager', optional: true },
    { dep: 'EvAgentSessionOptions', optional: true },
  ],
})
class EvAgentSession extends RcModuleV2<Deps> implements AgentSession {
  isForceLogin = false;
  onConfigSuccess: Function[] = [];
  onTriggerConfig: Function[] = [];
  clearCalls?: () => void;

  private _loginPromise: Promise<void>;
  private _heartBeat: HeartBeat;
  private _isAgentUpdating = false;
  private _updateSessionBlockId: string;

  get isConfigTab() {
    return !this.tabManagerEnabled || this._heartBeat?.isSuccessByLocal;
  }

  get shouldBlockBrowser() {
    // when there is not integrated softphone and not has multiple tabs
    return !this.isIntegratedSoftphone && !this.hasMultipleTabs;
  }

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvAgentSession',
    });
    const heartBeatInterval =
      this._deps.evAgentSessionOptions?.heartBeatInterval ?? 1000;

    if (this.tabManagerEnabled) {
      this._heartBeat = new HeartBeat(
        `${this._deps.tabManager._tabbie.prefix}sessionConfig`,
        heartBeatInterval,
      );
    }

    // #region those event should put in constructor, that _shouldInit will effect that binding timing.
    this._deps.evAuth.onLoginSuccess(async () => {
      if (this._isAgentUpdating) {
        return;
      }

      this._afterLogin();

      if (!this._deps.auth.isFreshLogin && this.configured) {
        try {
          return await this._autoConfigureAgent();
        } catch (e) {
          console.error(e);
        }
      }

      this.setFreshConfig();

      this._deps.routerInteraction.push('/sessionConfig');
    });

    this.onConfigSuccess.push(async () => {
      if (this._isAgentUpdating) {
        this._isAgentUpdating = false;
      } else {
        this._deps.routerInteraction.push('/dialer');
      }
    });

    this._deps.evAuth.beforeAgentLogout(() => {
      if (!this._isAgentUpdating) {
        this.resetAllConfig();
      }
      this.setConfigSuccess(false);
      this._heartBeat?.destroy();
    });
    // #endregion
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

  @storage
  @state
  formGroup: FormGroup = DEFAULT_FORM_GROUP;

  get isExternalPhone() {
    return this.formGroup.loginType === loginTypes.externalPhone;
  }

  get isIntegratedSoftphone() {
    return this.loginType === loginTypes.integratedSoftphone;
  }

  get localStorage() {
    return window?.localStorage;
  }

  get tabManagerEnabled() {
    return this._deps.tabManager?._tabbie.enabled;
  }

  get hasMultipleTabs() {
    return this._deps.tabManager?.hasMultipleTabs;
  }

  @computed((that: EvAgentSession) => [that._deps.locale.currentLocale])
  get loginTypeList() {
    const { currentLocale } = this._deps.locale;

    return ACCEPTABLE_LOGIN_TYPES.map(
      (type) =>
        ({
          id: type,
          label: i18n.getString(type, currentLocale),
        } as LoginType),
    );
  }

  @computed((that: EvAgentSession) => [
    that._deps.evAuth.agent.agentConfig,
    that._deps.auth.isFreshLogin,
  ])
  get inboundQueues() {
    const { agentConfig } = this._deps.evAuth.agent;

    if (!agentConfig || !agentConfig.inboundSettings) {
      return [];
    }
    const {
      inboundSettings: { availableQueues = [] },
    } = agentConfig;

    const { isFreshLogin } = this._deps.auth;

    return availableQueues.map((queue) => ({
      gateId: queue.gateId,
      gateName: queue.gateName,
      checked: isFreshLogin,
    }));
  }

  @computed((that: EvAgentSession) => [that.skillProfileList])
  get defaultSkillProfile() {
    const defaultSkill = this._pickSkillProfile(this.skillProfileList);
    return defaultSkill ? defaultSkill.profileId : NONE;
  }

  @computed((that: EvAgentSession) => [
    that._deps.evAuth.agent.agentConfig,
    that._deps.locale.currentLocale,
  ])
  get skillProfileList() {
    const { agentConfig } = this._deps.evAuth.agent;

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
        profileName: i18n.getString(NONE, this._deps.locale.currentLocale),
      });
    }

    return availableSkillProfiles;
  }

  @computed((that: EvAgentSession) => [
    that.skillProfileList,
    that.selectedSkillProfileId,
  ])
  get selectedSkillProfile() {
    const selectedSkillProfile = this.skillProfileList.find(
      (profile) => profile.profileId === this.formGroup.selectedSkillProfileId,
    );
    return selectedSkillProfile?.profileName;
  }

  @computed((that: EvAgentSession) => [
    that.inboundQueues,
    that.selectedInboundQueueIds,
  ])
  get selectedInboundQueues() {
    const results = this.formGroup.selectedInboundQueueIds.map((id) => {
      return this.inboundQueues.find((queue) => queue.gateId === id);
    });
    return results.filter((result) => result).map((result) => result.gateName);
  }

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

  @track((_: EvAgentSession, type: LoginTypes) => [
    trackEvents.agentSessionSetLoginType,
    { value: type },
  ])
  @action
  setLoginType(type: LoginTypes) {
    this.loginType = type;
  }

  @track((_: EvAgentSession, skillProfileId: string) => [
    trackEvents.agentSessionSetSkillProfileId,
    { value: skillProfileId },
  ])
  @action
  setSkillProfileId(skillProfileId: string) {
    this.selectedSkillProfileId = skillProfileId;
  }

  @track((_: EvAgentSession, ids: string[]) => [
    trackEvents.agentSessionSetInboundQueueIds,
    { value: ids },
  ])
  @action
  setInboundQueueIds(ids: string[]) {
    this.selectedInboundQueueIds = ids;
  }

  @action
  setExtensionNumber(extensionNumber: string) {
    this.extensionNumber = extensionNumber;
  }

  @track((_: EvAgentSession, takingCall: boolean) => [
    trackEvents.agentSessionSetTakingCall,
    { value: takingCall },
  ])
  @action
  setTakingCall(takingCall: boolean) {
    this.takingCall = takingCall;
  }

  @track((_: EvAgentSession, autoAnswer: boolean) => [
    trackEvents.agentSessionSetAutoAnswer,
    { value: autoAnswer },
  ])
  @action
  setAutoAnswer(autoAnswer: boolean) {
    this.autoAnswer = autoAnswer;
  }

  @action
  setFreshConfig() {
    this._clearCalls();

    this.loginType = DEFAULT_LOGIN_TYPE;
    this.extensionNumber = '';
    this.takingCall = true;
    this.autoAnswer = false;
    this.configSuccess = false;
    this.configured = false;

    this.selectedSkillProfileId = this.defaultSkillProfile;
    this.selectedInboundQueueIds = this.inboundQueues.map(
      (inboundQueue) => inboundQueue.gateId,
    );
  }

  assignFormGroupValue() {
    const {
      selectedInboundQueueIds,
      extensionNumber,
      loginType,
      selectedSkillProfileId,
    } = this.formGroup;
    this.setInboundQueueIds(selectedInboundQueueIds);
    this.setExtensionNumber(extensionNumber);
    this.setLoginType(loginType);
    this.setSkillProfileId(selectedSkillProfileId);
    this.resetFormGroup();
  }

  @action
  setFormGroup(data: FormGroup) {
    this.formGroup = { ...this.formGroup, ...data };
  }

  resetFormGroup() {
    this.setFormGroup({
      selectedInboundQueueIds: this.selectedInboundQueueIds,
      selectedSkillProfileId: this.selectedSkillProfileId,
      loginType: this.loginType,
      extensionNumber: this.extensionNumber,
    });
  }

  @computed((that: EvAgentSession) => [
    that.selectedInboundQueueIds,
    that.selectedSkillProfileId,
    that.loginType,
    that.extensionNumber,
    that.formGroup,
  ])
  get isSessionChanged() {
    const sessionConfigs = {
      selectedInboundQueueIds: this.selectedInboundQueueIds,
      selectedSkillProfileId: this.selectedSkillProfileId,
      loginType: this.loginType,
      extensionNumber: this.extensionNumber,
    };
    return !equals(sessionConfigs, this.formGroup);
  }

  _shouldInit() {
    return (
      super._shouldInit() &&
      this._deps.auth.loggedIn &&
      this._deps.evAuth.connected
    );
  }

  _shouldReset() {
    return super._shouldReset() && !this._deps.auth.loggedIn;
  }

  async onStateChange() {
    if (this.ready && this.tabManagerEnabled && this._deps.tabManager.ready) {
      await this._checkTabManagerEvent();
    }
  }

  private async _checkTabManagerEvent() {
    const { event } = this._deps.tabManager;
    if (event) {
      switch (event.name) {
        case tabManagerEvents.AGENT_CONFIG_SUCCESS:
          await this._othersTabConfigureAgent();
          break;
        case tabManagerEvents.UPDATE_SESSION:
          this._updateSessionBlockId = this._deps.block.block();
          this._isAgentUpdating = true;
          this._deps.evAuth.onceLogout(async () => {
            await sleep(WAIT_EV_SERVER_ROLLBACK_DELAY);
            this._loginPromise = this._deps.evAuth.loginAgent();
          });
          break;
        case tabManagerEvents.UPDATE_SESSION_SUCCESS:
          try {
            await this._loginPromise;
            await this._autoConfigureAgent();
            this._deps.block.unblock(this._updateSessionBlockId);

            this._isAgentUpdating = false;
          } catch (error) {
            // when that auto config fail, just reload that tab
            console.log(error);
            window.location.reload();
          }
          break;
        case tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT:
          this._showUpdateSuccessAlert();
          break;
        default:
          break;
      }
    }
  }

  private _afterLogin() {
    // if that is not first login set SessionConfig data again
    if (!this._deps.auth.isFreshLogin) {
      const checkSelectIsInList = this.skillProfileList.some(
        (profile) => profile.profileId === this.selectedSkillProfileId,
      );
      if (!checkSelectIsInList) {
        this.setSkillProfileId(this.defaultSkillProfile);
      }

      // check all selected queue is in inboundQueue list
      const checkedInboundQueues = this.selectedInboundQueueIds.reduce(
        (result, inboundQueueId) => {
          if (
            this.inboundQueues.some(
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
  @track((that: EvAgentSession) => [
    trackEvents.agentSessionConfigureAgent,
    {
      'Voice Connection': that.loginType,
      'Persistent Voice Connection': that.takingCall,
      'Skill Profile': that.selectedSkillProfile,
      'Inbound Queues': that.selectedInboundQueues,
      'Auto Answer': that.autoAnswer,
    },
  ])
  async configureAgent(triggerEvent: boolean = true) {
    const config = this._checkFieldsResult();
    this._clearCalls();

    let result = await this._connectEvServer(config);

    // Session timeout
    // this will occur when stay in session config page for long time
    if (result.data.status !== 'SUCCESS') {
      this._deps.routerInteraction.push('/sessionConfig');
      await this._deps.evAuth.newReconnect(false);

      result = await this._connectEvServer(config);
    }

    this._handleAgentResult(result.data);

    if (triggerEvent) {
      this._onTriggerAgentConfig();
      this._sendTabManager(tabManagerEvents.AGENT_CONFIG_SUCCESS);
      this.setConfigSuccess(true);
    }

    if (this.tabManagerEnabled) {
      this._heartBeat.heartBeatOnSuccess();
    }
  }

  async updateAgent(voiceConnectionChanged: boolean) {
    await this._deps.block.next(async () => {
      const config = this._checkFieldsResult();

      this._clearCalls();

      this._isAgentUpdating = true;

      if (voiceConnectionChanged) {
        this._sendTabManager(tabManagerEvents.UPDATE_SESSION);
        this._deps.evAuth.sendLogoutTabEvent();

        await this._deps.evAuth.logoutAgent();

        // wait all login is logout complete.
        await sleep(WAIT_EV_SERVER_ROLLBACK_DELAY);

        await this._deps.evAuth.loginAgent();
        config.isForce = true;
      }

      const result = await this._connectEvServer(config);
      this._handleAgentResult(result.data);

      this._onTriggerAgentConfig();

      this.setConfigSuccess(true);

      await this.updateAgentConfigs();

      if (this.tabManagerEnabled) {
        this._heartBeat.heartBeatOnSuccess();
      }

      if (voiceConnectionChanged) {
        this._sendTabManager(tabManagerEvents.UPDATE_SESSION_SUCCESS);
      }

      this.goToSettingsPage();

      this._sendTabManager(tabManagerEvents.UPDATE_SESSION_SUCCESS_ALERT);
      this._showUpdateSuccessAlert();
    });
  }

  goToSettingsPage() {
    this._deps.routerInteraction.push('/settings');
  }

  private _showUpdateSuccessAlert() {
    this._deps.alert.success({
      message: messageTypes.UPDATE_AGENT_SUCCESS,
    });
  }

  private _handleAgentResult({ message, status }: EvAgentConfig) {
    if (status !== 'SUCCESS') {
      if (typeof message === 'string') {
        this._deps.alert.danger({
          message: messageTypes.AGENT_CONFIG_DETAIL_ERROR,
          ttl: 0,
          payload: message,
        });
      } else {
        this._deps.alert.danger({
          message: this._isAgentUpdating
            ? messageTypes.UPDATE_AGENT_ERROR
            : messageTypes.AGENT_CONFIG_ERROR,
          ttl: 0,
        });
      }
      throw new Error(message);
    }
    this.assignFormGroupValue();
  }

  private _autoConfigureAgent() {
    if (this.tabManagerEnabled) {
      const isWorkingByLocal = this._heartBeat.isWorkingByLocal;

      if (!isWorkingByLocal) {
        this._heartBeat.heartBeatOnWorking();
      }

      // check isSuccess first
      if (this._heartBeat.isSuccessByLocal || this._isAgentUpdating) {
        return this._othersTabConfigureAgent();
      }

      // then check local
      if (!isWorkingByLocal) {
        return this.configureAgent();
      }
    } else {
      return this.configureAgent();
    }
  }

  async _othersTabConfigureAgent() {
    if (this.configSuccess) {
      return;
    }
    try {
      await this._deps.evClient.multiLoginRequest();

      this.setConfigSuccess(true);

      await this.updateAgentConfigs();

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

  async updateAgentConfigs() {
    const agentConfig = await this._deps.evClient.getAgentConfig();
    const agent = {
      ...this._deps.evAuth.agent,
      agentConfig,
    };
    this._deps.evAuth.setAgent(agent);
  }

  private async _connectEvServer(config: EvConfigureAgentOptions) {
    let result = await this._deps.evClient.configureAgent(config);
    const { status } = result.data;

    if (status === messageTypes.EXISTING_LOGIN_FOUND) {
      const { currentLocale } = this._deps.locale;

      // TODO: think about sync up in all tabs?
      const modalId = await this._deps.modal.confirmSync({
        title: i18n.getString('multipleLoginsTitle', currentLocale),
        content: i18n.getString('multipleLoginsContent', currentLocale),
        okText: i18n.getString('multipleLoginsConfirm', currentLocale),
        cancelText: i18n.getString('multipleLoginsCancel', currentLocale),
        onOK: async () => {
          result = await this._deps.evClient.configureAgent({
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
      this._deps.alert.danger({
        message: messageTypes.EXISTING_LOGIN_ENGAGED,
        ttl: 0,
      });

      throw new Error(messageTypes.EXISTING_LOGIN_ENGAGED);
    }

    return result;
  }

  private _checkFieldsResult(): EvConfigureAgentOptions {
    if (this.formGroup.selectedInboundQueueIds.length === 0) {
      this._deps.alert.danger({
        message: messageTypes.NO_AGENT_SELECTED,
        ttl: 0,
      });
      throw new Error(`'queueIds' is an empty array.`);
    }

    return {
      dialDest: this._getDialDest(),
      queueIds: this.formGroup.selectedInboundQueueIds,
      skillProfileId:
        this.formGroup.selectedSkillProfileId === NONE
          ? ''
          : this.formGroup.selectedSkillProfileId,
    };
  }

  private _getDialDest() {
    // Only external phone has number input
    switch (this.formGroup.loginType) {
      case loginTypes.externalPhone: {
        if (!this.formGroup.extensionNumber) {
          this._deps.alert.danger({
            message: messageTypes.EMPTY_PHONE_NUMBER,
            ttl: 0,
          });
          throw new Error(`'extensionNumber' is an empty number.`);
        }
        const formatPhoneNumber = format({
          phoneNumber: this.formGroup.extensionNumber,
          areaCode: this._deps.regionSettings.areaCode,
        });
        const { parsedNumber, isValid } = parse({
          input: formatPhoneNumber,
        });
        if (!isValid || !parsedNumber || parsedNumber === '') {
          this._deps.alert.danger({
            message: messageTypes.INVALID_PHONE_NUMBER,
            ttl: 0,
          });
          throw new Error(`'extensionNumber' is not a valid number.`);
        }
        this.setFormGroup({ extensionNumber: parsedNumber });
        return this.formGroup.extensionNumber;
      }
      case loginTypes.integratedSoftphone:
        return 'integrated';
      case loginTypes.RC_PHONE:
      default:
        return 'RC_PHONE';
    }
  }

  private _sendTabManager(event: string, value?: any) {
    this._deps.tabManager?.send(event, value);
  }

  private _clearCalls() {
    if (typeof this.clearCalls === 'function') {
      this.clearCalls();
    }
  }
}

export { EvAgentSession };
