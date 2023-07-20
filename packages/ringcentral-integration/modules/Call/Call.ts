import {
  action,
  RcModuleV2,
  state,
  storage,
  track,
} from '@ringcentral-integration/core';
import extractControls from '@ringcentral-integration/phone-number/lib/extractControls';

import { Module } from '../../lib/di';
import { isBlank } from '../../lib/isBlank';
import { proxify } from '../../lib/proxy/proxify';
import { validateNumbers } from '../../lib/validateNumbers';
import { trackEvents } from '../../enums/trackEvents';
import { callingModes } from '../CallingSettings';
import { ringoutErrors } from '../Ringout';
import type { Deps, Recipient, ToNumberMatched } from './Call.interface';
import { callErrors } from './callErrors';
import { callStatus } from './callStatus';

export const TO_NUMBER = 'toNumber';
export const FROM_NUMBER = 'fromNumber';
export const ANONYMOUS = 'anonymous';

export type MakeCallParams<K = Recipient> = {
  phoneNumber: string;
  recipient: K;
  fromNumber: string;
  isConference?: boolean;
  isValidNumber?: boolean;
  clickDialerToCall?: boolean;
  contactResourceType?: string;
};

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
    'RegionSettings',
    'CallingSettings',
    'ExtensionFeatures',
    'NumberValidate',
    'AppFeatures',
    { dep: 'Webphone', optional: true },
    { dep: 'AvailabilityMonitor', optional: true },
    { dep: 'CallOptions', optional: true },
    { dep: 'ActiveCallControl', optional: true },
  ],
})
export class Call<
  T extends Deps = Deps,
  K extends Recipient = Recipient,
