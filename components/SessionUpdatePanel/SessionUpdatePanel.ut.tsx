import React from 'react';

import { mount } from 'enzyme';

import { StepFunction } from '@ringcentral-integration/test-utils';
import { RcThemeProvider } from '@ringcentral/juno';

import {
  SessionUpdatePanel,
  SessionUpdatePanelProps,
} from './SessionUpdatePanel';

let wrapper;
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
  currentLocale = 'en-US',
  goToSettingsPageWhetherSessionChanged = () => {},
  onSaveUpdate = () => {},
  selectedSkillProfileId = '1002',
  skillProfileList = defaultSkillProfileList,
  setSkillProfileId = () => {},
  loginTypeList = defaultLoginTypeList,
  loginType = '102',
  setLoginType = () => {},
  autoAnswer = true,
  setAutoAnswer = () => {},
  extensionNumber = '',
  setExtensionNumber = () => {},
  inboundQueuesFieldText = '',
  isExtensionNumber = false,
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
}: Partial<SessionUpdatePanelProps>) {
  return mount(
    <RcThemeProvider>
      <SessionUpdatePanel
        currentLocale={currentLocale}
        goToSettingsPageWhetherSessionChanged={
          goToSettingsPageWhetherSessionChanged
        }
        onSaveUpdate={onSaveUpdate}
        selectedSkillProfileId={selectedSkillProfileId}
        skillProfileList={skillProfileList}
        setSkillProfileId={setSkillProfileId}
        loginTypeList={loginTypeList}
        loginType={loginType}
        setLoginType={setLoginType}
        autoAnswer={autoAnswer}
        setAutoAnswer={setAutoAnswer}
        extensionNumber={extensionNumber}
        setExtensionNumber={setExtensionNumber}
        inboundQueuesFieldText={inboundQueuesFieldText}
        isExtensionNumber={isExtensionNumber}
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

export const UTRenderUpdateSessionBtns: StepFunction = () => {
  wrapper = setup({});
  expect(wrapper.find('[data-sign="saveUpdate"]').exists()).toBeTruthy();
  expect(wrapper.find('[data-sign="cancel"]').exists()).toBeTruthy();
};
