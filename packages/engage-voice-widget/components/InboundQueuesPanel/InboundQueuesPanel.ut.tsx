import React from 'react';

import { mount } from 'enzyme';

import type { StepFunction } from '@ringcentral-integration/test-utils';
import { RcThemeProvider } from '@ringcentral/juno';

import { InboundQueuesPanel } from './index';

function renderFunction(option) {
  return option.gateName;
}

function searchOption(option, text) {
  return option?.gateName?.toLowerCase().includes(text.toLowerCase());
}

const currentLocale = 'en-US';

function setInboundQueues() {
  console.log('====setInboundQueues');
}

function getAssignedInboundQueues(inboundQueues) {
  return inboundQueues.filter(({ checked }) => checked);
}

function isAllAssign(assignedInboundQueues, inboundQueues) {
  return (
    !!assignedInboundQueues.length &&
    assignedInboundQueues.length === inboundQueues.length
  );
}

function isSeveralAssign(assignedInboundQueues, inboundQueues) {
  return (
    !!assignedInboundQueues.length &&
    assignedInboundQueues.length !== inboundQueues.length
  );
}

function checkBoxOnChange(gateId, inboundQueuesState, setInboundQueuesState) {
  const inboundQueues = [...inboundQueuesState];
  const index = inboundQueues.findIndex((option) => option.gateId === gateId);
  inboundQueues[index].checked = !inboundQueues[index].checked;
  setInboundQueuesState(inboundQueues);
}

function allCheckBoxOnChange(
  severalAssign,
  inboundQueuesState,
  setInboundQueuesState,
) {
  const inboundQueues = inboundQueuesState.map((option) => {
    option.checked = severalAssign || !option.checked;
    return option;
  });
  setInboundQueuesState(inboundQueues);
}
const goBack = () => {};

function setup(inboundQueues) {
  const wrapper = mount(
    <RcThemeProvider>
      <InboundQueuesPanel
        renderFunction={renderFunction}
        searchOption={searchOption}
        currentLocale={currentLocale}
        inboundQueues={inboundQueues}
        submitInboundQueues={setInboundQueues}
        getAssignedInboundQueues={getAssignedInboundQueues}
        isAllAssign={isAllAssign}
        isSeveralAssign={isSeveralAssign}
        checkBoxOnChange={checkBoxOnChange}
        allCheckBoxOnChange={allCheckBoxOnChange}
        goBack={goBack}
      />
    </RcThemeProvider>,
  );
  return wrapper;
}

export const inboundQueuesPanelCases = [
  {
    title: 'Assignment checkbox: indeterminate',
    assignment: 1,
    indeterminate: true,
    checked: false,
    bulkClick: false,
    list: [
      {
        checked: false,
        gateId: '001',
        gateName: 'gateName1',
      },
      {
        checked: false,
        gateId: '002',
        gateName: 'gateName2',
      },
      {
        checked: true,
        gateId: '003',
        gateName: 'gateName3',
      },
    ],
  },
  {
    title: 'Assignment checkbox: indeterminate -> all select',
    assignment: 3,
    indeterminate: false,
    checked: true,
    bulkClick: true,
    list: [
      {
        checked: false,
        gateId: '001',
        gateName: 'gateName1',
      },
      {
        checked: false,
        gateId: '002',
        gateName: 'gateName2',
      },
      {
        checked: true,
        gateId: '003',
        gateName: 'gateName3',
      },
    ],
  },
  {
    title: 'click Assignment checkbox: all select -> all unselect',
    assignment: 0,
    indeterminate: false,
    checked: false,
    bulkClick: true,
    list: [
      {
        checked: true,
        gateId: '001',
        gateName: 'gateName1',
      },
      {
        checked: true,
        gateId: '002',
        gateName: 'gateName2',
      },
      {
        checked: true,
        gateId: '003',
        gateName: 'gateName3',
      },
    ],
  },
  {
    title: 'click Assignment checkbox: all unselect -> all select',
    assignment: 3,
    indeterminate: false,
    checked: true,
    bulkClick: true,
    list: [
      {
        checked: false,
        gateId: '001',
        gateName: 'gateName1',
      },
      {
        checked: false,
        gateId: '002',
        gateName: 'gateName2',
      },
      {
        checked: false,
        gateId: '003',
        gateName: 'gateName3',
      },
    ],
  },
];

function findElement(wrapper, dataSign) {
  return wrapper.find(`[data-sign="${dataSign}"]`).at(0);
}

export const CheckInboundQueuesPanel: StepFunction<any> = ({
  list,
  assignment,
  indeterminate,
  checked,
  bulkClick,
}) => {
  const wrapper = setup(list);
  if (bulkClick) {
    findElement(wrapper, 'bulkChangeCheckBox').find('input').simulate('click');
  }
  expect(findElement(wrapper, 'selectedTips').text()).toBe(
    `${assignment} of ${list.length} Selected`,
  );
  const bulkChangeCheckBox = findElement(wrapper, 'bulkChangeCheckBox');
  expect(bulkChangeCheckBox.prop('indeterminate')).toBe(indeterminate);
  expect(bulkChangeCheckBox.prop('checked')).toBe(checked);
};
