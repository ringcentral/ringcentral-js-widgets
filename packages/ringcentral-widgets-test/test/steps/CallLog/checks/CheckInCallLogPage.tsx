import { screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckInCallLogPage: StepFunction = async (props, { phone }) => {
  await waitFor(
    () => {
      expect(screen.getByText('Create log')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );

  expect(screen.getByText('Create log')).not.toBeNull();
  expect(screen.getByText('Save')).not.toBeNull();
  expect(screen.getByText('Call outcome')).not.toBeNull();
  expect(screen.getByText('Contacted')).not.toBeNull();
  expect(screen.getByText('Associations')).not.toBeNull();
  expect(screen.getByText('Notes')).not.toBeNull();
};

export const CheckInCallLogPageByTitle: StepFunction = async () => {
  await waitFor(
    () => {
      expect(screen.getByText('Create call log')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};

export const CheckCallLogTitle: StepFunction = async (props, { phone }) => {
  await waitFor(
    () => {
      expect(screen.getByText('Create log')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
};
