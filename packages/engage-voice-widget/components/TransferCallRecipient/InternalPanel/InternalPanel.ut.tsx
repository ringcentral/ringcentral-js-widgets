import React from 'react';

import { mount } from 'enzyme';

import type { StepFunction } from '@ringcentral-integration/test-utils';
import { RcThemeProvider } from '@ringcentral/juno';

import type { EvDirectAgentListItem } from '../../../lib/EvClient';
import type { InternalPanelProps } from './InternalPanel';
import { InternalPanel } from './InternalPanel';

let wrapper;
const currentLocale = 'en-US';
const transferAgent = {
  agentAuxState: '',
  agentId: '00000',
  agentState: '',
  available: true,
  firstName: 'test',
  lastName: 'test',
  pendingDisp: true,
  stateDuration: 'testState',
  username: 'test username',
};
const defaultTransferAgentList = [
  {
    ...transferAgent,
    agentId: '10002',
    available: true,
    username: 'amy liu',
    firstName: 'amy',
    lastName: 'liu',
  },
  {
    ...transferAgent,
    agentId: '10003',
    available: true,
    username: 'susie liu',
    firstName: 'susie',
    lastName: 'liu',
  },
  {
    ...transferAgent,
    agentId: '10004',
    available: true,
    username: 'geroge lin',
    firstName: 'geroge',
    lastName: 'lin',
  },
  {
    ...transferAgent,
    agentId: '10005',
    available: false,
    username: 'amy liu',
    firstName: 'amy',
    lastName: 'liu',
  },
];

const defaultSearchAgent = (options: EvDirectAgentListItem, text: string) => {
  const firstName = options.firstName ?? '';
  const lastName = options.lastName ?? '';
  const blankRegex = /\s+/g;
  const name = `${firstName}${lastName}`.replace(blankRegex, '').toLowerCase();
  return text && name.includes(text.replace(blankRegex, '').toLowerCase());
};

function setup({
  goBack = () => {},
  transferAgentListUpdateTTL = 100,
  fetchAgentList = () => {},
  transferAgentId = '',
  changeTransferAgentId = () => {},
  searchAgent = defaultSearchAgent,
  transferAgentList = defaultTransferAgentList,
}: Partial<InternalPanelProps>) {
  return mount(
    <RcThemeProvider>
      <InternalPanel
        currentLocale={currentLocale}
        goBack={goBack}
        transferAgentList={transferAgentList}
        transferAgentListUpdateTTL={transferAgentListUpdateTTL}
        fetchAgentList={fetchAgentList}
        transferAgentId={transferAgentId}
        changeTransferAgentId={changeTransferAgentId}
        searchAgent={searchAgent}
      />
    </RcThemeProvider>,
  );
}

const getAgentItems = () =>
  wrapper.find('RcList').at(0).find('div[data-sign="agentItem"]');

const getSearchInput = () => wrapper.find('RcTextField').at(0).find('input');

export const UTAgentListCheckBackButton: StepFunction = () => {
  const goBack = jest.fn(() => {});
  wrapper = setup({ goBack });
  wrapper
    .find('[data-sign="backButton"]')
    .at(0)
    .find('button')
    .simulate('click');
  expect(goBack).toBeCalled();
};

export const UTAgentListAutoSync: StepFunction = () => {
  jest.useFakeTimers();
  const fetchAgentList = jest.fn(() => {});
  const transferAgentListUpdateTTL = 100;
  wrapper = setup({ fetchAgentList, transferAgentListUpdateTTL });
  jest.advanceTimersByTime(210);
  expect(fetchAgentList).toHaveBeenCalledTimes(2);
  jest.useRealTimers();
};

export const UTAgentListDisplayAndHighlight: StepFunction = () => {
  const transferAgentId = '10003';
  wrapper = setup({
    transferAgentId,
  });
  const agentItems = getAgentItems();
  expect(agentItems.length).toBe(defaultTransferAgentList.length);
  const selectedIndex = defaultTransferAgentList.findIndex(
    (x) => x.agentId === transferAgentId,
  );
  expect(agentItems.at(selectedIndex).render().attr('class')).toMatch(
    /Mui-selected/g,
  );
};

export const UTAgentListSearchCases = [
  {
    internalList: ['DukeTest1', 'DukeTest2', 'EV demo'],
    searchText: 'Duke',
    matchedResult: ['DukeTest1', 'DukeTest2'],
  },
  {
    internalList: ['DukeTest1', 'DukeTest2', 'EV demo'],
    searchText: '2',
    matchedResult: ['DukeTest2'],
  },
  {
    internalList: ['DukeTest1', 'DukeTest2', 'EV demo'],
    searchText: 'AA',
    matchedResult: 'No result found for "AA"',
  },
];

interface UTAgentListSearchProps {
  internalList: string[];
  searchText: string;
  matchedResult: string[] | string;
}

