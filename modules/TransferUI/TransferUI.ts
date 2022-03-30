import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import {
  computed,
  RcUIModuleV2,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import {
  Deps,
  TransferUIContainerProps,
  TransferUIPanelProps,
} from './TransferUI.interface';

@Module({
  name: 'TransferUI',
  deps: [
    'Locale',
    'RegionSettings',
    'RouterInteraction',
    { dep: 'ContactSearch', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'ActiveCallControl', optional: true },
  ],
})
export class TransferUI extends RcUIModuleV2<Deps> {
  private _params: TransferUIContainerProps['params'] = {};

  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed((that: TransferUI) => [
    that._params.sessionId,
    that._params.type,
    that._deps.activeCallControl?.activeSession,
    that._deps.webphone?.sessions,
  ])
  get session() {
    const { sessionId, type = 'active' } = this._params;

    if (type === 'active' && this._deps.activeCallControl) {
      return this._deps.activeCallControl.activeSession;
    }

    if (type === 'webphone' && this._deps.webphone) {
      return this._deps.webphone.sessions.find(
        (session) => session.id === sessionId,
      );
    }

    return null;
  }

  getUIProps({
    params = {},
    enableWarmTransfer = false,
  }: TransferUIContainerProps): UIProps<TransferUIPanelProps> {
    this._params = params;
    const { sessionId, type = 'active' } = params;

    return {
      sessionId,
      currentLocale: this._deps.locale.currentLocale,
      searchContactList: this._deps.contactSearch?.sortedResult,
      session: this.session,
      controlBusy: this._deps.activeCallControl?.busy || false,
      enableWarmTransfer:
        enableWarmTransfer && type === 'webphone' && !!this._deps.webphone,
    };
  }

  getUIFunctions({
    params: { type = 'active' },
  }): UIFunctions<TransferUIPanelProps> {
    return {
      setActiveSessionId: (sessionId) => {
        if (type === 'active') {
          this._deps.activeCallControl?.setActiveSessionId(sessionId);
        }
      },
      onTransfer: (transferNumber, sessionId) => {
        if (type === 'active') {
          this._deps.activeCallControl?.transfer(transferNumber, sessionId);
          return;
        }

        if (type === 'webphone') {
          this._deps.webphone?.transfer(transferNumber, sessionId);
        }
      },
      onWarmTransfer: (transferNumber, sessionId) => {
        this._deps.webphone?.startWarmTransfer(transferNumber, sessionId);
      },
      onBack: () => {
        this._deps.routerInteraction.goBack();
      },
      onCallEnd: () => {
        this._deps.routerInteraction.replace(
          type === 'active' ? '/calls' : '/dialer',
        );
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
        }),
      searchContact: (searchString) => {
        this._deps.contactSearch?.debouncedSearch({ searchString });
      },
    };
  }
}
