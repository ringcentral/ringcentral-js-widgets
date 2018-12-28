import { Module } from 'ringcentral-integration/lib/di';
import proxify from 'ringcentral-integration/lib/proxy/proxify';
import callErrors from 'ringcentral-integration/modules/Call/callErrors';
import Enum from 'ringcentral-integration/lib/Enum';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import { selector } from 'ringcentral-integration/lib/selector';
import RcUIModule from '../../lib/RcUIModule';
import getReducer from './getReducer';

@Module({
  name: 'DialerUI',
  deps: [
    'CallingSettings',
    { dep: 'AudioSettings', optional: true },
    'CallingSettings',
    'ConnectivityMonitor',
    { dep: 'ContactSearch', optional: true },
    'Locale',
    'RateLimiter',
    'RegionSettings',
    { dep: 'Webphone', optional: true },
    'Alert',
    'Call',
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
    connectivityMonitor,
    contactSearch,
    locale,
    rateLimiter,
    regionSettings,
    webphone,
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
    this._connectivityMonitor = connectivityMonitor;
    this._contactSearch = contactSearch;
    this._locale = locale;
    this._rateLimiter = rateLimiter;
    this._regionSettings = regionSettings;
    this._webphone = webphone;
    this._reducer = getReducer(this.actionTypes);
    this._callHooks = [];
  }

  get _actionTypes() {
    return new Enum(
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
  async setToNumberField(phoneNumber) {
    if (this.toNumberField !== phoneNumber) {
      this.store.dispatch({
        type: this.actionTypes.setToNumberField,
        phoneNumber,
      });
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

  @proxify
  async call({ phoneNumber = '', recipient = null, fromNumber = null }) {
    if (phoneNumber || recipient) {
      this.store.dispatch({
        type: this.actionTypes.call,
        phoneNumber,
        recipient,
      });
      for (const hook of this._callHooks) {
        await hook({
          phoneNumber,
          recipient,
          fromNumber,
        });
      }
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

  get toNumberField() {
    return this.state.toNumberField;
  }

  get recipient() {
    return this.state.recipient;
  }

  get isWebphoneMode() {
    return this._callingSettings.callingMode === callingModes.webphone;
  }

  get isWebphoneDisconnected() {
    return this.isWebphoneMode && !this._webphone.connected;
  }

  get isWebphoneConnecting() {
    return this.isWebphoneMode && this._webphone.connecting;
  }

  get isAudioNotEnabled() {
    return this.isWebphoneMode && !this._audioSettings.userMedia;
  }

  get isCallButtonDisabled() {
    return (
      !this._call.isIdle ||
      !this._connectivityMonitor.connectivity ||
      this._rateLimiter.throttling ||
      this.isWebphoneDisconnected ||
      this.isAudioNotEnabled
    );
  }

  get showSpinner() {
    return !(
      this._call.ready &&
      this._callingSettings.ready &&
      this._locale.ready &&
      this._connectivityMonitor.ready &&
      (!this._audioSettings || this._audioSettings.ready) &&
      !this.isWebphoneConnecting
    );
  }

  @selector
  searchContactList = [
    () => this._contactSearch && this._contactSearch.sortedResult,
    sortedResult => (sortedResult || []),
  ]

  getUIProps() {
    return {
      currentLocale: this._locale.currentLocale,
      callingMode: this._callingSettings.callingMode,
      isWebphoneMode: this.isWebphoneMode,
      callButtonDisabled: this.isCallButtonDisabled,
      fromNumber: this._callingSettings.fromNumber,
      fromNumbers: this._callingSettings.fromNumbers,
      toNumber: this.toNumberField,
      recipient: this.recipient,
      searchContactList: this.searchContactList,
      showSpinner: this.showSpinner,
      dialButtonVolume: this._audioSettings ? this._audioSettings.dialButtonVolume : 1,
      dialButtonMuted: this._audioSettings ? this._audioSettings.dialButtonMuted : false,
    };
  }
  getUIFunctions() {
    return {
      onToNumberChange: value => this.setToNumberField(value),
      clearToNumber: () => this.clearToNumberField(),
      onCallButtonClick: () => this.onCallButtonClick(),
      changeFromNumber: (...args) => this._callingSettings.updateFromNumber(...args),
      formatPhone: phoneNumber => formatNumber({
        phoneNumber,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
      }),
      setRecipient: recipient => this.setRecipient(recipient),
      clearRecipient: () => this.clearRecipient(),
      searchContact: searchString => (
        this._contactSearch &&
        this._contactSearch.debouncedSearch({ searchString })
      ),
    };
  }
}
