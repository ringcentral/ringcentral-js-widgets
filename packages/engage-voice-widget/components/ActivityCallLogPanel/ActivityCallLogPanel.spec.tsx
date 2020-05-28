import React from 'react';
import { RcThemeProvider } from '@ringcentral-integration/rcui';
import { mount } from 'enzyme';
import {
  ActivityCallLogPanel,
  ActivityCallLogPanelProps,
} from './ActivityCallLogPanel';
import i18n from '../SmallCallControl/i18n';
import { EvCallData, EvCurrentLog } from '../../interfaces';

let wrapper;
const currentLocale = 'en-US';
const defaultCurrentEvCall: EvCallData = {
  queue: { name: 'dadaqueue' },
  dnis: '6508653454',
  uii: '934579223556776',
  termParty: 'call termed',
  termReason: 'a term reason',
  timestamp: 1579223556776,
} as any;
const defaultCurrentLog: EvCurrentLog = {
  call: {
    direction: 'INBOUND',
    from: { name: 'aermin', phoneNumber: '6508655678' },
    to: { name: 'Amy liu', phoneNumber: '6508651234' },
  },
} as any;

function setup(
  {
    currentEvCall = defaultCurrentEvCall,
    currentLog = defaultCurrentLog,
    disposeCall = () => null,
    status = 'active' as ActivityCallLogPanelProps['status'],
    saveStatus = 'submit' as ActivityCallLogPanelProps['saveStatus'],
    goToRequeueCallPage = () => {},
    goToTransferCallPage = () => {},
    onMute = () => {},
    onUnmute = () => {},
    onHangup = () => {},
    onReject = () => {},
    onHold = () => {},
    onUnHold = () => {},
    isOnMute = false,
    isOnHold = false,
    smallCallControlSize = 'medium' as ActivityCallLogPanelProps['smallCallControlSize'],
    isInComingCall = false,
    disableDispose = false,
    disableHold = false,
    disableHangup = false,
    disableMute = false,
    disableActive = false,
    disableTransfer = false,
    currentCallControlPermission: {
      allowTransferCall = true,
      allowRequeueCall = true,
    } = {},
    isOnActive = false,
    onActive = () => {},
  }: Partial<ActivityCallLogPanelProps> = {} as any,
) {
  return mount(
    <RcThemeProvider>
      <ActivityCallLogPanel
        isInbound
        currentLocale={currentLocale}
        currentEvCall={currentEvCall}
        currentLog={currentLog}
        disposeCall={disposeCall}
        status={status}
        saveStatus={saveStatus}
        goToRequeueCallPage={goToRequeueCallPage}
        goToTransferCallPage={goToTransferCallPage}
        onMute={onMute}
        onUnmute={onUnmute}
        onHangup={onHangup}
        onReject={onReject}
        onHold={onHold}
        onUnHold={onUnHold}
        isOnMute={isOnMute}
        isOnHold={isOnHold}
        smallCallControlSize={smallCallControlSize}
        isInComingCall={isInComingCall}
        disableDispose={disableDispose}
        disableHold={disableHold}
        disableHangup={disableHangup}
        disableMute={disableMute}
        disableActive={disableActive}
        disableTransfer={disableTransfer}
        currentCallControlPermission={{ allowTransferCall, allowRequeueCall }}
        isOnActive={isOnActive}
        onActive={onActive}
        goBack={() => {}}
      />
    </RcThemeProvider>,
  );
}

afterEach(async () => {
  wrapper.unmount();
});

const getDispositionButton = () => {
  const button = wrapper.find('RcButton[data-sign="submit"]');
  const isExist = button.length > 0;
  return {
    isExist,
    click: () => isExist && button.find('button').simulate('click'),
    isInLoadingStatus: isExist && button.find('RcCircularProgress').length > 0,
    isDisabled: isExist && button.prop('disabled'),
  };
};

