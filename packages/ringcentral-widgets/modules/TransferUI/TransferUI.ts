import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { callingOptions } from '@ringcentral-integration/commons/modules/CallingSettings';
import webphoneErrors from '@ringcentral-integration/commons/modules/Webphone/webphoneErrors';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import { computed, RcUIModuleV2, track } from '@ringcentral-integration/core';

import type {
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
    'AccountInfo',
    'Alert',
    'CallingSettings',
    { dep: 'AudioSettings', optional: true },
    { dep: 'ContactSearch', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'ActiveCallControl', optional: true },
    { dep: 'CompanyContacts', optional: true },
  ],
})
export class TransferUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  private _params: TransferUIContainerProps['params'] = {};

  constructor(deps: T) {
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

  @track((that: TransferUI, eventName: string, contactType: string) => {
    return [eventName, { contactType, location: 'Transfer' }];
  })
  async triggerEventTracking(eventName: string, contactType: string) {
    //
  }

  @track(trackEvents.coldTransferCall)
  async trackTransfer() {
    //
  }

  getUIProps({
    params = {},
    enableWarmTransfer = false,
  }: TransferUIContainerProps): UIProps<TransferUIPanelProps> {
    this._params = params;
    const { sessionId } = params;
    return {
      callVolume: this._deps.audioSettings?.callVolume ?? 1,
      outputDeviceId: this._deps.audioSettings?.outputDeviceId ?? '',
      companyContacts: this._deps.companyContacts?.data,
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      sessionId,
      currentLocale: this._deps.locale.currentLocale,
      searchContactList: this._deps.contactSearch?.sortedResult,
      // @ts-expect-error TS(2322): Type 'Partial<ActiveSession> | NormalizedSession |... Remove this comment to see the full error message
      session: this.session,
      controlBusy: this._deps.activeCallControl?.busy || false,
      enableWarmTransfer:
        enableWarmTransfer &&
        this._deps.callingSettings.callWith === callingOptions.browser,
    };
  }

  getUIFunctions({
    params: { type = 'active' },
  }): UIFunctions<TransferUIPanelProps> {
    return {
      triggerEventTracking: (eventName: string, contactType: string) =>
        this.triggerEventTracking(eventName, contactType),
      setActiveSessionId: (sessionId) => {
        if (type === 'active') {
          this._deps.activeCallControl?.setActiveSessionId(sessionId);
        }
      },
      onTransfer: (transferNumber, sessionId) => {
        this.trackTransfer();

        if (type === 'active') {
          this._deps.activeCallControl?.transfer(transferNumber, sessionId);
          return;
        }

        if (type === 'webphone') {
          this._deps.webphone?.transfer(transferNumber, sessionId);
        }
      },
      onToVoicemail: (voicemailId, sessionId) => {
        if (voicemailId) {
          if (type === 'active') {
            this._deps.activeCallControl?.toVoicemail(voicemailId, sessionId);
            return;
          }

          if (type === 'webphone') {
            this._deps.webphone?.toVoiceMail(sessionId);
          }
        } else {
          this._deps.alert.warning({
            message: webphoneErrors.toVoiceMailError,
          });
        }
      },
      onWarmTransfer: (transferNumber, sessionId) => {
        if (type === 'active') {
          this._deps.activeCallControl?.startWarmTransfer(
            transferNumber,
            sessionId,
          );
          return;
        }

        if (type === 'webphone') {
          this._deps.webphone?.startWarmTransfer(transferNumber, sessionId);
        }
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
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        }),
      searchContact: (searchString) => {
        this._deps.contactSearch?.debouncedSearch({ searchString });
      },
    };
  }
}
