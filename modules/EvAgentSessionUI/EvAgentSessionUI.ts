import {
  action,
  computed,
  RcUIModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { dropDownOptions } from '../../enums';
import {
  ChangeQueueStateFn,
  EvAgentSessionUIFunctions,
  EvAgentSessionUIProps,
} from '../../interfaces/EvAgentSessionUI.interface';
import { AvailableQueue } from '../../interfaces/SelectableQueue.interface';
import { sortByName } from '../../lib/sortByName';
import { Deps, SessionConfigUI } from './EvAgentSessionUI.interface';
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
    'Modal',
    'Environment',
    'EvCallMonitor',
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

  onInit() {
    this.setIsLoading(false);
  }

  async setConfigure() {
    this.setIsLoading(true);
    try {
      await this._deps.evAgentSession.configureAgent();
    } catch (e) {
      console.error(e);
      return;
    } finally {
      this.setIsLoading(false);
    }
  }

  goToSessionUpdatePage() {
    this._deps.routerInteraction.push('/sessionUpdate');
  }

  private showSaveEditionModal() {
    const { currentLocale } = this._deps.locale;

    this._deps.modal.confirm({
      title: i18n.getString('saveEditionModalTitle', currentLocale),
      content: i18n.getString('saveEditionModalContent', currentLocale),
      okText: i18n.getString('save', currentLocale),
      cancelText: i18n.getString('cancel', currentLocale),
      onOK: () => {
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

  get voiceConnectionChanged() {
    return (
      this._deps.evAgentSession.loginType !==
      this._deps.evAgentSession.formGroup.loginType
    );
  }

  async onSaveUpdate() {
    try {
      if (!this._deps.evAgentSession.isSessionChanged) {
        return this._deps.evAgentSession.goToSettingsPage();
      }

      await this._deps.evAgentSession.updateAgent(this.voiceConnectionChanged);
    } catch (error) {
      console.error('error', error);
    }
  }

  // Inboudqueue Panel
  @computed((that: EvAgentSessionUI) => [
    that._deps.evAgentSession.selectedInboundQueueIds,
    that._deps.evAgentSession.inboundQueues,
  ])
  get inboundQueues() {
    const {
      inboundQueues,
      selectedInboundQueueIds,
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

  getUIProps(): EvAgentSessionUIProps {
    const {
      skillProfileList,
      loginTypeList,
      isExternalPhone,
      // takingCall,
      // autoAnswer,
    } = this._deps.evAgentSession;
    const {
      selectedSkillProfileId,
      loginType,
      extensionNumber,
    } = this._deps.evAgentSession.formGroup;
    return {
      selectedSkillProfileId,
      loginType,
      extensionNumber,
      inboundQueuesFieldText: this.inboundQueuesFieldText,
      // takingCall,
      // autoAnswer,
      skillProfileList,
      loginTypeList,
      isExtensionNumber: isExternalPhone,
      isLoading: this.isLoading,
      currentLocale: this._deps.locale.currentLocale,
      // Inboudqueue Panel
      inboundQueues: this.inboundQueues,
      voiceConnectionChanged: this.voiceConnectionChanged,
      isWide: this._deps.environment.isWide,
    };
  }

  getUIFunctions(): EvAgentSessionUIFunctions {
    return {
      setSkillProfileId: (selectedSkillProfileId) =>
        this._deps.evAgentSession.setFormGroup({ selectedSkillProfileId }),
      setLoginType: (loginType) =>
        this._deps.evAgentSession.setFormGroup({ loginType }),
      setExtensionNumber: (extensionNumber) =>
        this._deps.evAgentSession.setFormGroup({ extensionNumber }),
      submitInboundQueues: (queues, cb) => this.submitInboundQueues(queues, cb),
      resetFormGroup: () => this._deps.evAgentSession.resetFormGroup(),
      // setTakingCall: (takingCall) =>
      //   this._deps.evAgentSession.setTakingCall(takingCall),
      // setAutoAnswer: (autoAnswer) =>
      //   this._deps.evAgentSession.setAutoAnswer(autoAnswer),
      setConfigure: () => this.setConfigure(),
      goToSettingsPage: () => this._deps.evAgentSession.goToSettingsPage(),
      goToSessionUpdatePage: () => this.goToSessionUpdatePage(),
      goToSettingsPageWhetherSessionChanged: () =>
        this.goToSettingsPageWhetherSessionChanged(),
      onSaveUpdate: () => this.onSaveUpdate(),
      // Inboudqueue Panel
      searchOption: (option, text) =>
        option.gateName &&
        option.gateName.toLowerCase().includes(text.toLowerCase()),
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
    };
  }
}
export { EvAgentSessionUI };
