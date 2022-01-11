import React from 'react';

import { mount } from 'enzyme';

import { RcThemeProvider } from '@ringcentral/juno';

import { EvAgent } from '../../lib/EvClient';
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

const defaultSelectedAgent: EvAgent = {
  accountId: '15240001',
  accountName: 'RC Internal QA C02',
  agentGroupId: null,
  agentId: '1364338',
  agentRank: null,
  agentType: 'AGENT',
  allowLoginControl: true,
  allowLoginUpdates: true,
  altDefaultLoginDest: null,
  directAgentExtension: null,
  email: 'kiwi.lin+11564@ringcentral.onmicrosoft.com',
  enableSoftphone: null,
  externalAgentId: null,
  firstName: 'Kiwi',
  ghostRnaAction: null,
  initLoginBaseState: null,
  lastName: 'Lin',
  location: null,
  manualOutboundDefaultCallerId: null,
  maxChats: null,
  password: null,
  phoneLoginPin: null,
  rcUserId: 62710741028,
  team: null,
  username: 'kiwi.lin+11564+15240001_1364338@ringcentral.com',
};

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
  autoAnswer = true,
  setAutoAnswer = () => {},
  searchOption,
  inboundQueues = [],
  submitInboundQueues,
  getAssignedInboundQueues = () => [],
  isAllAssign = () => true,
  isSeveralAssign = () => false,
  checkBoxOnChange,
  allCheckBoxOnChange,
  showInboundQueues = true,
  showSkillProfile = true,
  showAutoAnswer = true,
  onAccountReChoose = () => {},
  selectedAgent = defaultSelectedAgent,
  showReChooseAccount = true,
}: Partial<SessionConfigPanelProps>) {
  return mount(
    <RcThemeProvider>
      <SessionConfigPanel
        onAccountReChoose={onAccountReChoose}
        selectedAgent={selectedAgent}
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
        showReChooseAccount={showReChooseAccount}
        // takingCall={takingCall}
        // setTakingCall={setTakingCall}
        autoAnswer={autoAnswer}
        setAutoAnswer={setAutoAnswer}
        searchOption={searchOption}
        inboundQueues={inboundQueues}
        submitInboundQueues={submitInboundQueues}
        getAssignedInboundQueues={getAssignedInboundQueues}
        isAllAssign={isAllAssign}
        isSeveralAssign={isSeveralAssign}
        checkBoxOnChange={checkBoxOnChange}
        allCheckBoxOnChange={allCheckBoxOnChange}
        showInboundQueues={showInboundQueues}
        showSkillProfile={showSkillProfile}
        showAutoAnswer={showAutoAnswer}
      />
    </RcThemeProvider>,
  );
}

const getConfigureButton = () =>
  wrapper.find('RcButton[data-sign="setConfigure"]').at(0).find('button');

afterEach(async () => {
  wrapper.unmount();
});

describe('<SessionConfigPanel />', () => {
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
