import {
  action,
  createSelector,
  RcModuleState,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { format, formatTypes } from '@ringcentral-integration/phone-number';
import { alpha3ToAlpha2 } from 'i18n-iso-countries';
import { Module } from 'ringcentral-integration/lib/di';
import callErrors from 'ringcentral-integration/modules/Call/callErrors';

import { messageTypes } from '../../enums';
import { directTransferNotificationTypes } from '../../enums/directTransferNotificationTypes';
import { directTransferStatues } from '../../enums/directTransferStatues';
import { directTransferTypes } from '../../enums/directTransferTypes';
import { transferErrors } from '../../enums/transferErrors';
import { transferEvents } from '../../enums/transferEvents';
import { TransferStatus, transferStatuses } from '../../enums/transferStatuses';
import { transferSuccesses } from '../../enums/transferSuccesses';
import { EvTransferType, transferTypes } from '../../enums/transferTypes';
import { Handler } from '../../interfaces/Common.interface';
import { EvCallData } from '../../interfaces/EvData.interface';
import { AsyncEventEmitter } from '../../lib/asyncEventEmitter';
import { checkCountryCode } from '../../lib/checkCountryCode';
import {
  EvDirectAgentListItem,
  EvReceivedTransferCall,
} from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { EvTypeError } from '../../lib/EvTypeError';
import { parseNumber } from '../../lib/parseNumber';
import {
  DepsModules,
  InternalTransferCallbacks,
  State,
  TransferCall,
} from './EvTransferCall.inerface';
import i18n from './i18n';

type EvTransferCallState = RcModuleState<EvTransferCall, State>;

@Module({
  name: 'EvTransferCall',
  deps: [
    'EvClient',
    'EvCallMonitor',
    'EvCall',
    'EvSubscription',
    'EvWorkingState',
    'Storage',
    'Modal',
    'Locale',
    'Alert',
    'EvSessionConfig',
    { dep: 'EvTransferCallOptions', optional: true },
  ],
})
class EvTransferCall extends RcModuleV2<DepsModules, EvTransferCallState>
  implements TransferCall {
  protected _eventEmitter = new AsyncEventEmitter();
  protected _internalTransferCallbacks: InternalTransferCallbacks = {};

  // alertTemplate: ModalTemplate;
  cancelTemplate: React.ReactNode;

  private _sendVoiceMailModalId: string = null;
  private _incomingTransferCallModalId: string = null;
  private _transferNotificationId: string = null;
  private _transferDest: string = null;

  constructor({
    evClient,
    evCallMonitor,
    evCall,
    evSubscription,
    evWorkingState,
    storage,
    modal,
    locale,
    alert,
    evSessionConfig,
    enableCache = true,
  }) {
    super({
      modules: {
        evClient,
        evCallMonitor,
        evCall,
        evSubscription,
        evWorkingState,
        storage,
        modal,
        locale,
        alert,
        evSessionConfig,
      },
      enableCache,
      storageKey: 'EvTransferCall',
    });
  }

  @storage
  @state
  receivedCall: EvReceivedTransferCall = null;

  @storage
  @state
  isTransferCancelable = false;

  @storage
  @state
  transferStatus: TransferStatus = transferStatuses.idle;

  @storage
  @state
  transferType: EvTransferType = transferTypes.phoneBook;

  @storage
  @state
  transferAgentId = null;

  @storage
  @state
  transferAgentList: EvDirectAgentListItem[] = [];

  @storage
  @state
  transferPhoneBookSelectedIndex: number = null;

  @storage
  @state
  transferRecipientNumber = '';

  @storage
  @state
  transferRecipientCountryId = 'USA';

  @storage
  @state
  stayOnCall = true;

  get transferring() {
    return this.transferStatus === transferStatuses.loading;
  }

  get evClient() {
    return this._modules.evClient;
  }

  get allowManualInternationalTransfer() {
    return this._modules.evCall.getCurrentCall()
      ?.allowManualInternationalTransfer;
  }

  get allowInternalTransfer() {
    return (
      this._modules.evCall.getCurrentCall()?.allowDirectAgentTransfer !== '0'
    );
  }

  get isInternalTransfer() {
    return this.transferType === transferTypes.internal;
  }

  getTransferPhoneBook = createSelector(
    () => this._modules.evCall.getCurrentCall(),
    (currentCall) =>
      currentCall.transferPhoneBook?.map((item) => {
        let _parsedDestination: string;
        try {
          _parsedDestination = format({
            phoneNumber: item.destination,
            countryCode: alpha3ToAlpha2(item.countryId),
            type: formatTypes.e164,
          });
        } catch (e) {
          //
        }
        return {
          ...item,
          _parsedDestination,
        };
      }) || [],
  );

  @action
  setReceivedCall(data) {
    this.state.receivedCall = data;
  }

  @action
  setCancelableTransfer(cancelable) {
    this.state.isTransferCancelable = cancelable;
  }

  @action
  resetTransferStatus() {
    this.state.receivedCall = null;
    this.state.transferType = transferTypes.phoneBook;
    this.state.transferAgentId = null;
    this.state.transferAgentList = [];
    this.state.transferPhoneBookSelectedIndex = null;
    this.state.transferRecipientNumber = '';
    this.state.transferRecipientCountryId = 'USA';
    this.state.stayOnCall = true;
    this.state.isTransferCancelable = false;
    this._sendVoiceMailModalId = null;
    this._incomingTransferCallModalId = null;
    this._transferDest = null;
  }

  @action
  changeStayOnCall(value: boolean) {
    this.state.stayOnCall = !value;
  }

  @action
  changeRecipientCountryId(countryId) {
    this.state.transferRecipientCountryId = countryId;
  }

  @action
  changeTransferType(type) {
    this.state.transferType = type;
  }

  @action
  changeAgentList(data) {
    const currentAgent = data.find(
      ({ agentId }) => agentId === this.transferAgentId,
    );
    if (!currentAgent) {
      this.state.transferAgentId = null;
    }
    this.state.transferAgentList = data;
  }

  @action
  changeRecipientNumber(phoneNumber) {
    this.state.transferRecipientNumber = phoneNumber;
  }

  @action
  changeTransferPhoneBookSelected(index) {
    this.state.transferPhoneBookSelectedIndex = index;
  }

  @action
  changeTransferAgentId(agentId) {
    this.state.transferAgentId = agentId;
  }

  @action
  setTransferStatus(transferStatus) {
    this.state.transferStatus = transferStatus;
  }

  getTransferAgentAvailable = createSelector(
    () => this.transferAgentList,
    () => this.transferAgentId,
    (transferAgentList, transferAgentId) => {
      return transferAgentList.find((item) => item.agentId === transferAgentId)
        .available;
    },
  );

  onInit() {
    if (!this._modules.evSessionConfig.isConfigSuccessByLocal) {
      this.setTransferStatus(transferStatuses.idle);
    }
  }

  onInitOnce() {
    this._modules.evCallMonitor.addCallEndedHook(() => {
      this.closeModals();
    });

    this._modules.evSubscription.subscribe(
      EvCallbackTypes.DIRECT_AGENT_TRANSFER,
      (data) => {
        const internalTransferCallback = this._internalTransferCallbacks[
          data.type
        ];
        if (
          data.status === directTransferStatues.ACCEPTED &&
          data.type === directTransferTypes.WARM
        ) {
          if (!this.getTransferAgentAvailable()) {
            this.setCancelableTransfer(true);
            this.showNotificationLoadingCancel();
          }
          return;
        }
        if (
          [
            directTransferStatues.REJECTED,
            directTransferStatues.SUCCEEDED,
          ].includes(data.status) &&
          data.type === directTransferTypes.WARM
        ) {
          this.setCancelableTransfer(false);
          this.showNotificationLoadingSpinner();
        }
        if (internalTransferCallback) {
          return internalTransferCallback(data);
        }
      },
    );

    this._modules.evSubscription.subscribe(
      EvCallbackTypes.DIRECT_AGENT_TRANSFER_NOTIF,
      (data) => {
        if (data.status === directTransferNotificationTypes.PENDING) {
          const hasReceivedCall = !!this.receivedCall;
          this.setReceivedCall(data);
          if (!hasReceivedCall) {
            this._showIncomingTransferCallModal();
          }
        }

        if (data.status === directTransferNotificationTypes.CANCELLED) {
          this.closeModals();

          this.setReceivedCall(null);
        }
      },
    );

    this.onTransferStart(() => {
      this._transferNotificationId = this._modules.alert.info({
        message: transferEvents.START,
        loading: true,
        backdrop: true,
        ttl: 0,
      });
      if (!this.isInternalTransfer) {
        this.setCancelableTransfer(true);
        this.showNotificationLoadingCancel();
      }
    });

    this.onTransferSuccess(() => {
      this.closeLoadingNotification();

      this._modules.alert.success({
        message: transferSuccesses.TRANSFER_CONNECTED,
      });
    });

    this.onTransferError(({ message }) => {
      this.closeLoadingNotification();

      if (this.isInternalTransfer) {
        this._showSendVoiceMailModal();
      } else if (message !== 'Transfer CANCELED') {
        this._modules.alert.danger({ message: transferErrors.TRANSFER_ERROR });
      }
    });

    // End transfer message will come after success and error.
    this.onTransferEnd(() => {
      console.log('==onTransferEnd==');
    });
  }

  private showNotificationLoadingSpinner() {
    this._modules.alert.update(this._transferNotificationId, {
      message: transferEvents.START,
      loading: true,
    });
  }

  private showNotificationLoadingCancel() {
    this._modules.alert.update(this._transferNotificationId, {
      message: transferEvents.START,
      action: this.cancelTemplate,
    });
  }

  closeLoadingNotification() {
    if (this._transferNotificationId) {
      this._modules.alert.dismiss(this._transferNotificationId);
      this._transferNotificationId = null;
    }
  }

  onTransferStart(handler: Handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(transferEvents.START, handler);
    }
  }

  onTransferEnd(handler: Handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(transferEvents.END, handler);
    }
  }

  onTransferError(handler: Handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(transferEvents.ERROR, handler);
    }
  }

  onTransferSuccess(handler: Handler) {
    if (typeof handler === 'function') {
      this._eventEmitter.on(transferEvents.SUCCESS, handler);
    }
  }

  closeModals() {
    // close send voice modal.
    if (this._sendVoiceMailModalId) {
      this._modules.modal.close(this._sendVoiceMailModalId);
    }
    // close ignore/accept transfer modal.
    if (this._incomingTransferCallModalId) {
      this._modules.modal.close(this._incomingTransferCallModalId);
    }
  }

  async fetchAgentList() {
    let data;
    try {
      const result = await this.evClient.fetchDirectAgentList();
      if (result) {
        data = result.agents;
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (Array.isArray(data)) {
        this.changeAgentList(data);
      }
    }
  }

  rejectTransferCall() {
    if (!this.receivedCall) return;
    this._modules.evClient.rejectDirectAgentTransferCall(this.receivedCall.uii);
    this.setReceivedCall(null);
  }

  acceptTransferCall() {
    if (!this.receivedCall) return;
    this._modules.evWorkingState.setWorkingStateWorking();
    // TODO: need check why add timeout here?
    setTimeout(() => this.setReceivedCall(null), 6000);
  }

  sendVoicemailToAgent() {
    this.setTransferStatus(transferStatuses.loading);
    this._modules.evClient.sendVoicemailDirectAgentTransfer(
      this.transferAgentId,
    );
    this._internalTransferCallbacks.VOICEMAIL = (data) => {
      if (data.status === directTransferStatues.ACCEPTED) {
        this._modules.alert.success({
          message: transferSuccesses.SEND_VOICEMAIL_SUCCESS,
        });
      } else {
        this._modules.alert.danger({
          message: transferErrors.SEND_VOICEMAIL_ERROR,
        });
      }
    };
  }

  async cancelTransfer() {
    try {
      await this.cancelInternalTransfer();
    } catch (e) {
      console.error(e);
      throw new Error(`'cancelInternalTransfer' failed.`);
    }
    this.closeLoadingNotification();
  }

  async cancelInternalTransfer() {
    if (this.transferring) {
      if (this.isInternalTransfer) {
        this._modules.evClient.cancelDirectAgentTransfer(this.transferAgentId);
        await new Promise((resolve, reject) => {
          this._internalTransferCallbacks.CANCEL = (data) => {
            if (this.stayOnCall) {
              this._internalTransferCallbacks.WARM(data);
            } else {
              this._internalTransferCallbacks.COLD(data);
            }
            if (data.status === directTransferStatues.SUCCEEDED) {
              resolve(data);
            } else {
              reject(data);
            }
          };
        });
      } else if (this._transferDest) {
        this._modules.evClient.cancelWarmTransferCall(this._transferDest);
      } else {
        console.warn('Unexpected cancel transfer');
      }
    }
  }

  parseNumber() {
    switch (this.transferType) {
      case transferTypes.phoneBook:
        return this.parsePhoneBookNumber();
      case transferTypes.manualEntry:
        return this.parseManualEntryNumber();
      default:
        break;
    }
  }

  getNumber() {
    switch (this.transferType) {
      case transferTypes.phoneBook:
        return this.getTransferPhoneBook()[this.transferPhoneBookSelectedIndex]
          ?.destination;
      case transferTypes.manualEntry:
        return this.transferRecipientNumber;
      default:
        break;
    }
  }

  private parseManualEntryNumber() {
    if (!this.transferRecipientNumber) {
      throw new EvTypeError({
        type: transferErrors.RECIPIENT_NUMBER_ERROR,
        data: `Abnormal Transfer: this.transferRecipientNumber -> ${this.transferRecipientNumber}`,
      });
    }
    checkCountryCode(this.transferRecipientNumber);
    const toNumber = parseNumber(this.transferRecipientNumber);
    return { toNumber, countryId: this.transferRecipientCountryId };
  }

  private parsePhoneBookNumber() {
    if (this.transferPhoneBookSelectedIndex === null) {
      throw new EvTypeError({
        type: transferErrors.CONTACT_ID_ERROR,
        data: `Abnormal Transfer: this.transferPhoneBookSelected -> ${this.transferPhoneBookSelectedIndex}`,
      });
    }
    const transferPhoneBookSelected = this.getTransferPhoneBook()[
      this.transferPhoneBookSelectedIndex
    ];
    checkCountryCode(transferPhoneBookSelected.destination);
    const toNumber = parseNumber(transferPhoneBookSelected.destination);
    return { toNumber, countryId: transferPhoneBookSelected.countryId };
  }

  async transfer() {
    try {
      const { toNumber, countryId } = this.parseNumber() || {};
      await this._eventEmitter.asyncEmit(transferEvents.START);
      this.setTransferStatus(transferStatuses.loading);
      switch (this.transferType) {
        case transferTypes.internal:
          await this.internalTransferCall();
          break;
        case transferTypes.phoneBook:
        case transferTypes.manualEntry:
          await this.transferCall({
            dialDest: toNumber,
            countryId,
          });
          break;
        default:
          throw new EvTypeError({
            type: transferErrors.TYPE_ERROR,
            data: `Abnormal Transfer: this.transferType -> ${this.transferType}`,
          });
      }
      await this._eventEmitter.asyncEmit(transferEvents.SUCCESS);
    } catch (e) {
      switch (e.type) {
        case messageTypes.NO_SUPPORT_COUNTRY:
          return this._modules.alert.danger({
            message: messageTypes.NO_SUPPORT_COUNTRY,
            ttl: 0,
          });
        case messageTypes.INVALID_NUMBER:
          return this._modules.alert.danger({
            message: callErrors.noToNumber,
          });
        default:
          await this._eventEmitter.asyncEmit(transferEvents.ERROR, e);
          throw e;
      }
    } finally {
      this.setTransferStatus(transferStatuses.idle);
      await this._eventEmitter.asyncEmit(transferEvents.END);
    }
  }

  async internalTransferCall() {
    if (!this.transferAgentId) {
      throw new EvTypeError({
        type: transferErrors.AGENT_ID_ERROR,
        data: `Abnormal Transfer: this.transferAgentId -> ${this.transferAgentId}`,
      });
    }
    // it should update agent list before internal transfer call, in order to transfer with cancelable feature.
    try {
      await this.fetchAgentList();
    } catch (e) {
      console.warn(`fetch agent list error`);
      console.error(e);
    }
    if (this.stayOnCall) {
      this.evClient.warmDirectAgentTransfer(this.transferAgentId);
      await new Promise((resolve, reject) => {
        this._internalTransferCallbacks.WARM = (data) => {
          if (
            data.status === directTransferStatues.SUCCEEDED &&
            data.type === directTransferTypes.WARM
          ) {
            resolve(data);
          } else {
            reject(data);
          }
        };
      });
    } else {
      this.evClient.coldDirectAgentTransfer(this.transferAgentId);
      await new Promise((resolve, reject) => {
        this._internalTransferCallbacks.COLD = (data) => {
          if (data.status === directTransferStatues.ACCEPTED) {
            resolve(data);
          } else {
            reject(data);
          }
        };
      });
    }
  }

  async transferCall(transferArgs: { dialDest: string; countryId: string }) {
    if (this.stayOnCall) {
      await this.warmTransferCall(transferArgs);
    } else {
      await this.coldTransferCall(transferArgs);
    }
  }

  checkAllowTransfer(currentCall: EvCallData) {
    return currentCall.allowTransfer && !currentCall.endedCall;
  }

  async warmTransferCall({ dialDest, countryId }) {
    if (countryId !== 'USA') {
      if (this.allowManualInternationalTransfer) {
        this._transferDest = dialDest;
        await this.evClient.warmTransferIntlCall({
          dialDest,
          countryId,
        });
      } else {
        throw new Error(
          `Unexpected Error: ban transferring international call`,
        );
      }
    } else {
      this._transferDest = dialDest;
      // TODO: remove the temporary regression debugging log
      console.log('[warmTransferCall]');
      await this.evClient.warmTransferCall({ dialDest });
    }
  }

  async coldTransferCall({ dialDest, countryId }) {
    if (countryId !== 'USA') {
      if (this.allowManualInternationalTransfer) {
        await this.evClient.coldTransferIntlCall({
          dialDest,
          countryId,
        });
      } else {
        // TODO handle to ban transferring international call
      }
    } else {
      await this.evClient.coldTransferCall({ dialDest });
    }
  }

  setCancelTemplate(templates: React.ReactNode) {
    this.cancelTemplate = templates;
  }

  private _showSendVoiceMailModal() {
    this._sendVoiceMailModalId = this._modules.modal.confirm({
      title: i18n.getString(
        'transferModalTitle',
        this._modules.locale.currentLocale,
      ),
      okText: i18n.getString(
        'sendVoicemail',
        this._modules.locale.currentLocale,
      ),
      content: i18n.getString(
        'transferFailedContent',
        this._modules.locale.currentLocale,
      ),
      cancelText: i18n.getString(
        'selectOtherAgents',
        this._modules.locale.currentLocale,
      ),
      onOK: () => {
        this.sendVoicemailToAgent();
      },
    });
  }

  private _showIncomingTransferCallModal() {
    this._incomingTransferCallModalId = this._modules.modal.confirm({
      title: i18n.getString(
        'incomingTransferTitle',
        this._modules.locale.currentLocale,
      ),
      content: i18n.getString(
        'incomingTransferContent',
        this._modules.locale.currentLocale,
      ),
      okText: i18n.getString(
        'acceptIncomingTransfer',
        this._modules.locale.currentLocale,
      ),
      cancelText: i18n.getString(
        'ignoreIncomingTransfer',
        this._modules.locale.currentLocale,
      ),
      onOK: () => {
        this.acceptTransferCall();
      },
      onCancel: () => {
        this.rejectTransferCall();
      },
    });
  }
}

export { EvTransferCall };
