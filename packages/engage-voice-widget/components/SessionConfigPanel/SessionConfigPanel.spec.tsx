import React from 'react';
import { RcThemeProvider } from '@ringcentral-integration/rcui';
import { mount } from 'enzyme';
import { SessionConfigPanel } from './SessionConfigPanel';
import {
  EvSessionConfigUIFunctions,
  EvSessionConfigUIProps,
} from '../../interfaces/EvSessionConfigUI.interface';

export type SessionConfigPanelProps = EvSessionConfigUIProps &
  EvSessionConfigUIFunctions;

let wrapper;
const currentLocale = 'en-US';
const defaultSkillProfileList = [
  {
    profileId: '1001',
    profileName: 'Work',
    isDefault: '1',
    profileDesc: 'like to work',
  },
  {
    profileId: '1002',
    profileName: 'eat',
    isDefault: '1',
    profileDesc: 'fat man',
  },
  {
    profileId: '1003',
    profileName: 'play',
    isDefault: '1',
    profileDesc: 'like to work',
  },
];
const defaultLoginTypeList = [
  {
    label: 'externalPhone',
    id: '101',
  },
  {
    label: 'externalPhone2',
    id: '102',
  },
];

function setup({
  selectedSkillProfileId = '1002',
  skillProfileList = defaultSkillProfileList,
  setSkillProfileId = () => {},
  loginTypeList = defaultLoginTypeList,
  loginType = '102',
  setLoginType = () => {},
  extensionNumber = '',
  setExtensionNumber = () => {},
  takingCall = false,
  setTakingCall = () => {},
  autoAnswer = true,
  setAutoAnswer = () => {},
  setConfigure = () => null,
  inboundQueuesFieldText = '',
  isLoading = false,
  isExtensionNumber = false,
  navigateToInboundQueuesPage = () => {},
}: Partial<SessionConfigPanelProps>) {
  return mount(
    <RcThemeProvider>
      <SessionConfigPanel
        currentLocale={currentLocale}
        selectedSkillProfileId={selectedSkillProfileId}
        skillProfileList={skillProfileList}
        setSkillProfileId={setSkillProfileId}
        loginTypeList={loginTypeList}
        loginType={loginType}
        setLoginType={setLoginType}
        extensionNumber={extensionNumber}
        setExtensionNumber={setExtensionNumber}
        takingCall={takingCall}
        setTakingCall={setTakingCall}
        autoAnswer={autoAnswer}
        setAutoAnswer={setAutoAnswer}
        setConfigure={setConfigure}
        inboundQueuesFieldText={inboundQueuesFieldText}
        isExtensionNumber={isExtensionNumber}
        isLoading={isLoading}
        navigateToInboundQueuesPage={navigateToInboundQueuesPage}
      />
    </RcThemeProvider>,
  );
}

const getConfigureButton = () =>
  wrapper
    .find('RcButton[data-sign="setConfigure"]')
    .at(0)
    .find('button');

afterEach(async () => {
  wrapper.unmount();
});

