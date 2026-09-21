import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { getCallingOption } from '@ringcentral-integration/commons/lib/getCallingOption';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import {
  AccountInfo,
  type CallMadeLocation,
  ConnectivityManager,
  ExtensionFeatures,
  RateLimiter,
  RegionSettings,
  track,
  trackEvent,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { ContactSearch } from '@ringcentral-integration/micro-contacts/src/app/services';
import type { ContactSearchView } from '@ringcentral-integration/micro-contacts/src/app/views';
import { AppHeaderNav } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  Locale,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { UIFunctions, UIProps } from '@ringcentral-integration/next-core';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  PortManager,
  RcViewModule,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import { parse } from '@ringcentral-integration/phone-number';
import { DialerPanel } from '@ringcentral-integration/widgets/components/DialerPanel';
import React, { useRef } from 'react';

import {
  AudioSettings,
  Call,
  CallAction,
  CallingSettings,
  getTrackCallingSetup,
  type Recipient,
  Webphone,
} from '../../services';
import { ConnectingView } from '../ConnectingView';

import type {
  DialerViewOptions,
  DialerViewPanelProps,
  DialerViewProps,
  OnCallButtonClickOptions,
} from './Dialer.view.interface';
import { DialerPage } from './DialerPage';
import i18n, { t } from './i18n';

const TIMEOUT = 60 * 1000;

export type DialerViewCallParams<T = Recipient> = {
  phoneNumber?: string;
  recipient?: T;
  fromNumber?: string;
  clickDialerToCall?: boolean;
  trackCallMadeFrom?: string;
};

@injectable({
  name: 'DialerView',
})
export class DialerView extends RcViewModule {
  @dynamic('ConnectingView')
  protected _connectingView?: ConnectingView;

  @dynamic('CallAction')
  private _callAction?: CallAction;

  @dynamic('ContactSearchView')
  protected readonly _contactSearchView?: ContactSearchView;

  _latestCallTime = 0;

  /**
   * register hook for call, will be called before make call
   * only execute when callVerify pass in server port(worker mode)
   */
  _callHooks: ((params: DialerViewCallParams) => Promise<void>)[] = [];

  /**
   * verify is that call can be continue before make call
   */
  protected callVerify?: (
    params: DialerViewCallParams<any>,
  ) => Promise<boolean>;

  /**
   * verify is that call can be continue before make call
   */
  @delegate('server')
  private async callVerifyOnServer(params: DialerViewCallParams<any>) {
    if (this.callVerify) {
      return this.callVerify(params);
    }

    return true;
  }

  constructor(
    protected _callingSettings: CallingSettings,
    protected _connectivityManager: ConnectivityManager,
    protected _locale: Locale,
    protected _rateLimiter: RateLimiter,
    protected _regionSettings: RegionSettings,
    protected _toast: Toast,
    protected _call: Call,
    protected _extensionFeatures: ExtensionFeatures,
    protected _accountInfo: AccountInfo,
    protected _portManager: PortManager,
    @optional() protected _webphone?: Webphone,
    @optional() protected _audioSettings?: AudioSettings,
    @optional() protected _contactSearch?: ContactSearch,
    @optional('DialerViewOptions')
    protected _dialerViewOptions?: DialerViewOptions,
  ) {
    super();
  }

  @state
  toNumberField = '';

  @action
  private _setToNumberField(val: string) {
    this.toNumberField = val;
  }

  @state
  isLastInputFromDialpad = false;

  @action
  setIsLastInputFromDialpad(val: boolean) {
    this.isLastInputFromDialpad = val;
  }

  @state
  recipient: Recipient | null = null;

  @action
  private _setRecipient(val: Recipient) {
    this.recipient = val;
  }

  @computed((that: DialerView) => [that.recipient])
  get recipients() {
    if (this.recipient) {
      return [this.recipient];
    }
    return [];
  }

  @computed((that: DialerView) => [
    that._contactSearch?.sortedResult,
    that.toNumberField,
  ])
  get searchContactList() {
    if (this.toNumberField.length < 3 || !this._contactSearch) {
      return [];
    }

    return this._contactSearch.sortedResult.slice(0, 50);
  }

  get isCallButtonDisabled() {
    return (
      this._connectingView?.isConnecting ||
      !this._call.isIdle ||
      this._connectivityManager.isOfflineMode ||
      this._connectivityManager.isWebphoneUnavailableMode ||
      this._connectivityManager.isWebphoneInitializing ||
      this._rateLimiter.restricted
    );
  }

  get showSpinner() {
    return !(
      this._call.ready &&
      this._callingSettings.ready &&
      this._locale.ready &&
      this._extensionFeatures.ready &&
      this._connectivityManager.ready &&
      (!this._audioSettings || this._audioSettings.ready) &&
      !this._connectivityManager.isWebphoneInitializing
    );
  }

  get disableFromField() {
    return !!(
      this._extensionFeatures.ready &&
      !this._extensionFeatures.features?.EditOutboundCallerId?.available
    );
  }

  get isShowAnonymous() {
    return !!(
      this._extensionFeatures.ready &&
      this._extensionFeatures.features?.BlockingCallerId?.available
    );
  }

  override onReset() {
    this._connectingView?.resetPreinsertConnecting();
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      recipient: null,
    });
  }

  @action
  resetState(
    {
      toNumberField = '',
      isLastInputFromDialpad = false,
      recipient = null,
    }: Pick<
      DialerView,
      'toNumberField' | 'isLastInputFromDialpad' | 'recipient'
    > = {
      toNumberField: '',
      isLastInputFromDialpad: false,
      recipient: null,
    },
  ) {
    this.toNumberField = toNumberField;
    this.isLastInputFromDialpad = isLastInputFromDialpad;
    this.recipient = recipient;
  }

  @delegate('server')
  private async _prepareCallState({
    toNumberField,
    recipient,
    callerId,
    latestCallTime,
    usePreinsertConnecting,
  }: {
    toNumberField: string;
    recipient: Recipient | null;
    callerId: string;
    latestCallTime: number;
    usePreinsertConnecting: boolean;
  }) {
    this._latestCallTime = latestCallTime;
    const preinsertConnectingToken =
      usePreinsertConnecting && this._connectingView
        ? this._connectingView.preparePreinsertConnecting({
            callerId,
            recipient,
            toNumberField,
          })
        : 0;
    this.resetState({
      toNumberField,
      isLastInputFromDialpad: false,
      recipient,
    });

    return preinsertConnectingToken;
  }

  @delegate('server')
  private async _resetCallState() {
    this.resetState();
  }

  @delegate('server')
  async clearToNumberField() {
    this._setToNumberField('');
    // spring-ui version already clear the search related state into ContactSearch service
    if (process.env.THEME_SYSTEM !== 'spring-ui') {
      this._contactSearch?.clearAndReset();
    }
  }

  @delegate('server')
  async setToNumberField(phoneNumber: string, fromDialPad = false) {
    if (this.toNumberField !== phoneNumber) {
      this.resetState({
        toNumberField: phoneNumber,
        isLastInputFromDialpad: fromDialPad,
        recipient: this.recipient,
      });

      // TODO: those search logic should be trigger from view component after refactor
      const hasMinimumLengthForSearch = (this.toNumberField || '').length >= 3;
      const contactSearch = this._contactSearch;

      if (!hasMinimumLengthForSearch || !contactSearch) return;

      if (process.env.THEME_SYSTEM === 'spring-ui') {
        // spring-ui version already clear the search related state into ContactSearch service
        return;
      }

      const showExecSearch = this._dialerViewOptions?.useV2;
      if (showExecSearch) {
        contactSearch.setPrepareSearch();
        contactSearch.debouncedSearch({
          searchString: this.toNumberField,
        });
      }
    }
  }

  @track((that: DialerView, eventName: string, contactType: string) => {
    return [eventName, { contactType, location: 'Dialpad' }];
  })
  async triggerEventTracking(eventName: string, contactType: string) {
    //
  }

  @delegate('server')
  async setRecipient(recipient: Recipient) {
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      recipient,
    });
  }

  @delegate('server')
  async clearRecipient() {
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      recipient: null,
    });
  }

  @delegate('server')
  private async triggerHook({
    phoneNumber = '',
    recipient,
    fromNumber,
  }: DialerViewCallParams) {
    for (const hook of this._callHooks) {
      await hook({
        phoneNumber,
        recipient,
        fromNumber,
      });
    }
  }

  @track((that: DialerView, trackCallMadeFrom: string) => {
    const callingOption = getCallingOption(that._callingSettings.callingMode);
    return [
      trackEvents.callMade,
      {
        callingOption,
        Location: trackCallMadeFrom,
      },
    ];
  })
  trackCallMade(trackCallMadeFrom: string) {
    //
  }

  async call({
    phoneNumber = '',
    recipient,
    fromNumber,
    trackCallMadeFrom,
    clickDialerToCall = false,
  }: DialerViewCallParams) {
    const usePreinsertConnecting = this._callingSettings.isWebphoneMode;

    if (
      this._connectingView &&
      usePreinsertConnecting &&
      this._connectingView.isConnecting
    ) {
      return;
    }

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const hasReachedMaxCalls =
        await this._callAction?.checkReachToMaxExistCalls?.();
      if (hasReachedMaxCalls) {
        return;
      }
    }
    if (phoneNumber) {
      phoneNumber = phoneNumber.trim();
    }
    const normalizedRecipient = recipient
      ? {
          ...recipient,
          phoneNumber: recipient.phoneNumber
            ? recipient.phoneNumber.trim()
            : recipient.phoneNumber,
        }
      : undefined;
    if (phoneNumber || normalizedRecipient) {
      const preinsertConnectingToken = await this._prepareCallState({
        toNumberField: phoneNumber,
        recipient: normalizedRecipient || null,
        callerId: fromNumber || this._callingSettings.fromNumber || '',
        latestCallTime: Date.now(),
        usePreinsertConnecting,
      });

      const continueCall = await this.callVerifyOnServer({
        phoneNumber,
        recipient: normalizedRecipient,
      });

      if (
        usePreinsertConnecting &&
        this._connectingView?.isPreinsertConnectingCancelled(
          preinsertConnectingToken,
        )
      ) {
        this._connectingView.clearPreinsertConnectingCancel(
          preinsertConnectingToken,
        );
        return;
      }

      if (!continueCall) {
        if (this._connectingView && usePreinsertConnecting) {
          await this._connectingView.setPreinsertConnectingOnServer(false);
        }
        return;
      }

      try {
        if (
          usePreinsertConnecting &&
          this._connectingView?.isPreinsertConnectingCancelled(
            preinsertConnectingToken,
          )
        ) {
          this._connectingView.clearPreinsertConnectingCancel(
            preinsertConnectingToken,
          );
          return;
        }

        // * trigger hooks after pass verification
        await this.triggerHook({
          phoneNumber,
          recipient: normalizedRecipient,
          fromNumber,
        });

        if (
          this._connectingView &&
          usePreinsertConnecting &&
          this._connectingView.isPreinsertConnectingCancelled(
            preinsertConnectingToken,
          )
        ) {
          this._connectingView.clearPreinsertConnectingCancel(
            preinsertConnectingToken,
          );
          return;
        }

        // for data tracking
        const { hasInvalidChars, isValid } = parse({
          input:
            phoneNumber ||
            normalizedRecipient?.phoneNumber ||
            normalizedRecipient?.extension ||
            '',
        });
        const isValidNumber = !hasInvalidChars && isValid;

        const session = await this._call.call({
          phoneNumber,
          recipient: normalizedRecipient!,
          fromNumber: fromNumber!,
          clickDialerToCall,
          isValidNumber,
        });

        if (this._connectingView && usePreinsertConnecting) {
          await this._connectingView.setPreinsertConnectingWebphoneSessionIdOnServer(
            preinsertConnectingToken,
            session?.id,
          );
        }

        if (
          this._connectingView &&
          usePreinsertConnecting &&
          this._connectingView.isPreinsertConnectingCancelled(
            preinsertConnectingToken,
          )
        ) {
          if (session?.id) {
            // when already have session id, we need hang-up the connecting call on server side
            await this._connectingView.cancelPreinsertConnectingCall(
              session.id,
            );
          }
          this._connectingView.clearPreinsertConnectingCancel(
            preinsertConnectingToken,
          );
          return;
        }

        if (session === null) {
          if (this._connectingView && usePreinsertConnecting) {
            await this._connectingView.setPreinsertConnectingOnServer(false);
          }
          return;
        }

        if (
          // spring-ui project have new data tracking system, not need this track anymore
          process.env.THEME_SYSTEM !== 'spring-ui' &&
          trackCallMadeFrom
        ) {
          this.trackCallMade(trackCallMadeFrom);
        }

        await this._resetCallState();
      } catch (error) {
        if (this._connectingView && usePreinsertConnecting) {
          this._connectingView.clearPreinsertConnectingCancel(
            preinsertConnectingToken,
          );
          await this._connectingView.setPreinsertConnectingOnServer(false);
        }
        this.logger.log('make call error', error);
      }
    }
  }

  @action
  protected _loadLastPhoneNumberAction() {
    this.resetState({
      toNumberField: this._call.lastPhoneNumber!,
      recipient: this._call.lastRecipient,
      isLastInputFromDialpad: false,
    });
  }

  @delegate('server')
  private async _loadLastPhoneNumber() {
    if (!this._call.lastRecipient && !this._call.lastPhoneNumber) {
      this._toast.warning({
        message: t('noToNumber'),
      });
      return;
    }

    this._loadLastPhoneNumberAction();
  }

  async onCallButtonClick({
    fromNumber,
    fromSessionId,
    clickDialerToCall,
  }: OnCallButtonClickOptions = {}) {
    if (`${this.toNumberField}`.trim().length === 0 && !this.recipient) {
      this._loadLastPhoneNumber();
      return false;
    }

    this.trackCallingEvent('Dialer');
    this._onBeforeCall(fromSessionId!);
    if (
      this._portManager.shared &&
      !this._portManager.isWorkerMode &&
      this._webphone &&
      this._callingSettings.isWebphoneMode &&
      // TODO: handle `hasCallSessions:true` case
      !this._webphone.hasCallSessions
    ) {
      await this._webphone.switchWebphoneInstance({
        forceDisconnect: true,
      });
    }
    await this.call({
      phoneNumber: this.toNumberField,
      recipient: this.recipient!,
      fromNumber,
      clickDialerToCall,
      trackCallMadeFrom: 'Dialer',
    });

    return true;
  }

  // * that fromSessionId send to children class
  protected _onBeforeCall(_fromSessionId: string) {
    //
  }

  /**
   * TODO: refactor with a better way to check if a call is placed by current device
   *
   * Check if a call is placed by current device, including call with browser, jupiter and ringcentral phone,
   * and timeout 60s is for when call with ringcentral phone or jupiter we can't make sure the call is placed immediately
   * so just in case other device make a call with same phone number when call from current device fail then we
   * should not count it as current device call
   * @deprecated
   */
  isCallFromCurrentDevice(phoneNumber: string) {
    const originalPhoneNumber =
      this._call.lastPhoneNumber || this._call.lastRecipient?.phoneNumber;
    const formattedPhoneNumber = normalizeNumber({
      phoneNumber:
        this._call.lastPhoneNumber || this._call.lastRecipient?.phoneNumber!,
      countryCode: this._regionSettings.countryCode,
      areaCode: this._regionSettings.areaCode,
      maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
      // if call out with extension number then only match main company number
    })?.split('*')[0];
    // use includes since after we introduced EDP, the number dialed at to field maybe different to server parsed number.
    if (
      (phoneNumber?.includes(formattedPhoneNumber) ||
        phoneNumber?.includes(originalPhoneNumber!) ||
        phoneNumber === this._call.lastValidatedToNumber) &&
      Date.now() - this._latestCallTime <= TIMEOUT
    ) {
      this._latestCallTime = 0;
      return true;
    }

    return false;
  }

  getUIProps(_props: DialerViewProps): UIProps<DialerViewPanelProps> {
    return {
      currentLocale: this._locale.currentLocale,
      callingMode: this._callingSettings.callingMode,
      isWebphoneMode: this._callingSettings.isWebphoneMode,
      callButtonDisabled: this.isCallButtonDisabled,
      fromNumber: this._callingSettings.fromNumber!,
      fromNumbers: this._callingSettings.fromNumbers,
      toNumber: this.toNumberField,
      recipient: this.recipient,
      recipients: this.recipients,
      searchContactList: this.searchContactList,
      showSpinner: this.showSpinner,
      callVolume: this._audioSettings?.callVolume ?? 1,
      outputDeviceId: this._audioSettings?.outputDeviceId ?? '',
      isLastInputFromDialpad: this.isLastInputFromDialpad,
      disableFromField: this.disableFromField,
      useV2: !!this._dialerViewOptions?.useV2,
      showAnonymous: this.isShowAnonymous,
      // do not enable this feature for now
      isSmartNoteEnabled: false,
    };
  }

  getUIFunctions(_props: DialerViewProps): UIFunctions<DialerViewPanelProps> {
    return {
      triggerEventTracking: (eventName: string, contactType: string) =>
        this.triggerEventTracking(eventName, contactType),
      onToNumberChange: (...args) => this.setToNumberField(...args),
      // TODO: check onToNumberChange be '' does trigger below this._contactSearch?.clearAndReset();
      clearToNumber: () => this.clearToNumberField(),
      onCallButtonClick: (options: OnCallButtonClickOptions) =>
        this.onCallButtonClick(options),
      changeFromNumber: (...args) =>
        this._callingSettings.updateFromNumber(...args),
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
          maxExtensionLength: this._accountInfo.maxExtensionNumberLength,
        })!,
      setRecipient: (...args) => this.setRecipient(...args),
      clearRecipient: () => this.clearRecipient(),
      searchContact: async (searchString) => {
        await this._contactSearch?.debouncedSearch({ searchString });
      },
    };
  }

  trackCallingEvent(callMadeLocation: CallMadeLocation) {
    const mode = this._callingSettings.callingMode;

    trackEvent('Int_Phone_callMade', {
      callingOptionSetup: getTrackCallingSetup(mode),
      callMadeLocation,
    });
  }

  component(props: DialerViewProps) {
    const { current: uiFunctions } = useRef(this.getUIFunctions(props));

    const { t } = useLocale(i18n);

    // TODO: fix type
    const _props: any = useConnector(() => {
      const uiProps = this.getUIProps(props);

      return {
        ...props,
        ...uiProps,
      };
    });

    if (process.env.THEME_SYSTEM === 'spring-ui') {
      const Component = this._dialerViewOptions?.component || DialerPage;

      return (
        <>
          <AppHeaderNav title={t('phoneTitle')}>{null}</AppHeaderNav>
          <Component
            {..._props}
            {...uiFunctions}
            ContactSearch={this._contactSearchView?.component}
          />
          {this._connectingView && <this._connectingView.component />}
        </>
      );
    }

    const Component = this._dialerViewOptions?.component || DialerPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
