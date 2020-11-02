import { computed, RcUIModuleV2 } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { EvTransferType, transferTypes } from '../../enums/transferTypes';
import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
  EvTransferOption,
  EvTransferViewPhoneBookItem,
  GoToRequeueGroupDetailPageParams,
} from '../../interfaces/EvTransferCallUI.interface';
import { EvDirectAgentListItem } from '../../lib/EvClient';
import { Deps, TransferCallUI } from './EvTransferCallUI.interface';
import i18n from './i18n';
import { getInternalTransferName } from './util';

@Module({
  name: 'EvTransferCallUI',
  deps: [
    'RouterInteraction',
    'Locale',
    'EvCall',
    'EvTransferCall',
    'EvAuth',
    'Environment',
    'EvRequeueCall',
    { dep: 'EvTransferCallUIOptions', optional: true },
  ],
})
class EvTransferCallUI extends RcUIModuleV2<Deps> implements TransferCallUI {
  routerQueueGroupId: string;

  constructor(deps: Deps) {
    super({
      deps,
    });
    this.evTransferCall.onTransferSuccess(() => {
      if (
        /^\/activityCallLog\/.+\/transferCall$/.test(
          this._deps.routerInteraction.currentPath,
        )
      ) {
        this.goToActivityCallLogPage();
      }
    });
  }

  get selectQueueGroupDisabled() {
    return !this._deps.evAuth.agentPermissions.allowCrossQueueRequeue;
  }

  get disabled() {
    return !(
      this._deps.evRequeueCall.selectedQueueGroupId &&
      this._deps.evAuth.agentPermissions.allowCrossQueueRequeue
    );
  }

  get requeueCallDisabled() {
    return (
      this._deps.evRequeueCall.requeuing ||
      !this._deps.evRequeueCall.selectedGateId ||
      !!this._deps.evCall.currentCall?.endedCall
    );
  }

  @computed((that: EvTransferCallUI) => [
    that._deps.evAuth.agent.agentConfig.inboundSettings.availableRequeueQueues,
    that._deps.evRequeueCall.selectedQueueGroupId,
    that.routerQueueGroupId,
  ])
  get selectedQueueGroup() {
    const queueGroupId =
      this.routerQueueGroupId || this._deps.evRequeueCall.selectedQueueGroupId;

    const {
      availableRequeueQueues,
    } = this._deps.evAuth.agent.agentConfig.inboundSettings;
    if (
      queueGroupId &&
      availableRequeueQueues &&
      availableRequeueQueues.length > 0
    ) {
      return availableRequeueQueues.find(
        (queue) => queue.gateGroupId === queueGroupId,
      );
    }
    return null;
  }

  @computed((that: EvTransferCallUI) => [
    that.selectedQueueGroup,
    that._deps.evRequeueCall.selectedGateId,
  ])
  get selectedGate() {
    const { selectedGateId } = this._deps.evRequeueCall;

    if (this.selectedQueueGroup && selectedGateId) {
      const { gates } = this.selectedQueueGroup;
      if (gates && gates.length > 0) {
        return gates.find((queue) => queue.gateId === selectedGateId);
      }
    }
    return null;
  }

  goToActivityCallLogPage = () => {
    this._deps.routerInteraction.push(`/activityCallLog/${this.callId}`);
  };

  goToRequeueCallPage = () => {
    this._redirectRequeueCall();
  };

  goToRequeueGroupPage = () => {
    if (this.selectQueueGroupDisabled) return;
    this._redirectRequeueCall(`/queueGroup`);
  };

  goToRequeueGroupDetailPage = ({
    groupId,
    isCheckDisable,
  }: GoToRequeueGroupDetailPageParams) => {
    if (isCheckDisable && this.disabled) return;

    this._redirectRequeueCall(`/queueGroup/${groupId}`);
  };

  private _redirectRequeueCall(url: string = '') {
    this._deps.routerInteraction.push(
      `/activityCallLog/${this.callId}/transferCall${url}`,
    );
  }

  private _searchQueue(fromText: string, text: string) {
    return fromText?.toLowerCase().includes(text.toLowerCase());
  }

  private _submitSelection(queueId: string) {
    this._deps.evRequeueCall.setStatus({
      selectedQueueGroupId: this.routerQueueGroupId,
      selectedGateId: queueId,
    });
    this.goToRequeueCallPage();
  }

  private async _submitRequeueCall() {
    if (!this.requeueCallDisabled) {
      await this._deps.evRequeueCall.requeueCall();
      this.goToActivityCallLogPage();
    }
  }

