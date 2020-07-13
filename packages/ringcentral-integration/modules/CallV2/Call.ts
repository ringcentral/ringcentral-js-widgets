// TODO: fix `@ringcentral-integration/phone-number` type
// @ts-ignore
import extractControls from '@ringcentral-integration/phone-number/lib/extractControls';
import {
  RcModuleV2,
  state,
  storage,
  action,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import callingModes from '../CallingSettings/callingModes';
import proxify from '../../lib/proxy/proxify';
import {
  DepModules,
  ToNumberMatched,
  Recipient,
  DepOptions,
} from './Call.interface';

import Alert from '../Alert';
import Storage from '../Storage';
import Brand from '../Brand';
import Softphone from '../Softphone';
import Ringout from '../Ringout';
import NumberValidate from '../NumberValidate';
import RegionSettings from '../RegionSettings';
import CallingSettings from '../CallingSettings';
import RolesAndPermissions from '../RolesAndPermissions';
import Webphone from '../Webphone';
import AvailabilityMonitor from '../AvailabilityMonitor';

import { callStatus } from './callStatus';
import callErrors from './callErrors';
import { ringoutErrors } from '../Ringout/ringoutErrors';
import validateNumbers from '../../lib/validateNumbers';

const TO_NUMBER = 'toNumber';
const FROM_NUMBER = 'fromNumber';
const ANONYMOUS = 'anonymous';

/**
 * @class
 * @description Call managing module
 */
@Module({
  name: 'Call',
  deps: [
    'Alert',
    'Storage',
    'Brand',
    'Softphone',
    'Ringout',
    'NumberValidate',
    'RegionSettings',
    'CallingSettings',
    'RolesAndPermissions',
    { dep: 'Webphone', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'CallOptions', optional: true },
  ],
})
export class Call extends RcModuleV2<DepModules> {
  _alert: Alert;
  _storage: Storage;
  _brand: Brand;
  _softphone: Softphone;
  _ringout: Ringout;
  _numberValidate: NumberValidate;
  _regionSettings: RegionSettings;
  _callingSettings: CallingSettings;
  _rolesAndPermissions: RolesAndPermissions;
  _webphone?: Webphone;
  _availabilityMonitor?: AvailabilityMonitor;

  _internationalCheck: boolean;
  _permissionCheck: boolean;

  _callSettingMode: string = null;

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
    rolesAndPermissions,
    availabilityMonitor,
    callOptions = {},
  }: DepOptions) {
    super({
      modules: {
        alert,
        brand,
        storage,
        callingSettings,
        softphone,
        ringout,
        webphone,
        numberValidate,
        regionSettings,
        rolesAndPermissions,
        availabilityMonitor,
      },
      enableCache: true,
      storageKey: 'callData',
    });
    this._brand = this._modules.brand;
    this._alert = this._modules.alert;
    this._storage = this._modules.storage;
    this._callingSettings = this._modules.callingSettings;
    this._ringout = this._modules.ringout;
    this._softphone = this._modules.softphone;
    this._webphone = this._modules.webphone;
    this._numberValidate = this._modules.numberValidate;
    this._regionSettings = this._modules.regionSettings;
    this._rolesAndPermissions = this._modules.rolesAndPermissions;
    this._availabilityMonitor = availabilityMonitor;

    this._internationalCheck = callOptions.internationalCheck ?? true;
    this._permissionCheck = callOptions.permissionCheck ?? true;
  }

  @state
  callStatus = callStatus.idle;

  @state
  toNumberEntities: ToNumberMatched[] = [];

  @storage
  @state
  lastPhoneNumber: string = null;

  @storage
  @state
  lastRecipient: Recipient = null;

  @action
  toNumberMatched(data: ToNumberMatched) {
    this.toNumberEntities.push(data);
  }

  @action
  cleanToNumberEntities() {
    this.toNumberEntities = [];
  }

  @action
  connect({
    isConference,
    phoneNumber = null,
    recipient = null,
  }: {
    isConference: boolean;
    phoneNumber: string;
    recipient: Recipient;
  }) {
    this.callStatus = callStatus.connecting;
    if (!isConference) {
      this.lastPhoneNumber = phoneNumber;
      this.lastRecipient = recipient;
    }
  }

  @action
  connectSuccess() {
    this.callStatus = callStatus.idle;
  }

  @action
  connectError() {
    this.callStatus = callStatus.idle;
  }

  async onStateChange() {
    if (this.ready) {
      await this._processCall();
    }
  }

  onInit() {
    this._initCallModule();
  }

  onReset() {
    this._resetCallModule();
    this.cleanToNumberEntities();
  }

  async _initCallModule() {
    this._callSettingMode = this._callingSettings.callingMode;
    if (this._callSettingMode === callingModes.webphone && this._webphone) {
      await this._webphone.connect();
    }
  }

  _resetCallModule() {
    this._callSettingMode = this._callingSettings.callingMode;
    if (this._callSettingMode === callingModes.webphone && this._webphone) {
      this._webphone.disconnect();
    }
  }

  async _processCall() {
    const oldCallSettingMode = this._callSettingMode;
    if (
      this._callingSettings.callingMode !== oldCallSettingMode &&
      this._webphone
    ) {
      this._callSettingMode = this._callingSettings.callingMode;
      if (oldCallSettingMode === callingModes.webphone) {
        this._webphone.disconnect();
      } else if (this._callSettingMode === callingModes.webphone) {
        await this._webphone.connect();
      }
    }
  }

  // save the click to dial entity, only when call took place
  onToNumberMatch({ entityId, startTime }: ToNumberMatched) {
    if (this.isIdle) {
      this.toNumberMatched({ entityId, startTime });
    }
  }

  @proxify
  async call({
    phoneNumber: input,
    recipient,
    fromNumber,
    isConference = false,
  }: {
    phoneNumber: string;
    recipient: Recipient;
    fromNumber: string;
    isConference?: boolean;
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
        this.connect({
          isConference,
          phoneNumber,
          recipient,
        });
        // TODO: callSettingMode: this._callSettingMode, // for Track
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
            this.connectSuccess();
            // TODO: callSettingMode: this._callSettingMode, // for Track
          } else {
            this.connectError();
          }
        } catch (error) {
          if (!error.message && error.type && (callErrors as any)[error.type]) {
            // validate format error
            this._alert.warning({
              message: (callErrors as any)[error.type],
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
              !this._availabilityMonitor.checkIfHAError(error)
            ) {
              this._alert.danger({
                message: callErrors.internalError,
                payload: error,
              });
            }
          }
          this.connectError();
          throw error;
        }
      }
    }
    return session;
  }

  @proxify
  _getNumbers({
    toNumber,
    fromNumber,
    isConference,
  }: {
    toNumber: string;
    fromNumber: string;
    isConference: boolean;
  }) {
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
      const validatedResult = validateNumbers(
        numbers,
        this._regionSettings,
        this._brand.id,
      );
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
  async _getValidatedNumbers({
    toNumber,
    fromNumber,
    isConference,
  }: {
    toNumber: string;
    fromNumber: string;
    isConference: boolean;
  }) {
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
      // TODO: fix `validatedResult` type in `numberValidate` module.
      parsedToNumber = (validatedResult as any).numbers[toNumberIndex];
      parsedFromNumber = (validatedResult as any).numbers[fromNumberIndex];
    }
    if (this._internationalCheck) {
      if (
        parsedToNumber &&
        parsedToNumber.international &&
        // TODO: fix `rolesAndPermissions` module type
        !(this._rolesAndPermissions.permissions as any).InternationalCalls
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
  }: {
    toNumber: string;
    fromNumber: string;
    callingMode?: string;
    extendedControls?: string[];
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
          // TODO: fix `webphone` module type
          session = (await this._webphone.makeCall({
            fromNumber,
            toNumber,
            homeCountryId,
            extendedControls,
          })) as any;
        }
        break;
      default:
        break;
    }
    return session;
  }

  get isIdle() {
    return this.callStatus === callStatus.idle;
  }
}
