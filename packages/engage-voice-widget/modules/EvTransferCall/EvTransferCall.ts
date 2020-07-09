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

import {
  DirectTransferNotificationTypes,
  directTransferNotificationTypes,
  directTransferStatues,
  directTransferTypes,
  EvTransferType,
  messageTypes,
  transferErrors,
  transferEvents,
  TransferStatus,
  transferStatuses,
  transferSuccesses,
  transferTypes,
} from '../../enums';
import { Handler } from '../../interfaces/Common.interface';
import { EvTransferViewPhoneBookItem } from '../../interfaces/EvTransferCallUI.interface';
import { AsyncEventEmitter } from '../../lib/asyncEventEmitter';
import { checkCountryCode } from '../../lib/checkCountryCode';
import {
  EvDirectAgentListItem,
  EvReceivedTransferCall,
} from '../../lib/EvClient';
import { EvDirectAgentTransferCall } from '../../lib/EvClient/enums';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { EvTypeError } from '../../lib/EvTypeError';
import { parseNumber } from '../../lib/parseNumber';
import {
  DepsModules,
  EvTransferFailHandler,
  InternalTransferCallbacks,
  State,
  TransferCall,
} from './EvTransferCall.interface';
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
    'EvAuth',
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
    evAuth,
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
        evAuth,
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
    () => this._modules.evAuth.getAvailableCountries(),
    (currentCall, transferCountryOptions) => {
      return (
        currentCall?.transferPhoneBook?.reduce<EvTransferViewPhoneBookItem[]>(
          (prev, bookItem) => {
            const { countryId, destination, name } = bookItem;
            const country = transferCountryOptions.find(
              (country) => country.countryId === countryId,
            );

            if (typeof country === 'undefined' || country === null) {
              return prev;
            }

            let parsedDestination = '';

            try {
              parsedDestination = format({
                phoneNumber: destination,
                countryCode: alpha3ToAlpha2(countryId),
                type: formatTypes.e164,
              });
            } catch (e) {
              //
            }

            const countryName =
              country.countryId !== 'USA'
                ? country.countryName || country.countryId
                : '';
            const phoneBookName = `${name} ${countryName}`;

            prev.push({
              ...bookItem,
              phoneBookName,
              parsedDestination,
            });

            return prev;
          },
          [],
        ) || []
      );
    },
  );

  @action
  setReceivedCall(data) {
    this.receivedCall = data;
  }

  @action
  setCancelableTransfer(cancelable) {
    this.isTransferCancelable = cancelable;
  }

  @action
  resetTransferStatus() {
    this.receivedCall = null;
    this.transferType = transferTypes.phoneBook;
    this.transferAgentId = null;
    this.transferAgentList = [];
    this.transferPhoneBookSelectedIndex = null;
    this.transferRecipientNumber = '';
    this.transferRecipientCountryId = 'USA';
    this.stayOnCall = true;
    this.isTransferCancelable = false;
    this._sendVoiceMailModalId = null;
    this._incomingTransferCallModalId = null;
    this._transferDest = null;
  }

  @action
  changeStayOnCall(value: boolean) {
    this.stayOnCall = !value;
  }

  @action
  changeRecipientCountryId(countryId) {
    this.transferRecipientCountryId = countryId;
  }

  @action
  changeTransferType(type) {
    this.transferType = type;
  }

  @action
  changeAgentList(data) {
    const currentAgent = data.find(
      ({ agentId }) => agentId === this.transferAgentId,
    );
    if (!currentAgent) {
      this.transferAgentId = null;
    }
    this.transferAgentList = data;
  }

  @action
  changeRecipientNumber(phoneNumber) {
    this.transferRecipientNumber = phoneNumber;
  }

  @action
  changeTransferPhoneBookSelected(index) {
    this.transferPhoneBookSelectedIndex = index;
  }

  @action
  changeTransferAgentId(agentId) {
    this.transferAgentId = agentId;
  }

  @action
  setTransferStatus(transferStatus) {
    this.transferStatus = transferStatus;
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
    if (!this._modules.evSessionConfig.isConfigTab) {
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

    const needCloseNotificationTypes: DirectTransferNotificationTypes[] = [
      directTransferNotificationTypes.CANCELLED,
      directTransferNotificationTypes.VOICEMAIL,
      directTransferNotificationTypes.MISSED,
    ];

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

        if (needCloseNotificationTypes.includes(data.status)) {
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

    this.onTransferError((data) => {
      this.closeLoadingNotification();

      // if that is cancel transfer from user do nothing.
      if (data.type === directTransferTypes.CANCEL) {
        return;
      }

      if (this.isInternalTransfer) {
        return this._showSendVoiceMailModal(data);
      }

      this._modules.alert.danger({ message: transferErrors.TRANSFER_ERROR });
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

  onTransferError(handler: EvTransferFailHandler) {
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

  getAllowTransferCall = createSelector(
    () => this._modules.evCall.getCurrentCall(),
    (currentCall) => {
      return currentCall?.allowTransfer && !currentCall.endedCall;
    },
  );

  async warmTransferCall({ dialDest, countryId }) {
    if (countryId !== 'USA' && countryId !== 'CAN') {
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
      await this.evClient.warmTransferCall({ dialDest });
    }
  }

  async coldTransferCall({ dialDest, countryId }) {
    if (countryId !== 'USA' && countryId !== 'CAN') {
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

  private _showSendVoiceMailModal(data: EvDirectAgentTransferCall) {
    const { currentLocale } = this._modules.locale;

    const content = this.getErrorContent(data);

    this._sendVoiceMailModalId = this._modules.modal.confirm({
      title: i18n.getString('transferModalTitle', currentLocale),
      okText: i18n.getString('sendVoicemail', currentLocale),
      content: i18n.getString(content, currentLocale),
      cancelText: i18n.getString('selectOtherAgents', currentLocale),
      onOK: () => {
        this.sendVoicemailToAgent();
      },
    });
  }

  private getErrorContent(data: EvDirectAgentTransferCall) {
    if (data.status === 'FAILED') {
      // ? that is from ev backend message.
      if (data.message.includes('Routing')) {
        return 'transferFailedContent';
      }
      return 'transferTimeOutContent';
    }

    if (data.status === 'REJECTED') {
      return 'transferRejectedContent';
    }

    if (data.type === 'CANCEL') {
      return 'transferCancelContent';
    }

    return 'transferFailedContent';
  }

  private _showIncomingTransferCallModal() {
    const { currentLocale } = this._modules.locale;

    this._incomingTransferCallModalId = this._modules.modal.confirm({
      title: i18n.getString('incomingTransferTitle', currentLocale),
      content: i18n.getString('incomingTransferContent', currentLocale),
      okText: i18n.getString('acceptIncomingTransfer', currentLocale),
      cancelText: i18n.getString('ignoreIncomingTransfer', currentLocale),
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
