import { whenStateChange } from '@ringcentral-integration/core/test';
import postRcvBridgesBody from '@ringcentral-integration/mock/src/platform/data/postRcvBridges.json';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen, fireEvent, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Context } from '../../../interfaces';
import type { StepFunction } from '../../../lib/step';
import { SelectOptionFromDropDown } from '../../Common';
import type { RcvCheckboxDataSign } from '../Meeting.interface';

import { EnterRandomPassword } from './OperatePasswordField';

export const ClickCancelOnPopup: StepFunction = async () => {
  screen.getByText('Cancel').click();
};

export const ConfirmChangeToPMISetting: StepFunction = async () => {
  screen.getByTestId('pmiConfirm').click();
};

export const SwitchUsePersonalMeetingId: StepFunction = async () => {
  screen.getByTestId('usePersonalMeetingId').click();
};

export const SwitchToggle: StepFunction<{
  dataSign: RcvCheckboxDataSign;
}> = async ({ dataSign }) => {
  await whenStateChange(() => {
    screen.getByTestId(dataSign).click();
  });
};

export const TurnOnToggle: StepFunction<{
  dataSign: RcvCheckboxDataSign;
}> = async ({ dataSign }) => {
  await whenStateChange(() => {
    const checkbox = screen
      .getByTestId(dataSign)
      .getElementsByTagName('input')[0];

    if (!checkbox.checked) {
      screen.getByTestId(dataSign).click();
    }
  });
};

export const TurnOffToggle: StepFunction<{
  dataSign: RcvCheckboxDataSign;
}> = async ({ dataSign }) => {
  await whenStateChange(() => {
    const checkbox = screen
      .getByTestId(dataSign)
      .getElementsByTagName('input')[0];

    if (checkbox.checked) {
      screen.getByTestId(dataSign).click();
    }
  });
};

export const SwitchToggleTo: StepFunction<{
  dataSign: RcvCheckboxDataSign;
  status: boolean;
}> = async ({ dataSign, status }) => {
  if (status) {
    return <TurnOnToggle dataSign={dataSign} />;
  }
  return <TurnOffToggle dataSign={dataSign} />;
};

export const ChangeMeetingOptionToOtherValue: StepFunction<{
  meetingOption:
    | 'password'
    | 'isOnlyCoworkersJoin'
    | 'waitingRoomMode'
    | RcvCheckboxDataSign;
}> = async ({ meetingOption }) => {
  switch (meetingOption) {
    case 'password':
      return <EnterRandomPassword />;
    case 'isOnlyCoworkersJoin':
      return (
        <SelectOptionFromDropDown
          dropdownSelector="authUserType"
          targetOption="Signed in co-workers"
        />
      );
    case 'waitingRoomMode':
      return (
        <SelectOptionFromDropDown
          dropdownSelector="waitingRoom"
          targetOption="Everyone"
        />
      );
    default:
      return <SwitchToggle dataSign={meetingOption} />;
  }
};

export const HoverOnComponent: StepFunction<{
  dataSign: string;
  tooltip?: string;
}> = async ({ dataSign, tooltip }) => {
  const component = screen.getByTestId(dataSign);
  // to workaround "with unable to hover element as it has or inherits pointer-events set to 'none'" error
  component.setAttribute('style', 'pointer-events: all');
  userEvent.hover(component);
  await screen.findByRole('tooltip');
  if (tooltip) {
    const dom = screen.getByRole('tooltip');
    expect(dom).toHaveTextContent(tooltip);
  }
};

export const ClickScheduleButton: StepFunction = async (
  _,
  context: Context,
) => {
  const { phone, rcMock } = context;
  const { id, name, ...data } = phone.genericMeeting.meeting;
  const meetingName = phone.genericMeeting.meeting.usePersonalMeetingId
    ? phone.genericMeeting.personalMeeting.name
    : name;
  rcMock.patch('/rcvideo/v1/bridges/:meetingId' as any, 200, {
    response: { body: { ...postRcvBridgesBody, ...data, name: meetingName } },
  });

  jest.useFakeTimers();
  const scheduleButton = screen.getByTestId('videoScheduleButton');
  scheduleButton.click();

  jest.advanceTimersByTime(5e3);
  await waitForRenderReady();
  jest.useRealTimers();
};

export const ClickScheduleButtonWithoutTimer: StepFunction = async (
  _,
  context: Context,
) => {
  const { phone, rcMock } = context;
  const { id, ...data } = phone.genericMeeting.meeting;
  rcMock.patch('/rcvideo/v1/bridges/:meetingId' as any, 200, {
    response: { body: { ...postRcvBridgesBody, ...data } },
  });

  const scheduleButton = screen.getByTestId('videoScheduleButton');
  scheduleButton.click();
};
