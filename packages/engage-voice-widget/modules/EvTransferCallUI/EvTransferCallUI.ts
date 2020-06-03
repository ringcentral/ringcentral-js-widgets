import { RcUIModuleV2, createSelector } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import { transferTypes } from '../../enums/transferTypes';
import {
  EvTransferCallUIFunctions,
  EvTransferCallUIProps,
  TextField,
  GoToRequeueGroupDetailPageParams,
} from '../../interfaces/EvTransferCallUI.interface';
import {
  EvDirectAgentListItem,
  EvTransferPhoneBookItem,
} from '../../lib/EvClient';
import { DepsModules, TransferCallUI } from './EvTransferCallUI.interface';
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
class EvTransferCallUI extends RcUIModuleV2<DepsModules>
  implements TransferCallUI {
  routerQueueGroupId: string;

  constructor({
    locale,
    routerInteraction,
    evCall,
    evTransferCall,
    evAuth,
    environment,
    evRequeueCall,
  }) {
    super({
      modules: {
        locale,
        routerInteraction,
        evCall,
        evTransferCall,
        evAuth,
        environment,
        evRequeueCall,
      },
    });
    this.evTransferCall.onTransferSuccess(() => {
      if (
        /^\/activityCallLog\/.+\/transferCall$/.test(
          this._modules.routerInteraction.currentPath,
        )
      ) {
        this.goToActivityCallLogPage();
      }
    });
  }

  get selectQueueGroupDisabled() {
    return !this._modules.evAuth.agentPermissions.allowCrossQueueRequeue;
  }

  get gateDisabled() {
    return !(
      this._modules.evRequeueCall.selectedQueueGroupId &&
      this._modules.evAuth.agentPermissions.allowCrossQueueRequeue
    );
  }

  get requeueCallDisabled() {
    return (
      this._modules.evRequeueCall.requeuing ||
      !this._modules.evRequeueCall.selectedGateId ||
      !!this._modules.evCall.getCurrentCall().endedCall
    );
  }

  getSelectedQueueGroup = createSelector(
    () =>
      this._modules.evAuth.agent.agentConfig.inboundSettings
        .availableRequeueQueues,
    () => this._modules.evRequeueCall.selectedQueueGroupId,
    () => this.routerQueueGroupId,
    (availableRequeueQueue, selectedQueueGroupId, routerQueueGroupId) => {
      const queueGroupId = routerQueueGroupId || selectedQueueGroupId;
      if (
        queueGroupId &&
        availableRequeueQueue &&
        availableRequeueQueue.length > 0
      ) {
        return availableRequeueQueue.find(
          (queue) => queue.gateGroupId === queueGroupId,
        );
      }
      return null;
    },
  );

  getSelectedGate = createSelector(
    () => this.getSelectedQueueGroup(),
    () => this._modules.evRequeueCall.selectedGateId,
    (selectedQueueGroup, selectedGateId) => {
      if (selectedQueueGroup && selectedGateId) {
        const { gates } = selectedQueueGroup;
        if (gates && gates.length > 0) {
          return gates.find((queue) => queue.gateId === selectedGateId);
        }
      }
      return null;
    },
  );

  goToActivityCallLogPage = () => {
    this._modules.routerInteraction.push(`/activityCallLog/${this.callId}`);
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
    if (isCheckDisable && this.gateDisabled) return;

    this._redirectRequeueCall(`/queueGroup/${groupId}`);
  };

  private _redirectRequeueCall(url: string = '') {
    this._modules.routerInteraction.push(
      `/activityCallLog/${this.callId}/transferCall${url}`,
    );
  }

  private _searchQueue(fromText: string, text: string) {
    return (
      fromText && text && fromText.toLowerCase().includes(text.toLowerCase())
    );
  }

  private _submitSelection(queueId: string) {
    this._modules.evRequeueCall.setStatus({
      selectedQueueGroupId: this.routerQueueGroupId,
      selectedGateId: queueId,
    });
    this.goToRequeueCallPage();
  }

  private async _submitRequeueCall() {
    if (!this.requeueCallDisabled) {
      await this._modules.evRequeueCall.requeueCall();
      this.goToActivityCallLogPage();
    }
  }

  get callId() {
    return this._modules.evCall.activityCallId;
  }

  get evTransferCall() {
    return this._modules.evTransferCall;
  }

  getTransferOptions = createSelector(
    () => this._modules.locale.currentLocale,
    () => this.evTransferCall.allowInternalTransfer,
    () => this.getSelectedCallRecipient(),
    () => this.getSelectedQueueGroup(),
    () => this.getSelectedGate(),
    () => this.callId,
    () => this._modules.evRequeueCall.selectedQueueGroupId,
    (
      currentLocale,
      allowInternalTransfer,
      selectedCallRecipient,
      selectedQueueGroup,
      selectedGate,
      callId,
      selectedQueueGroupId,
    ) => {
      const number = this.evTransferCall.getNumber() || '';
      const currentRouteUrl = `/activityCallLog/${callId}/transferCall`;
      const noTransferType = !this.evTransferCall.transferType;
      const noSelectedQueueGroup = !selectedQueueGroup;
      return [
        ...(allowInternalTransfer
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
                    value: selectedCallRecipient,
                    disabled: noTransferType,
                    readonly: noTransferType,
                  },
                ],
              },
            ]
          : []),
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
              value: selectedCallRecipient,
              disabled: noTransferType,
              readonly: noTransferType,
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
              value: selectedQueueGroup?.groupName,
              disabled: noTransferType,
              readonly: noTransferType,
            },
            {
              router: `${currentRouteUrl}/queueGroup/${selectedQueueGroupId}`,
              label: i18n.getString('queueDetail', currentLocale),
              placeholder: i18n.getString(
                'callRecipientNamePlaceholder',
                currentLocale,
              ),
              value: selectedGate?.gateName,
              disabled: noTransferType || noSelectedQueueGroup,
              readonly: noTransferType || noSelectedQueueGroup,
            },
          ],
        },
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
              value: selectedCallRecipient,
              disabled: noTransferType,
              readonly: noTransferType,
            },
          ],
        },
      ];
    },
  );

  get isQueueTransfer() {
    return this.evTransferCall.transferType === transferTypes.queue;
  }

  getSelectedCallRecipient = createSelector(
    () => this.evTransferCall.transferType,
    () => this.evTransferCall.transferAgentList,
    () => this.evTransferCall.transferAgentId,
    () => this.evTransferCall.getTransferPhoneBook(),
    () => this.evTransferCall.transferPhoneBookSelectedIndex,
    () => this.evTransferCall.transferRecipientNumber,
    () => this.evTransferCall.transferRecipientCountryId,
    () => this._modules.evAuth.getAvailableCountries(),
    (
      transferType,
      transferAgentList,
      transferAgentId,
      transferPhoneBook,
      transferPhoneBookSelected,
      transferRecipientNumber,
      transferRecipientCountryId,
      availableCountries,
    ) => {
      if (transferType === transferTypes.internal && transferAgentId) {
        const selectedAgent = transferAgentList.find(
          ({ agentId }) => agentId === transferAgentId,
        );
        return selectedAgent ? getInternalTransferName(selectedAgent) : '';
      }
      if (
        transferType === transferTypes.phoneBook &&
        typeof transferPhoneBookSelected !== 'undefined' &&
        transferPhoneBookSelected !== null
      ) {
        const phoneBook = transferPhoneBook[transferPhoneBookSelected];
        if (phoneBook.countryId === 'USA') {
          return phoneBook.name;
        }
        const country = availableCountries.find(
          ({ countryId }) => countryId === phoneBook.countryId,
        );
        if (country) {
          return `${phoneBook.name} (${country.countryName ||
            country.countryId})`;
        }
        return `${phoneBook.name} (${phoneBook.countryId})`;
      }
      if (
        transferType === transferTypes.manualEntry &&
        transferRecipientNumber
      ) {
        if (transferRecipientCountryId === 'USA') {
          return `${transferRecipientNumber}`;
        }
        const country = availableCountries.find(
          ({ countryId }) => countryId === transferRecipientCountryId,
        );
        return `${transferRecipientNumber} (${country.countryName ||
          country.countryId})`;
      }
      return '';
    },
  );

  getTransferCallDisabled = createSelector(
    () => this.isQueueTransfer,
    () => this._modules.evCall.getCurrentCall(),
    () => this.getSelectedCallRecipient(),
    () => this.evTransferCall.transferring,
    () => this.requeueCallDisabled,
    (
      isQueueTransfer,
      { endedCall, allowTransfer },
      selectedCallRecipient,
      transferring,
      requeueCallDisabled,
    ) => {
      return isQueueTransfer
        ? requeueCallDisabled
        : !allowTransfer ||
            !selectedCallRecipient ||
            !!endedCall ||
            transferring;
    },
  );

  getTextFields = createSelector(
    () => this.getTransferOptions(),
    () => this.evTransferCall.transferType,
    (
      transferOptions: EvTransferCallUIProps['transferOptions'],
      transferType: string,
    ): TextField[] => {
      const { textFields } = transferOptions.find(
        ({ type }) => type === transferType,
      );
      return textFields;
    },
  );

  goBack() {
    this._modules.routerInteraction.goBack();
  }

  clickCallRecipient(router: string) {
    if (router) {
      this._modules.routerInteraction.push(router);
    }
  }

  gotoActivityCallLogPage(id: string = this.callId) {
    this._modules.routerInteraction.push(`/activityCallLog/${id}`);
  }

  gotoTransferCallPage(id: string = this.callId) {
    this._modules.routerInteraction.push(`/activityCallLog/${id}/transferCall`);
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
    const keywords = text
      .toLowerCase()
      .trim()
      .split(blankRegex);

    return (
      keywords.length > 0 &&
      keywords.filter((keyword) => name.includes(keyword)).length > 0
    );
  }

  protected _searchPhoneBook(option: EvTransferPhoneBookItem, text: string) {
    return (
      (text && option.name?.toLowerCase().includes(text.toLowerCase())) ||
      option.destination?.includes(text) || // TODO: think about `trim`?
      (option._parsedDestination && option._parsedDestination.includes(text))
    );
  }

  getStayOnCall = createSelector(
    () => this.isQueueTransfer,
    () => this._modules.evRequeueCall.stayOnCall,
    () => this.evTransferCall.stayOnCall,
    (isQueueTransfer, evRequeueCallStayOnCall, evTransferCallStayOnCall) => {
      return isQueueTransfer
        ? evRequeueCallStayOnCall
        : evTransferCallStayOnCall;
    },
  );

  private _clickTransferTypeFiled(type: string) {
    this.evTransferCall.changeTransferType(type);
    if (type !== transferTypes.queue) {
      const goalTransferOption = this.getTransferOptions().find(
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
    this._modules.evCall.activityCallId = id;
    this.routerQueueGroupId = groupId;
    return {
      currentLocale: this._modules.locale.currentLocale,
      transferOptions: this.getTransferOptions(),
      transferring: this.evTransferCall.transferring,
      transferRecipientCountryId: this.evTransferCall
        .transferRecipientCountryId,
      transferRecipientNumber: this.evTransferCall.transferRecipientNumber,
      transferPhoneBookSelectedIndex: this.evTransferCall
        .transferPhoneBookSelectedIndex,
      transferAgentId: this.evTransferCall.transferAgentId,
      isStayOnCall: this.getStayOnCall(),
      selectedTransferType: this.evTransferCall.transferType,
      transferAgentList: this.evTransferCall.transferAgentList,
      transferPhoneBook: this.evTransferCall.getTransferPhoneBook(),
      transferAgentListUpdateTTL: 3000,
      transferCountryOptions: this._modules.evAuth.getAvailableCountries(),
      allowManualInternationalTransfer: this.evTransferCall
        .allowManualInternationalTransfer,
      textFields: this.getTextFields(),
      transferCallDisabled: this.getTransferCallDisabled(),
      isWide: this._modules.environment.isWide,

      // requeuing state
      requeuing: this._modules.evRequeueCall.requeuing,
      // availableRequeueQueues
      queueGroups: this._modules.evAuth.getAvailableRequeueQueues(),
      selectedQueueGroupId: this._modules.evRequeueCall.selectedQueueGroupId,
      selectedGateId: this._modules.evRequeueCall.selectedGateId,
      // selected object
      selectedQueueGroup: this.getSelectedQueueGroup(),
      selectedGate: this.getSelectedGate(),
      // disabled
      gateDisabled: this.gateDisabled,
      selectQueueGroupDisabled: this.selectQueueGroupDisabled,
    };
  }

  getUIFunctions(): EvTransferCallUIFunctions {
    return {
      goBack: () => this.goBack(),
      clickCallRecipient: (router) => this.clickCallRecipient(router),
      clickTransferTypeFiled: (type) => this._clickTransferTypeFiled(type),
      setStayOnCall: (status) =>
        this.isQueueTransfer
          ? this._modules.evRequeueCall.setStatus({ stayOnCall: !status })
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
