import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckInCallLogPage: StepFunction = async (props) => {
  await whenStateChange(() => {
    expect(screen.getByText('Create log')).toBeInTheDocument();
  });

  expect(screen.getByText('Create log')).not.toBeNull();
  expect(screen.getByText('Save')).not.toBeNull();
  expect(screen.getByText('Call outcome')).not.toBeNull();
  expect(screen.getByText('Contacted')).not.toBeNull();
  expect(screen.getByText('Associations')).not.toBeNull();
  expect(screen.getByText('Notes')).not.toBeNull();
};

export const CheckInCallLogPageByTitle: StepFunction = async () => {
  await whenStateChange(() => {
    expect(screen.getByText('Create call log')).toBeInTheDocument();
  });
};

export const CheckCallLogTitle: StepFunction = async (props) => {
  await whenStateChange(() => {
    expect(screen.getByText('Create log')).toBeInTheDocument();
  });
};
