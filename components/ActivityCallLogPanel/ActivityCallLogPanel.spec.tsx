import React from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import { RcAccordion } from '@ringcentral/juno/components/Accordion';
import { RcAccordionSummary } from '@ringcentral/juno/components/Accordion/AccordionSummary';
import { mount } from 'enzyme';
import {
  ActivityCallLogPanel,
  ActivityCallLogPanelProps,
} from './ActivityCallLogPanel';
import i18n from '../SmallCallControl/i18n';
import { EvCallData, EvCurrentLog, EvIvrData } from '../../interfaces';

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
const defaultIVRAlertData: EvIvrData[] = [
  { subject: 'I am subject 1', body: 'I am body 1' },
  { subject: 'I am subject 2', body: 'I am body 2' },
  { subject: 'I am subject 3', body: 'I am body 3' },
];

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
    disableInternalTransfer = false,
    onActive = () => {},
    showMuteButton = false,
    ivrAlertData = defaultIVRAlertData,
    showSmallCallControl = true,
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
        disableInternalTransfer={disableInternalTransfer}
        showMuteButton={showMuteButton}
        ivrAlertData={ivrAlertData}
        onCopySuccess={() => {}}
        showSmallCallControl={showSmallCallControl}
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
    title: isExist && button.find('button').prop('title'),
    isDisabled: isExist && !!button.find('button').render().attr('disabled'),
  };
};

describe('<ActivityCallLogPanel />:: Call Disposition', () => {
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

describe('<ActivityCallLogPanel />', () => {
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
    expect(onUnHold).not.toBeCalled();
    expect(onHold).toBeCalled();
  });

  [
    {
      isIntegratedSoftphone: true,
      muteCallButtonNumber: 1,
    },
    {
      isIntegratedSoftphone: false,
      muteCallButtonNumber: 0,
    },
  ].map(({ isIntegratedSoftphone, muteCallButtonNumber }) =>
    it(`When the call is IntegratedSoftphone is ${isIntegratedSoftphone}, can see ${muteCallButtonNumber} mute button`, () => {
      wrapper = setup({ showMuteButton: isIntegratedSoftphone });
      expect(wrapper.find('MuteCallButton').find('button').length).toBe(
        muteCallButtonNumber,
      );
    }),
  );

  it('When call is OnMute, MuteCallButton should display and work correctly', () => {
    const onMute = jest.fn();
    const onUnmute = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      onMute,
      onUnmute,
      isOnMute: true,
      showMuteButton: true,
    });
    const muteButton = getControlButton('MuteCallButton');
    muteButton.click();

    expect(muteButton.title).toBe(i18n.getString('unmute'));
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
      showMuteButton: true,
    });
    const muteButton = getControlButton('MuteCallButton');
    muteButton.click();
    expect(muteButton.title).toBe(i18n.getString('mute'));
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

  it('When user has multiple calls, display ActiveCallButton, not HangUpButton', () => {
    const onActive = jest.fn();
    wrapper = setup({
      status: 'active',
      saveStatus: 'submit',
      isOnActive: true,
      onActive,
    });

    expect(wrapper.find('ActiveCallButton')).toHaveLength(1);
    expect(getControlButton('HangUpButton').isExist).toBe(false);
    expect(
      wrapper.find('ActiveCallButton').find('button').hasClass('buttonActive'),
    ).toBe(true);

    wrapper.find('ActiveCallButton').find('button').simulate('click');
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
    const hangupButton = getControlButton('HangUpButton');
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
    const hangupButton = getControlButton('HangUpButton');
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
      domTag: 'HangUpButton',
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
        showMuteButton: true,
      });
      expect(wrapper.find(domTag).find('button').prop('disabled')).toBe(true);
    }),
  );

  [
    { ivrAlertData: [] },
    {
      ivrAlertData: [{ subject: 'I am subject 1', body: 'I am body 1' }],
      subject: 'I am subject 1',
    },
    {
      ivrAlertData: [
        { subject: 'I am subject 1', body: 'I am body 1' },
        { subject: 'I am subject 2', body: 'I am body 2' },
      ],
      subject: 'I am subject 1 +1',
    },
    {
      ivrAlertData: [
        { subject: 'I am subject 1', body: 'I am body 1' },
        { subject: 'I am subject 2', body: 'I am body 2' },
        { subject: 'I am subject 3', body: 'I am body 3' },
      ],
      subject: 'I am subject 1 +2',
    },
  ].map(({ ivrAlertData, subject }) => {
    it(`Verify ivr panel display of ${subject}`, () => {
      wrapper = setup({ ivrAlertData });
      if (ivrAlertData.length === 0) {
        expect(wrapper.find('.ivrPanel').exists()).toBeFalsy();
      } else {
        const item = wrapper.find('.item');
        for (let i = 0; i < ivrAlertData.length; i++) {
          if (i !== 0) {
            expect(item.at(i).find('.subject').text()).toBe(
              ivrAlertData[i].subject,
            );
            expect(item.at(i).find('.body').text()).toBe(ivrAlertData[i].body);
          } else {
            expect(item.at(0).find('.body').text()).toBe(ivrAlertData[0].body);
          }
        }
        expect(wrapper.find(RcAccordionSummary).text()).toBe(subject);
      }
    });

    it('When the call is end, ivr panel should be shrunk', () => {
      wrapper = setup({
        status: 'active',
      });
      wrapper.find(RcAccordionSummary).find('RcIcon').simulate('click');
      wrapper.update();
      expect(wrapper.find(RcAccordion).find('.expanded').exists()).toBeTruthy();
      wrapper = setup({
        status: 'callEnd',
      });
      wrapper.update();
      expect(wrapper.find(RcAccordion).find('.expanded').exists()).toBeFalsy();
    });
    return null;
  });
});
