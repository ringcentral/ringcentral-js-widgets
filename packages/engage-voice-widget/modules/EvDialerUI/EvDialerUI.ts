import {
  action,
  computed,
  RcUIModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  EvDialerUIFunctions,
  EvDialerUIProps,
} from '../../interfaces/EvDialerUI.interface';
import { Deps, DialerUI } from './EvDialerUI.interface';

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
    'EvAgentSession',
    'EvIntegratedSoftphone',
    'Environment',
    { dep: 'EvDialerUIOptions', optional: true },
  ],
})
class EvDialerUI extends RcUIModuleV2<Deps> implements DialerUI {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
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
    this.toNumber = value;
  }

  @action
  setLatestDialoutNumber() {
    this.latestDialoutNumber = this.toNumber;
  }

  @computed((that: EvDialerUI) => [
    that._deps.evCall.dialoutStatus,
    that._deps.evIntegratedSoftphone.connectingAlertId,
  ])
  get dialButtonDisabled() {
    return (
      this._deps.evCall.dialoutStatus === 'dialing' ||
      !!this._deps.evIntegratedSoftphone.connectingAlertId
    );
  }

  checkOnCall() {
    // onCall or not yet disposed call, it should navigate to the `activityCallLog/:id` router.
    const [call] = this._deps.evCallMonitor.calls;
    const { isPendingDisposition } = this._deps.evWorkingState;
    let id: string;
    if (isPendingDisposition) {
      id = this._deps.evCallMonitor.callLogsIds[0];
    }
    if (call) {
      id = this._deps.evClient.encodeUii(call.session);
    }
    if (id && this._deps.evAgentSession.isConfigTab) {
      this._deps.routerInteraction.push(`/activityCallLog/${id}`);
    }
  }

  getUIProps(): EvDialerUIProps {
    return {
      toNumber: this.toNumber,
      currentLocale: this._deps.locale.currentLocale,
      size: this._deps.environment.isWide ? 'medium' : 'small',
      dialoutStatus: this._deps.evCall.dialoutStatus,
      hasDialer: this._deps.evAuth.agentPermissions.allowManualCalls,
      dialButtonDisabled: this.dialButtonDisabled,
    };
  }

  getUIFunctions(): EvDialerUIFunctions {
    return {
      setToNumber: (value: string) => this.setToNumber(value),
      dialout: async () => {
        if (this.toNumber) {
          this.setLatestDialoutNumber();
          await this._deps.evCall.dialout(this.toNumber);
        } else {
          this.setToNumber(this.latestDialoutNumber);
        }
      },
      goToManualDialSettings: () => {
        this._deps.routerInteraction.push('/manualDialSettings');
      },
      checkOnCall: () => this.checkOnCall(),
      hangup: () => {
        if (!this._deps.evSettings.isManualOffhook) {
          this._deps.evClient.offhookTerm();
        }
      },
    };
  }
}

export { EvDialerUI };
