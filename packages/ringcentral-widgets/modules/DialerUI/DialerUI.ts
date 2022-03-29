import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import { normalizeNumber } from '@ringcentral-integration/commons/lib/normalizeNumber';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import callErrors from '@ringcentral-integration/commons/modules/Call/callErrors';
import { Recipient } from '@ringcentral-integration/commons/modules/CallV2/Call.interface';
import {
  action,
  computed,
  RcUIModuleV2,
  state,
  UIFunctions,
  UIProps,
} from '@ringcentral-integration/core';

import { Deps, DialerUIPanelProps } from './DialerUI.interface';

const TIMEOUT = 60 * 1000;

export type DialerUICallParams<T = Recipient> = {
  phoneNumber?: string;
  recipient?: T;
  fromNumber?: string;
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
    { dep: 'AudioSettings', optional: true },
    { dep: 'ContactSearch', optional: true },
    { dep: 'ConferenceCall', optional: true },
    { dep: 'DialerUIOptions', optional: true },
  ],
})
export class DialerUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  _latestCallTime: number = 0;

  _callHooks: ((params: DialerUICallParams) => Promise<void>)[] = [];

  /**
   * verify is that call can be continue before make call
   */
  protected callVerify?: (params: DialerUICallParams<any>) => Promise<boolean>;

  constructor(deps: Deps & T) {
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
        this._deps.contactSearch?.debouncedSearch({
          searchString: this.toNumberField,
        });
      }
    }
  }

  @proxify
  async setRecipient(recipient: Recipient) {
    this.resetState({
      toNumberField: '',
      isLastInputFromDialpad: false,
      recipient,
    });
  }

  @proxify
  async clearRecipient() {
    this.resetState({
      toNumberField: this.toNumberField,
      isLastInputFromDialpad: false,
      recipient: null,
    });
  }

  async triggerHook({
    phoneNumber = '',
    recipient = null,
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

  @proxify
  async call({
    phoneNumber = '',
    recipient = null,
    fromNumber = null,
  }: DialerUICallParams) {
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

      try {
        await this._deps.call.call({
          phoneNumber: this.toNumberField,
          recipient: this.recipient,
          fromNumber,
        });

        this.resetState();
      } catch (error) {
        console.log('[DialerUI] make call error', error);
      }
    }
  }

  @action
  protected _loadLastPhoneNumberAction() {
    this.resetState({
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
  }: { fromNumber?: string; fromSessionId?: string } = {}) {
    if (`${this.toNumberField}`.trim().length === 0 && !this.recipient) {
      this._loadLastPhoneNumber();
    } else {
      this._onBeforeCall(fromSessionId);
      await this.call({
        phoneNumber: this.toNumberField,
        recipient: this.recipient,
        fromNumber,
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
    const latestNumber = normalizeNumber({
      phoneNumber:
        this._deps.call.lastPhoneNumber ||
        this._deps.call.lastRecipient?.phoneNumber,
      countryCode: this._deps.regionSettings.countryCode,
      areaCode: this._deps.regionSettings.areaCode,
      // if call out with extension number then only match main company number
    })?.split('*')[0];

    if (
      latestNumber === phoneNumber &&
      Date.now() - this._latestCallTime <= TIMEOUT
    ) {
      this._latestCallTime = 0;
      return true;
    }

    return false;
  }

  getUIProps(): UIProps<DialerUIPanelProps> {
    return {
      currentLocale: this._deps.locale.currentLocale,
      callingMode: this._deps.callingSettings.callingMode,
      isWebphoneMode: this._deps.callingSettings.isWebphoneMode,
      callButtonDisabled: this.isCallButtonDisabled,
      fromNumber: this._deps.callingSettings.fromNumber,
      fromNumbers: this._deps.callingSettings.fromNumbers,
      toNumber: this.toNumberField,
      recipient: this.recipient,
      recipients: this.recipients,
      searchContactList: this.searchContactList,
      showSpinner: this.showSpinner,
      dialButtonVolume: this._deps.audioSettings?.dialButtonVolume ?? 1,
      dialButtonMuted: this._deps.audioSettings?.dialButtonMuted ?? false,
      isLastInputFromDialpad: this.isLastInputFromDialpad,
      disableFromField: this.disableFromField,
      useV2: this._deps.dialerUIOptions?.useV2,
      showAnonymous: this.isShowAnonymous,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUIFunctions(props: any): UIFunctions<DialerUIPanelProps> {
    return {
      onToNumberChange: (...args) => this.setToNumberField(...args),
      clearToNumber: () => this.clearToNumberField(),
      onCallButtonClick: () => this.onCallButtonClick(),
      changeFromNumber: (...args) =>
        this._deps.callingSettings.updateFromNumber(...args),
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
        }),
      setRecipient: (...args) => this.setRecipient(...args),
      clearRecipient: () => this.clearRecipient(),
      searchContact: (searchString) =>
        this._deps.contactSearch?.debouncedSearch({ searchString }),
    };
  }
}
