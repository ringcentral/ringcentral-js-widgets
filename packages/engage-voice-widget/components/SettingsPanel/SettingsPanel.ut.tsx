import React from 'react';
import { RcThemeProvider } from '@ringcentral/juno';
import { mount } from 'enzyme';
import { StepFunction } from 'crius-test';

import { SettingsPanel, SettingsPanelProps } from '.';

let wrapper;
const defaultSessionInfo = [
  {
    label: 'Phone',
    value: '6508498195',
  },
  {
    label: 'Login style',
    value: 'INBOUND',
  },
  {
    label: 'Login time',
    value: '7/20/20 9:20 AM',
  },
  {
    label: 'Skill profile',
    value: 'bella',
  },
];

const defaultAgentName = 'Kiwi Lin';
const defaultUserName = 'kiwi.lin+11564+15240001_1364338@ringcentral.com';

function setup({
  currentLocale = 'en-US',
  onLogout = () => new Promise((resolve) => resolve()),
  version = '',
  goToSessionUpdatePage = () => {},
  sessionInfo = defaultSessionInfo,
  agentName = defaultAgentName,
  userName = defaultUserName,
  disableEditSessionButton = false,
  showEditSessionIcon = true,
}: Partial<SettingsPanelProps>) {
  return mount(
    <RcThemeProvider>
      <SettingsPanel
        currentLocale={currentLocale}
        onLogout={onLogout}
        version={version}
        goToSessionUpdatePage={goToSessionUpdatePage}
        sessionInfo={sessionInfo}
        agentName={agentName}
        userName={userName}
        disableEditSessionButton={disableEditSessionButton}
        showEditSessionIcon={showEditSessionIcon}
      />
    </RcThemeProvider>,
  );
}

export const UTCheckOptionsRender: StepFunction = async () => {
  wrapper = setup({});
  expect(wrapper.find('[data-sign="editSession"]').exists()).toBeTruthy();
  expect(wrapper.find('[title="Edit"]').exists()).toBeTruthy();
  expect(wrapper.find('[data-sign="logout"]').exists()).toBeTruthy();
};

export const UTRenderSessionInfo: StepFunction = () => {
  wrapper = setup({});
  expect(wrapper.find('.agentName').text()).toBe(defaultAgentName);
  expect(wrapper.find('.userName').text()).toBe(defaultUserName);
  const infoItem = wrapper.find('.infoItem');
  for (let i = 0; i < defaultSessionInfo.length; i++) {
    expect(infoItem.at(i).find('.label').first().text()).toBe(
      defaultSessionInfo[i].label,
    );
    expect(infoItem.at(i).find('.value').first().text()).toBe(
      defaultSessionInfo[i].value,
    );
  }
};
