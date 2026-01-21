import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { getCallingOption } from '@ringcentral-integration/commons/lib/getCallingOption';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import {
  AccountInfo,
  type AppFeatures,
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
  @dynamic('AppFeatures')
  private _appFeatures?: AppFeatures;

  @dynamic('CallAction')
  private _callAction?: CallAction;

  @dynamic('ContactSearchView')
  protected readonly _contactSearchView?: ContactSearchView;

  _latestCallTime = 0;
  _lastSearchInput = '';

  _callHooks: ((params: DialerViewCallParams) => Promise<void>)[] = [];

  /**
   * verify is that call can be continue before make call
   */
  protected callVerify?: (
    params: DialerViewCallParams<any>,
  ) => Promise<boolean>;

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
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      recipient: null,
    });
    this._lastSearchInput = '';
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
    this._lastSearchInput = this.toNumberField;
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

  async triggerHook({
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

  @delegate('server')
  async call({
    phoneNumber = '',
    recipient,
    fromNumber,
    trackCallMadeFrom,
    clickDialerToCall = false,
  }: DialerViewCallParams) {
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
    if (recipient?.phoneNumber) {
      recipient.phoneNumber = recipient.phoneNumber.trim();
    }
    if (phoneNumber || recipient) {
      this._latestCallTime = Date.now();
      this.resetState({
        toNumberField: phoneNumber,
        isLastInputFromDialpad: false,
        recipient: recipient || null,
      });

      const continueCall = this.callVerify
        ? await this.callVerify({ phoneNumber, recipient })
        : true;

      if (!continueCall) return;

      // * trigger hooks after pass verification
      await this.triggerHook({ phoneNumber, recipient, fromNumber });

      // for data tracking
      const { hasInvalidChars, isValid } = parse({
        input: this._lastSearchInput || this.toNumberField,
      });
      const isValidNumber = !hasInvalidChars && isValid;

      try {
        await this._call.call({
          phoneNumber: this.toNumberField,
          recipient: this.recipient!,
          fromNumber: fromNumber!,
          clickDialerToCall,
          isValidNumber,
        });

        if (
          // spring-ui project have new data tracking system, not need this track anymore
          process.env.THEME_SYSTEM !== 'spring-ui' &&
          trackCallMadeFrom
        ) {
          this.trackCallMade(trackCallMadeFrom);
        }

        this.resetState();
      } catch (error) {
        console.log('[DialerView] make call error', error);
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
        </>
      );
    }

    const Component = this._dialerViewOptions?.component || DialerPanel;

    return <Component {..._props} {...uiFunctions} />;
  }
}
