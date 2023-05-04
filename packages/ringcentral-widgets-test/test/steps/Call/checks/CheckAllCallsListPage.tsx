import { screen, waitFor, within } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

const CheckSpecificCallsItem = (title: string, length: number) => {
  if (length === 0) {
    expect(screen.queryAllByText(title)).not.toBeInTheDocument();
    return;
  }
  const callsList = screen.queryAllByTestId('callList');
  let hasRecord = false;
  callsList.forEach((list) => {
    if (within(list).queryByText(title)) {
      hasRecord = true;
      expect(within(list).queryAllByTestId('callItem')?.length).toBe(length);
    }
  });
  expect(hasRecord).toBeTruthy();
};

export const CheckAllCallsListPage: StepFunction<{
  length?: number;
  onHoldCallsLength?: number;
  currentCallsLength?: number;
  ringingCallsLength?: number;
}> = async ({
  length,
  onHoldCallsLength,
  currentCallsLength,
  ringingCallsLength,
}) => {
  await waitFor(
    () => {
      expect(screen.getByTestId('activeCalls')).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
  if (length !== undefined) {
    if (length === 0) {
      expect(screen.queryAllByTestId('callItem')).not.toBeInTheDocument();
    } else {
      expect(screen.queryAllByTestId('callItem')?.length).toBe(length);
    }
  }

  if (currentCallsLength !== undefined) {
    return CheckSpecificCallsItem('Current Call', currentCallsLength);
  }

  if (onHoldCallsLength !== undefined) {
    return CheckSpecificCallsItem('Call on Hold', onHoldCallsLength);
  }
  if (ringingCallsLength !== undefined) {
    return CheckSpecificCallsItem('Ringing Call', ringingCallsLength);
  }
};