export const UTAgentListSearch: StepFunction<UTAgentListSearchProps> = ({
  internalList,
  searchText,
  matchedResult,
}) => {
  const searchAgent = jest.fn(defaultSearchAgent);
  wrapper = setup({
    searchAgent,
    transferAgentList: internalList.map((name) => ({
      firstName: name,
      lastName: '',
    })),
  });
  const eventObj = { target: { value: searchText } };
  getSearchInput().simulate('change', eventObj);
  const agentItems = getAgentItems();

  if (Array.isArray(matchedResult)) {
    expect(agentItems).toHaveLength(matchedResult.length);
    const resultItems = agentItems.map((el) =>
      el.find('.agentName').text().trim(),
    );
    expect(resultItems).toStrictEqual(matchedResult);
  } else {
    expect(agentItems).toHaveLength(0);
    expect(wrapper.find('[data-sign="searchResult"]').text()).toBe(
      `No result found for "${searchText}"`,
    );
  }
};

interface UTCheckInternalPanelRenderProps {
  internalOptions: string;
}

export const UTCheckInternalPanelRender: StepFunction<UTCheckInternalPanelRenderProps> =
  async ({ internalOptions }) => {
    const wrapper = setup({});
    const dataSign = {
      'Search bar': 'searchBar',
      'internal recipient list': 'searchResult',
    };
    expect(
      wrapper.find(`[data-sign="${dataSign[internalOptions]}"]`),
    ).not.toBeUndefined();
  };

export const UTCheckTransferAgentSelectCases = [
  {
    title: 'User can select available agent to transfer',
    internalItem: 'DukeTest1',
    available: true,
    recipientDisplay: 'DukeTest1',
  },
  {
    title: 'User can select unavailable agent to transfer',
    internalItem: 'DukeTest2',
    available: false,
    recipientDisplay: 'DukeTest2',
  },
];
interface UTCheckTransferAgentSelectProps {
  internalItem: string;
  available: boolean;
  recipientDisplay: string;
}

export const UTCheckTransferAgentSelect: StepFunction<UTCheckTransferAgentSelectProps> =
  async ({ internalItem, available, recipientDisplay }) => {
    const changeTransferAgentId = jest.fn(() => {});
    const agentId = '10003';
    wrapper = setup({
      changeTransferAgentId,
      transferAgentList: [
        { agentId, firstName: internalItem, lastName: '', available },
      ],
    });
    const selectIndex = 0;
    const agentItems = getAgentItems();
    agentItems.at(selectIndex).find('[role="button"]').at(0).simulate('click');
    expect(changeTransferAgentId).toBeCalledWith(agentId);
  };

export const UTCheckAgentListRenderCases = [
  {
    title: 'internal recipient status',
    agentState: 'Available',
    stateColor: 'green',
    available: true,
    recipient: 'DukeAccount1',
    availableStatus: 'Available',
    statusColor: 'green',
  },
  {
    title: 'internal recipient status',
    agentState: 'On Break',
    stateColor: 'gray',
    available: false,
    recipient: 'AccountDuke2',
    availableStatus: 'Unavailable',
    statusColor: 'gray',
  },
  {
    title: 'internal recipient status',
    agentState: 'Training',
    stateColor: 'yellow',
    available: true,
    recipient: 'AccountDuke2',
    availableStatus: 'Available',
    statusColor: 'green',
  },
  {
    title: 'internal recipient status',
    agentState: 'Lunch',
    stateColor: 'gray',
    available: false,
    recipient: 'AccountDuke2',
    availableStatus: 'Unavailable',
    statusColor: 'gray',
  },
  {
    title: 'internal recipient status',
    agentState: 'Working',
    stateColor: 'yellow',
    available: true,
    recipient: 'AccountDuke2',
    availableStatus: 'Available',
    statusColor: 'green',
  },
  {
    title: 'internal recipient status',
    agentState: 'Allow Offhook',
    stateColor: 'red',
    available: false,
    recipient: 'AccountDuke2',
    availableStatus: 'Unavailable',
    statusColor: 'gray',
  },
  {
    title: 'internal recipient status',
    agentState: 'Disconnect Offhook',
    stateColor: 'red',
    available: false,
    recipient: 'AccountDuke2',
    availableStatus: 'Unavailable',
    statusColor: 'gray',
  },
  {
    title: 'internal recipient status',
    agentState: 'Away',
    stateColor: 'gray',
    available: false,
    recipient: 'AccountDuke2',
    availableStatus: 'Unavailable',
    statusColor: 'gray',
  },
];
interface UTCheckAgentListRenderProps {
  agentState: string;
  available: boolean;
  recipient: string;
  availableStatus: 'Available' | 'Unavailable';
  statusColor: string;
}
export const UTCheckAgentListRender: StepFunction<UTCheckAgentListRenderProps> =
  async ({
    agentState,
    available,
    recipient,
    availableStatus,
    statusColor,
  }) => {
    const wrapper = setup({
      transferAgentList: [
        { agentState, firstName: recipient, lastName: '', available },
      ],
    });
    const agentItem = wrapper.find('[data-sign="agentItem"]');
    expect(agentItem.find('.agentName').text().trim()).toBe(recipient);
    expect(agentItem.find('.statusText').text().trim()).toBe(availableStatus);
    if (statusColor === 'green') {
      expect(agentItem.find('.available')).toHaveLength(1);
    } else if (statusColor === 'gray') {
      expect(agentItem.find('.unavailable')).toHaveLength(1);
    }
  };
