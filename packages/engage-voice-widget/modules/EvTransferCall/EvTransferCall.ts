import { alpha3ToAlpha2 } from 'i18n-iso-countries';

import { Module } from '@ringcentral-integration/commons/lib/di';
import callErrors from '@ringcentral-integration/commons/modules/Call/callErrors';
import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
} from '@ringcentral-integration/core';
import { format, formatTypes } from '@ringcentral-integration/phone-number';

import {
  directTransferNotificationTypes,
  DirectTransferNotificationTypes,
  directTransferStatues,
  DirectTransferStatues,
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
  EvClientTransferParams,
  EvDirectAgentListItem,
  EvDirectAgentTransferResponse,
  EvReceivedTransferCall,
} from '../../lib/EvClient';
import { EvCallbackTypes } from '../../lib/EvClient/enums/callbackTypes';
import { EvTypeError } from '../../lib/EvTypeError';
import { parseNumber } from '../../lib/parseNumber';
import {
  Deps,
  EvTransferFailHandler,
  InternalTransferCallbacks,
  TransferCall,
} from './EvTransferCall.interface';
import i18n from './i18n';

@Module({
  name: 'EvTransferCall',
  deps: [
    'EvClient',
    'EvCallMonitor',
    'EvCall',
    'EvSubscription',
    'EvWorkingState',
    'Storage',
    'ModalUI',
    'EvAuth',
    'Locale',
    'Alert',
    'EvAgentSession',
    { dep: 'EvTransferCallOptions', optional: true },
  ],
})
class EvTransferCall extends RcModuleV2<Deps> implements TransferCall {
  protected _eventEmitter = new AsyncEventEmitter();
  protected _internalTransferCallbacks: InternalTransferCallbacks = {};

  // alertTemplate: ModalTemplate;
  cancelTemplate: React.ReactNode;

