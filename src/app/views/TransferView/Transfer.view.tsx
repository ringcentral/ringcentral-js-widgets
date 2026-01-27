import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import {
  AccountInfo,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  CompanyContacts,
  ContactSearch,
} from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  computed,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  RouterPlugin,
  useConnector,
  useParams,
} from '@ringcentral-integration/next-core';
import { TransferPanel } from '@ringcentral-integration/widgets/components/TransferPanel';
import { usePrevious } from '@ringcentral/juno';
import React, { useLayoutEffect, useRef } from 'react';

import {
  ActiveCallControl,
  AudioSettings,
  callingOptions,
  CallingSettings,
  Webphone,
} from '../../services';

import type {
  TransferViewOptions,
  TransferViewPanelProps,
  TransferViewProps,
} from './Transfer.view.interface';
import { t } from './i18n';

type IParams = {
  sessionId?: string;
  type?: string;
};

@injectable({
  name: 'TransferView',
})
export class TransferView extends RcViewModule {
  private _params: IParams = {};

  get sessionId() {
    return this._params.sessionId!;
  }

  get type() {
    return this._params.type || 'active';
  }

  constructor(
    protected _locale: Locale,
    protected _regionSettings: RegionSettings,
    protected _router: RouterPlugin,
    protected _accountInfo: AccountInfo,
    protected _toast: Toast,
    protected _callingSettings: CallingSettings,
    protected _portManager: PortManager,
    @optional() protected _audioSettings?: AudioSettings,
    @optional() protected _contactSearch?: ContactSearch,
    @optional() protected _webphone?: Webphone,
    @optional() protected _activeCallControl?: ActiveCallControl,
    @optional() protected _companyContacts?: CompanyContacts,
    @optional('TransferViewOptions')
    protected _transferViewOptions?: TransferViewOptions,
  ) {
    super();
  }

  @track((that: TransferView, eventName: string, contactType: string) => {
    return [eventName, { contactType, location: 'Transfer' }];
  })
  async triggerEventTracking(eventName: string, contactType: string) {
    //
  }

  @track(trackEvents.coldTransferCall)
  async trackTransfer() {
    //
  }

  @computed((that: TransferView) => [
    that.sessionId,
    that.type,
    that._activeCallControl?.sessions,
    that._webphone?.sessions,
  ])
  get session() {
    if (this.type === 'active' && this._activeCallControl) {
      return this._activeCallControl.getActiveSession(this.sessionId);
    }

    if (this.type === 'webphone' && this._webphone) {
      return this._webphone.sessions.find(
        (session) => session.id === this.sessionId,
      )!;
    }

    return null;
  }

  private useSessionGuard() {
    const session = useConnector(() => this.session);
    const sessionRemoved =
      (!this._portManager.shared || this._portManager.isMainTab) &&
      // when not have session should go to valid route
      !session;

    useLayoutEffect(() => {
      if (sessionRemoved) {
        this._router.replace(this.type === 'active' ? '/calls' : '/dialer');
      }
    }, [sessionRemoved]);

    // when session is null, use previous session to avoid component flash
    // that will be redirect new route at next tick because route async
    const prevSession = usePrevious(() => session);
    if (!session) {
      return prevSession;
    }

    return this.session;
  }

  @track(trackEvents.transferAskFirst)
  async trackWarmTransfer() {
    //
  }

  @track(trackEvents.transferToVoicemail)
  async trackToVoicemail() {
    //
  }

  getUIProps({
    enableWarmTransfer = false,
  }: TransferViewProps): UIProps<TransferViewPanelProps> {
    return {
      callVolume: this._audioSettings?.callVolume ?? 1,
      outputDeviceId: this._audioSettings?.outputDeviceId ?? '',
      companyContacts: this._companyContacts?.data || [],
      sessionId: this.sessionId,
      currentLocale: this._locale.currentLocale,
      searchContactList: this._contactSearch?.sortedResult ?? [],
      session: this.session,
      controlBusy: this._activeCallControl?.busy || false,
      enableWarmTransfer:
        enableWarmTransfer &&
        this._callingSettings.callWith === callingOptions.browser,
    };
  }

  getUIFunctions(
    props: TransferViewProps,
  ): UIFunctions<TransferViewPanelProps> {
    return {
      triggerEventTracking: (eventName: string, contactType: string) =>
        this.triggerEventTracking(eventName, contactType),
      setActiveSessionId: (sessionId) => {
        if (this.type === 'active') {
          this._activeCallControl?.setActiveSessionId(sessionId);
        }
      },
      onTransfer: (transferNumber, sessionId) => {
        this.trackTransfer();
        if (this.type === 'active') {
          this._activeCallControl?.transfer(transferNumber, sessionId);
          return;
        }

        if (this.type === 'webphone') {
          this._webphone?.transfer(transferNumber, sessionId);
        }
      },
      onToVoicemail: (voicemailId, sessionId = this.sessionId) => {
        this.trackToVoicemail();

        if (voicemailId) {
          if (this.type === 'active') {
            this._activeCallControl?.toVoicemail(voicemailId, sessionId);
            return;
          }

          if (this.type === 'webphone') {
            this._webphone?.toVoiceMail(sessionId);
          }
        } else {
          this._toast.warning({
            message: t('toVoiceMailError'),
          });
        }
      },
      onWarmTransfer: (transferNumber, sessionId) => {
        this.trackWarmTransfer();

        if (this.type === 'active') {
          this._activeCallControl?.startWarmTransfer(transferNumber, sessionId);
          return;
        }

        if (this.type === 'webphone') {
          this._webphone?.startWarmTransfer(transferNumber, sessionId);
        }
      },
      onBack: () => {
        this._router.goBack();
      },
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        })!,
      searchContact: (searchString) => {
        this._contactSearch?.debouncedSearch({ searchString });
      },
    };
  }

  component(props: TransferViewProps) {
    this._params = useParams<IParams>();

    const { current: uiFunctions } = useRef(this.getUIFunctions(props));
    const session = this.useSessionGuard();
    const _props = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    const Component = this._transferViewOptions?.component || TransferPanel;

    return <Component {..._props} session={session} {...uiFunctions} />;
  }
}
