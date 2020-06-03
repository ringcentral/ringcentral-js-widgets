import {
  action,
  RcModuleState,
  RcUIModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  EvDialerUIFunctions,
  EvDialerUIProps,
} from '../../interfaces/EvDialerUI.interface';
import { DepsModules, DialerUI, State } from './EvDialerUI.interface';

type EvDialerUIState = RcModuleState<EvDialerUI, State>;

@Module({
  name: 'EvDialerUI',
  deps: [
    'EvCall',
    'Locale',
    'Storage',
    'EvAuth',
    'RouterInteraction',
    'EvSettings',
    'EvClient',
    'EvCallMonitor',
    'EvWorkingState',
    'EvSessionConfig',
    'Environment',
    { dep: 'EvDialerUIOptions', optional: true },
  ],
})
class EvDialerUI extends RcUIModuleV2<DepsModules, EvDialerUIState>
  implements DialerUI {
  constructor({
    evCall,
    locale,
    storage,
    evAuth,
    routerInteraction,
    evSettings,
    evClient,
    evCallMonitor,
    evWorkingState,
    evSessionConfig,
    enableCache = true,
    environment,
  }) {
    super({
      modules: {
        evCall,
        locale,
        storage,
        evAuth,
        routerInteraction,
        evSettings,
        evClient,
        evCallMonitor,
        evWorkingState,
        evSessionConfig,
        environment,
      },
      enableCache,
      storageKey: 'EvDialerUI',
    });
  }

  @storage
  @state
  toNumber = '';

  @storage
  @state
  latestDialoutNumber = '';

  @action
  setToNumber(value: string) {
    this.state.toNumber = value;
  }

  @action
  setLatestDialoutNumber() {
    this.state.latestDialoutNumber = this.toNumber;
  }

  checkOnCall() {
    // onCall or not yet disposed call, it should navigate to the `activityCallLog/:id` router.
    const [call] = this._modules.evCallMonitor.calls;
    const { isPendingDisposition } = this._modules.evWorkingState;
    let id: string;
    if (isPendingDisposition) {
      id = this._modules.evCallMonitor.callLogsIds[0];
    }
    if (call) {
      id = this._modules.evClient.encodeUii(call.session);
    }
    if (
      id &&
      (!this._modules.evSessionConfig.tabManagerEnabled ||
        this._modules.evSessionConfig.isConfigSuccessByLocal)
    ) {
      this._modules.routerInteraction.push(`/activityCallLog/${id}`);
    }
  }

  getUIProps(): EvDialerUIProps {
    return {
      toNumber: this.toNumber,
      currentLocale: this._modules.locale.currentLocale,
      size: this._modules.environment.isWide ? 'medium' : 'small',
      dialoutStatus: this._modules.evCall.dialoutStatus,
      hasDialer: this._modules.evAuth.agentPermissions.allowManualCalls,
    };
  }

  getUIFunctions(): EvDialerUIFunctions {
    return {
      setToNumber: (value: string) => this.setToNumber(value),
      dialout: async () => {
        if (this.toNumber) {
          this.setLatestDialoutNumber();
          await this._modules.evCall.dialout(this.toNumber);
        } else {
          this.setToNumber(this.latestDialoutNumber);
        }
      },
      goToManualDialSettings: () => {
        this._modules.routerInteraction.push('/manualDialSettings');
      },
      checkOnCall: () => this.checkOnCall(),
      hangup: () => {
        if (!this._modules.evSettings.isManualOffhook) {
          this._modules.evClient.offhookTerm();
        }
      },
    };
  }
}

export { EvDialerUI };