  private _sendVoiceMailModalId: string = null;
  private _incomingTransferCallModalId: string = null;
  private _transferNotificationId: string = null;
  private _transferDest: string = null;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
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
  transferAgentId: string = null;

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
    return this._deps.evClient;
  }

  get allowManualInternationalTransfer() {
    return this._deps.evCall.currentCall?.allowManualInternationalTransfer;
  }

  get allowInternalTransfer() {
    return this._deps.evCall.currentCall?.allowDirectAgentTransfer !== '0';
  }

  get isInternalTransfer() {
    return this.transferType === transferTypes.internal;
  }

  @computed((that: EvTransferCall) => [
    that._deps.evCall.currentCall,
    that._deps.evAuth.availableCountries,
  ])
  get transferPhoneBook() {
    return (
      this._deps.evCall.currentCall?.transferPhoneBook?.reduce<
        EvTransferViewPhoneBookItem[]
      >((prev, bookItem, index) => {
        const { countryId, destination, name } = bookItem;
        const country = this._deps.evAuth.availableCountries.find(
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
          phoneBookItemIndex: index,
        });

        return prev;
      }, []) || []
    );
  }

  @action
  setReceivedCall(data: EvReceivedTransferCall) {
    this.receivedCall = data;
  }

  @action
  setCancelableTransfer(cancelable: boolean) {
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
  changeRecipientCountryId(countryId: string) {
    this.transferRecipientCountryId = countryId;
  }

  @action
  changeTransferType(type: EvTransferType) {
    this.transferType = type;
  }

  @action
  changeAgentList(data: EvDirectAgentListItem[]) {
    const currentAgent = data.find(
      ({ agentId }) => agentId === this.transferAgentId,
    );
    if (!currentAgent) {
      this.transferAgentId = null;
    }
    this.transferAgentList = data;
  }

  @action
  changeRecipientNumber(phoneNumber: string) {
    this.transferRecipientNumber = phoneNumber;
  }

  @action
  changeTransferPhoneBookSelected(index: number) {
    this.transferPhoneBookSelectedIndex = index;
  }

  @action
  changeTransferAgentId(agentId: string) {
    this.transferAgentId = agentId;
  }

  @action
  setTransferStatus(transferStatus: TransferStatus) {
    this.transferStatus = transferStatus;
  }

  @computed((that: EvTransferCall) => [that._deps.evCall.currentCall])
  get allowTransferCall() {
    const { currentCall } = this._deps.evCall;
    return currentCall?.allowTransfer && !currentCall.endedCall;
  }

  @computed((that: EvTransferCall) => [
    that.transferAgentList,
    that.transferAgentId,
  ])
  get transferAgentAvailable() {
    return this.transferAgentList.find(
      (item) => item.agentId === this.transferAgentId,
    ).available;
  }

  onInitOnce() {
    this._deps.evAgentSession.onTriggerConfig(async () => {
      this.setTransferStatus(transferStatuses.idle);
    });

    this._deps.evCallMonitor.onCallEnded(() => {
      this.setTransferStatus(transferStatuses.idle);
      this.closeModals();
      this.closeLoadingNotification();
    });

    this._deps.evSubscription.subscribe(
      EvCallbackTypes.DIRECT_AGENT_TRANSFER,
      (data) => {
        const internalTransferCallback =
          this._internalTransferCallbacks[data.type];
        if (
          data.status === directTransferStatues.ACCEPTED &&
          data.type === directTransferTypes.WARM
        ) {
          if (!this.transferAgentAvailable) {
            this.setCancelableTransfer(true);
            this.showNotificationLoadingCancel();
          }
          return;
        }
        if (
          (
            [
              directTransferStatues.REJECTED,
              directTransferStatues.SUCCEEDED,
            ] as DirectTransferStatues[]
          ).includes(data.status) &&
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

    this._deps.evSubscription.subscribe(
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

    this.onTransferStart(async () => {
      this._transferNotificationId = await this._deps.alert.info({
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

      this._deps.alert.success({
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

      this._deps.alert.danger({ message: transferErrors.TRANSFER_ERROR });
    });

    // End transfer message will come after success and error.
    this.onTransferEnd(() => {
      console.log('==onTransferEnd==');
    });
  }

  private showNotificationLoadingSpinner() {
    this._deps.alert.update(this._transferNotificationId, {
      message: transferEvents.START,
      loading: true,
    });
  }

  private showNotificationLoadingCancel() {
    this._deps.alert.update(this._transferNotificationId, {
      message: transferEvents.START,
      action: this.cancelTemplate,
    });
  }

  closeLoadingNotification() {
    if (this._transferNotificationId) {
      this._deps.alert.dismiss(this._transferNotificationId);
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
      this._deps.modalUI.close(this._sendVoiceMailModalId);
    }
    // close ignore/accept transfer modal.
    if (this._incomingTransferCallModalId) {
      this._deps.modalUI.close(this._incomingTransferCallModalId);
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
    this._deps.evClient.rejectDirectAgentTransferCall(this.receivedCall.uii);
    this.setReceivedCall(null);
  }

  acceptTransferCall() {
    if (!this.receivedCall) return;
    this._deps.evWorkingState.setWorkingStateWorking();
    // TODO: need check why add timeout here?
    setTimeout(() => this.setReceivedCall(null), 6000);
  }

  sendVoicemailToAgent() {
    this.setTransferStatus(transferStatuses.loading);
    this._deps.evClient.sendVoicemailDirectAgentTransfer(this.transferAgentId);
    this._internalTransferCallbacks.VOICEMAIL = (data) => {
      if (data.status === directTransferStatues.ACCEPTED) {
        this._deps.alert.success({
          message: transferSuccesses.SEND_VOICEMAIL_SUCCESS,
        });
      } else {
        this._deps.alert.danger({
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
        this._deps.evClient.cancelDirectAgentTransfer(this.transferAgentId);
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
        this._deps.evClient.cancelWarmTransferCall(this._transferDest);
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
        return this.transferPhoneBook[this.transferPhoneBookSelectedIndex]
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
    const transferPhoneBookSelected =
      this.transferPhoneBook[this.transferPhoneBookSelectedIndex];
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
      if (e instanceof EvTypeError) {
        switch (e.type) {
          case messageTypes.NO_SUPPORT_COUNTRY:
            return this._deps.alert.danger({
              message: messageTypes.NO_SUPPORT_COUNTRY,
              ttl: 0,
            });
          case messageTypes.INVALID_NUMBER:
            return this._deps.alert.danger({
              message: callErrors.noToNumber,
            });
          default:
            break;
        }
      }
      await this._eventEmitter.asyncEmit(transferEvents.ERROR, e);
      throw e;
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

  async warmTransferCall({ dialDest, countryId }: EvClientTransferParams) {
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

  async coldTransferCall({ dialDest, countryId }: EvClientTransferParams) {
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

  private _showSendVoiceMailModal(data: EvDirectAgentTransferResponse) {
    const { currentLocale } = this._deps.locale;

    const content = this.getErrorContent(data);

    this._sendVoiceMailModalId = this._deps.modalUI.confirm({
      title: i18n.getString('transferModalTitle', currentLocale),
      content: i18n.getString(content, currentLocale),
      confirmButtonText: i18n.getString('sendVoicemail', currentLocale),
      cancelButtonText: i18n.getString('selectOtherAgents', currentLocale),
      onConfirm: () => {
        this.sendVoicemailToAgent();
      },
      childrenSize: 'small',
    });
  }

  private getErrorContent(data: EvDirectAgentTransferResponse) {
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
    const { currentLocale } = this._deps.locale;

    this._incomingTransferCallModalId = this._deps.modalUI.confirm({
      title: i18n.getString('incomingTransferTitle', currentLocale),
      content: i18n.getString('incomingTransferContent', currentLocale),
      confirmButtonText: i18n.getString(
        'acceptIncomingTransfer',
        currentLocale,
      ),
      cancelButtonText: i18n.getString('ignoreIncomingTransfer', currentLocale),
      onConfirm: () => {
        this.acceptTransferCall();
      },
      onCancel: () => {
        this.rejectTransferCall();
      },
      childrenSize: 'small',
    });
  }
}

export { EvTransferCall };