  get callId() {
    return this._deps.evCall.activityCallId;
  }

  get evTransferCall() {
    return this._deps.evTransferCall;
  }

  @computed((that: EvTransferCallUI) => [
    that._deps.locale.currentLocale,
    that._deps.evRequeueCall.selectedQueueGroupId,
    that._deps.evRequeueCall.allowRequeueCall,
    that._deps.evTransferCall.allowTransferCall,
    that.evTransferCall.allowInternalTransfer,
    that.selectedCallRecipient,
    that.selectedQueueGroup,
    that.selectedGate,
    that.callId,
    that.selectQueueGroupDisabled,
    that.disabled,
  ])
  get transferOptions(): EvTransferOption[] {
    const number = this.evTransferCall.getNumber() || '';
    const currentRouteUrl = `/activityCallLog/${this.callId}/transferCall`;

    const { currentLocale } = this._deps.locale;

    return [
      ...(this._deps.evTransferCall.allowTransferCall &&
      this.evTransferCall.allowInternalTransfer
        ? [
            {
              type: transferTypes.internal,
              label: i18n.getString(transferTypes.internal, currentLocale),
              textFields: [
                {
                  router: `${currentRouteUrl}/internal`,
                  label: i18n.getString('callRecipientName', currentLocale),
                  placeholder: i18n.getString(
                    'callRecipientNamePlaceholder',
                    currentLocale,
                  ),
                  value: this.selectedCallRecipient,
                },
              ],
            },
          ]
        : []),
      ...(this._deps.evTransferCall.allowTransferCall
        ? [
            {
              type: transferTypes.phoneBook,
              label: i18n.getString(transferTypes.phoneBook, currentLocale),
              textFields: [
                {
                  router: `${currentRouteUrl}/phoneBook`,
                  label: i18n.getString('callRecipientName', currentLocale),
                  placeholder: i18n.getString(
                    'callRecipientNamePlaceholder',
                    currentLocale,
                  ),
                  value: this.selectedCallRecipient,
                },
                {
                  label: i18n.getString('callRecipientNumber', currentLocale),
                  placeholder: i18n.getString(
                    'callRecipientNumberPlaceholder',
                    currentLocale,
                  ),
                  value: number,
                  readonly: true,
                },
              ],
            },
          ]
        : []),
      ...(this._deps.evRequeueCall.allowRequeueCall
        ? [
            {
              type: transferTypes.queue,
              label: i18n.getString(transferTypes.queue, currentLocale),
              textFields: [
                {
                  router: `${currentRouteUrl}/queueGroup`,
                  label: i18n.getString('queueGroup', currentLocale),
                  placeholder: i18n.getString(
                    'callRecipientNamePlaceholder',
                    currentLocale,
                  ),
                  value: this.selectedQueueGroup?.groupName,
                  disabled: this.selectQueueGroupDisabled,
                  readonly: this.selectQueueGroupDisabled,
                },
                {
                  router: `${currentRouteUrl}/queueGroup/${this._deps.evRequeueCall.selectedQueueGroupId}`,
                  label: i18n.getString('queueDetail', currentLocale),
                  placeholder: i18n.getString(
                    'callRecipientNamePlaceholder',
                    currentLocale,
                  ),
                  value: this.selectedGate?.gateName,
                  disabled: this.disabled,
                  readonly: this.disabled,
                },
              ],
            },
          ]
        : []),
      ...(this._deps.evTransferCall.allowTransferCall
        ? [
            {
              type: transferTypes.manualEntry,
              label: i18n.getString(transferTypes.manualEntry, currentLocale),
              textFields: [
                {
                  router: `${currentRouteUrl}/manualEntry`,
                  label: i18n.getString('phoneNumber', currentLocale),
                  placeholder: i18n.getString(
                    'enterThePhoneNumberPlaceholder',
                    currentLocale,
                  ),
                  value: this.selectedCallRecipient,
                },
              ],
            },
          ]
        : []),
    ];
  }

  get isQueueTransfer() {
    return this.evTransferCall.transferType === transferTypes.queue;
  }

