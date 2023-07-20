import { screen } from '@testing-library/react';
import { waitUntilTo } from '@ringcentral-integration/commons/utils';
import type { StepFunction } from '../../../lib/step';
import type { RcvCheckboxDataSign } from '../Meeting.interface';
import { WaitForSpinner } from '../../WaitForSpinner';

export const CheckChangePmiConfirmButton: StepFunction<{
  isShown: boolean;
}> = async ({ isShown }) => {
  const pmiConfirmEl = screen.queryByTestId('pmiConfirm');
  if (isShown) {
    expect(pmiConfirmEl).not.toBeNull();
    expect(pmiConfirmEl).toHaveTextContent('Change Personal Meeting settings');
  } else {
    expect(pmiConfirmEl).not.toBeInTheDocument();
  }
};

export const CheckRCVPageDisplay: StepFunction<{ timeout?: number }> = async (
  props,
  context,
) => {
  const { timeout = 3000 } = props;
  await WaitForSpinner(props, context);
  if (timeout === 0) {
    expect(screen.queryByTestId('videoConfigsPanel')).toBeInTheDocument();
    return;
  }
  await waitUntilTo(
    () => {
      expect(screen.queryByTestId('videoConfigsPanel')).toBeInTheDocument();
    },
    { timeout },
  );
};

export const CheckPMIFormat: StepFunction = async () => {
  expect(screen.getByTestId('usePersonalMeetingIdWrapper').textContent).toMatch(
    /Use Personal Meeting ID\s\d{3}-\d{3}-\d{3}/,
  );
};

export const CheckItemLabel: StepFunction<{
  dataSign: string;
  label: string;
}> = async ({ dataSign, label }) => {
  const setting = screen.getByTestId(dataSign);

  expect(setting).toHaveTextContent(label);
};

export const CheckboxIsChecked: StepFunction<{
  dataSign: RcvCheckboxDataSign;
  isChecked: boolean;
}> = async ({ dataSign, isChecked }) => {
  const checkbox = screen
    .getByTestId(dataSign)
    .getElementsByTagName('input')[0];

  if (isChecked) {
    expect(checkbox).toBeChecked();
  } else {
    expect(checkbox).not.toBeChecked();
  }
};

export const CheckboxIsDisabled: StepFunction<{
  dataSign: string;
  isDisabled: boolean;
}> = async ({ dataSign, isDisabled }) => {
  const checkbox = screen
    .getByTestId(dataSign)
    .getElementsByTagName('input')[0];

  if (isDisabled) {
    expect(checkbox).toBeDisabled();
  } else {
    expect(checkbox).not.toBeDisabled();
  }
};

export const CheckDropDownStatus: StepFunction<{
  dataSign: string;
  isDisabled: boolean;
  defaultValue?: string;
}> = async ({ dataSign, isDisabled, defaultValue }) => {
  const dropdown = screen
    .getByTestId(dataSign)
    .querySelector('[role = button]');

  if (isDisabled) {
    expect(dropdown).toHaveClass('Mui-disabled');
  } else {
    expect(dropdown).not.toHaveClass('Mui-disabled');
  }

  if (defaultValue) {
    expect(dropdown).toHaveTextContent(defaultValue);
  }
};

export const CheckboxIsLocked: StepFunction<{
  dataSign: string;
  isLocked: boolean;
}> = async ({ dataSign, isLocked }) => {
  const hasLockedIcon = !!screen
    .getByTestId(dataSign)
    .getElementsByClassName('lock_border').length;

  expect(hasLockedIcon).toBe(isLocked);
};

export const CheckScheduleForGuidanceTooltip: StepFunction = async () => {
  expect(screen.getByTestId('scheduleForGuidance').textContent).toEqual(
    "Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n",
  );
  expect(
    screen.getByTestId('scheduleForGuidanceLink').getAttribute('href'),
  ).toEqual(
    'https://support.ringcentral.com/app/video/desktop-web/setting-delegate-schedule-meeting-on-your-behalf-outlook.html',
  );
  expect(screen.getByTestId('scheduleForGuidanceLink').textContent).toEqual(
    'Learn details',
  );
};

export const CheckE2eeTooltip: StepFunction = async () => {
  expect(screen.getByTestId('e2eeTooltip')).toHaveAttribute(
    'title',
    "End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available.",
  );
};

export const CheckScheduleForDisplay: StepFunction<{
  isHidden?: boolean;
}> = async ({ isHidden }) => {
  if (isHidden) {
    expect(
      screen.queryByTestId('scheduleOnBehalfPanelSummary'),
    ).not.toBeInTheDocument();
  } else {
    expect(
      screen.queryByTestId('scheduleOnBehalfPanelSummary'),
    ).toBeInTheDocument();
  }
};

export const CheckNotification: StepFunction<{
  message: string;
}> = async ({ message }) => {
  const notificationList = screen.getAllByTestId('notification');
  expect(
    notificationList.map((notification) => notification.textContent),
  ).toContain(message);
};

export const CheckScheduleButtonDisabled: StepFunction = async (_, context) => {
  const scheduleButton = screen.getByTestId('videoScheduleButton');
  expect(scheduleButton).toBeDisabled();
};
