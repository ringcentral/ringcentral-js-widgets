import { combineReducers } from 'redux';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import callingModes from '../CallingSettings/callingModes';
import moduleStatuses from '../../enums/moduleStatuses';
import proxify from '../../lib/proxy/proxify';
import ensureExist from '../../lib/ensureExist';

import callActionTypes from './actionTypes';
import getCallReducer, {
  getLastPhoneNumberReducer,
  getLastRecipientReducer,
} from './getCallReducer';

import callStatus from './callStatus';
import callErrors from './callErrors';
import ringoutErrors from '../Ringout/ringoutErrors';

/**
 * @class
 * @description Call managing module
 */
@Module({
  deps: [
    'Alert',
    'Storage',
    'Softphone',
    'Ringout',
    'NumberValidate',
    'RegionSettings',
    'CallingSettings',
    'RolesAndPermissions',
    { dep: 'Webphone', optional: true },
    { dep: 'CallOptions', optional: true }
  ]
})
export default class Call extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
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
    storage,
    callingSettings,
    softphone,
    ringout,
    webphone,
    numberValidate,
    regionSettings,
    rolesAndPermissions,
    ...options
  }) {
    super({
      ...options,
      actionTypes: callActionTypes,
    });

    this._alert = this::ensureExist(alert, 'alert');
    this._storage = this::ensureExist(storage, 'storage');
    this._storageKey = 'callData';
    this._reducer = getCallReducer(this.actionTypes);
    this._callingSettings = this::ensureExist(callingSettings, 'callingSettings');
    this._ringout = this::ensureExist(ringout, 'ringout');
    this._softphone = this::ensureExist(softphone, 'softphone');
    this._webphone = webphone;
    this._numberValidate = this::ensureExist(numberValidate, 'numberValidate');
    this._regionSettings = this::ensureExist(regionSettings, 'regionSettings');
    this._rolesAndPermissions = this::ensureExist(rolesAndPermissions, 'rolesAndPermissions');

    this._callSettingMode = null;

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
      await this._initCallModule();
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
      this._ringout.ready &&
      this._softphone.ready &&
      this._rolesAndPermissions.ready &&
      this.pending
    );
  }
  _shouldReset() {
    return (
      (
        !this._numberValidate.ready ||
        !this._callingSettings.ready ||
        !this._regionSettings.ready ||
        (!!this._webphone && !this._webphone.ready) ||
        !this._ringout.ready ||
        !this._softphone.ready ||
        !this._rolesAndPermissions.ready ||
        !this._storage.ready
      ) &&
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
    if (this._callingSettings.callingMode !== oldCallSettingMode && this._webphone) {
      this._callSettingMode = this._callingSettings.callingMode;
      if (oldCallSettingMode === callingModes.webphone) {
        this._webphone.disconnect();
      } else if (this._callSettingMode === callingModes.webphone) {
        await this._webphone.connect();
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
  async call({ phoneNumber, recipient }) {
    if (this.isIdle) {
      const toNumber = recipient && (recipient.phoneNumber || recipient.extension) || phoneNumber;
      if (!toNumber || `${toNumber}`.trim().length === 0) {
        this._alert.warning({
          message: callErrors.noToNumber,
        });
      } else {
        this.store.dispatch({
          type: this.actionTypes.connect,
          phoneNumber,
          recipient,
          callSettingMode: this._callSettingMode // for Track
        });
        try {
          const validatedNumbers = await this._getValidatedNumbers({ toNumber });
          if (validatedNumbers) {
            await this._makeCall(validatedNumbers);
            this.store.dispatch({
              type: this.actionTypes.connectSuccess,
              callSettingMode: this._callSettingMode // for Track
            });
          } else {
            this.store.dispatch({
              type: this.actionTypes.connectError
            });
          }
        } catch (error) {
          if (!error.message && error.type && callErrors[error.type]) {
            // validate format error
            this._alert.warning({
              message: callErrors[error.type],
              payload: {
                phoneNumber: error.phoneNumber
              }
            });
          } else if (error.message === ringoutErrors.firstLegConnectFailed) {
            this._alert.warning({
              message: callErrors.connectFailed,
              payload: error
            });
          } else if (error.message === 'Failed to fetch') {
            this._alert.danger({
              message: callErrors.networkError,
              payload: error,
            });
          } else if (error.message !== 'Refresh token has expired') {
            this._alert.danger({
              message: callErrors.internalError,
              payload: error,
            });
          }
          this.store.dispatch({
            type: this.actionTypes.connectError
          });
          throw error;
        }
      }
    }
  }

  @proxify
  async _getValidatedNumbers({ toNumber }) {
    const isWebphone = (this._callingSettings.callingMode === callingModes.webphone);
    const fromNumber = isWebphone ?
      this._callingSettings.fromNumber :
      this._callingSettings.myLocation;
    if (isWebphone && (fromNumber === null || fromNumber === '')) return null;

    const waitingValidateNumbers = [toNumber];
    if (
      fromNumber &&
      fromNumber.length > 0 &&
      !(isWebphone && fromNumber === 'anonymous')
    ) {
      waitingValidateNumbers.push(fromNumber);
    }
    const validatedResult
      = await this._numberValidate.validateNumbers(waitingValidateNumbers);
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
    const parsedNumbers = validatedResult.numbers;
    const parsedToNumber = parsedNumbers[0];
    if (
      parsedToNumber.international &&
      !this._rolesAndPermissions.permissions.InternationalCalls
    ) {
      const error = {
        phoneNumber: parsedToNumber.originalString,
        type: 'noInternational',
      };
      throw error;
    }
    // using e164 in response to call
    let parsedFromNumber =
      parsedNumbers[1] ? parsedNumbers[1].e164 : '';
    // add ext back if any
    if (parsedFromNumber !== '') {
      parsedFromNumber = (parsedNumbers[1].subAddress) ?
        [parsedNumbers[1].e164, parsedNumbers[1].subAddress].join('*') :
        parsedNumbers[1].e164;
    }
    if (isWebphone && fromNumber === 'anonymous') {
      parsedFromNumber = 'anonymous';
    }
    return {
      toNumber: parsedToNumber.e164,
      fromNumber: parsedFromNumber,
    };
  }
  @proxify
  async _makeCall({
    toNumber,
    fromNumber,
    callingMode = this._callingSettings.callingMode,
  }) {
    const homeCountry = this._regionSettings.availableCountries.find(
      country => country.isoCode === this._regionSettings.countryCode
    );
    const homeCountryId = (homeCountry && homeCountry.callingCode) || '1';
    switch (callingMode) {
      case callingModes.softphone:
        this._softphone.makeCall(toNumber);
        break;
      case callingModes.ringout:
        await this._ringout.makeCall({
          fromNumber,
          toNumber,
          prompt: this._callingSettings.ringoutPrompt,
        });
        break;
      case callingModes.webphone:
        if (this._webphone) {
          await this._webphone.makeCall({
            fromNumber,
            toNumber,
            homeCountryId,
          });
        }
        break;
      default:
        break;
    }
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
