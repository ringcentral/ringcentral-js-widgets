import { combineReducers } from 'redux';

import extractControls from '@ringcentral-integration/phone-number/lib/extractControls';

import { Module } from '../../lib/di';
import ensureExist from '../../lib/ensureExist';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { validateNumbers } from '../../lib/validateNumbers';
import callingModes from '../CallingSettings/callingModes';
import { ringoutErrors } from '../Ringout/ringoutErrors';
import callActionTypes from './actionTypes';
import callErrors from './callErrors';
import { callStatus } from './callStatus';
import getCallReducer, {
  getLastPhoneNumberReducer,
  getLastRecipientReducer,
} from './getCallReducer';

const TO_NUMBER = 'toNumber';
const FROM_NUMBER = 'fromNumber';
const ANONYMOUS = 'anonymous';

/**
 * @class
 * @description Call managing module
 */
@Module({
  deps: [
    'Alert',
    'Storage',
    'Brand',
    'Softphone',
    'Ringout',
    'NumberValidate',
    'RegionSettings',
    'CallingSettings',
    'ExtensionFeatures',
    { dep: 'Webphone', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'CallOptions', optional: true },
  ],
})
export default class Call extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Brand} params.brand - brand module instance
   * @param {Alert} params.alert - alert module instance
   * @param {Client} params.client - client module instance
   * @param {Storage} params.storage - storage module instance
   * @param {CallingSettings} params.callingSettings - callingSettings module instance
   * @param {Softphone} params.softphone - softphone module instance
   * @param {Ringout} params.ringout - ringout module instance
   * @param {Webphone} params.webphone - webphone module instance
   * @param {NumberValidate} params.numberValidate - numberValidate module instance
   * @param {RegionSettings} params.regionSettings - regionSettings module instance
   */
  constructor({
    alert,
    brand,
    storage,
    callingSettings,
    softphone,
    ringout,
    webphone,
    numberValidate,
    regionSettings,
    extensionFeatures,
    internationalCheck = true,
    permissionCheck = true,
    availabilityMonitor,
    ...options
  }) {
    super({
      ...options,
      actionTypes: callActionTypes,
    });

    this._brand = brand;

    this._alert = ensureExist.call(this, alert, 'alert');
    this._storage = ensureExist.call(this, storage, 'storage');
    this._storageKey = 'callData';
    this._reducer = getCallReducer(this.actionTypes);
    this._callingSettings = ensureExist.call(
      this,
      callingSettings,
      'callingSettings',
    );
    this._ringout = ensureExist.call(this, ringout, 'ringout');
    this._softphone = ensureExist.call(this, softphone, 'softphone');
    this._webphone = webphone;
    this._numberValidate = ensureExist.call(
      this,
      numberValidate,
      'numberValidate',
    );
    this._regionSettings = ensureExist.call(
      this,
      regionSettings,
      'regionSettings',
    );
    this._extensionFeatures = extensionFeatures;
    this._internationalCheck = internationalCheck;
    this._availabilityMonitor = availabilityMonitor;
    this._callSettingMode = null;
    this._permissionCheck = permissionCheck;

    this._storage.registerReducer({
      key: this._storageKey,
      reducer: combineReducers({
        lastPhoneNumber: getLastPhoneNumberReducer(this.actionTypes),
        lastRecipient: getLastRecipientReducer(this.actionTypes),
      }),
    });
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      this._initCallModule();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this._resetCallModule();
    } else if (this.ready) {
      await this._processCall();
    }
  }

  _shouldInit() {
    return (
      this._numberValidate.ready &&
      this._callingSettings.ready &&
      this._storage.ready &&
      this._regionSettings.ready &&
      (!this._webphone || this._webphone.ready) &&
      (!this._availabilityMonitor || this._availabilityMonitor.ready) &&
      this._ringout.ready &&
      this._softphone.ready &&
      this._extensionFeatures.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (!this._numberValidate.ready ||
        !this._callingSettings.ready ||
        !this._regionSettings.ready ||
        (!!this._webphone && !this._webphone.ready) ||
        (!!this._availabilityMonitor && !this._availabilityMonitor.ready) ||
        !this._ringout.ready ||
        !this._softphone.ready ||
        !this._extensionFeatures.ready ||
        !this._storage.ready) &&
      this.ready
    );
  }

  async _initCallModule() {
    this._callSettingMode = this._callingSettings.callingMode;
    if (this._callSettingMode === callingModes.webphone && this._webphone) {
      await this._webphone.connect();
    }
  }

  _resetCallModule() {
    this.store.dispatch({
      type: this.actionTypes.resetSuccess,
    });
    this._callSettingMode = this._callingSettings.callingMode;
    if (this._callSettingMode === callingModes.webphone && this._webphone) {
      this._webphone.disconnect();
    }
  }

  async _processCall() {
    const oldCallSettingMode = this._callSettingMode;
    if (this._callingSettings.callingMode !== oldCallSettingMode) {
      this._callSettingMode = this._callingSettings.callingMode;
      if (this._webphone) {
        if (oldCallSettingMode === callingModes.webphone) {
          this._webphone.disconnect();
        } else if (this._callSettingMode === callingModes.webphone) {
          await this._webphone.connect();
        }
      }
    }
  }

  @proxify
  async onToNumberChange(value) {
    this.store.dispatch({
      type: this.actionTypes.toNumberChanged,
      data: value,
    });
  }

  // save the click to dial entity, only when call took place
  onToNumberMatch({ entityId, startTime }) {
    if (this.isIdle) {
      this.store.dispatch({
        type: this.actionTypes.toNumberMatched,
        data: { entityId, startTime },
      });
    }
  }

  cleanToNumberEntities() {
    this.store.dispatch({
      type: this.actionTypes.cleanToNumberEntities,
    });
  }

  @proxify
  async call({
    phoneNumber: input,
    recipient,
    fromNumber,
    isConference = false,
  }) {
    let session = null;
    if (this.isIdle) {
      const { phoneNumber, extendedControls } = extractControls(input);
      const toNumber =
        (recipient && (recipient.phoneNumber || recipient.extension)) ||
        phoneNumber;
      if (!toNumber || `${toNumber}`.trim().length === 0) {
        this._alert.warning({
          message: callErrors.noToNumber,
        });
      } else {
        this.store.dispatch({
          type: this.actionTypes.connect,
          isConference,
          phoneNumber,
          recipient,
          callSettingMode: this._callSettingMode, // for Track
        });
        try {
          let validatedNumbers;
          if (this._permissionCheck) {
            validatedNumbers = await this._getValidatedNumbers({
              toNumber,
              fromNumber,
              isConference,
            });
          } else {
            validatedNumbers = this._getNumbers({
              toNumber,
              fromNumber,
              isConference,
            });
          }
          if (validatedNumbers) {
            session = await this._makeCall({
              ...validatedNumbers,
              extendedControls,
            });
            this.store.dispatch({
              type: this.actionTypes.connectSuccess,
              callSettingMode: this._callSettingMode, // for Track
            });
          } else {
            this.store.dispatch({
              type: this.actionTypes.connectError,
            });
          }
        } catch (error) {
          if (!error.message && error.type && callErrors[error.type]) {
            // validate format error
            this._alert.warning({
              message: callErrors[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          } else if (error.message === ringoutErrors.firstLegConnectFailed) {
            this._alert.warning({
              message: callErrors.connectFailed,
              payload: error,
            });
          } else if (error.message === 'Failed to fetch') {
            this._alert.danger({
              message: callErrors.networkError,
              payload: error,
            });
          } else if (error.message !== 'Refresh token has expired') {
            if (
              !this._availabilityMonitor ||
              !(await this._availabilityMonitor.checkIfHAError(error))
            ) {
              this._alert.danger({
                message: callErrors.internalError,
                payload: error,
              });
            }
          }
          this.store.dispatch({
            type: this.actionTypes.connectError,
          });
          throw error;
        }
      }
    }
    return session;
  }

  @proxify
  _getNumbers({ toNumber, fromNumber, isConference }) {
    const isWebphone =
      this._callingSettings.callingMode === callingModes.webphone;
    const theFromNumber =
      fromNumber ||
      (isWebphone
        ? this._callingSettings.fromNumber
        : this._callingSettings.myLocation);

    if (isWebphone && (theFromNumber === null || theFromNumber === '')) {
      return null;
    }

    const waitingValidateNumbers = [];

    if (!isConference) {
      waitingValidateNumbers.push({
        type: TO_NUMBER,
        number: toNumber,
      });
    }

    if (
      theFromNumber &&
      theFromNumber.length > 0 &&
      !(isWebphone && theFromNumber === ANONYMOUS)
    ) {
      waitingValidateNumbers.push({
        type: FROM_NUMBER,
        number: theFromNumber,
      });
    }

    let parsedToNumber;
    let parsedFromNumber;

    if (waitingValidateNumbers.length) {
      const numbers = waitingValidateNumbers.map((x) => x.number);
      const validatedResult = validateNumbers({
        allowRegionSettings: this._brand.brandConfig.allowRegionSettings,
        areaCode: this._regionSettings.areaCode,
        countryCode: this._regionSettings.countryCode,
        phoneNumbers: numbers,
      });
      const toNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === TO_NUMBER,
      );
      const fromNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === FROM_NUMBER,
      );
      parsedToNumber = validatedResult[toNumberIndex];
      parsedFromNumber = validatedResult[fromNumberIndex];
    }
    if (isWebphone && theFromNumber === ANONYMOUS) {
      parsedFromNumber = ANONYMOUS;
    }
    return {
      toNumber: parsedToNumber || toNumber,
      fromNumber: parsedFromNumber,
    };
  }

  @proxify
  async _getValidatedNumbers({ toNumber, fromNumber, isConference }) {
    const isWebphone =
      this._callingSettings.callingMode === callingModes.webphone;
    const theFromNumber =
      fromNumber ||
      (isWebphone
        ? this._callingSettings.fromNumber
        : this._callingSettings.myLocation);

    if (isWebphone && (theFromNumber === null || theFromNumber === '')) {
      return null;
    }

    const waitingValidateNumbers = [];

    if (!isConference) {
      waitingValidateNumbers.push({
        type: TO_NUMBER,
        number: toNumber,
      });
    }

    if (
      theFromNumber &&
      theFromNumber.length > 0 &&
      !(isWebphone && theFromNumber === ANONYMOUS)
    ) {
      waitingValidateNumbers.push({
        type: FROM_NUMBER,
        number: theFromNumber,
      });
    }

    let parsedToNumber;
    let parsedFromNumber;
    if (waitingValidateNumbers.length) {
      const numbers = waitingValidateNumbers.map((x) => x.number);
      const validatedResult = await this._numberValidate.validateNumbers(
        numbers,
      );
      if (!validatedResult.result) {
        validatedResult.errors.forEach((error) => {
          // this._alert.warning({
          //   message: callErrors[error.type],
          //   payload: {
          //     phoneNumber: error.phoneNumber
          //   }
          // });
          throw error;
        });
        return null;
      }
      const toNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === TO_NUMBER,
      );
      const fromNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === FROM_NUMBER,
      );
      parsedToNumber = validatedResult.numbers[toNumberIndex];
      parsedFromNumber = validatedResult.numbers[fromNumberIndex];
    }
    if (this._internationalCheck) {
      if (
        parsedToNumber &&
        parsedToNumber.international &&
        !this._extensionFeatures.features?.InternationalCalling?.available
      ) {
        const error = {
          phoneNumber: parsedToNumber.originalString,
          type: 'noInternational',
        };
        throw error;
      }
    }

    let parsedToNumberE164 = toNumber;
    if (parsedToNumber) {
      parsedToNumberE164 = parsedToNumber.e164;
      // add ext back if any
      if (parsedToNumber.e164 && parsedToNumber.subAddress) {
        parsedToNumberE164 = [
          parsedToNumber.e164,
          parsedToNumber.subAddress,
        ].join('*');
      }
    }

    // using e164 in response to call
    let parsedFromNumberE164;
    if (parsedFromNumber) {
      parsedFromNumberE164 = parsedFromNumber.e164;
      // add ext back if any
      if (parsedFromNumber.e164 && parsedFromNumber.subAddress) {
        parsedFromNumberE164 = [
          parsedFromNumber.e164,
          parsedFromNumber.subAddress,
        ].join('*');
      }
    }
    if (isWebphone && theFromNumber === ANONYMOUS) {
      parsedFromNumberE164 = ANONYMOUS;
    }
    return {
      toNumber: parsedToNumberE164,
      fromNumber: parsedFromNumberE164,
    };
  }

  @proxify
  async _makeCall({
    toNumber,
    fromNumber,
    callingMode = this._callingSettings.callingMode,
    extendedControls = [],
  }) {
    const homeCountryId = this._regionSettings.homeCountryId;
    let session;
    switch (callingMode) {
      case callingModes.softphone:
      case callingModes.jupiter:
        session = this._softphone.makeCall(toNumber, callingMode);
        break;
      case callingModes.ringout:
        session = await this._ringout.makeCall({
          fromNumber,
          toNumber: toNumber && toNumber.split('*')[0], // remove extension number in ringout mode
          prompt: this._callingSettings.ringoutPrompt,
        });
        break;
      case callingModes.webphone:
        if (this._webphone) {
          session = await this._webphone.makeCall({
            fromNumber,
            toNumber,
            homeCountryId,
            extendedControls,
          });
        }
        break;
      default:
        break;
    }
    return session;
  }

  get status() {
    return this.state.status;
  }

  get callStatus() {
    return this.state.callStatus;
  }

  get isIdle() {
    return this.state.callStatus === callStatus.idle;
  }

  get lastPhoneNumber() {
    return this._storage.getItem(this._storageKey).lastPhoneNumber;
  }

  get lastRecipient() {
    return this._storage.getItem(this._storageKey).lastRecipient;
  }

  get toNumber() {
    return this.state.toNumber;
  }

  get toNumberEntities() {
    return this.state.toNumberEntities;
  }
}
