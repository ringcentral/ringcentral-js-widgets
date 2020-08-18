import React from 'react';
import { RcThemeProvider } from '@ringcentral-integration/rcui';
import { mount } from 'enzyme';
import {
  SessionConfigPanel,
  SessionConfigPanelProps,
} from './SessionConfigPanel';

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
  setConfigure = () => null,
  inboundQueuesFieldText = '',
  isLoading = false,
  isExtensionNumber = false,
  // takingCall = false,
  // setTakingCall = () => {},
  // autoAnswer = true,
  // setAutoAnswer = () => {},
  resetFormGroup = () => {},
  searchOption,
  inboundQueues = [],
  submitInboundQueues,
  getAssignedInboundQueues = () => [],
  isAllAssign = () => true,
  isSeveralAssign = () => false,
  checkBoxOnChange,
  allCheckBoxOnChange,
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
        setConfigure={setConfigure}
        inboundQueuesFieldText={inboundQueuesFieldText}
        isExtensionNumber={isExtensionNumber}
        isLoading={isLoading}
        // takingCall={takingCall}
        // setTakingCall={setTakingCall}
        // autoAnswer={autoAnswer}
        // setAutoAnswer={setAutoAnswer}
        searchOption={searchOption}
        inboundQueues={inboundQueues}
        submitInboundQueues={submitInboundQueues}
        getAssignedInboundQueues={getAssignedInboundQueues}
        isAllAssign={isAllAssign}
        isSeveralAssign={isSeveralAssign}
        checkBoxOnChange={checkBoxOnChange}
        allCheckBoxOnChange={allCheckBoxOnChange}
        resetFormGroup={resetFormGroup}
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
});
