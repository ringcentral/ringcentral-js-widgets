import { Module } from '@ringcentral-integration/commons/lib/di';
import {
  action,
  computed,
  RcUIModuleV2,
  state,
  storage,
  watch,
} from '@ringcentral-integration/core';

import { saveStatus } from '../../interfaces/EvActivityCallUI.interface';
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
    'EvActivityCallUI',
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
  reset() {
    this.toNumber = '';
    this.latestDialoutNumber = '';
  }

  @action
  setToNumber(value: string) {
    this.toNumber = value;
  }

  @action
  setLatestDialoutNumber() {
    this.latestDialoutNumber = this.toNumber;
  }

  @computed((that: EvDialerUI) => [
    that._deps.evIntegratedSoftphone.connectingAlertId,
  ])
  get dialButtonDisabled() {
    return !!this._deps.evIntegratedSoftphone.connectingAlertId;
  }

  onInitOnce() {
    this._deps.evAuth.beforeAgentLogout(() => {
      // * if that logout is not from update session
      if (!this._deps.evAgentSession.isAgentUpdating) {
        this.reset();
      }
    });

    watch(
      this,
      () => this._deps.routerInteraction.currentPath,
      (newValue) => {
        if (newValue === '/dialer') {
          this.checkOnCall();
        }
      },
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
    if (id) {
      this._deps.evActivityCallUI.changeSavingStatus(saveStatus.submit);
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
      dialout: () => {
        if (this.toNumber) {
          this.setLatestDialoutNumber();
        } else if (this.latestDialoutNumber) {
          this.setToNumber(this.latestDialoutNumber);
          return;
        }

        this._deps.evCall.dialout(this.toNumber);
      },
      goToManualDialSettings: () => {
        this._deps.routerInteraction.push('/manualDialSettings');
      },
      hangup: () => {
        this._deps.evCall.outdialCancel();
        if (!this._deps.evSettings.isManualOffhook) {
          this._deps.evClient.offhookTerm();
        }
      },
    };
  }
}

export { EvDialerUI };