  @computed((that: EvTransferCallUI) => [
    that.evTransferCall.transferType,
    that.evTransferCall.transferAgentList,
    that.evTransferCall.transferAgentId,
    that.evTransferCall.transferPhoneBook,
    that.evTransferCall.transferPhoneBookSelectedIndex,
    that.evTransferCall.transferRecipientNumber,
    that.evTransferCall.transferRecipientCountryId,
    that._deps.evAuth.availableCountries,
  ])
  get selectedCallRecipient() {
    const {
      transferType,
      transferAgentList,
      transferAgentId,
      transferPhoneBook,
      transferPhoneBookSelectedIndex,
      transferRecipientNumber,
      transferRecipientCountryId,
    } = this.evTransferCall;

    const { availableCountries } = this._deps.evAuth;

    if (transferType === transferTypes.internal && transferAgentId) {
      const selectedAgent = transferAgentList.find(
        ({ agentId }) => agentId === transferAgentId,
      );
      return selectedAgent ? getInternalTransferName(selectedAgent) : '';
    }
    if (
      transferType === transferTypes.phoneBook &&
      typeof transferPhoneBookSelectedIndex !== 'undefined' &&
      transferPhoneBookSelectedIndex !== null
    ) {
      const phoneBook = transferPhoneBook[transferPhoneBookSelectedIndex];
      if (phoneBook.countryId === 'USA') {
        return phoneBook.name;
      }
      const country = availableCountries.find(
        ({ countryId }) => countryId === phoneBook.countryId,
      );
      if (country) {
        return `${phoneBook.name} (${
          country.countryName || country.countryId
        })`;
      }
      return `${phoneBook.name} (${phoneBook.countryId})`;
    }
    if (transferType === transferTypes.manualEntry && transferRecipientNumber) {
      if (transferRecipientCountryId === 'USA') {
        return `${transferRecipientNumber}`;
      }
      const country = availableCountries.find(
        ({ countryId }) => countryId === transferRecipientCountryId,
      );
      return `${transferRecipientNumber} (${
        country.countryName || country.countryId
      })`;
    }
    return '';
  }

  @computed((that: EvTransferCallUI) => [
    that.isQueueTransfer,
    that._deps.evCall.currentCall,
    that.selectedCallRecipient,
    that.evTransferCall.transferring,
    that.requeueCallDisabled,
  ])
  get transferCallDisabled() {
    const { endedCall, allowTransfer } = this._deps.evCall.currentCall;

    return this.isQueueTransfer
      ? this.requeueCallDisabled
      : !allowTransfer ||
          !this.selectedCallRecipient ||
          !!endedCall ||
          this.evTransferCall.transferring;
  }

  @computed((that: EvTransferCallUI) => [
    that.transferOptions,
    that.evTransferCall.transferType,
  ])
  get textFields() {
    const transferOption = this.transferOptions.find(
      ({ type }) => type === this.evTransferCall.transferType,
    );

    return transferOption ? transferOption.textFields : [];
  }

  goBack() {
    this._deps.routerInteraction.goBack();
  }

  clickCallRecipient(router: string) {
    if (router) {
      this._deps.routerInteraction.push(router);
    }
  }

  gotoActivityCallLogPage(id: string = this.callId) {
    this._deps.routerInteraction.push(`/activityCallLog/${id}`);
  }

  gotoTransferCallPage(id: string = this.callId) {
    this._deps.routerInteraction.push(`/activityCallLog/${id}/transferCall`);
  }

  transferCall() {
    return this.isQueueTransfer
      ? this._submitRequeueCall()
      : this.evTransferCall.transfer();
  }

  protected _searchAgent(options: EvDirectAgentListItem, text: string) {
    const firstName = options.firstName ?? '';
    const lastName = options.lastName ?? '';
    const blankRegex = /\s+/g;
    // when there is not have firstName and lastName, use username to search
    const name = (`${firstName}${lastName}` || options.username)
      .replace(blankRegex, '')
      .toLowerCase();

    const keywords = text.toLowerCase().trim().split(blankRegex);

    return (
      keywords.length > 0 &&
      keywords.filter((keyword) => name.includes(keyword)).length > 0
    );
  }

  protected _searchPhoneBook(
    {
      phoneBookName,
      destination,
      parsedDestination,
    }: EvTransferViewPhoneBookItem,
    text: string,
  ) {
    const searchText = text.toLowerCase();
    return (
      phoneBookName?.toLowerCase().includes(searchText) ||
      destination?.includes(searchText) ||
      parsedDestination?.includes(searchText)
    );
  }

  @computed((that: EvTransferCallUI) => [
    that.isQueueTransfer,
    that._deps.evRequeueCall.stayOnCall,
    that.evTransferCall.stayOnCall,
  ])
  get stayOnCall() {
    return this.isQueueTransfer
      ? this._deps.evRequeueCall.stayOnCall
      : this.evTransferCall.stayOnCall;
  }

