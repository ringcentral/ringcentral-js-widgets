import { mount } from 'enzyme';
import React from 'react';
import CallLogCallCtrl from '@ringcentral-integration/widgets/components/CallLogCallCtrlComponent';

const setup = (props) => {
  const ctrlPoprs = {
    callDirection: 'Outbound',
    callStatus: 'Ringing',
    currentLocale: 'en',
    disableLinks: false,
    isWide: true,
    isOnHold: false,
    isOnMute: false,
    onHangup() {},
    onMute() {},
    onReject() {},
    onTransfer() {},
    onUnHold() {},
    onUnmute() {},
    onHold() {},
    ...props,
  };
  const wrapper = mount(<CallLogCallCtrl {...ctrlPoprs} />);
  return wrapper;
};

describe('<CallLogCallCtrlComponent />', () => {
  it('Ringing call, mute button disabled', () => {
    const wrapper = setup({});
    expect(
      wrapper.find('svg[data-sign="mute"]').hasClass('buttonDisabled'),
    ).toBe(true);
    expect(wrapper.find('svg[data-sign="transfer"]').length).toBe(1);
    expect(wrapper.find('svg[data-sign="hold"]').length).toBe(1);
    expect(wrapper.find('svg[data-sign="hangup"]').length).toBe(1);
  });
  it('Connected call, mute button work', () => {
    const props = {
      callStatus: 'CallConnected',
    };
    const wrapper = setup(props);
    expect(
      wrapper.find('svg[data-sign="mute"]').hasClass('buttonDisabled'),
    ).toBe(false);
    expect(wrapper.find('svg[data-sign="transfer"]').length).toBe(1);
    expect(wrapper.find('svg[data-sign="hold"]').length).toBe(1);
    expect(wrapper.find('svg[data-sign="hangup"]').length).toBe(1);
  });
  it('Inbound ringing call, disable transfer and hold button', () => {
    const props = {
      callStatus: 'Ringing',
      callDirection: 'Inbound',
    };
    const wrapper = setup(props);
    expect(
      wrapper.find('svg[data-sign="transfer"]').hasClass('buttonDisabled'),
    ).toBe(true);
    expect(
      wrapper.find('svg[data-sign="hold"]').hasClass('buttonDisabled'),
    ).toBe(true);
  });
});
