import {
  action,
  RcModuleState,
  RcUIModuleV2,
  state,
  storage,
  createSelector,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { dropDownOptions } from '../../enums';
import {
  EvSessionConfigUIFunctions,
  EvSessionConfigUIProps,
} from '../../interfaces/EvSessionConfigUI.interface';
import {
  DepsModules,
  SessionConfigUI,
  State,
} from './EvSessionConfigUI.interface';
import i18n from './i18n';

type EvSessionConfigUIState = RcModuleState<EvSessionConfigUI, State>;

@Module({
  name: 'EvSessionConfigUI',
  deps: [
    'Locale',
    'RouterInteraction',
    'EvAuth',
    'EvSessionConfig',
    'EvClient',
    'EvSettings',
    'EvWorkingState',
    'Storage',
    { dep: 'EvSessionConfigUIOptions', optional: true },
  ],
})
class EvSessionConfigUI
  extends RcUIModuleV2<DepsModules, EvSessionConfigUIState>
  implements SessionConfigUI {
  constructor({
    locale,
    routerInteraction,
    evAuth,
    evSessionConfig,
    evClient,
    evSettings,
    evWorkingState,
    storage,
    enableCache = true,
  }) {
    super({
      modules: {
        locale,
        routerInteraction,
        evAuth,
        evClient,
        evSessionConfig,
        evSettings,
        evWorkingState,
        storage,
      },
      enableCache,
      storageKey: 'EvSessionConfigUI',
    });
  }

  @storage
  @state
  isLoading = false;

  getInboundQueuesFieldText = createSelector(
    () => this._modules.locale.currentLocale,
    () => this._modules.evSessionConfig.selectedInboundQueueIds,
    () => this._modules.evSessionConfig.getInboundQueues(),
    (currentLocale, selectedInboundQueueIds, inboundQueues) => {
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
    },
  );

  @action
  setIsLoading(isLoading: boolean) {
    this.state.isLoading = isLoading;
  }

  onInit() {
    this.setIsLoading(false);
  }

  async setConfigure() {
    this.setIsLoading(true);
    try {
      await this._modules.evSessionConfig.configureAgent();
    } catch (e) {
      console.error(e);
      return;
    } finally {
      this.setIsLoading(false);
    }
  }

  getUIProps(): EvSessionConfigUIProps {
    const {
      selectedSkillProfileId,
      getSkillProfileList,
      getLoginTypeList,
      loginType,
      extensionNumber,
      isExternalPhone,
      takingCall,
      autoAnswer,
    } = this._modules.evSessionConfig;
    return {
      selectedSkillProfileId,
      skillProfileList: getSkillProfileList(),
      loginTypeList: getLoginTypeList(),
      loginType,
      takingCall,
      autoAnswer,
      extensionNumber,
      isExtensionNumber: isExternalPhone,
      isLoading: this.isLoading,
      inboundQueuesFieldText: this.getInboundQueuesFieldText(),
      currentLocale: this._modules.locale.currentLocale,
    };
  }

  getUIFunctions(): EvSessionConfigUIFunctions {
    return {
      navigateToInboundQueuesPage: () => {
        this._modules.routerInteraction.push('/sessionConfig/inboundQueues');
      },
      setSkillProfileId: (profile) => {
        this._modules.evSessionConfig.setSkillProfileId(profile);
      },
      setLoginType: (loginType) => {
        this._modules.evSessionConfig.setLoginType(loginType);
      },
      setExtensionNumber: (extensionNumber) => {
        this._modules.evSessionConfig.setExtensionNumber(extensionNumber);
      },
      setTakingCall: (takingCall) => {
        this._modules.evSessionConfig.setTakingCall(takingCall);
      },
      setAutoAnswer: (autoAnswer) => {
        this._modules.evSessionConfig.setAutoAnswer(autoAnswer);
      },
      setConfigure: async () => {
        await this.setConfigure();
      },
    };
  }
}
export { EvSessionConfigUI };