> extends RcModuleV2<T> {
  _internationalCheck: boolean;
  // @ts-expect-error
  _callSettingMode: string = null;
  _useCallControlToMakeCall: boolean;

  constructor(deps: T) {
    super({
      deps,
      enableCache: true,
      storageKey: 'callData',
    });
    this._internationalCheck =
      this._deps.callOptions?.internationalCheck ?? true;
    this._useCallControlToMakeCall =
      this._deps.callOptions?.useCallControlToMakeCall ?? false;
  }

  @state
  callStatus = callStatus.idle;

  @state
  toNumberEntities: ToNumberMatched[] = [];

  get lastPhoneNumber() {
    return this.data.lastPhoneNumber;
  }

  get lastRecipient() {
    return this.data.lastRecipient;
  }

  get lastValidatedToNumber() {
    return this.data.lastValidatedToNumber;
  }

  @storage
  @state
  data: {
    lastPhoneNumber: string | null;
    lastRecipient: K | null;
    lastValidatedToNumber: string | null;
  } = {
    lastPhoneNumber: null,
    lastRecipient: null,
    lastValidatedToNumber: null,
  };

  @action
  toNumberMatched(data: ToNumberMatched) {
    this.toNumberEntities.push(data);
  }

  @action
  cleanToNumberEntities() {
    this.toNumberEntities = [];
  }

  @action
  setLastValidatedToNumber(phoneNumber: string) {
    this.data.lastValidatedToNumber = phoneNumber;
  }

  @track(
    (
      _: Call,
      {
        callSettingMode,
        isValidNumber,
        contactResourceType,
        clickDialerToCall,
      },
    ) => [
      callSettingMode === callingModes.webphone
        ? trackEvents.callAttemptWebRTC
        : trackEvents.callAttempt,
      {
        callSettingMode,
        contactResourceType,
        isValidNumber,
        clickDialerToCall,
      },
    ],
  )
  @action
  connect({
    isConference,
    // @ts-expect-error
    phoneNumber = null,
    // @ts-expect-error
    recipient = null,
    callSettingMode,
    isValidNumber,
    clickDialerToCall,
    contactResourceType,
  }: {
    isConference: boolean;
    phoneNumber: string;
    recipient: K;
    callSettingMode: string;
    isValidNumber: boolean;
    clickDialerToCall: boolean;
    contactResourceType: string;
  }) {
    this.callStatus = callStatus.connecting;
    if (!isConference) {
      this.data.lastPhoneNumber = phoneNumber;
      this.data.lastRecipient = recipient;
    }
  }

  @track((_: Call, callSettingMode) => [
    callSettingMode === callingModes.webphone
      ? trackEvents.outboundWebRTCCallConnected
      : trackEvents.outboundCallConnected,
    { callSettingMode },
  ])
  @action
  connectSuccess(callSettingMode: string) {
    this.callStatus = callStatus.idle;
  }

  @action
  connectError() {
    this.callStatus = callStatus.idle;
  }

  override async onStateChange() {
    if (this.ready) {
      await this._processCall();
    }
  }

  override onInit() {
    this._initCallModule();
  }

  override onReset() {
    this._resetCallModule();
    this.cleanToNumberEntities();
  }

  async _initCallModule() {
    // @ts-expect-error
    this._callSettingMode = this._deps.callingSettings.callingMode;
    if (
      this._callSettingMode === callingModes.webphone &&
      this._deps.webphone
    ) {
      await this._deps.webphone.connect();
    }
  }

  _resetCallModule() {
    // @ts-expect-error
    this._callSettingMode = this._deps.callingSettings.callingMode;
    if (
      this._callSettingMode === callingModes.webphone &&
      this._deps.webphone
    ) {
      this._deps.webphone.disconnect();
    }
  }

  async _processCall() {
    const oldCallSettingMode = this._callSettingMode;
    if (
      this._deps.callingSettings.callingMode !== oldCallSettingMode &&
      this._deps.webphone
    ) {
      // @ts-expect-error
      this._callSettingMode = this._deps.callingSettings.callingMode;
      if (oldCallSettingMode === callingModes.webphone) {
        this._deps.webphone.disconnect();
      } else if (this._callSettingMode === callingModes.webphone) {
        await this._deps.webphone.connect();
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
    clickDialerToCall,
    isValidNumber,
  }: MakeCallParams<K>) {
    let session = null;
    if (this.isIdle) {
      const { phoneNumber, extendedControls } = extractControls(input);
      const toNumber =
        (recipient && (recipient.phoneNumber || recipient.extension)) ||
        phoneNumber;
      if (isBlank(toNumber)) {
        this._deps.alert.warning({
          message: callErrors.noToNumber,
        });
      } else {
        this.connect({
          isConference,
          phoneNumber,
          recipient,
          // @ts-expect-error
          contactResourceType: recipient?.type || null,
          callSettingMode: this._callSettingMode,
          // @ts-expect-error
          isValidNumber,
          // @ts-expect-error
          clickDialerToCall,
        });
        try {
          let validatedNumbers;
          if (fromNumber === 'undefined') {
            // @ts-expect-error
            fromNumber = null;
          }
          if (this._deps.appFeatures?.isEDPEnabled) {
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
            validatedNumbers.toNumber &&
              this.setLastValidatedToNumber(validatedNumbers.toNumber);
            // @ts-expect-error
            session = await this._makeCall({
              ...validatedNumbers,
              extendedControls,
            });
            this.connectSuccess(this._callSettingMode);
          } else {
            this.connectError();
          }
          // TODO: handle error type
        } catch (error: any) {
          const { feature } = (await error?.response?.clone().json()) || {};
          const statusCode = error?.response?.status;
          if (!error.message && error.type && (callErrors as any)[error.type]) {
            // validate format error
            this._deps.alert.warning({
              message: (callErrors as any)[error.type],
              payload: {
                phoneNumber: error.phoneNumber,
              },
            });
          } else if (error.message === ringoutErrors.firstLegConnectFailed) {
            this._deps.alert.warning({
              message: callErrors.connectFailed,
              payload: error,
            });
          } else if (error.message === 'Failed to fetch') {
            this._deps.alert.danger({
              message: callErrors.networkError,
              payload: error,
            });
          } else if (
            feature &&
            feature.includes('InternationalCalls') &&
            statusCode === 403
          ) {
            // ringout call may not have international permission, then first leg can't be create
            // directly, customer will not be able to hear the voice prompt, so show a warning
            this._deps.alert.danger({
              message: callErrors.noInternational,
            });
          } else if (error.message !== 'Refresh token has expired') {
            if (
              !this._deps.availabilityMonitor ||
              !this._deps.availabilityMonitor.checkIfHAError(error)
            ) {
              this._deps.alert.danger({
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

  _getNumbers({
    toNumber,
    fromNumber,
    isConference,
  }: {
    toNumber: string;
    fromNumber?: string | null;
    isConference?: boolean;
  }) {
    const isWebphone =
      this._deps.callingSettings.callingMode === callingModes.webphone;
    const theFromNumber =
      fromNumber ||
      (isWebphone
        ? this._deps.callingSettings.fromNumber
        : this._deps.callingSettings.myLocation);

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
        allowRegionSettings: !!this._deps.brand.brandConfig.allowRegionSettings,
        areaCode: this._deps.regionSettings.areaCode,
        countryCode: this._deps.regionSettings.countryCode,
        phoneNumbers: numbers,
      });
      const toNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === TO_NUMBER,
      );
      const fromNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === FROM_NUMBER,
      );

      if (Array.isArray(validatedResult)) {
        parsedToNumber = validatedResult[toNumberIndex];
        parsedFromNumber = validatedResult[fromNumberIndex];
      }
      // TODO: should that need handle validated fail state?
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
      this._deps.callingSettings.callingMode === callingModes.webphone;
    const theFromNumber =
      fromNumber ||
      (isWebphone
        ? this._deps.callingSettings.fromNumber
        : this._deps.callingSettings.myLocation);

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
      const validResult = await this._deps.numberValidate.validate(numbers);
      if (!validResult.result) {
        if (!validResult.result) {
          validResult.errors.forEach((error: any) => {
            // TODO: determine how to deal with multiple errors
            // this._deps.alert.warning({
            //   message: callErrors[error.type],
            //   payload: {
            //     phoneNumber: error.phoneNumber,
            //   },
            // });
            throw error;
          });
          return null;
        }
      }
      const parsedNumbers =
        (await this._deps.numberValidate.parseNumbers(numbers)) || [];
      const toNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === TO_NUMBER,
      );
      const fromNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === FROM_NUMBER,
      );
      parsedToNumber = parsedNumbers[toNumberIndex];
      parsedFromNumber = parsedNumbers[fromNumberIndex];
    }
    if (this._internationalCheck) {
      if (
        parsedToNumber &&
        parsedToNumber.isInternational &&
        !this._deps.extensionFeatures.features?.InternationalCalling?.available
      ) {
        const error = {
          phoneNumber: parsedToNumber.originalString,
          type: 'noInternational',
        };
        throw error;
      }
    }

    const parsedToNumberE164 = parsedToNumber?.parsedNumber;
    let parsedFromNumberE164 = parsedFromNumber?.parsedNumber;
    if (isWebphone && theFromNumber === ANONYMOUS) {
      parsedFromNumberE164 = ANONYMOUS;
    }
    return {
      toNumber: isConference
        ? parsedToNumberE164 || toNumber
        : parsedToNumberE164,
      fromNumber: parsedFromNumberE164,
    };
  }

  @proxify
  async _makeCall({
    toNumber,
    fromNumber,
    // @ts-expect-error
    callingMode = this._deps.callingSettings.callingMode,
    extendedControls = [],
  }: {
    toNumber: string;
    fromNumber: string;
    callingMode?: string;
    extendedControls?: string[];
  }) {
    const homeCountryId = this._deps.regionSettings.homeCountryId;
    let session;
    switch (callingMode) {
      case callingModes.softphone:
      case callingModes.jupiter:
        session = this._deps.softphone.makeCall(toNumber, callingMode);
        break;
      case callingModes.ringout:
        session = await this._deps.ringout.makeCall({
          fromNumber,
          toNumber: toNumber && toNumber.split('*')[0], // remove extension number in ringout mode
          prompt: this._deps.callingSettings.ringoutPrompt,
        });
        break;
      case callingModes.webphone: {
        if (this._deps.activeCallControl && this._useCallControlToMakeCall) {
          session = await this._deps.activeCallControl.makeCall({
            fromNumber,
            toNumber,
            homeCountryId,
            extendedControls,
          });
        } else if (this._deps.webphone) {
          // TODO: fix `webphone` module type
          session = (await this._deps.webphone.makeCall({
            fromNumber,
            toNumber,
            homeCountryId,
            extendedControls,
          })) as any;
        }
        break;
      }

      default:
        break;
    }
    return session;
  }

  get isIdle() {
    return this.callStatus === callStatus.idle;
  }
}
