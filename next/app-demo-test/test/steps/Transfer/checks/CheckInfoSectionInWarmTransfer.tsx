import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckInfoSectionInWarmTransferProps {
  logName: string;
  subLogName: string;
}

export const CheckInfoSectionInWarmTransfer: StepFunction<
  CheckInfoSectionInWarmTransferProps
> = async ({ logName, subLogName }) => {
  expect(screen.getByTestId('logName')).toHaveTextContent(logName);
  expect(screen.getByTestId('subLogName')).toHaveTextContent(subLogName);
};
