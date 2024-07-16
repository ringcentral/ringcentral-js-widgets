import { Module } from '@ringcentral-integration/commons/lib/di';
import { callErrors } from '@ringcentral-integration/commons/modules/Call';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';

import { messageTypes } from '../../enums';
import type { DialoutStatusesType } from '../../enums/dialoutStatus';
import { dialoutStatuses } from '../../enums/dialoutStatus';
import type {
  EvClientManualOutdialParams,
  EvOffhookInitResponse,
} from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { checkCountryCode } from '../../lib/checkCountryCode';
import { parseNumber } from '../../lib/parseNumber';
import { trackEvents } from '../../lib/trackEvents';

import type { Call, Deps, State } from './EvCall.interface';

const DEFAULT_OUTBOUND_SETTING = {
  dialoutCallerId: '-1',
  dialoutQueueId: '-1',
  dialoutCountryId: 'USA',
  dialoutRingTime: 30,
};

@Module({
  name: 'EvCall',
  deps: [
    'Alert',
    'EvAuth',
    'Storage',
    'EvClient',
    'Presence',
    'EvSettings',
    'EvCallMonitor',
    'EvSubscription',
    'EvAgentSession',
    'EvIntegratedSoftphone',
    { dep: 'TabManager', optional: true },
    { dep: 'EvCallOptions', optional: true },
    { dep: 'EvWorkingState', optional: true },
  ],
})
class EvCall extends RcModuleV2<Deps> implements Call {
  /** this id is get from route, set from EvActivityCallUI */
  activityCallId: string;

