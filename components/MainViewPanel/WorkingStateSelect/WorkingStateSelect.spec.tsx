import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { EvCustomAvailableAgentState } from '../../../interfaces/EvMainViewUI.interface';
import { WorkingStateSelect } from './WorkingStateSelect';

let wrapper;
const agentStates: EvCustomAvailableAgentState[] = [
  {
    agentAuxState: 'Available',
    agentState: 'AVAILABLE',
    rank: '1',
    color: 'green',
  },
  {
    agentAuxState: 'Working',
    agentState: 'WORKING',
    rank: '2',
    color: 'yellow',
  },
  { agentAuxState: 'Away', agentState: 'AWAY', rank: '3', color: 'grey' },
  {
    agentAuxState: 'On Break',
    agentState: 'ON-BREAK',
    rank: '4',
    color: 'grey',
  },
  { agentAuxState: 'Lunch', agentState: 'LUNCH', rank: '5', color: 'grey' },
  {
    agentAuxState: 'Allow Offhook',
    agentState: 'AUX-UNAVAIL-OFFHOOK',
    rank: '7',
    color: 'red',
  },
  {
    agentAuxState: 'Disconnect Offhook',
    agentState: 'AUX-UNAVAIL-NO-OFFHOOK',
    rank: '8',
    color: 'red',
  },
  { agentAuxState: 'Napping', agentState: 'AWAY', rank: '11', color: 'grey' },
  {
    agentAuxState: '"Training"',
    agentState: 'TRAINING',
    rank: '13',
    color: 'yellow',
  },
  {
    agentAuxState: 'Meeting',
    agentState: 'WORKING',
    rank: '41',
    color: 'yellow',
  },
];

function setup({
  getStateColor = () => '',
  handleWithIntervalTime = () => {},
  stateText = 'Available',
  time = Date.now(),
  currentStateIndex = 0,
  getTimerText = (time) => time,
  changeWorkingState = () => {},
  disabled = false,
} = {}) {
  return mount(
    <RcThemeProvider>
      <WorkingStateSelect
        agentStates={agentStates}
        getStateColor={getStateColor}
        handleWithIntervalTime={handleWithIntervalTime}
        stateText={stateText}
        time={time}
        currentStateIndex={currentStateIndex}
        getTimerText={getTimerText}
        changeWorkingState={changeWorkingState}
        disabled={disabled}
      />
    </RcThemeProvider>,
  );
}

afterEach(async () => {
  wrapper.unmount();
});

const getAgentStateButton = () => {
  const RcButtonBase = wrapper.find('RcButtonBase').at(0);
  return {
    button: RcButtonBase,
    click: () => RcButtonBase.simulate('click'),
    text: RcButtonBase.find('[data-sign="stateName"]').text(),
  };
};

const getAgentStateList = () =>
  wrapper
    .find('RcMenu')
    .at(0)
    .find('RcMenuItem');

function getSelectedItem(): any {
  return getAgentStateList().find('li.Mui-selected');
}

describe('<WorkingStateSelect />', () => {
  it('when no initiative agent state', () => {
    const stateText = null;
    const currentStateIndex = -1;
    wrapper = setup({
      stateText,
      currentStateIndex,
    });
    const agentStateButton = getAgentStateButton();
    expect(agentStateButton.text).toBe('');

    agentStateButton.click();

    const selectedItems = getSelectedItem();
    expect(selectedItems).toHaveLength(0);
  });

  it('Can display initiative agent state', () => {
    const currentStateIndex = 3;
    const stateText = 'haha';
    wrapper = setup({
      currentStateIndex,
      stateText,
    });
    const agentStateButton = getAgentStateButton();
    expect(agentStateButton.text).toBe(stateText);
    agentStateButton.click();

    const agentStateList = getAgentStateList();
    expect(agentStateList).toHaveLength(agentStates.length);

    const selectedItems = getSelectedItem();
    expect(selectedItems).toHaveLength(1);

    expect(agentStateList.at(currentStateIndex).prop('selected')).toBeTruthy();
  });

  it('User can select from agent state list to change', async () => {
    jest.useFakeTimers();
    const changeWorkingState = jest.fn(() => {});
    const currentStateIndex = 3;

    wrapper = setup({
      changeWorkingState,
    });

    act(() => jest.advanceTimersByTime(2100));

    getAgentStateButton().click();
    getAgentStateList()
      .at(currentStateIndex)
      .simulate('click');

    const currentState = agentStates[currentStateIndex];
    expect(changeWorkingState).toBeCalledWith(currentState);
  });

  it('Time label will update itself in every minute', async () => {
    jest.useFakeTimers();
    const handleWithIntervalTime = jest.fn(() => {});
    const time = Date.now();

    wrapper = setup({
      time,
      handleWithIntervalTime,
    });

    const timer = wrapper.find('[data-sign="timer"]');

    act(() => jest.runOnlyPendingTimers());
    const calledIntervalTime1 = Number(timer.text());

    act(() => jest.runOnlyPendingTimers());
    const calledIntervalTime2 = Number(timer.text());

    act(() => jest.runOnlyPendingTimers());
    const calledIntervalTime3 = Number(timer.text());

    expect(calledIntervalTime2).toBeGreaterThan(calledIntervalTime1);
    expect(calledIntervalTime3).toBeGreaterThan(calledIntervalTime2);
  });

  it('When disabled, click WorkingStateButton should has no response', async () => {
    jest.useFakeTimers();
    wrapper = setup({
      disabled: true,
    });
    const agentStateButton = getAgentStateButton();
    expect(agentStateButton.button.prop('disabled')).toBe(true);
    agentStateButton.click();
    expect(getAgentStateList()).toHaveLength(0);
  });
});
