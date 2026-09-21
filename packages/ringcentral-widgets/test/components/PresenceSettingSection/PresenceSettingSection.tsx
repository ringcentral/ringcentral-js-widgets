import type { StepFunction } from '@ringcentral-integration/test-utils';
import { render } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { PresenceSettingSection } from '../../../components/PresenceSettingSection';

export const PresenceSetting: StepFunction<{
  presenceListIndex: string;
}> = async ({ presenceListIndex }) => {
  const IconLineToggleShowButton = await screen.findByTestId(
    'statusToggleShow',
  );
  fireEvent.click(IconLineToggleShowButton);

  const { container } = render(
    <PresenceSettingSection
      showPresenceSettings
      isCallQueueMember
      dndStatus="TakeAllCalls"
      currentLocale="en-US"
      toggleAcceptCallQueueCalls={() => {}}
      userStatus="available"
      setAvailable={() => {}}
      setBusy={() => {}}
      setDoNotDisturb={() => {}}
      setInvisible={() => {}}
    />,
  );

  const IconLineSwitchButton = container
    .querySelector('[data-sign="acceptQueueSwitch"]')
    ?.querySelector('input');
  expect(IconLineSwitchButton).toBeInTheDocument();

  fireEvent.click(IconLineSwitchButton!);

  const status = document.querySelector(
    `[class*="presenceList"] [class*=RcListItem]:nth-child(${
      presenceListIndex + 1
    })`,
  );

  expect(status).toBeInTheDocument();
  fireEvent.click(status!);

  expect(IconLineSwitchButton).toBeInTheDocument();
  expect(IconLineToggleShowButton).toBeInTheDocument();
};