  ringTimeLimit = {
    min: 20,
    max: 120,
  };

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'EvCall',
    });
  }

  @storage
  @state
  dialoutCallerId = DEFAULT_OUTBOUND_SETTING.dialoutCallerId;

  @storage
  @state
  dialoutQueueId = DEFAULT_OUTBOUND_SETTING.dialoutQueueId;

  @storage
  @state
  dialoutCountryId = DEFAULT_OUTBOUND_SETTING.dialoutCountryId;

  @storage
  @state
  dialoutRingTime: number = DEFAULT_OUTBOUND_SETTING.dialoutRingTime;

  @storage
  @state
  formGroup: State['formGroup'] = DEFAULT_OUTBOUND_SETTING;

  get ringTime() {
    return this.dialoutRingTime;
  }

  get queueId() {
    return this.dialoutQueueId === '-1' ? null : this.dialoutQueueId;
  }

  get callerId() {
    return this.dialoutCallerId === '-1' ? null : this.dialoutCallerId;
  }

  get countryId() {
    return this.dialoutCountryId;
  }

  get dialoutStatus() {
    return this._deps.presence.dialoutStatus;
  }

  get isDialing() {
    return this._deps.presence.dialoutStatus === 'dialing';
  }

  private get _isTabActive() {
    return !this._deps.tabManager || this._deps.tabManager.active;
  }

  @computed((that: EvCall) => [
    that.activityCallId,
    that._deps.evCallMonitor.callsMapping,
  ])
  get currentCall() {
    const call = this._deps.evCallMonitor.callsMapping[this.activityCallId];
    return this.activityCallId && call ? call : null;
  }

  @action
  setFormGroup(data: Partial<State['formGroup']>) {
    this.formGroup = { ...this.formGroup, ...data };
  }

  @action
  saveForm() {
    this.dialoutCallerId = this.formGroup.dialoutCallerId;
    this.dialoutQueueId = this.formGroup.dialoutQueueId;
    this.dialoutCountryId = this.formGroup.dialoutCountryId;
    this.dialoutRingTime = this.formGroup.dialoutRingTime;
  }

  @action
  resetOutBoundDialSetting() {
    this.dialoutCallerId = DEFAULT_OUTBOUND_SETTING.dialoutCallerId;
    this.dialoutQueueId = DEFAULT_OUTBOUND_SETTING.dialoutQueueId;
    this.dialoutCountryId = DEFAULT_OUTBOUND_SETTING.dialoutCountryId;
    this.dialoutRingTime = DEFAULT_OUTBOUND_SETTING.dialoutRingTime;
    const defaultRingTime = parseInt(
      this._deps.evAuth.outboundManualDefaultRingtime,
      10,
    );
    if (!Number.isNaN(defaultRingTime)) {
      this.formGroup.dialoutRingTime = defaultRingTime;
      this.dialoutRingTime = defaultRingTime;
    }
  }

  resetForm() {
    this.setFormGroup({
      dialoutCallerId: this.dialoutCallerId,
      dialoutQueueId: this.dialoutQueueId,
      dialoutCountryId: this.dialoutCountryId,
      dialoutRingTime: this.dialoutRingTime,
    });
  }

  @computed((that: EvCall) => [that._deps.evAuth.isEvLogged, that.ready])
  get isOnLoginSuccess() {
    return this.ready && this._deps.evAuth.isEvLogged;
  }

  override onInitOnce() {
    watch(
      this,
      () => this.isOnLoginSuccess,
      (isOnLoginSuccess) => {
        if (isOnLoginSuccess) {
          this.resetForm();
        }
      },
    );

    this._deps.evCallMonitor.onCallEnded(() => {
      this.setDialoutStatus(dialoutStatuses.idle);
    });

    this._deps.evSubscription.subscribe(
      EvCallbackTypes.TCPA_SAFE_LEAD_STATE,
      (data) => {
        if (['INTERCEPT', 'BUSY', 'NOANSWER'].includes(data.leadState)) {
          // TCPA_SAFE_LEAD_STATE -> BUSY
          // TODO: alert message info about busy call.
          if (!this._deps.evSettings.isManualOffhook && this._isTabActive) {
            this._deps.evClient.offhookTerm();
          }
          this.setPhonedIdle();
          if (data.leadState === 'INTERCEPT') {
            this._deps.alert.info({
              message: messageTypes.INTERCEPT,
            });
          }
        }
      },
    );

    this._deps.evSubscription.subscribe(EvCallbackTypes.OFFHOOK_TERM, () => {
      this.setPhonedIdle();
    });
  }

  override onInit() {
    if (this._deps.evAuth.isFreshLogin) {
      this.resetOutBoundDialSetting();
    }
  }

  @track((that: EvCall) => [
    trackEvents.outbound,
    { value: that._deps.evAgentSession.loginType },
  ])
  async dialout(phoneNumber: string) {
    this._deps.presence.setCurrentCallUii('');
    if (this._deps.evAgentSession.isIntegratedSoftphone) {
      const integratedSoftphone = this._deps.evIntegratedSoftphone;
      try {
        if (integratedSoftphone.sipRegisterSuccess) {
          await integratedSoftphone.askAudioPermission(false);
        } else {
          await this._deps.evAgentSession.configureAgent();
          await integratedSoftphone.onceRegistered();
        }
      } catch (error) {
        return;
      }
    }

    try {
      const destination = this._checkAndParseNumber(phoneNumber);
      await this._manualOutdial({
        destination,
        callerId: this.callerId,
        countryId: this.countryId,
        queueId: this.queueId,
        ringTime: this.ringTime,
      });
    } catch (error) {
      this.setPhonedIdle();
    }
  }

  outdialCancel() {
    this._deps.evClient.manualOutdialCancel(this._deps.presence.currentCallUii);
  }

  checkDialoutRingTime() {
    const dialoutRingTime = Math.min(
      Math.max(this.formGroup.dialoutRingTime, this.ringTimeLimit.min),
      this.ringTimeLimit.max,
    );
    if (dialoutRingTime !== this.formGroup.dialoutRingTime) {
      this.setFormGroup({ dialoutRingTime });
    }
  }

  checkIsAbleToCall() {
    if (
      this.dialoutStatus !== dialoutStatuses.idle ||
      this._deps.evCallMonitor.isOnCall ||
      this._deps.evWorkingState.isPendingDisposition
    ) {
      console.log('Unavailable to call, have a call or is PendingDisposition.');
      if (!this._deps.evCallMonitor.isOnCall) {
        this.setPhonedIdle();
      }
      this._deps.alert.danger({
        message: messageTypes.FAILED_TO_CALL,
        ttl: 0,
      });
      return false;
    }
    return true;
  }

  setDialoutStatus(status: DialoutStatusesType) {
    this._deps.presence.setDialoutStatus(status);
  }

  setPhonedIdle() {
    this.setDialoutStatus(dialoutStatuses.idle);
  }

  setPhonedDialing() {
    this.setDialoutStatus(dialoutStatuses.dialing);
  }

  private _checkAndParseNumber(phoneNumber: string) {
    try {
      checkCountryCode(phoneNumber);

      return parseNumber(phoneNumber);
    } catch (error) {
      switch (error.type) {
        case messageTypes.NO_SUPPORT_COUNTRY:
          this._deps.alert.danger({
            message: messageTypes.NO_SUPPORT_COUNTRY,
            ttl: 0,
          });
          break;
        case callErrors.emergencyNumber:
          this._deps.alert.danger({
            message: callErrors.emergencyNumber,
          });
          break;
        default:
          this._deps.alert.danger({
            message: callErrors.noToNumber,
          });
          break;
      }

      throw error;
    }
  }

  private async _manualOutdial({
    callerId = '',
    destination,
    ringTime = DEFAULT_OUTBOUND_SETTING.dialoutRingTime,
    queueId = '',
    countryId = 'USA',
  }: EvClientManualOutdialParams) {
    let offhookInitResult: EvOffhookInitResponse;
    if (this.dialoutStatus !== dialoutStatuses.dialing) {
      this.setPhonedDialing();
    }

    try {
      if (!this._deps.evSettings.isOffhook) {
        // bind init hook first, and then call offhookInit
        const getOffhookInitResult = this._getOffhookInitResult();
        this._deps.evClient.offhookInit();

        offhookInitResult = await getOffhookInitResult;
      }

      if (
        this._deps.evSettings.isOffhook ||
        (offhookInitResult && offhookInitResult.status === 'OK')
      ) {
        console.log('manualOutdial~~');
        await this._deps.evClient.manualOutdial({
          callerId,
          countryId,
          destination,
          queueId,
          ringTime,
        });
      } else {
        throw new Error(`'offhookInit' exception error`);
      }
    } catch (e) {
      if (!this._deps.evSettings.isManualOffhook) {
        this._deps.evClient.offhookTerm();
      }

      throw e;
    }
  }

  private _getOffhookInitResult() {
    return new Promise<EvOffhookInitResponse>((resolve, reject) => {
      this._deps.presence.evPresenceEvents.once(
        EvCallbackTypes.OFFHOOK_INIT,
        (data: EvOffhookInitResponse) => {
          if (data.status === 'OK') {
            resolve(data);
          } else {
            reject(data);
          }
        },
      );
    });
  }

  get isInbound() {
    return this.currentCall?.callType === 'INBOUND';
  }
}

export { EvCall };
