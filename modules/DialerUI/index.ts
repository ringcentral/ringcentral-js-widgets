import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import normalizeNumber from '@ringcentral-integration/commons/lib/normalizeNumber';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import { selector } from '@ringcentral-integration/commons/lib/selector';
import callErrors from '@ringcentral-integration/commons/modules/Call/callErrors';
import { ObjectMap } from '@ringcentral-integration/core/lib/ObjectMap';

import RcUIModule from '../../lib/RcUIModule';
import getReducer from './getReducer';

const TIMEOUT = 60 * 1000;
@Module({
  name: 'DialerUI',
  deps: [
    'CallingSettings',
    { dep: 'AudioSettings', optional: true },
    'CallingSettings',
    'ConnectivityManager',
    { dep: 'ContactSearch', optional: true },
    'Locale',
    'RateLimiter',
    'RegionSettings',
    'Alert',
    'Call',
    'ExtensionFeatures',
    { dep: 'ConferenceCall', optional: true },
    { dep: 'DialerUIOptions', optional: true },
  ],
})
export default class DialerUI extends RcUIModule {
  constructor({
    alert,
    audioSettings,
    call,
    callingSettings,
    conferenceCall,
    connectivityManager,
    contactSearch,
    locale,
    rateLimiter,
    regionSettings,
    extensionFeatures,
    useV2 = false,
    ...options
  }) {
    super({
      ...options,
    });
    this._alert = alert;
    this._audioSettings = audioSettings;
    this._call = call;
    this._callingSettings = callingSettings;
    this._conferenceCall = conferenceCall;
    this._connectivityManager = connectivityManager;
    this._contactSearch = contactSearch;
    this._locale = locale;
    this._rateLimiter = rateLimiter;
    this._regionSettings = regionSettings;
    this._extensionFeatures = extensionFeatures;
    this._reducer = getReducer(this.actionTypes);
    this._useV2 = useV2;
    this._callHooks = [];
    this._latestCallTime = 0;
  }

  get _actionTypes() {
    return ObjectMap.prefixKeys(
      [
        'setToNumberField',
        'clearToNumberField',
        'setRecipient',
        'clearRecipient',
        'loadLastCallState',
        'call',
        'callError',
        'callSuccess',
      ],
      'dialerUI',
    );
  }

  @proxify
  async clearToNumberField() {
    this.store.dispatch({
      type: this.actionTypes.clearToNumberField,
    });
  }

  @proxify
  async setToNumberField(phoneNumber, fromDialPad = false) {
    if (this.toNumberField !== phoneNumber) {
      this.store.dispatch({
        type: this.actionTypes.setToNumberField,
        phoneNumber,
        fromDialPad,
      });
      if (
        this._useV2 &&
        this.toNumberField &&
        this.toNumberField.length >= 3 &&
        this._contactSearch
      ) {
        this._contactSearch.debouncedSearch({
          searchString: this.toNumberField,
        });
      }
    }
  }

  @proxify
  async setRecipient(recipient, shouldClean = true) {
    this.store.dispatch({
      type: this.actionTypes.setRecipient,
      recipient,
    });
    if (shouldClean) {
      await this.clearToNumberField();
    }
  }

  @proxify
  async clearRecipient() {
    this.store.dispatch({
      type: this.actionTypes.clearRecipient,
    });
  }

  async triggerHook({ phoneNumber = '', recipient = null, fromNumber = null }) {
    for (const hook of this._callHooks) {
      await hook({
        phoneNumber,
        recipient,
        fromNumber,
      });
    }
  }

  @proxify
  async call({ phoneNumber = '', recipient = null, fromNumber = null }) {
    if (phoneNumber || recipient) {
      this._latestCallTime = Date.now();
      this.store.dispatch({
        type: this.actionTypes.call,
        phoneNumber,
        recipient,
      });
      await this.triggerHook({ phoneNumber, recipient, fromNumber });
      const continueCall = this.callVerify
        ? await this.callVerify({ phoneNumber, recipient })
        : true;
      if (!continueCall) return;

      try {
        await this._call.call({
          phoneNumber: this.toNumberField,
          recipient: this.recipient,
          fromNumber,
        });
        this.store.dispatch({
          type: this.actionTypes.callSuccess,
        });
      } catch (error) {
        this.store.dispatch({
          type: this.actionTypes.callError,
          error,
        });
      }
    }
  }

  _loadLastPhoneNumber() {
    if (!this._call.lastRecipient && !this._call.lastPhoneNumber) {
      this._alert.warning({
        message: callErrors.noToNumber,
      });
    } else {
      this.store.dispatch({
        type: this.actionTypes.loadLastCallState,
        phoneNumber: this._call.lastPhoneNumber,
        recipient: this._call.lastRecipient,
      });
    }
  }

