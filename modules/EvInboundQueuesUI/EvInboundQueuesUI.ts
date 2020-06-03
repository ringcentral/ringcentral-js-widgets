import { RcUIModuleV2, createSelector } from '@ringcentral-integration/core';
import { Module } from 'ringcentral-integration/lib/di';

import {
  ChangeQueueStateFn,
  EvInboundQueuesUIFunctions,
  EvInboundQueuesUIProps,
} from '../../interfaces/EvInboundQueuesUI.interface';
import { AvailableQueue } from '../../interfaces/SelectableQueue.interface';
import { DepsModules, InboundQueuesUI } from './EvInboundQueuesUI.interface';
import { sortByName } from '../../lib/sortByName';

@Module({
  name: 'EvInboundQueuesUI',
  deps: ['Locale', 'RouterInteraction', 'EvSessionConfig', 'EvClient'],
})
class EvInboundQueuesUI extends RcUIModuleV2<DepsModules>
  implements InboundQueuesUI {
  constructor({ locale, routerInteraction, evSessionConfig, evClient }) {
    super({
      modules: {
        locale,
        routerInteraction,
        evClient,
        evSessionConfig,
      },
    });
  }

  getInboundQueues = createSelector(
    () => this._modules.evSessionConfig.selectedInboundQueueIds,
    () => this._modules.evSessionConfig.getInboundQueues(),
    (selectedInboundQueueIds, inboundQueues) => {
      return sortByName(
        inboundQueues.map((inboundQueue) => {
          return {
            ...inboundQueue,
            checked: !!selectedInboundQueueIds.find(
              (id) => id === inboundQueue.gateId,
            ),
          };
        }),
        'gateName',
      );
    },
  );

  private _checkBoxOnChange(
    gateId: string,
    inboundQueuesState: AvailableQueue[],
    setInboundQueuesState: ChangeQueueStateFn,
  ) {
    const inboundQueues = [...inboundQueuesState];
    const index = inboundQueues.findIndex((option) => option.gateId === gateId);
    const selectedInboundQueue = inboundQueues[index];

    inboundQueues[index] = {
      ...selectedInboundQueue,
      checked: !selectedInboundQueue.checked,
    };

    setInboundQueuesState(inboundQueues);
  }

  private _allCheckBoxOnChange(
    severalAssign: boolean,
    inboundQueuesState: AvailableQueue[],
    setInboundQueuesState: ChangeQueueStateFn,
  ) {
    const inboundQueues = [...inboundQueuesState].map((option) => {
      return {
        ...option,
        // new object
        checked: severalAssign || !option.checked,
      };
    });
    setInboundQueuesState(inboundQueues);
  }

  private submitInboundQueues(queues: AvailableQueue[]) {
    this._modules.evSessionConfig.setInboundQueueIds(
      queues.map((inboundQueue) => inboundQueue.gateId),
    );
    this._modules.routerInteraction.push('/sessionConfig');
  }

  getUIProps(): EvInboundQueuesUIProps {
    return {
      currentLocale: this._modules.locale.currentLocale,
      inboundQueues: this.getInboundQueues(),
    };
  }

  getUIFunctions(): EvInboundQueuesUIFunctions {
    return {
      renderFunction: (option) => option.gateName,
      searchOption: (option, text) =>
        option.gateName &&
        option.gateName.toLowerCase().includes(text.toLowerCase()),
      submitInboundQueues: (queues: AvailableQueue[]) =>
        this.submitInboundQueues(queues),
      goBack: () => this._modules.routerInteraction.goBack(),
      getAssignedInboundQueues: (inboundQueues) =>
        inboundQueues.filter(({ checked }) => checked),
      isAllAssign: (assignedInboundQueues, inboundQueues) =>
        !!assignedInboundQueues.length &&
        assignedInboundQueues.length === inboundQueues.length,
      isSeveralAssign: (assignedInboundQueues, inboundQueues) =>
        !!assignedInboundQueues.length &&
        assignedInboundQueues.length !== inboundQueues.length,
      checkBoxOnChange: (...args) => this._checkBoxOnChange(...args),
      allCheckBoxOnChange: (...args) => this._allCheckBoxOnChange(...args),
    };
  }
}
export { EvInboundQueuesUI };
