import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { getCallingOption } from '@ringcentral-integration/commons/lib/getCallingOption';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import { proxify } from '@ringcentral-integration/commons/lib/proxy/proxify';
import type { Recipient } from '@ringcentral-integration/commons/modules/Call';
import { callErrors } from '@ringcentral-integration/commons/modules/Call';
import type { UIFunctions, UIProps } from '@ringcentral-integration/core';
import {
  action,
  computed,
  RcUIModuleV2,
  state,
  track,
} from '@ringcentral-integration/core';
import { parse } from '@ringcentral-integration/phone-number';

import type {
  Deps,
  DialerUIContainerProps,
  DialerUIPanelProps,
  OnCallButtonClickOptions,
} from './DialerUI.interface';

const TIMEOUT = 60 * 1000;

export type DialerUICallParams<T = Recipient> = {
  phoneNumber?: string;
  recipient?: T;
  fromNumber?: string;
  clickDialerToCall?: boolean;
  trackCallMadeFrom?: string;
};

@Module({
  name: 'DialerUI',
  deps: [
    'CallingSettings',
    'ConnectivityManager',
    'Locale',
    'RateLimiter',
    'RegionSettings',
    'Alert',
    'Call',
    'ExtensionFeatures',
    'AccountInfo',
    { dep: 'AudioSettings', optional: true },
    { dep: 'ContactSearch', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'DialerUIOptions', optional: true },
  ],
})
export class DialerUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  _latestCallTime = 0;
  _lastSearchInput = '';

  _callHooks: ((params: DialerUICallParams) => Promise<void>)[] = [];

  /**
   * verify is that call can be continue before make call
   */
  protected callVerify?: (params: DialerUICallParams<any>) => Promise<boolean>;

  constructor(deps: T) {
    super({
      deps,
    });
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
  recipient: Recipient = null;

  @action
  private _setRecipient(val: Recipient) {
    this.recipient = val;
  }

  @computed((that: DialerUI<T>) => [that.recipient])
  get recipients() {
    if (this.recipient) {
      return [this.recipient];
    }
    return [];
  }

  @computed((that: DialerUI<T>) => [
    that._deps.contactSearch?.sortedResult,
    that.toNumberField,
  ])
  get searchContactList() {
    if (this.toNumberField.length < 3 || !this._deps.contactSearch) {
      return [];
    }

    return this._deps.contactSearch.sortedResult.slice(0, 50);
  }

  get isCallButtonDisabled() {
    return (
      !this._deps.call.isIdle ||
      this._deps.connectivityManager.isOfflineMode ||
      this._deps.connectivityManager.isWebphoneUnavailableMode ||
      this._deps.connectivityManager.isWebphoneInitializing ||
      this._deps.rateLimiter.throttling
    );
  }

  get showSpinner() {
    return !(
      this._deps.call.ready &&
      this._deps.callingSettings.ready &&
      this._deps.locale.ready &&
      this._deps.extensionFeatures.ready &&
      this._deps.connectivityManager.ready &&
      (!this._deps.audioSettings || this._deps.audioSettings.ready) &&
      !this._deps.connectivityManager.isWebphoneInitializing
    );
  }

  get disableFromField() {
    return (
      this._deps.extensionFeatures.ready &&
      !this._deps.extensionFeatures.features?.EditOutboundCallerId?.available
    );
  }

  get isShowAnonymous() {
    return (
      this._deps.extensionFeatures.ready &&
      this._deps.extensionFeatures.features?.BlockingCallerId?.available
    );
  }

  override onReset() {
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
      recipient: null,
    });
    this._lastSearchInput = '';
  }

  @action
  resetState(
    {
      toNumberField,
      isLastInputFromDialpad,
      recipient,
    }: Pick<
      DialerUI,
      'toNumberField' | 'isLastInputFromDialpad' | 'recipient'
    > = {
      toNumberField: '',
      isLastInputFromDialpad: false,
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
      recipient: null,
    },
  ) {
    this.toNumberField = toNumberField;
    this.isLastInputFromDialpad = isLastInputFromDialpad;
    this.recipient = recipient;
  }

  @proxify
  async clearToNumberField() {
    this._setToNumberField('');
    await this._deps.contactSearch?.clearAndReset();
  }

  @proxify
  async setToNumberField(phoneNumber: string, fromDialPad = false) {
    if (this.toNumberField !== phoneNumber) {
      this.resetState({
        toNumberField: phoneNumber,
        isLastInputFromDialpad: fromDialPad,
        recipient: this.recipient,
      });

      if (
        this._deps.dialerUIOptions?.useV2 &&
        this.toNumberField?.length >= 3
      ) {
        await this._deps.contactSearch?.setPrepareSearch();
        this._deps.contactSearch?.debouncedSearch({
          searchString: this.toNumberField,
        });
      }
    }
  }

  @proxify
  async setRecipient(recipient: Recipient) {
    this._lastSearchInput = this.toNumberField;
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      recipient,
    });
  }

  @proxify
  async clearRecipient() {
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
      recipient: null,
    });
  }

  async triggerHook({
    phoneNumber = '',
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
    recipient = null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    fromNumber = null,
  }: DialerUICallParams) {
    for (const hook of this._callHooks) {
      await hook({
        phoneNumber,
        recipient,
        fromNumber,
      });
    }
  }

  @track((that: DialerUI, trackCallMadeFrom: string) => {
    const callingOption = getCallingOption(
      that._deps.callingSettings.callingMode,
    );
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

  @proxify
  async call({
    phoneNumber = '',
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Recipient'.
    recipient = null,
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
    fromNumber = null,
    trackCallMadeFrom,
    clickDialerToCall = false,
  }: DialerUICallParams) {
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
        recipient,
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
        await this._deps.call.call({
          phoneNumber: this.toNumberField,
          recipient: this.recipient,
          fromNumber,
          clickDialerToCall,
          isValidNumber,
        });
        if (trackCallMadeFrom) {
          this.trackCallMade(trackCallMadeFrom);
        }
        this.resetState();
      } catch (error) {
        console.log('[DialerUI] make call error', error);
      }
    }
  }

  @action
  protected _loadLastPhoneNumberAction() {
    this.resetState({
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      toNumberField: this._deps.call.lastPhoneNumber,
      recipient: this._deps.call.lastRecipient,
      isLastInputFromDialpad: false,
    });
  }

  private _loadLastPhoneNumber() {
    if (!this._deps.call.lastRecipient && !this._deps.call.lastPhoneNumber) {
      this._deps.alert.warning({
        message: callErrors.noToNumber,
      });
      return;
    }

    this._loadLastPhoneNumberAction();
  }

  @proxify
  async onCallButtonClick({
    fromNumber,
    fromSessionId,
    clickDialerToCall,
  }: OnCallButtonClickOptions = {}) {
    if (`${this.toNumberField}`.trim().length === 0 && !this.recipient) {
      this._loadLastPhoneNumber();
    } else {
      // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
      this._onBeforeCall(fromSessionId);
      await this.call({
        phoneNumber: this.toNumberField,
        recipient: this.recipient,
        fromNumber,
        clickDialerToCall,
        trackCallMadeFrom: 'Dialer',
      });
    }
  }

  // * that fromSessionId send to children class
  protected _onBeforeCall(fromSessionId: string) {
    this._deps.conferenceCall?.closeMergingPair();
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
      this._deps.call.lastPhoneNumber ||
      this._deps.call.lastRecipient?.phoneNumber;
    const formattedPhoneNumber = normalizeNumber({
      phoneNumber:
        this._deps.call.lastPhoneNumber ||
        this._deps.call.lastRecipient?.phoneNumber,
      countryCode: this._deps.regionSettings.countryCode,
      areaCode: this._deps.regionSettings.areaCode,
      maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
      // if call out with extension number then only match main company number
    })?.split('*')[0];
    // use includes since after we introduced EDP, the number dialed at to field maybe different to server parsed number.
    if (
      (phoneNumber?.includes(formattedPhoneNumber) ||
        phoneNumber?.includes(originalPhoneNumber) ||
        phoneNumber === this._deps.call.lastValidatedToNumber) &&
      Date.now() - this._latestCallTime <= TIMEOUT
    ) {
      this._latestCallTime = 0;
      return true;
    }

    return false;
  }

  @track((that: DialerUI, eventName: string, contactType: string) => {
    return [eventName, { contactType, location: 'Dialpad' }];
  })
  async triggerEventTracking(eventName: string, contactType: string) {
    //
  }

  getUIProps({
    autoFocusToField,
  }: DialerUIContainerProps = {}): UIProps<DialerUIPanelProps> {
    return {
      currentLocale: this._deps.locale.currentLocale,
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      callingMode: this._deps.callingSettings.callingMode,
      isWebphoneMode: this._deps.callingSettings.isWebphoneMode,
      callButtonDisabled: this.isCallButtonDisabled,
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      fromNumber: this._deps.callingSettings.fromNumber,
      fromNumbers: this._deps.callingSettings.fromNumbers,
      toNumber: this.toNumberField,
      recipient: this.recipient,
      recipients: this.recipients,
      searchContactList: this.searchContactList,
      showSpinner: this.showSpinner,
      callVolume: this._deps.audioSettings?.callVolume ?? 1,
      outputDeviceId: this._deps.audioSettings?.outputDeviceId ?? '',
      isLastInputFromDialpad: this.isLastInputFromDialpad,
      disableFromField: this.disableFromField,
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      useV2: this._deps.dialerUIOptions?.useV2,
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      showAnonymous: this.isShowAnonymous,
      autoFocus: autoFocusToField,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUIFunctions(): UIFunctions<DialerUIPanelProps> {
    return {
      triggerEventTracking: (eventName: string, contactType: string) =>
        this.triggerEventTracking(eventName, contactType),
      onToNumberChange: (...args) => this.setToNumberField(...args),
      clearToNumber: () => this.clearToNumberField(),
      onCallButtonClick: (...args) => this.onCallButtonClick(...args),
      changeFromNumber: (...args) =>
        this._deps.callingSettings.updateFromNumber(...args),
      formatPhone: (phoneNumber) =>
        // @ts-expect-error TS(2322): Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
        }),
      setRecipient: (...args) => this.setRecipient(...args),
      clearRecipient: () => this.clearRecipient(),
      searchContact: (searchString) =>
        // @ts-expect-error TS(2322): Type 'Promise<void> | undefined' is not assignable... Remove this comment to see the full error message
        this._deps.contactSearch?.debouncedSearch({ searchString }),
    };
  }
}