const getControlButton = (type) => {
  const button = wrapper.find(type);
  const isExist = button.length > 0;
  return {
    isExist,
    click: () => isExist && button.find('button').simulate('click'),
    title: isExist && button.find('CircleIconButton').prop('title'),
    isActive: isExist && button.find('button').hasClass('buttonActive'),
    isDisabled: isExist && button.find('button').prop('disabled'),
  };
};

describe('<ActivityCallLogPanel />:: Call Disposition', async () => {
  const status = 'callEnd';
  it('When call is ended, user will on disposition page and can dispose the call', () => {
    const disposeCall = jest.fn();
    wrapper = setup({
      disposeCall,
      status,
      saveStatus: 'submit',
    });
    const dispositionButton = getDispositionButton();
    expect(dispositionButton.isExist).toBe(true);
    dispositionButton.click();
    expect(disposeCall).toBeCalled();
  });

  it('When User click the Disposition Button, Submit Button is in loading status and cannot be clicked', () => {
    const disposeCall = jest.fn();
    wrapper = setup({
      disposeCall,
      status,
      saveStatus: 'saving',
      disableDispose: true,
    });
    const dispositionButton = getDispositionButton();
    expect(dispositionButton.isInLoadingStatus).toBe(true);
    expect(dispositionButton.isDisabled).toBe(true);
    dispositionButton.click();
    expect(disposeCall).not.toBeCalled();
  });

  it('When disposition is saved, Submit Button is back in normal state: enabled and can be clicked', () => {
    const disposeCall = jest.fn();
    wrapper = setup({
      disposeCall,
      status,
      saveStatus: 'saved',
    });
    const dispositionButton = getDispositionButton();
    expect(dispositionButton.isInLoadingStatus).toBe(false);
    expect(dispositionButton.isDisabled).toBe(false);
    dispositionButton.click();
    expect(disposeCall).toBeCalled();
  });

  it('When disableDispose, Disposition Button should be disabled and cannot be clicked', () => {
    const disposeCall = jest.fn();
    wrapper = setup({
      status,
      saveStatus: 'saved',
      disableDispose: true,
    });
    const dispositionButton = getDispositionButton();
    expect(dispositionButton.isDisabled).toBe(true);
    dispositionButton.click();
    expect(disposeCall).not.toBeCalled();
  });
});

