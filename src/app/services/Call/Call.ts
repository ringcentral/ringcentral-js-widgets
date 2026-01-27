import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import type { Session } from '@ringcentral-integration/commons/interfaces/Webphone.interface';
import { isBlank } from '@ringcentral-integration/commons/lib/isBlank';
import { validateNumbers } from '@ringcentral-integration/commons/lib/validateNumbers';
import {
  AppFeatures,
  AvailabilityMonitor,
  ExtensionFeatures,
  RegionSettings,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import { NumberValidate } from '@ringcentral-integration/micro-contacts/src/app/services';
import {
  Brand,
  Toast,
} from '@ringcentral-integration/micro-core/src/app/services';
import {
  action,
  delegate,
  fromWatchValue,
  injectable,
  optional,
  PortManager,
  RcModule,
  state,
  storage,
  StoragePlugin,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import extractControls from '@ringcentral-integration/phone-number/lib/extractControls';
import { maskPhoneNumber } from '@ringcentral-integration/utils';
import { merge, tap } from 'rxjs';

import { ActiveCallControl } from '../ActiveCallControl';
import { callingModes, CallingSettings } from '../CallingSettings';
import { Ringout, ringoutErrors } from '../Ringout';
import { Softphone } from '../Softphone';
import { Webphone } from '../Webphone';

import type {
  CallOptions,
  ConnectOptions,
  MakeCallParams,
  Recipient,
  ToNumberMatched,
} from './Call.interface';
import { callStatus } from './callStatus';
import { t } from './i18n';

export const TO_NUMBER = 'toNumber';
export const FROM_NUMBER = 'fromNumber';
export const ANONYMOUS = 'anonymous';

@injectable({
  name: 'Call',
})
export class Call<K extends Recipient = Recipient> extends RcModule {
  constructor(
    protected _toast: Toast,
    protected _storage: StoragePlugin,
    protected _brand: Brand,
    protected _softphone: Softphone,
    protected _ringout: Ringout,
    protected _regionSettings: RegionSettings,
    protected _callingSettings: CallingSettings,
    protected _extensionFeatures: ExtensionFeatures,
    protected _numberValidate: NumberValidate,
    protected _appFeatures: AppFeatures,
    protected _portManager: PortManager,
    protected _activeCallControl: ActiveCallControl,
    @optional() protected _webphone?: Webphone,
    @optional()
    protected _availabilityMonitor?: AvailabilityMonitor,
    @optional('CallOptions') protected _callOptions?: CallOptions,
  ) {
    super();
    this._storage.enable(this);

    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.listenWebphone();
      });
    } else {
      this.listenWebphone();
    }
  }

  private listenWebphone() {
    const webphone = this._webphone;
    if (!webphone) return;

    merge(
      fromWatchValue(this, () => this._callingSettings.isWebphoneMode),
      this._portManager.onMainTabChange$,
      // when resetting(logout), we should disconnect the webphone
      this.resetting$,
    )
      .pipe(
        tap(async () => {
          try {
            if (this._callingSettings.isWebphoneMode) {
              await webphone.connect();
            } else {
              await webphone.disconnect();
            }
          } catch (error) {
            this.logger.error('webphone process error', error);
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
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
      }: ConnectOptions,
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
    phoneNumber = null,
    recipient = null,
  }: ConnectOptions<K>) {
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

  override onReset() {
    this.cleanToNumberEntities();
  }

  // save the click to dial entity, only when call took place
  onToNumberMatch({ entityId, startTime }: ToNumberMatched) {
    if (this.isIdle) {
      this.toNumberMatched({ entityId, startTime });
    }
  }

  @delegate('server')
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
        this._toast.warning({
          message: t('noToNumber'),
        });
      } else {
        this.connect({
          isConference,
          phoneNumber,
          recipient,
          contactResourceType: recipient?.type || null,
          callSettingMode: this._callingSettings.callingMode!,
          isValidNumber,
          clickDialerToCall,
        });
        try {
          let validatedNumbers;
          if (fromNumber === 'undefined') {
            fromNumber = null;
          }
          if (
            this._callingSettings.callingMode === callingModes.ringout &&
            this._callingSettings.myLocation === toNumber
          ) {
            this._toast.danger({
              message: t('fromAndToNumberIsSame'),
              ttl: 0,
            });
            this.connectError();
            return null;
          }
          if (this._appFeatures?.isEDPEnabled) {
            validatedNumbers = await this._getValidatedNumbers({
              toNumber,
              fromNumber: fromNumber!,
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

            session = await this._makeCall({
              ...validatedNumbers,
              extendedControls,
              toNumber: validatedNumbers.toNumber!,
              fromNumber: validatedNumbers.fromNumber!,
            });
            this.connectSuccess(this._callingSettings.callingMode!);
          } else {
            this.connectError();
          }
        } catch (error: any) {
          const { feature } = (await error?.response?.clone().json()) || {};
          const statusCode = error?.response?.status;
          const errorType = error?.type;

          if (
            errorType &&
            !error.message &&
            // when error is in i18n map or be a noAreaCode error
            (t(errorType) !== errorType || errorType === 'noAreaCode')
          ) {
            // validate format error
            if (errorType === 'noAreaCode') {
              this._numberValidate.openNoAreaCodeToast();
            } else {
              this._toast.warning({
                message: t(errorType, { brand: this._brand.name }),
                allowDuplicates: false,
              });
            }
          } else if (error.message === ringoutErrors.firstLegConnectFailed) {
            this._toast.warning({
              message: t('connectFailed'),
            });
          } else if (error.message === 'Failed to fetch') {
            this._toast.danger({
              message: t('networkError'),
            });
          } else if (
            feature &&
            feature.includes('InternationalCalls') &&
            statusCode === 403
          ) {
            // ringout call may not have international permission, then first leg can't be create
            // directly, customer will not be able to hear the voice prompt, so show a warning
            this._toast.danger({
              message: t('noInternational', {
                brand: this._brand.name,
              }),
            });
          } else if (error.message !== 'Refresh token has expired') {
            if (
              !this._availabilityMonitor ||
              !this._availabilityMonitor.checkIfHAError(error)
            ) {
              this._toast.danger({
                message: t('internalError'),
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
    const isWebphone = this._callingSettings.isWebphoneMode;
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
        allowRegionSettings: !!this._brand.brandConfig.allowRegionSettings,
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

  @delegate('server')
  async _getValidatedNumbers({
    toNumber,
    fromNumber,
    isConference,
  }: {
    toNumber: string;
    fromNumber: string;
    isConference: boolean;
  }) {
    const isWebphone = this._callingSettings.isWebphoneMode;
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
      const validResult = await this._numberValidate.validate(numbers);
      if (!validResult.result) {
        this._numberValidate.handleValidateToasts(validResult);
        if (validResult.errors.length > 0) {
          // TODO: determine how to deal with multiple errors

          throw validResult.errors[0];
        }
        return null;
      }

      // TODO: here should use the logic inside ActiveCallControl.getDefaultFromNumber instead, but due to complexity, we just use the same logic there, should refactor in the future
      const parsedNumbers =
        (await this._numberValidate.parseNumbers(numbers)) || [];

      if (process.env.THEME_SYSTEM === 'spring-ui' && !parsedNumbers.length) {
        return null;
      }
      const toNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === TO_NUMBER,
      );
      const fromNumberIndex = waitingValidateNumbers.findIndex(
        (x) => x.type === FROM_NUMBER,
      );
      parsedToNumber = parsedNumbers[toNumberIndex];
      parsedFromNumber = parsedNumbers[fromNumberIndex];
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

  @delegate('server')
  async _makeCall({
    toNumber,
    fromNumber,
    callingMode = this._callingSettings.callingMode!,
    extendedControls = [],
  }: {
    toNumber: string;
    fromNumber: string;
    callingMode?: string;
    extendedControls?: string[];
  }) {
    this.logger.log('make call', {
      toNumber: maskPhoneNumber(toNumber),
      fromNumber: maskPhoneNumber(fromNumber),
      callingMode,
      extendedControls,
    });
    const homeCountryId = this._regionSettings.homeCountryId;
    let session: Session | null | void | { id: string | undefined } = null;
    switch (callingMode) {
      case callingModes.softphone:
      case callingModes.jupiter:
        session = await this._softphone.makeCall(toNumber, callingMode);
        break;
      case callingModes.ringout:
        session = await this._ringout.makeCall({
          fromNumber,
          toNumber: toNumber && toNumber.split('*')[0], // remove extension number in ringout mode
          prompt: this._callingSettings.ringoutPrompt,
        });
        break;
      case callingModes.webphone: {
        session = await this._activeCallControl.makeCall({
          fromNumber,
          toNumber,
          homeCountryId,
          extendedControls,
        });

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