  private _clickTransferTypeFiled(type: EvTransferType) {
    this.evTransferCall.changeTransferType(type);
    if (type !== transferTypes.queue) {
      const goalTransferOption = this.transferOptions.find(
        (transferOption) => transferOption.type === type,
      );
      this.clickCallRecipient(goalTransferOption?.textFields[0]?.router);
    }
  }

  getUIProps({
    id,
    groupId,
  }: {
    id: string;
    groupId?: string;
  }): EvTransferCallUIProps {
    this._deps.evCall.activityCallId = id;
    this.routerQueueGroupId = groupId;
    return {
      currentLocale: this._deps.locale.currentLocale,
      transferOptions: this.transferOptions,
      transferring: this.evTransferCall.transferring,
      transferRecipientCountryId: this.evTransferCall
        .transferRecipientCountryId,
      transferRecipientNumber: this.evTransferCall.transferRecipientNumber,
      transferPhoneBookSelectedIndex: this.evTransferCall
        .transferPhoneBookSelectedIndex,
      transferAgentId: this.evTransferCall.transferAgentId,
      isStayOnCall: this.stayOnCall,
      selectedTransferType: this.evTransferCall.transferType,
      transferAgentList: this.evTransferCall.transferAgentList,
      transferPhoneBook: this.evTransferCall.transferPhoneBook,
      transferAgentListUpdateTTL: 3000,
      transferCountryOptions: this._deps.evAuth.availableCountries,
      allowManualInternationalTransfer: this.evTransferCall
        .allowManualInternationalTransfer,
      textFields: this.textFields,
      transferCallDisabled: this.transferCallDisabled,
      isWide: this._deps.environment.isWide,

      // requeuing state
      requeuing: this._deps.evRequeueCall.requeuing,
      // availableRequeueQueues
      queueGroups: this._deps.evAuth.availableRequeueQueues,
      selectedQueueGroupId: this._deps.evRequeueCall.selectedQueueGroupId,
      selectedGateId: this._deps.evRequeueCall.selectedGateId,
      // selected object
      selectedQueueGroup: this.selectedQueueGroup,
      selectedGate: this.selectedGate,
    };
  }

  getUIFunctions(): EvTransferCallUIFunctions {
    return {
      goBack: () => this.goBack(),
      clickCallRecipient: (router) => this.clickCallRecipient(router),
      clickTransferTypeFiled: (type) => this._clickTransferTypeFiled(type),
      setStayOnCall: (status) =>
        this.isQueueTransfer
          ? this._deps.evRequeueCall.setStatus({ stayOnCall: !status })
          : this.evTransferCall.changeStayOnCall(status),
      fetchAgentList: () => this.evTransferCall.fetchAgentList(),
      changeRecipientNumber: (recipientNumber) => {
        this.evTransferCall.changeRecipientNumber(recipientNumber);
        this.evTransferCall.changeTransferType(transferTypes.manualEntry);
        this.gotoTransferCallPage();
      },
      changeTransferPhoneBookSelected: (index) => {
        this.evTransferCall.changeTransferPhoneBookSelected(index);
        this.evTransferCall.changeTransferType(transferTypes.phoneBook);
        this.gotoTransferCallPage();
      },
      changeRecipientCountryId: (countryId) =>
        this.evTransferCall.changeRecipientCountryId(countryId),
      changeTransferAgentId: (agentId) => {
        this.evTransferCall.changeTransferAgentId(agentId);
        this.evTransferCall.changeTransferType(transferTypes.internal);
        this.gotoTransferCallPage();
      },
      transferCall: () => this.transferCall(),
      setCancelTemplate: (templates: React.ReactNode) =>
        this.evTransferCall.setCancelTemplate(templates),
      cancelTransfer: () => this.evTransferCall.cancelTransfer(),
      cancelTransferPage: () => this.gotoActivityCallLogPage(),

      goToActivityCallLogPage: this.goToActivityCallLogPage,
      goToRequeueCallPage: this.goToRequeueCallPage,
      goToRequeueGroupPage: this.goToRequeueGroupPage,
      goToRequeueGroupDetailPage: this.goToRequeueGroupDetailPage,
      searchAgent: (option, text) => this._searchAgent(option, text),
      searchPhoneBook: (option, text) => this._searchPhoneBook(option, text),
      searchGroup: (option, text) => this._searchQueue(option.groupName, text),
      searchGate: (option, text) => this._searchQueue(option.gateName, text),
      submitSelection: (queueId) => this._submitSelection(queueId),
    };
  }
}

export { EvTransferCallUI };