describe('<ActivityCallLogPanel />', async () => {
  it('When call is onHold, HoldCallButton should display and work correctly', () => {
    const onHold = jest.fn();
    const onUnHold = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      onHold,
      onUnHold,
      isOnHold: true,
    });
    const holdButton = getControlButton('HoldCallButton');
    holdButton.click();
    expect(holdButton.title).toBe(i18n.getString('onHold'));
    expect(holdButton.isActive).toBe(true);
    expect(onUnHold).toBeCalled();
    expect(onHold).not.toBeCalled();
  });

  it('When call is unHold, HoldCallButton should display and work correctly', () => {
    const onHold = jest.fn();
    const onUnHold = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      onHold,
      onUnHold,
      isOnHold: false,
    });
    const holdButton = getControlButton('HoldCallButton');
    holdButton.click();

    expect(holdButton.title).toBe(i18n.getString('hold'));
    expect(holdButton.isActive).toBe(false);
    expect(onUnHold).not.toBeCalled();
    expect(onHold).toBeCalled();
  });

  it('When call is OnMute, MuteCallButton should display and work correctly', () => {
    const onMute = jest.fn();
    const onUnmute = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      onMute,
      onUnmute,
      isOnMute: true,
    });
    const muteButton = getControlButton('MuteCallButton');
    muteButton.click();

    expect(muteButton.title).toBe(i18n.getString('unmute'));
    expect(muteButton.isActive).toBe(true);
    expect(onUnmute).toBeCalled();
    expect(onMute).not.toBeCalled();
  });

  it('When call is unMute, MuteCallButton should display and work correctly', () => {
    const onMute = jest.fn();
    const onUnmute = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      onMute,
      onUnmute,
      isOnMute: false,
    });
    const muteButton = getControlButton('MuteCallButton');
    muteButton.click();
    expect(muteButton.title).toBe(i18n.getString('mute'));
    expect(muteButton.isActive).toBe(false);
    expect(onUnmute).not.toBeCalled();
    expect(onMute).toBeCalled();
  });

  it('User can transfer an Call', () => {
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
    });
    expect(getControlButton('TransferCallButton').isDisabled).toBe(false);
  });

  it('When User has mutiple calls, should hightlight transfer button', () => {
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      isOnActive: true,
    });
    const transferButton = getControlButton('TransferCallButton');
    expect(transferButton.isActive).toBe(true);
    expect(transferButton.isDisabled).toBe(false);
  });

  it("When not allow to transfer or requeue a call, then shouldn't be able to", () => {
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      disableTransfer: true,
    });
    expect(getControlButton('TransferCallButton').isDisabled).toBe(true);
  });

  it('when user not allow to Requeue a Call', () => {
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      currentCallControlPermission: {
        allowRequeueCall: false,
      },
    });
    getControlButton('TransferCallButton').click();
    expect(
      wrapper
        .find('RcMenuItem[data-sign="transferItem-queueTransfer"]')
        .prop('disabled'),
    ).toBe(true);
    // for simulate issue: https://github.com/enzymejs/enzyme/issues/386
  });

  it('when user not allow to Transfer a Call', () => {
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      currentCallControlPermission: {
        allowTransferCall: false,
      },
    });
    getControlButton('TransferCallButton').click();
    expect(
      wrapper
        .find('RcMenuItem[data-sign="transferItem-internalTransfer"]')
        .prop('disabled'),
    ).toBe(true);
    // for simulate issue: https://github.com/enzymejs/enzyme/issues/386
  });

  it('When user has multiple calls, display ActiveCallButton, not HandUpButton', () => {
    const onActive = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      isOnActive: true,
      onActive,
    });

    expect(wrapper.find('ActiveCallButton')).toHaveLength(1);
    expect(getControlButton('HandUpButton').isExist).toBe(false);
    expect(
      wrapper
        .find('ActiveCallButton')
        .find('button')
        .hasClass('buttonActive'),
    ).toBe(true);

    wrapper
      .find('ActiveCallButton')
      .find('button')
      .simulate('click');
    expect(onActive).toBeCalled();
  });

  it('When user on the InComing Call, can see the Reject Button', () => {
    const onReject = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      isInComingCall: true,
      onReject,
    });
    const hangupButton = getControlButton('HandUpButton');
    expect(hangupButton.title).toBe(i18n.getString('reject'));
    hangupButton.click();
    expect(onReject).toBeCalled();
  });

  it('When the call is not InComing Call, can see the Hangup button', () => {
    const onHangup = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      isInComingCall: false,
      onHangup,
    });
    const hangupButton = getControlButton('HandUpButton');
    expect(hangupButton.title).toBe(i18n.getString('hangup'));
    hangupButton.click();
    expect(onHangup).toBeCalled();
  });

  [
    {
      disableControl: 'disableHold',
      domTag: 'HoldCallButton',
    },
    {
      disableControl: 'disableHangup',
      domTag: 'HandUpButton',
    },
    {
      disableControl: 'disableMute',
      domTag: 'MuteCallButton',
    },
    {
      disableControl: 'disableActive',
      domTag: 'ActiveCallButton',
    },
  ].map(({ disableControl, domTag }) =>
    it(`Verify permission of ${disableControl}`, () => {
      wrapper = setup({
        status: 'active',
        saveStatus: 'submit',
        [disableControl]: true,
        isOnActive: disableControl === 'disableActive',
      });
      expect(
        wrapper
          .find(domTag)
          .find('button')
          .prop('disabled'),
      ).toBe(true);
    }),
  );
});
