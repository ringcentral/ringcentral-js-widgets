import { RcThemeProvider, DeepPartial } from '@ringcentral-integration/rcui';
import { mount } from 'enzyme';
import React from 'react';

import { EvCallData } from '../../interfaces';
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
    isHold: true,
  },
] as any;

function setup({
  goBack = () => {},
  callList = defaultCallList,
  onHangup = () => {},
  onUnHold = () => {},
  onHold = () => {},
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
      />
    </RcThemeProvider>,
  );
}

afterEach(async () => {
  wrapper.unmount();
});

const getHoldButton = (itemIndex) => {
  const callItem = wrapper.find('[data-sign="callItem"]').at(itemIndex);
  const button = callItem.find('HoldCallButton').find('button');
  return {
    title: callItem.find('CircleIconButton[data-icon="hold"]').prop('title'),
    click: () => button.simulate('click'),
  };
};

const getHandUpButton = (itemIndex) => {
  const callItem = wrapper.find('[data-sign="callItem"]').at(itemIndex);
  const button = callItem.find('HandUpButton').find('button');
  return {
    title: callItem.find('CircleIconButton[data-icon="hand-up"]').prop('title'),
    click: () => button.simulate('click'),
  };
};
describe('<ActiveCallListPanel />', async () => {
  it('Display Back Button and when user click it, function goBack will be called', () => {
    const goBack = jest.fn();
    wrapper = setup({ goBack });
    wrapper
      .find('[data-sign="backButton"]')
      .at(0)
      .find('button')
      .simulate('click');
    expect(goBack).toBeCalled();
  });

  it('When there is no call, can render corrently', () => {
    const callList = [];
    wrapper = setup({
      callList,
    });
    expect(wrapper.find('[data-sign="callList"]').text()).toBe('');
  });

  it('when call is onhold can render correctly', () => {
    const onHold = jest.fn();
    const onUnHold = jest.fn();
    const itemIndex = 2;
    wrapper = setup({
      onHold,
      onUnHold,
    });
    const holdButton = getHoldButton(itemIndex);
    expect(holdButton.title).toBe(i18n.getString('onHold'));
    holdButton.click();
    expect(onHold).not.toBeCalled();
    expect(onUnHold).toBeCalledWith(defaultCallList[itemIndex]);
  });

  it('when call is unhold can render correctly', () => {
    const onHold = jest.fn();
    const onUnHold = jest.fn();
    const itemIndex = 1;
    wrapper = setup({ onHold, onUnHold });
    const holdButton = getHoldButton(itemIndex);
    expect(holdButton.title).toBe(i18n.getString('hold'));
    holdButton.click();
    expect(onHold).toBeCalledWith(defaultCallList[itemIndex]);
    expect(onUnHold).not.toBeCalled();
  });

  it('HandUpButton can render correctly', () => {
    const onHangup = jest.fn();
    const itemIndex = 0;
    wrapper = setup({ onHangup });
    const handUpButton = getHandUpButton(itemIndex);
    expect(handUpButton.title).toBe(i18n.getString('hangup'));
    handUpButton.click();
    expect(onHangup).toBeCalledWith(defaultCallList[itemIndex]);
  });
});
