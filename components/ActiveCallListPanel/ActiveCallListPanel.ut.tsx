import React from 'react';

import { mount } from 'enzyme';

import type { StepFunction } from '@ringcentral-integration/test-utils';
import type { DeepPartial } from '@ringcentral/juno';
import { RcThemeProvider } from '@ringcentral/juno';

import type { EvCallData } from '../../interfaces';
import i18n from '../SmallCallControl/i18n';
import { ActiveCallListPanel } from './ActiveCallListPanel';

let wrapper;
const currentLocale = 'en-US';
const defaultCallList: DeepPartial<EvCallData>[] = [
  {
    session: {
      sessionId: '5001',
    },
    isHold: true,
  },
  {
    session: {
      sessionId: '5002',
    },
    isHold: false,
  },
  {
    session: {
      sessionId: '5003',
    },
    isHold: false,
  },
] as any;

function setup({
  goBack = () => {},
  callList = defaultCallList,
  onHangup = () => {},
  onUnHold = () => {},
  onHold = () => {},
  onMute = () => {},
  onUnmute = () => {},
  isOnMute = false,
  showMuteButton = true,
  userName = '',
  isInbound = false,
} = {}) {
  return mount(
    <RcThemeProvider>
      <ActiveCallListPanel
        currentLocale={currentLocale}
        goBack={goBack}
        callList={callList as any}
        onHangup={onHangup}
        onUnHold={onUnHold}
        onHold={onHold}
        onMute={onMute}
        onUnmute={onUnmute}
        isOnMute={isOnMute}
        showMuteButton={showMuteButton}
        userName={userName}
        isInbound={isInbound}
      />
    </RcThemeProvider>,
  );
}

export const wrapperUnmount = () => {
  wrapper.unmount();
};

const getControlButton = ({ itemIndex, buttonType, dataIcon }) => {
  const callItem = wrapper.find('[data-sign="callItem"]').at(itemIndex);
  const button = callItem.find(buttonType).find('button');
  return {
    title: button.prop('title'),
    click: () => button.simulate('click'),
  };
};

export const UTGoBackPage: StepFunction = async () => {
  const goBack = jest.fn();
  wrapper = setup({ goBack });
  wrapper
    .find('[data-sign="backButton"]')
    .at(0)
    .find('button')
    .simulate('click');
  expect(goBack).toBeCalled();
  wrapperUnmount();
};

export const UTNoCall: StepFunction = () => {
  const callList = [];
  wrapper = setup({
    callList,
  });
  expect(wrapper.find('[data-sign="callList"]').text()).toBe('');
  wrapperUnmount();
};

export const UTHoldRender: StepFunction = () => {
  const onHold = jest.fn();
  const onUnHold = jest.fn();
  const itemIndex = 0;
  wrapper = setup({
    onHold,
    onUnHold,
  });
  const holdButton = getControlButton({
    itemIndex: itemIndex + 1,
    buttonType: 'HoldCallButton',
    dataIcon: 'hold',
  });
  expect(holdButton.title).toBe(i18n.getString('onHold'));
  holdButton.click();
  expect(onHold).not.toBeCalled();
  expect(onUnHold).toBeCalledWith(defaultCallList[itemIndex]);
  wrapperUnmount();
};

export const UTUnholdRender: StepFunction = () => {
  const onHold = jest.fn();
  const onUnHold = jest.fn();
  const itemIndex = 2;
  wrapper = setup({ onHold, onUnHold });
  const holdButton = getControlButton({
    itemIndex: itemIndex + 1,
    buttonType: 'HoldCallButton',
    dataIcon: 'hold',
  });
  expect(holdButton.title).toBe(i18n.getString('hold'));
  holdButton.click();
  expect(onHold).toBeCalledWith(defaultCallList[itemIndex]);
  expect(onUnHold).not.toBeCalled();
  wrapperUnmount();
};

export const UTHangUpRender: StepFunction = () => {
  const onHangup = jest.fn();
  const itemIndex = 0;
  wrapper = setup({ onHangup });
  const HangUpButton = getControlButton({
    itemIndex,
    buttonType: 'HangUpButton',
    dataIcon: 'hand-up',
  });
  expect(HangUpButton.title).toBe(i18n.getString('hangup'));
  HangUpButton.click();
  expect(onHangup).toBeCalledWith(defaultCallList[itemIndex]);
  wrapperUnmount();
};

export const UTMuteRender: StepFunction = () => {
  const onMute = jest.fn();
  wrapper = setup({ onMute, isOnMute: false, showMuteButton: true });
  const muteButton = getControlButton({
    itemIndex: 2,
    buttonType: 'MuteCallButton',
    dataIcon: 'mic',
  });
  expect(muteButton.title).toBe(i18n.getString('mute'));
  muteButton.click();
  expect(onMute).toBeCalledTimes(1);
  wrapperUnmount();
};

export const UTUnMuteRender: StepFunction = () => {
  const onUnmute = jest.fn();
  wrapper = setup({ onUnmute, isOnMute: true, showMuteButton: true });
  const unMuteButton = getControlButton({
    itemIndex: 2,
    buttonType: 'MuteCallButton',
    dataIcon: 'mic-off',
  });
  expect(unMuteButton.title).toBe(i18n.getString('unmute'));
  unMuteButton.click();
  expect(onUnmute).toBeCalledTimes(1);
  wrapperUnmount();
};
