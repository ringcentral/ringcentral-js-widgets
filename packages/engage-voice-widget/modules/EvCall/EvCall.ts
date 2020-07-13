import {
  action,
  createSelector,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';
import callErrors from 'ringcentral-integration/modules/Call/callErrors';

import { messageTypes } from '../../enums';
import {
  dialoutStatuses,
  DialoutStatusesType,
} from '../../enums/dialoutStatus';
import { checkCountryCode } from '../../lib/checkCountryCode';
import { EvOffhookInitResponse } from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { parseNumber } from '../../lib/parseNumber';
import { Call, DepsModules, State } from './EvCall.interface';

const DEFAULT_OUTBOUND_SETTING = {
  dialoutCallerId: '-1',
  dialoutQueueId: '-1',
  dialoutCountryId: 'USA',
  dialoutRingTime: 30,
};

type EvCallState = RcModuleState<EvCall, State>;

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
    'EvSessionConfig',
    'EvIntegratedSoftphone',
    { dep: 'TabManager', optional: true },
    { dep: 'EvCallOptions', optional: true },
  ],
})
class EvCall extends RcModuleV2<DepsModules, EvCallState> implements Call {
  /** this id is get from route, set from EvActivityCallUI */
  activityCallId: string;

  ringTimeLimit = {
    min: 20,
    max: 120,
  };

  constructor({
    alert,
    evAuth,
    storage,
    evClient,
    presence,
    evSettings,
    tabManager,
    evCallMonitor,
    evSubscription,
    evSessionConfig,
    evIntegratedSoftphone,
    enableCache = true,
  }) {
    super({
      modules: {
        alert,
        evAuth,
        storage,
        evClient,
        presence,
        evSettings,
        tabManager,
        evCallMonitor,
        evSubscription,
        evSessionConfig,
        evIntegratedSoftphone,
      },
      enableCache,
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
    return this._modules.presence.dialoutStatus;
  }

  private get _isTabActive() {
    return !this._modules.tabManager || this._modules.tabManager.active;
  }

  getCurrentCall = createSelector(
    () => this.activityCallId,
    () => this._modules.evCallMonitor.getCallsMapping(),
    (id, callsMapping) => {
      const call = callsMapping[id];
      return id && call ? call : null;
    },
  );

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
    const defaultRingtime = parseInt(
      this._modules.evAuth.outboundManualDefaultRingtime,
      10,
    );
    if (!Number.isNaN(defaultRingtime)) {
      this.formGroup.dialoutRingTime = defaultRingtime;
      this.dialoutRingTime = defaultRingtime;
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

  onInitOnce() {
    this._modules.evSubscription.subscribe(
      EvCallbackTypes.TCPA_SAFE_LEAD_STATE,
      (data) => {
        if (data.leadState === 'BUSY') {
          // TCPA_SAFE_LEAD_STATE -> BUSY
          // TODO alert message info about busy call.
          if (!this._modules.evSettings.isManualOffhook && this._isTabActive) {
            this._modules.evClient.offhookTerm();
          }
          this.setPhonedIdle();
        }
      },
    );

    this._modules.evSubscription.subscribe(EvCallbackTypes.OFFHOOK_TERM, () => {
      this.setPhonedIdle();
    });
  }

  onInit() {
    if (this._modules.evAuth.isFreshLogin) {
      this.resetOutBoundDialSetting();
    }
  }

  async dialout(phoneNumber: string) {
    if (this._modules.evSessionConfig.isIntegratedSoftphone) {
      const integratedSoftphone = this._modules.evIntegratedSoftphone;
      try {
        if (integratedSoftphone.isWebRTCTabAlive) {
          await integratedSoftphone.askAudioPermission(false);
        } else {
          await this._modules.evSessionConfig.configureAgent();
          await integratedSoftphone.onceRegistered();
        }
      } catch (error) {
        return;
      }
    }

    const toNumber = this._checkAndParseNumber(phoneNumber);

    if (toNumber) {
      await this._manualOutdial({
        toNumber,
        callerId: this.callerId,
        countryId: this.countryId,
        queueId: this.queueId,
        ringTime: this.ringTime,
      });

      this.setDialoutStatus(dialoutStatuses.callConnected);
    }
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

  setDialoutStatus(status: DialoutStatusesType) {
    this._modules.presence.setDialoutStatus(status);
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
      this.setPhonedIdle();

      switch (error.type) {
        case messageTypes.NO_SUPPORT_COUNTRY:
          this._modules.alert.danger({
            message: messageTypes.NO_SUPPORT_COUNTRY,
            ttl: 0,
          });
          return null;
        default:
          this._modules.alert.danger({
            message: callErrors.noToNumber,
          });
          return null;
      }
    }
  }

  private async _manualOutdial({
    callerId = '',
    toNumber,
    ringTime = DEFAULT_OUTBOUND_SETTING.dialoutRingTime,
    queueId = '',
    countryId = 'USA',
  }) {
    let offhookInitResult: EvOffhookInitResponse;
    if (this.dialoutStatus !== dialoutStatuses.dialing) {
      this.setPhonedDialing();
    }

    try {
      if (!this._modules.evSettings.isOffhook) {
        // bind init hook first, and then call offhookInit
        const getOffhookInitResult = this._getOffhookInitResult();
        this._modules.evClient.offhookInit();

        offhookInitResult = await getOffhookInitResult;
      }

      if (
        this._modules.evSettings.isOffhook ||
        (offhookInitResult && offhookInitResult.status === 'OK')
      ) {
        await this._modules.evClient.manualOutdial({
          callerId,
          countryId,
          destination: toNumber,
          queueId,
          ringTime,
        });
      } else {
        throw new Error(`'offhookInit' exception error`);
      }
    } catch (e) {
      if (!this._modules.evSettings.isManualOffhook) {
        this._modules.evClient.offhookTerm();
      }

      this.setPhonedIdle();
      throw e;
    }
  }

  private _getOffhookInitResult() {
    return new Promise<EvOffhookInitResponse>((resolve, reject) => {
      this._modules.presence.evPresenceEvents.once(
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
    return this.getCurrentCall()?.callType === 'INBOUND';
  }
}

export { EvCall };