describe('<SessionConfigPanel />', async () => {
  it("Page display user's selected Inbound queue, and navigate to InboundQueuesPage when click the field.", () => {
    const navigateToInboundQueuesPage = jest.fn();
    const inboundQueuesFieldText = 'AmyTestQueue';
    wrapper = setup({
      inboundQueuesFieldText,
      navigateToInboundQueuesPage,
    });
    const inboundQueuesField = wrapper
      .find('RcTextField[data-sign="inboundQueues"]')
      .at(0)
      .find('input')
      .at(0);

    expect(inboundQueuesField.prop('value')).toEqual(inboundQueuesFieldText);
    inboundQueuesField.simulate('click');
    expect(navigateToInboundQueuesPage).toBeCalled();
  });

  it('Can display extensionNumber correctly, and can be changed.', () => {
    const setExtensionNumber = jest.fn();
    const extensionNumber = '65787344333';
    wrapper = setup({
      setExtensionNumber,
      extensionNumber,
      isExtensionNumber: true,
    });

    const extensionNumberFieldFn = () =>
      wrapper
        .find('RcTextField[data-sign="extensionNumber"]')
        .at(0)
        .find('input')
        .at(0);
    const extensionNumberField = extensionNumberFieldFn();

    expect(extensionNumberField.prop('value')).toEqual(extensionNumber);

    const newExtensionNumber = '65787344366';
    extensionNumberField.simulate('change', {
      target: { value: newExtensionNumber },
    });
    expect(setExtensionNumber).toBeCalledWith(newExtensionNumber);

    wrapper = setup({
      setExtensionNumber,
      extensionNumber,
      isExtensionNumber: false,
    });
    const extensionNumberField2 = extensionNumberFieldFn();

    expect(extensionNumberField2).toHaveLength(0);
  });

  // [true, false].forEach((takingCall) => {
  //   it(`When click the takingCall, setTakingCall to be called. (with initial state: ${takingCall})`, () => {
  //     const setTakingCall = jest.fn();
  //     wrapper = setup({
  //       takingCall,
  //       setTakingCall,
  //     });
  //     const takingCallToggle = wrapper
  //       .find('ToggleButton[data-sign="takingCall"]')
  //       .at(0)
  //       .find('input[type="checkbox"]')
  //       .at(0);
  //     expect(takingCallToggle.prop('checked')).toEqual(takingCall);
  //     takingCallToggle.simulate('change', { target: { value: !takingCall } });
  //     expect(setTakingCall).toBeCalledWith(!takingCall);
  //   });
  // });

  // [true, false].forEach((autoAnswer) => {
  //   it(`When click the autoAnswer, setAutoAnswer to be called. (with initial state: ${autoAnswer})`, () => {
  //     const setAutoAnswer = jest.fn();
  //     wrapper = setup({
  //       autoAnswer,
  //       setAutoAnswer,
  //     });
  //     const autoAnswerToggle = wrapper
  //       .find('ToggleButton[data-sign="autoAnswer"]')
  //       .at(0)
  //       .find('input[type="checkbox"]')
  //       .at(0);
  //     expect(autoAnswerToggle.prop('checked')).toEqual(autoAnswer);
  //     autoAnswerToggle.simulate('change', { target: { value: !autoAnswer } });
  //     expect(setAutoAnswer).toBeCalledWith(!autoAnswer);
  //   });
  // });

  it('When user click setConfigure Button, setConfigure is to be called', () => {
    const setConfigure = jest.fn();
    wrapper = setup({
      setConfigure,
    });
    const configureButton = getConfigureButton();
    configureButton.simulate('click');
    expect(setConfigure).toBeCalled();
  });

  it('When loading, setConfigure Button is in loading state, and setConfigure cannot be fired', () => {
    const setConfigure = jest.fn();
    const isLoading = true;
    wrapper = setup({
      setConfigure,
      isLoading,
    });
    const configureButton = getConfigureButton();
    expect(configureButton.find('RcCircularProgress')).toHaveLength(1);
    expect(configureButton.prop('disabled')).toBe(isLoading);
    configureButton.simulate('click');
    expect(setConfigure).not.toBeCalled();
  });

  it('Can display skillProfile correctly, and can be changed.', () => {
    const setSkillProfileId = jest.fn();
    const selectedSkillProfileId = '1002';
    wrapper = setup({
      setSkillProfileId,
      selectedSkillProfileId,
    });
    const skillProfilePickList = wrapper.find(
      'PickList[data-sign="skillProfile"]',
    );

    expect(skillProfilePickList.prop('value')).toBe(selectedSkillProfileId);
    expect(skillProfilePickList.find('[role="button"]').text()).toBe(
      defaultSkillProfileList.find(
        (x) => x.profileId === selectedSkillProfileId,
      ).profileName,
    );
    expect(skillProfilePickList.prop('options')).toHaveLength(
      defaultSkillProfileList.length,
    );
    const userSelectedSkillProfileId = '1003';

    skillProfilePickList.find('[role="button"]').simulate('click');
    document.body
      .querySelector<HTMLButtonElement>(
        `li[data-value="${userSelectedSkillProfileId}"]`,
      )
      .click();
    expect(setSkillProfileId).toBeCalledWith(userSelectedSkillProfileId);
  });

  it('Can display loginType correctly, and can be changed.', () => {
    const setLoginType = jest.fn();
    const loginType = '102';
    wrapper = setup({
      setLoginType,
      loginType,
    });
    const loginTypePickList = wrapper.find('PickList[data-sign="loginType"]');

    expect(loginTypePickList.prop('value')).toBe(loginType);
    expect(loginTypePickList.find('[role="button"]').text()).toBe(
      defaultLoginTypeList.find((x) => x.id === loginType).label,
    );
    const changeLoginType = '101';
    loginTypePickList.find('[role="button"]').simulate('click');
    const menuItems = document.body.querySelectorAll(
      '[role="presentation"] li[role="option"]',
    );
    expect(menuItems).toHaveLength(defaultLoginTypeList.length);
    document.body
      .querySelector<HTMLButtonElement>(`li[data-value="${changeLoginType}"]`)
      .click();
    expect(setLoginType).toBeCalledWith(changeLoginType);
  });
});