  @proxify
  async onCallButtonClick({ fromNumber, fromSessionId } = {}) {
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

  _onBeforeCall() {
    if (this._conferenceCall) {
      this._conferenceCall.closeMergingPair();
    }
  }

  /**
   * TODO: refactor with a better way to check if a call is placed by current device
   * @param {
   * } phoneNumber
   * @returns boolean
   *
   * Check if a call is placed by current device, including call with browser, jupiter and ringcentral phone,
   * and timeout 60s is for when call with ringcentral phone or jupiter we can't make sure the call is placed immediately
   * so just in case other device make a call with same phone number when call from current device fail then we
   * should not count it as current device call
   */
  isCallFromCurrentDevice(phoneNumber: string) {
    let latestNumber = normalizeNumber({
      phoneNumber:
        this._call.lastPhoneNumber || this._call.lastRecipient?.phoneNumber,
      countryCode: this._regionSettings.countryCode,
      areaCode: this._regionSettings.areaCode,
    });
    // if call out with extension number then only match main company number
    latestNumber = latestNumber && latestNumber.split('*')[0];
    if (
      latestNumber === phoneNumber &&
      Date.now() - this._latestCallTime <= TIMEOUT
    ) {
      this._latestCallTime = 0;
      return true;
    }
    return false;
  }

  get toNumberField() {
    return this.state.toNumberField;
  }

  get recipient() {
    return this.state.recipient;
  }

  @selector
  recipients = [
    () => this.recipient,
    (recipient) => {
      if (recipient) {
        return [recipient];
      }
      return [];
    },
  ];

  get isCallButtonDisabled() {
    return (
      !this._call.isIdle ||
      this._connectivityManager.isOfflineMode ||
      this._connectivityManager.isWebphoneUnavailableMode ||
      this._connectivityManager.isWebphoneInitializing ||
      this._rateLimiter.throttling
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

  @selector
  searchContactList = [
    () => this._contactSearch && this._contactSearch.sortedResult,
    () => this.toNumberField,
    (sortedResult, toNumberField) =>
      (toNumberField.length >= 3 && sortedResult.slice(0, 50)) || [],
  ];

  get isLastInputFromDialpad() {
    return this.state.isLastInputFromDialpad;
  }

  get disableFromField() {
    return (
      this._extensionFeatures.ready &&
      !this._extensionFeatures.features?.EditOutboundCallerId?.available
    );
  }

  get isShowAnonymous() {
    return (
      this._extensionFeatures.ready &&
      this._extensionFeatures.features?.BlockingCallerId?.available
    );
  }

  getUIProps({ withTabs, dialButtonsClassName } = {}) {
    return {
      withTabs,
      dialButtonsClassName,
      currentLocale: this._locale.currentLocale,
      callingMode: this._callingSettings.callingMode,
      isWebphoneMode: this._callingSettings.isWebphoneMode,
      callButtonDisabled: this.isCallButtonDisabled,
      fromNumber: this._callingSettings.fromNumber,
      fromNumbers: this._callingSettings.fromNumbers,
      toNumber: this.toNumberField,
      recipient: this.recipient,
      recipients: this.recipients,
      searchContactList: this.searchContactList,
      showSpinner: this.showSpinner,
      dialButtonVolume: this._audioSettings
        ? this._audioSettings.dialButtonVolume
        : 1,
      dialButtonMuted: this._audioSettings
        ? this._audioSettings.dialButtonMuted
        : false,
      isLastInputFromDialpad: this.isLastInputFromDialpad,
      disableFromField: this.disableFromField,
      useV2: this._useV2,
      showAnonymous: this.isShowAnonymous,
    };
  }

  getUIFunctions({
    phoneTypeRenderer,
    phoneSourceNameRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
  } = {}) {
    return {
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      recipientsContactInfoRenderer,
      recipientsContactPhoneRenderer,
      onToNumberChange: (...props) => this.setToNumberField(...props),
      clearToNumber: () => this.clearToNumberField(),
      onCallButtonClick: () => this.onCallButtonClick(),
      changeFromNumber: (...args) =>
        this._callingSettings.updateFromNumber(...args),
      formatPhone: (phoneNumber) =>
        formatNumber({
          phoneNumber,
          areaCode: this._regionSettings.areaCode,
          countryCode: this._regionSettings.countryCode,
        }),
      setRecipient: (recipient) => this.setRecipient(recipient),
      clearRecipient: () => this.clearRecipient(),
      searchContact: (searchString) =>
        this._contactSearch &&
        this._contactSearch.debouncedSearch({ searchString }),
    };
  }
}
