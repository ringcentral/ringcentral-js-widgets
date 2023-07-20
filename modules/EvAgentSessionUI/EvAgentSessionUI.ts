import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  action,
  computed,
  RcUIModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';

import type { LoginTypes } from '../../enums';
import { dropDownOptions, loginTypes, tabManagerEvents } from '../../enums';
import type {
  ChangeQueueStateFn,
  EvAgentSessionUIFunctions,
  EvAgentSessionUIProps,
} from '../../interfaces/EvAgentSessionUI.interface';
import type { AvailableQueue } from '../../interfaces/SelectableQueue.interface';
import { sortByName } from '../../lib/sortByName';
import type { Deps, SessionConfigUI } from './EvAgentSessionUI.interface';
import i18n from './i18n';

@Module({
  name: 'EvAgentSessionUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'EvAuth',
    'EvAgentSession',
    'EvSettings',
    'EvWorkingState',
    'Storage',
    'ModalUI',
    'EvCallMonitor',
    'Block',
    'EvClient',
    { dep: 'TabManager', optional: true },
    { dep: 'EvAgentSessionUIOptions', optional: true },
  ],
})
class EvAgentSessionUI extends RcUIModuleV2<Deps> implements SessionConfigUI {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvAgentSessionUI',
    });
  }

  override async onStateChange() {
    if (
      this.ready &&
      this._deps.tabManager.ready &&
      this._deps.tabManager?.enable
    ) {
      await this._checkTabManagerEvent();
    }
  }

  private async _checkTabManagerEvent() {
    const { event } = this._deps.tabManager;
    if (event) {
      switch (event.name) {
        case tabManagerEvents.RE_CHOOSE_ACCOUNT:
          await this._onAccountReChoose();
          break;
        default:
          break;
      }
    }
  }

  @storage
  @state
  isLoading = false;

  @computed((that: EvAgentSessionUI) => [
    that._deps.locale.currentLocale,
    that._deps.evAgentSession.inboundQueues,
    that._deps.evAgentSession.formGroup.selectedInboundQueueIds,
  ])
  get inboundQueuesFieldText() {
    const { selectedInboundQueueIds } = this._deps.evAgentSession.formGroup;
    const { inboundQueues } = this._deps.evAgentSession;
    const { currentLocale } = this._deps.locale;

    if (selectedInboundQueueIds.length === 1) {
      const selectedInboundQueue = inboundQueues.find(
        (inboundQueue) => inboundQueue.gateId === selectedInboundQueueIds[0],
      );
      return selectedInboundQueue.gateName;
    }

    if (selectedInboundQueueIds.length > 1) {
      return `${i18n.getString('multiple', currentLocale)} (${
        selectedInboundQueueIds.length
      })`;
    }

    return i18n.getString(dropDownOptions.None, currentLocale);
  }

  @action
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  override onInit() {
    this.setIsLoading(false);
  }

  async setConfigure() {
    await this._deps.block.next(async () => {
      this.setIsLoading(true);
      try {
        await this._deps.evAgentSession.configureAgent({
          needAssignFormGroupValue: true,
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.setIsLoading(false);
      }
    });
  }

  private showSaveEditionModal() {
    const { currentLocale } = this._deps.locale;

    this._deps.modalUI.confirm({
      title: i18n.getString('saveEditionModalTitle', currentLocale),
      content: i18n.getString('saveEditionModalContent', currentLocale),
      confirmButtonText: i18n.getString('save', currentLocale),
      cancelButtonText: i18n.getString('cancel', currentLocale),
      childrenSize: 'small',
      onConfirm: () => {
        this.onSaveUpdate();
      },
      onCancel: () => {
        this._deps.evAgentSession.resetFormGroup();
        this._deps.evAgentSession.goToSettingsPage();
      },
    });
  }

  goToSettingsPageWhetherSessionChanged() {
    if (this._deps.evAgentSession.isSessionChanged) {
      return this.showSaveEditionModal();
    }
    this._deps.evAgentSession.goToSettingsPage();
  }

  async onSaveUpdate() {
    if (!this._deps.evAgentSession.isSessionChanged) {
      return this._deps.evAgentSession.goToSettingsPage();
    }

    await this._deps.evAgentSession.updateAgent(this.voiceConnectionChanged);
  }

  // InboundQueue Panel
  @computed((that: EvAgentSessionUI) => [
    that._deps.evAgentSession.formGroup.selectedInboundQueueIds,
    that._deps.evAgentSession.inboundQueues,
  ])
  get inboundQueues() {
    const {
      inboundQueues,
      formGroup: { selectedInboundQueueIds },
    } = this._deps.evAgentSession;

    return sortByName(
      inboundQueues.map((inboundQueue) => {
        return {
          ...inboundQueue,
          checked: !!selectedInboundQueueIds.find(
            (id) => id === inboundQueue.gateId,
          ),
        };
      }),
      'gateName',
    );
  }

  private _checkBoxOnChange(
    gateId: string,
    inboundQueuesState: AvailableQueue[],
    setInboundQueuesState: ChangeQueueStateFn,
  ) {
    const inboundQueues = [...inboundQueuesState];
    const index = inboundQueues.findIndex((option) => option.gateId === gateId);
    const selectedInboundQueue = inboundQueues[index];

    inboundQueues[index] = {
      ...selectedInboundQueue,
      checked: !selectedInboundQueue.checked,
    };

    setInboundQueuesState(inboundQueues);
  }

  private _allCheckBoxOnChange(
    severalAssign: boolean,
    inboundQueuesState: AvailableQueue[],
    setInboundQueuesState: ChangeQueueStateFn,
  ) {
    const inboundQueues = [...inboundQueuesState].map((option) => {
      return {
        ...option,
        // new object
        checked: severalAssign || !option.checked,
      };
    });
    setInboundQueuesState(inboundQueues);
  }

  goBack() {
    this._deps.routerInteraction.goBack();
  }

  submitInboundQueues(queues: AvailableQueue[], cb: () => void) {
    const selectedInboundQueueIds = queues.map(
      (inboundQueue) => inboundQueue.gateId,
    );
    this._deps.evAgentSession.setFormGroup({ selectedInboundQueueIds });
    cb();
  }

  get selectedIntegratedSoftphone() {
    return (
      this._deps.evAgentSession.formGroup.loginType ===
      loginTypes.integratedSoftphone
    );
  }

  get voiceConnectionChanged() {
    return (
      this._deps.evAgentSession.loginType !==
      this._deps.evAgentSession.formGroup.loginType
    );
  }

  setLoginType(loginType: LoginTypes) {
    // set login type first, and reset autoAnswer after login type changed
    this._deps.evAgentSession.setFormGroup({ loginType });
    const autoAnswer = this.selectedIntegratedSoftphone
      ? this._deps.evAgentSession.autoAnswer
      : this._deps.evAgentSession.defaultAutoAnswerOn;
    this._deps.evAgentSession.setFormGroup({
      autoAnswer,
    });
  }

  async _onAccountReChoose(syncAllTabs = false) {
    console.log('_onAccountReChoose~~', syncAllTabs);
    await this._deps.block.next(async () => {
      if (syncAllTabs && this._deps.tabManager.hasMultipleTabs) {
        this._deps.tabManager.send(tabManagerEvents.RE_CHOOSE_ACCOUNT);
      }
      if (this._deps.evClient.ifSocketExist) {
        this._deps.evClient.closeSocket();
      }
      this._deps.evAuth.setNotAuth();
      this._deps.evAuth.clearAgentId();
      this._deps.routerInteraction.push('/chooseAccount');
    });
  }

  @computed((that: EvAgentSessionUI) => [
    that._deps.evAuth.authenticateResponse.agents,
    that._deps.evAuth.agentId,
  ])
  get _selectedAgent() {
    const agents = this._deps.evAuth.authenticateResponse.agents;
    return agents.find((agent) => agent.agentId === this._deps.evAuth.agentId);
  }

  getUIProps(): EvAgentSessionUIProps {
    const {
      skillProfileList,
      loginTypeList,
      isExternalPhone,
      // takingCall,
    } = this._deps.evAgentSession;
    const { allowAutoAnswer, allowLoginControl, allowInbound } =
      this._deps.evAuth.agentPermissions;
    const { selectedSkillProfileId, loginType, extensionNumber, autoAnswer } =
      this._deps.evAgentSession.formGroup;
    return {
      selectedSkillProfileId,
      loginType,
      extensionNumber,
      inboundQueuesFieldText: this.inboundQueuesFieldText,
      // takingCall,
      autoAnswer,
      skillProfileList,
      loginTypeList,
      isExtensionNumber: isExternalPhone,
      isLoading: this.isLoading,
      currentLocale: this._deps.locale.currentLocale,
      // InboundQueue Panel
      inboundQueues: this.inboundQueues,
      showAutoAnswer: allowAutoAnswer && this.selectedIntegratedSoftphone,
      showInboundQueues: allowLoginControl && allowInbound,
      showSkillProfile: allowLoginControl && skillProfileList.length > 0,
      selectedAgent: this._selectedAgent,
      showReChooseAccount: !this._deps.evAuth.isOnlyOneAgent,
    };
  }

  getUIFunctions(): EvAgentSessionUIFunctions {
    return {
      setSkillProfileId: (selectedSkillProfileId) =>
        this._deps.evAgentSession.setFormGroup({ selectedSkillProfileId }),
      setLoginType: (loginType) => this.setLoginType(loginType),
      setExtensionNumber: (extensionNumber) =>
        this._deps.evAgentSession.setFormGroup({ extensionNumber }),
      setAutoAnswer: (autoAnswer) =>
        this._deps.evAgentSession.setFormGroup({ autoAnswer }),
      submitInboundQueues: (queues, cb) => this.submitInboundQueues(queues, cb),
      // setTakingCall: (takingCall) =>
      //   this._deps.evAgentSession.setTakingCall(takingCall),
      setConfigure: () => this.setConfigure(),
      goToSettingsPage: () => this._deps.evAgentSession.goToSettingsPage(),
      goToSettingsPageWhetherSessionChanged: () =>
        this.goToSettingsPageWhetherSessionChanged(),
      onSaveUpdate: () => this.onSaveUpdate(),
      // InboundQueue Panel
      searchOption: (option, text) =>
        option?.gateName?.toLowerCase().includes(text.toLowerCase()),
      goBack: () => this.goBack(),
      getAssignedInboundQueues: (inboundQueues) =>
        inboundQueues.filter(({ checked }) => checked),
      isAllAssign: (assignedInboundQueues, inboundQueues) =>
        !!assignedInboundQueues.length &&
        assignedInboundQueues.length === inboundQueues.length,
      isSeveralAssign: (assignedInboundQueues, inboundQueues) =>
        !!assignedInboundQueues.length &&
        assignedInboundQueues.length !== inboundQueues.length,
      checkBoxOnChange: (...args) => this._checkBoxOnChange(...args),
      allCheckBoxOnChange: (...args) => this._allCheckBoxOnChange(...args),
      onAccountReChoose: () => this._onAccountReChoose(true),
    };
  }
}
export { EvAgentSessionUI };
